package group

import (
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/conf"
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
	config        *conf.Config
	senderService *sender.Service
	idGenerator   *msg.IDGenerator
	friendService *friend.Service
	userService   *user.Service
}

func NewService(db *gorm.DB, config *conf.Config, senderService *sender.Service, idGenerator *msg.IDGenerator,
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
		Condition: &GetGroupInfosReqCondition{
			GroupID: group.ID,
		},
	})
	if err != nil {
		return nil, err
	}
	return &CreateGroupRsp{GroupInfo: getGroupInfosRsp.GroupInfos[0]}, nil
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
