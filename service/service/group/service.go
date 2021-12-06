package group

import (
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/service/friend"
	"him/service/service/msg"
	"him/service/service/msg/sender"
	"him/service/service/user/profile"
	"strings"
	"time"
)

type Service struct {
	db             *gorm.DB
	validate       *validator.Validate
	logger         *logrus.Logger
	config         *conf.Config
	profileService *profile.Service
	senderService  *sender.Service
	idGenerator    *msg.IDGenerator
	friendService  *friend.Service
}

func NewService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
	profileService *profile.Service, senderService *sender.Service, idGenerator *msg.IDGenerator,
	friendService *friend.Service) *Service {
	return &Service{
		db:             db,
		validate:       validate,
		logger:         logger,
		config:         config,
		profileService: profileService,
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
			UserIDS:  memberIDS,
			EventMsg: &msg.EventMsg{
				// todo
			},
		}); err != nil {
			return err
		}

		// 发送xx邀请xx，xxx，xxx等加入了群聊tip


	}); err != nil {
		return nil, err
	}

	// 响应

}
