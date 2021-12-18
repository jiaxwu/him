package group

import (
	"errors"
	"fmt"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/service/friend"
	"github.com/jiaxwu/him/service/group/model"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"github.com/jiaxwu/him/service/user"
	"gorm.io/gorm"
	"strconv"
	"strings"
	"time"
)

type Service struct {
	db            *gorm.DB
	config        *config.Config
	senderService *sender.Service
	idGenerator   *msg.IDGenerator
	friendService *friend.Service
	userService   *user.Service
}

func NewService(db *gorm.DB, config *config.Config, senderService *sender.Service, idGenerator *msg.IDGenerator,
	friendService *friend.Service, userService *user.Service) *Service {
	return &Service{
		db:            db,
		config:        config,
		senderService: senderService,
		idGenerator:   idGenerator,
		friendService: friendService,
		userService:   userService,
	}
}

// GetGroupInfos 获取群信息
func (s *Service) GetGroupInfos(req *GetGroupInfosReq) (*GetGroupInfosRsp, error) {
	// 获取群编号
	query := s.db.Model(&model.GroupMember{})
	if req.Condition.GroupID != 0 {
		query = query.Where("member_id = ? and group_id = ?", req.UserID, req.Condition.GroupID)
	} else if req.Condition.All {
		query = query.Where("member_id = ?", req.UserID)
	} else {
		return nil, common.ErrCodeInvalidParameter
	}
	var groupIDS []uint64
	if err := query.Select("group_id").Find(&groupIDS).Error; err != nil {
		return nil, err
	}

	// 获取群信息
	var groups []*model.Group
	if err := s.db.Where("id in ?", groupIDS).Find(&groups).Error; err != nil {
		return nil, err
	}

	// 装配
	groupInfos := make([]*GroupInfo, 0, len(groups))
	for _, group := range groups {
		groupInfos = append(groupInfos, &GroupInfo{
			GroupID:                      group.ID,
			Name:                         group.Name,
			Icon:                         group.Icon,
			Members:                      group.Members,
			Notice:                       group.Notice,
			IsJoinApplication:            group.IsJoinApplication,
			IsInviteJoinGroupNeedConfirm: group.IsInviteJoinGroupNeedConfirm,
		})
	}
	return &GetGroupInfosRsp{
		GroupInfos: groupInfos,
	}, nil
}

// CreateGroup 创建群
func (s *Service) CreateGroup(req *CreateGroupReq) (*CreateGroupRsp, error) {
	// 必须设置群名
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		return nil, common.ErrCodeInvalidParameter
	}

	// 群成员数必须大于1，小于等于100
	memberSet := make(map[uint64]GroupMemberRole, len(req.MemberIDS))
	for _, memberID := range req.MemberIDS {
		memberSet[memberID] = GroupMemberRoleMember
	}
	memberSet[req.UserID] = GroupMemberRoleLeader
	if len(memberSet) < 2 && len(memberSet) > 100 {
		return nil, common.ErrCodeInvalidParameter
	}

	// 检查群成员是否和用户都有关系（目前必须是好友关系）
	for memberID := range memberSet {
		if memberID == req.UserID {
			continue
		}
		rsp, err := s.friendService.IsFriend(&friend.IsFriendReq{
			UserID:   req.UserID,
			FriendID: memberID,
		})
		if err != nil {
			return nil, err
		}
		if !rsp.IsFriend {
			return nil, ErrCodeInvalidParameterMustBeFriend
		}
	}

	group := model.Group{
		Name:      req.Name,
		Icon:      req.Icon,
		Members:   uint32(len(memberSet)),
		CreatorID: req.UserID,
	}
	// 创建群和群成员，发送新的群事件消息，发送xx邀请xx，xxx，xxx等加入了群聊tip（一个事务）
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		// 创建群
		if err := tx.Create(&group).Error; err != nil {
			return err
		}

		now := time.Now().Unix()
		// 创建群成员
		groupMembers := make([]*model.GroupMember, 0, len(memberSet))
		memberIDS := make([]uint64, 0, len(memberSet))
		for memberID, role := range memberSet {
			memberIDS = append(memberIDS, memberID)
			groupMembers = append(groupMembers, &model.GroupMember{
				GroupID:        group.ID,
				MemberID:       memberID,
				Role:           string(role),
				IsShowNickName: true,
				JoinTime:       uint64(now),
			})
		}
		if err := tx.Create(&groupMembers).Error; err != nil {
			return err
		}

		// 发送新的群事件消息
		if _, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
			UserIDS: memberIDS,
			EventMsg: &msg.EventMsg{
				NewGroup: &msg.NewGroupEventMsg{
					GroupID: group.ID,
				},
			},
		}); err != nil {
			return err
		}

		textTip, err := s.assembleCreateGroupNickNameTextTip(req.UserID, memberIDS)
		if err != nil {
			return err
		}

		// 发送xx邀请xx，xxx，xxx等加入了群聊tip
		_, err = s.senderService.SendTipMsg(&sender.SendTipMsgReq{
			UserIDS: memberIDS,
			TipMsg: &msg.TipMsg{
				NickNameTextTip: textTip,
			},
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeGroup,
				ReceiverID: group.ID,
			},
		})
		return err
	}); err != nil {
		return nil, err
	}

	// 响应
	getGroupInfosRsp, err := s.GetGroupInfos(&GetGroupInfosReq{
		UserID: req.UserID,
		Condition: &GetGroupInfosCondition{
			GroupID: group.ID,
		},
	})
	if err != nil {
		return nil, err
	}
	return &CreateGroupRsp{GroupInfo: getGroupInfosRsp.GroupInfos[0]}, nil
}

// UpdateGroupInfo 更新群信息
func (s Service) UpdateGroupInfo(req *UpdateGroupInfoReq) (*UpdateGroupInfoRsp, error) {
	// 判断群是否存在
	var group model.Group
	err := s.db.Take(&group, req.GroupID).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.ErrCodeInvalidParameter
	}

	// 判断操作者是否是群主或者管理员
	var groupMember model.GroupMember
	err = s.db.Where("group_id = ? and member_id = ?", req.GroupID, req.OperatorID).Take(&groupMember).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.ErrCodeInvalidParameter
	}
	if groupMember.Role != string(GroupMemberRoleManager) && groupMember.Role != string(GroupMemberRoleLeader) {
		return nil, common.ErrCodeForbidden
	}

	// 准备好更新和通知的内容
	var (
		column          string
		value           string
		nickNameTextTip *msg.NickNameTextTip
		textMsg         *msg.TextMsg
		memberIDS       []uint64
	)
	if req.Action.Name != "" {
		column = "name"
		value = req.Action.Name
		tipText := fmt.Sprintf(`修改了群名称为"%s"`, req.Action.Name)
		if nickNameTextTip, err = s.assembleUpdateGroupInfoNickTextTip(req.OperatorID, tipText); err != nil {
			return nil, err
		}
	} else if req.Action.Icon != "" {
		column = "icon"
		value = req.Action.Icon
		if nickNameTextTip, err = s.assembleUpdateGroupInfoNickTextTip(req.OperatorID, "修改了群头像"); err != nil {
			return nil, err
		}
	} else if req.Action.Notice != "" {
		column = "notice"
		value = req.Action.Notice
		textMsg = &msg.TextMsg{
			Content:  req.Action.Notice,
			IsNotice: true,
		}
	} else {
		return nil, common.ErrCodeInvalidParameter
	}
	if err := s.db.Model(model.GroupMember{}).Where("group_id = ?", req.GroupID).
		Select("member_id").Find(&memberIDS).Error; err != nil {
		return nil, err
	}

	// 更新，并发送通知
	if err := s.db.Model(model.Group{}).Where("id = ?", req.GroupID).Update(column, value).Error; err != nil {
		return nil, err
	}

	// 如果需要提示则发送提示
	if nickNameTextTip != nil {
		if _, err := s.senderService.SendTipMsg(&sender.SendTipMsgReq{
			UserIDS: memberIDS,
			TipMsg: &msg.TipMsg{
				NickNameTextTip: nickNameTextTip,
			},
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeGroup,
				ReceiverID: req.GroupID,
			},
		}); err != nil {
			return nil, err
		}
	}

	// 如果需要公告则发送公告
	if textMsg != nil {
		if _, err := s.senderService.SendTextMsg(&sender.SendTextMsgReq{
			UserIDS: memberIDS,
			TextMsg: textMsg,
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeGroup,
				ReceiverID: req.GroupID,
			},
		}); err != nil {
			return nil, err
		}
	}

	// 发送群信息更新时间
	if _, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
		UserIDS: memberIDS,
		EventMsg: &msg.EventMsg{
			GroupInfoChange: &msg.GroupInfoChangeEventMsg{
				GroupID: group.ID,
			},
		},
	}); err != nil {
		return nil, err
	}

	getGroupInfosRsp, err := s.GetGroupInfos(&GetGroupInfosReq{
		UserID: req.OperatorID,
		Condition: &GetGroupInfosCondition{
			GroupID: req.GroupID,
		},
	})
	if err != nil {
		return nil, err
	}

	return &UpdateGroupInfoRsp{
		GroupInfo: getGroupInfosRsp.GroupInfos[0],
	}, nil
}

// GetGroupMemberInfos 获取群成员信息
func (s *Service) GetGroupMemberInfos(req *GetGroupMemberInfosReq) (*GetGroupMemberInfosRsp, error) {
	// 判断用户是否属于该群的
	getGroupInfosRsp, err := s.GetGroupInfos(&GetGroupInfosReq{
		UserID: req.UserID,
		Condition: &GetGroupInfosCondition{
			GroupID: req.GroupID,
		},
	})
	if err != nil {
		return nil, err
	}
	groupInfos := getGroupInfosRsp.GroupInfos
	if len(groupInfos) == 0 {
		return nil, ErrCodeInvalidParameterMustBeMember
	}

	// 获取群成员信息
	groupMembers := make([]*model.GroupMember, 0, groupInfos[0].Members)
	if err := s.db.Where("group_id = ?", req.GroupID).Find(&groupMembers).Error; err != nil {
		return nil, err
	}

	// 装配
	groupMemberInfos := make([]*GroupMemberInfo, 0, len(groupMembers))
	for _, groupMember := range groupMembers {
		groupMemberInfos = append(groupMemberInfos, &GroupMemberInfo{
			GroupID:        groupMember.GroupID,
			MemberID:       groupMember.MemberID,
			Role:           GroupMemberRole(groupMember.Role),
			GroupNickName:  groupMember.GroupNickName,
			IsDisturb:      groupMember.IsDisturb,
			IsTop:          groupMember.IsTop,
			IsShowNickName: groupMember.IsShowNickName,
			JoinTime:       groupMember.JoinTime,
		})
	}
	return &GetGroupMemberInfosRsp{
		GroupMemberInfos: groupMemberInfos,
	}, nil
}

// 装配修改群信息tip
func (s *Service) assembleUpdateGroupInfoNickTextTip(operatorID uint64, text string) (*msg.NickNameTextTip, error) {
	getUserInfosRsp, err := s.userService.GetUserInfos(&user.GetUserInfosReq{UserID: operatorID})
	if err != nil {
		return nil, err
	}
	userInfo := getUserInfosRsp.UserInfos[0]
	return &msg.NickNameTextTip{
		ClickableTexts: []*msg.ClickableText{
			{
				Text: userInfo.NickName,
				Link: strconv.Itoa(int(operatorID)),
			},
			{
				Text: text,
			},
		},
	}, nil
}

// 装配创建群的tip
func (s *Service) assembleCreateGroupNickNameTextTip(userID uint64, memberIDS []uint64) (*msg.NickNameTextTip, error) {
	// 获取成员昵称
	getUserInfosRsp, err := s.userService.GetUserInfos(&user.GetUserInfosReq{UserIDS: memberIDS})
	if err != nil {
		return nil, err
	}
	userInfos := getUserInfosRsp.UserInfos

	// 拼接
	var leaderNickName string
	clickableTexts := []*msg.ClickableText{
		{
			Link: strconv.Itoa(int(userID)),
		},
		{
			Text: "邀请",
		},
	}
	for _, userInfo := range userInfos {
		if userID == userInfo.UserID {
			leaderNickName = userInfo.NickName
			continue
		}
		clickableTexts = append(clickableTexts, &msg.ClickableText{
			Link: strconv.Itoa(int(userInfo.UserID)),
			Text: userInfo.NickName,
		})
	}
	clickableTexts[0].Text = leaderNickName
	clickableTexts = append(clickableTexts, &msg.ClickableText{
		Text: "加入了群聊",
	})
	return &msg.NickNameTextTip{
		ClickableTexts: clickableTexts,
	}, nil
}
