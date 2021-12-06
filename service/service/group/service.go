package group

import (
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/service/friend"
	"him/service/service/msg"
	"him/service/service/msg/sender"
	"strconv"
	"strings"
	"time"
)

type Service struct {
	db             *gorm.DB
	logger         *logrus.Logger
	config         *conf.Config
	senderService  *sender.Service
	idGenerator    *msg.IDGenerator
	friendService  *friend.Service
}

func NewService(db *gorm.DB, logger *logrus.Logger, config *conf.Config, senderService *sender.Service,
	idGenerator *msg.IDGenerator, friendService *friend.Service) *Service {
	return &Service{
		db:             db,
		logger:         logger,
		config:         config,
		senderService:  senderService,
		idGenerator:    idGenerator,
		friendService:  friendService,
	}
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
			s.logger.WithError(err).Error("db exception")
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
			s.logger.WithError(err).Error("db exception")
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
	return &CreateGroupRsp{GroupInfo: &GroupInfo{
		GroupID:                      group.ID,
		Name:                         group.Name,
		Icon:                         group.Icon,
		Members:                      group.Members,
		Notice:                       group.Notice,
		IsJoinApplication:            group.IsJoinApplication,
		IsInviteJoinGroupNeedConfirm: group.IsInviteJoinGroupNeedConfirm,
	}}, nil
}

// 发送文本消息，给senderID和receiverID各发一条
func (s *Service) sendTextMsg(senderID, receiverID uint64, textMsgContent string) error {
	msgs := make([]*msg.Msg, 2)
	now := uint64(time.Now().Unix())
	msgID := s.idGenerator.GenMsgID()
	msgSender := msg.Sender{
		Type:     msg.ReceiverTypeUser,
		SenderID: senderID,
	}
	msgReceiver := msg.Receiver{
		Type:       msg.ReceiverTypeUser,
		ReceiverID: receiverID,
	}
	content := msg.Content{
		TextMsg: &msg.TextMsg{
			Content: textMsgContent,
		},
	}

	msgs[0] = &msg.Msg{
		UserID:      senderID,
		MsgID:       msgID,
		Sender:      &msgSender,
		Receiver:    &msgReceiver,
		SendTime:    now,
		ArrivalTime: now,
		Content:     &content,
	}
	msgs[1] = &msg.Msg{
		UserID:      receiverID,
		MsgID:       msgID,
		Sender:      &msgSender,
		Receiver:    &msgReceiver,
		SendTime:    now,
		ArrivalTime: now,
		Content:     &content,
	}

	// 发送
	_, err := s.senderService.SendMsgs(&sender.SendMsgsReq{Msgs: msgs})
	return err
}

// 装配创建群的tip
func (s *Service) assembleCreateGroupNickNameTextTip(userID uint64, memberIDS []uint64) (*msg.NickNameTextTip, error) {
	// 获取成员昵称
	var userProfiles []*model.UserProfile
	if err := s.db.Where("user_id in ?", memberIDS).Find(&userProfiles).Error; err != nil {
		s.logger.WithError(err).Error("db exception")
		return nil, err
	}

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
	for _, userProfile := range userProfiles {
		if userID == userProfile.UserID {
			leaderNickName = userProfile.NickName
			continue
		}
		clickableTexts = append(clickableTexts, &msg.ClickableText{
			Link: strconv.Itoa(int(userProfile.UserID)),
			Text: userProfile.NickName,
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
