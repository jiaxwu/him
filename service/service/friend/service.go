package friend

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/service/msg"
	"him/service/service/msg/sender"
	"him/service/service/user/profile"
	"time"
)

type Service struct {
	db             *gorm.DB
	validate       *validator.Validate
	logger         *logrus.Logger
	config         *conf.Config
	profileService *profile.Service
	senderService  *sender.Service
}

func NewService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
	profileService *profile.Service, senderService *sender.Service) *Service {
	return &Service{
		db:             db,
		validate:       validate,
		logger:         logger,
		config:         config,
		profileService: profileService,
		senderService:  senderService,
	}
}

// GetFriendInfos 获取好友信息
func (s *Service) GetFriendInfos(req *GetFriendInfosReq) (*GetFriendInfosRsp, error) {
	// 如果用户名不为空，通过用户名查询好友编号
	if req.Condition.Username != "" {
		var userProfile model.UserProfile
		err := s.db.Model(model.UserProfile{}).Where("username = ?", req.Condition.Username).
			Take(&userProfile).Error
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		// 如果查询不到用户，返回空
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return &GetFriendInfosRsp{FriendInfos: []*FriendInfo{}}, nil
		}
		// 否则通过UserID查询好友信息
		req.Condition.FriendID = userProfile.UserID
	}

	// 如果好友编号不为空，查询or创建好友
	if req.Condition.FriendID != 0 {
		friendInfo, err := s.getFriendInfoByFriendID(req.UserID, req.Condition.FriendID)
		if err != nil {
			return nil, err
		}
		return &GetFriendInfosRsp{FriendInfos: []*FriendInfo{friendInfo}}, nil
	}

	// 如果是IsFriend，获取好友列表（只获取IsFriend=true的）
	if req.Condition.IsFriend {
		return s.getFriendInfosIfIsFriend(req.UserID)
	}

	return nil, common.ErrCodeInvalidParameter
}

// 获取用户的好友信息
func (s *Service) getFriendInfosIfIsFriend(userID uint64) (*GetFriendInfosRsp, error) {
	// 获取好友列表
	var friends []*model.Friend
	if err := s.db.Where("user_id = ? and is_friend = ?", userID, true).Find(&friends).Error; err != nil {
		return nil, err
	}
	// 获取好友信息
	friendIDS := make([]uint64, len(friends))
	for _, friend := range friends {
		friendIDS = append(friendIDS, friend.FriendID)
	}
	var profiles []*model.UserProfile
	if err := s.db.Where("user_id in ?", friendIDS).Find(&profiles).Error; err != nil {
		return nil, err
	}
	// 关联
	userIDToProfileMap := make(map[uint64]*model.UserProfile, len(profiles))
	for _, userProfile := range profiles {
		userIDToProfileMap[userProfile.UserID] = userProfile
	}
	friendInfos := make([]*FriendInfo, len(friends))
	for _, friend := range friends {
		userProfile := userIDToProfileMap[friend.FriendID]
		friendInfos = append(friendInfos, &FriendInfo{
			FriendID:    friend.FriendID,
			NickName:    userProfile.NickName,
			Username:    userProfile.Username,
			Avatar:      userProfile.Avatar,
			Gender:      profile.Gender(userProfile.Gender),
			Remark:      friend.Remark,
			Description: friend.Description,
			IsDisturb:   friend.IsDisturb,
			IsBlacklist: friend.IsBlacklist,
			IsTop:       friend.IsTop,
			IsFriend:    friend.IsFriend,
		})
	}

	return &GetFriendInfosRsp{FriendInfos: friendInfos}, nil
}

// 通过好友编号获取好友
func (s *Service) getFriendInfoByFriendID(userID, friendID uint64) (*FriendInfo, error) {
	friend := model.Friend{
		UserID:   userID,
		FriendID: friendID,
	}
	if err := s.db.FirstOrCreate(&friend, &friend).Error; err != nil {
		return nil, err
	}
	// 获取好友个人信息
	getUserProfileRsp, err := s.profileService.GetUserProfile(&profile.GetUserProfileReq{
		UserID: friendID,
	})
	if err != nil {
		return nil, err
	}
	return &FriendInfo{
		FriendID:    friend.FriendID,
		NickName:    getUserProfileRsp.NickName,
		Username:    getUserProfileRsp.Username,
		Avatar:      getUserProfileRsp.Avatar,
		Gender:      getUserProfileRsp.Gender,
		Remark:      friend.Remark,
		Description: friend.Description,
		IsDisturb:   friend.IsDisturb,
		IsBlacklist: friend.IsBlacklist,
		IsTop:       friend.IsTop,
		IsFriend:    friend.IsFriend,
	}, nil
}

// CreateAddFriendApplication 创建添加好友申请
func (s *Service) CreateAddFriendApplication(req *CreateAddFriendApplicationReq) (
	*CreateAddFriendApplicationRsp, error) {
	// 检查好友是否是自己
	if req.ApplicantID == req.FriendID {
		return nil, common.ErrCodeInvalidParameter
	}

	// 判断好友是否存在
	var user model.User
	err := s.db.Take(&user, req.FriendID).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.ErrCodeInvalidParameter
	}

	// 检查好友是否已经是好友
	friendInfo, err := s.getFriendInfoByFriendID(req.FriendID, req.ApplicantID)
	if err != nil {
		return nil, err
	}
	if friendInfo.IsFriend {
		return nil, ErrCodeInvalidParameterIsAlreadyFriend
	}

	// 检查是否在对方的黑名单中
	if friendInfo.IsBlacklist {
		return nil, ErrCodeInvalidParameterInBlacklist
	}

	// 发起请求
	addFriendApplication := model.AddFriendApplication{
		ApplicantID:     req.ApplicantID,
		FriendID:        req.FriendID,
		ApplicationMsg:  req.ApplicationMsg,
		Status:          uint8(AddFriendApplicationStatusWaitConfirm),
		ApplicationTime: uint64(time.Now().Unix()),
	}
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&addFriendApplication).Error; err != nil {
			return err
		}

		// 通知对方和自己的其他端有新的好友申请
		sendMsgReq := sender.SendMsgReq{
			Sender: &msg.Sender{
				Type: msg.SenderTypeSys,
			},
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeUser,
				ReceiverID: req.FriendID,
			},
			SendTime: uint64(time.Now().Unix()),
			Content:  &msg.Content{
				// todo NewAddFriendApplication 事件消息
			},
		}
		if _, err := s.senderService.SendMsg(&sendMsgReq); err != nil {
			return err
		}
		sendMsgReq.Receiver.ReceiverID = req.ApplicantID
		if _, err := s.senderService.SendMsg(&sendMsgReq); err != nil {
			return err
		}
		return nil
	}); err != nil {
		return nil, err
	}

	return &CreateAddFriendApplicationRsp{AddFriendApplication: &AddFriendApplication{
		AddFriendApplicationID: addFriendApplication.ID,
		ApplicantID:            addFriendApplication.ApplicantID,
		FriendID:               addFriendApplication.FriendID,
		ApplicationMsg:         addFriendApplication.ApplicationMsg,
		FriendReply:            addFriendApplication.FriendReply,
		Status:                 AddFriendApplicationStatus(addFriendApplication.Status),
		ApplicationTime:        addFriendApplication.ApplicationTime,
	}}, nil
}
