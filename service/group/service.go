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

// GetGroupInfo 获取群信息
func (s *Service) GetGroupInfo(req *GetGroupInfoReq) (*GetGroupInfoRsp, error) {
	// 获取群信息
	var group model.Group
	err := s.db.Take(&group, req.GroupID).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterGroupNotExists
	}
	groupInfo := GroupInfo{
		GroupID:                      group.ID,
		Name:                         group.Name,
		Icon:                         group.Icon,
		Members:                      group.Members,
		IsInviteJoinGroupNeedConfirm: group.IsInviteJoinGroupNeedConfirm,
	}

	// 判断是否是群成员
	getGroupMemberInfoRsp, err := s.GetGroupMemberInfo(&GetGroupMemberInfoReq{
		MemberID: req.UserID,
		GroupID:  req.GroupID,
	})
	if err != nil && !errors.Is(err, ErrCodeInvalidParameterNotGroupMember) {
		return nil, err
	}

	// 如果是群成员，设置群成员才能看到的信息
	if err == nil {
		groupInfo.Notice = group.Notice
		groupInfo.GroupMemberInfo = getGroupMemberInfoRsp.GroupMemberInfo
	}
	return &GetGroupInfoRsp{GroupInfo: &groupInfo}, nil
}

// GetUserGroupInfos 获取用户群信息
func (s *Service) GetUserGroupInfos(req *GetUserGroupInfosReq) (*GetUserGroupInfosRsp, error) {
	// 获取群成员信息
	var groupMembers []*model.GroupMember
	if err := s.db.Where("member_id = ?", req.UserID).Find(&groupMembers).Error; err != nil {
		return nil, err
	}
	if len(groupMembers) == 0 {
		return &GetUserGroupInfosRsp{}, nil
	}

	// 群成员信息转换成群编号
	groupIDS := make([]uint64, 0, len(groupMembers))
	groupIDToGroupMemberMap := make(map[uint64]*model.GroupMember, len(groupMembers))
	for _, groupMember := range groupMembers {
		groupIDS = append(groupIDS, groupMember.GroupID)
		groupIDToGroupMemberMap[groupMember.GroupID] = groupMember
	}

	// 获取群信息
	groups := make([]*model.Group, 0, len(groupIDS))
	if err := s.db.Where("id in ?", groupIDS).Find(&groups).Error; err != nil {
		return nil, err
	}

	// 装配
	groupInfos := make([]*GroupInfo, 0, len(groups))
	for _, group := range groups {
		groupMember := groupIDToGroupMemberMap[group.ID]
		groupInfos = append(groupInfos, &GroupInfo{
			GroupID:                      group.ID,
			Name:                         group.Name,
			Icon:                         group.Icon,
			Members:                      group.Members,
			Notice:                       group.Notice,
			IsInviteJoinGroupNeedConfirm: group.IsInviteJoinGroupNeedConfirm,
			GroupMemberInfo:              s.assembleGroupMemberInfo(groupMember),
		})
	}
	return &GetUserGroupInfosRsp{
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
				Role:           uint8(role),
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
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.UserID,
		GroupID: group.ID,
	})
	if err != nil {
		return nil, err
	}
	return &CreateGroupRsp{GroupInfo: getGroupInfoRsp.GroupInfo}, nil
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
	err = s.db.Where("group_id = ? and member_id = ?", req.GroupID, req.UserID).Take(&groupMember).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.ErrCodeInvalidParameter
	}
	if groupMember.Role != uint8(GroupMemberRoleManager) && groupMember.Role != uint8(GroupMemberRoleLeader) {
		return nil, common.ErrCodeForbidden
	}

	// 准备好更新和通知的内容
	var (
		column          string
		value           any
		nickNameTextTip *msg.NickNameTextTip
		textMsg         *msg.TextMsg
		memberIDS       []uint64
	)
	if req.Action.Name != nil {
		column = "name"
		value = *req.Action.Name
		tipText := fmt.Sprintf(`修改群名称为“%s”`, *req.Action.Name)
		if nickNameTextTip, err = s.assembleUpdateGroupInfoNickTextTip(req.UserID, tipText); err != nil {
			return nil, err
		}
	} else if req.Action.Icon != nil {
		column = "icon"
		value = *req.Action.Icon
		if nickNameTextTip, err = s.assembleUpdateGroupInfoNickTextTip(req.UserID, "修改了群头像"); err != nil {
			return nil, err
		}
	} else if req.Action.Notice != nil {
		column = "notice"
		value = *req.Action.Notice
		textMsg = &msg.TextMsg{
			Content:  *req.Action.Notice,
			IsNotice: true,
		}
	} else if req.Action.IsInviteJoinGroupNeedConfirm != nil {
		column = "is_invite_join_group_need_confirm"
		value = *req.Action.IsInviteJoinGroupNeedConfirm
		var tipText string
		if *req.Action.IsInviteJoinGroupNeedConfirm {
			tipText = "已启用“群聊邀请确认”，群成员需群主或群管理员确认才能邀请朋友进群"
		} else {
			tipText = "已恢复默认进群方式"
		}
		if nickNameTextTip, err = s.assembleUpdateGroupInfoNickTextTip(req.UserID, tipText); err != nil {
			return nil, err
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

	// 获取新的群信息
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.UserID,
		GroupID: req.GroupID,
	})
	if err != nil {
		return nil, err
	}
	return &UpdateGroupInfoRsp{
		GroupInfo: getGroupInfoRsp.GroupInfo,
	}, nil
}

// 装配修改群信息tip
func (s *Service) assembleUpdateGroupInfoNickTextTip(operatorID uint64, text string) (*msg.NickNameTextTip, error) {
	// 获取用户信息
	getUserInfoRsp, err := s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: operatorID})
	if err != nil {
		return nil, err
	}
	userInfo := getUserInfoRsp.UserInfo

	// 装配
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
