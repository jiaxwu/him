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
	idGenerator    *msg.IDGenerator
}

func NewService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
	profileService *profile.Service, senderService *sender.Service, idGenerator *msg.IDGenerator) *Service {
	return &Service{
		db:             db,
		validate:       validate,
		logger:         logger,
		config:         config,
		profileService: profileService,
		senderService:  senderService,
		idGenerator:    idGenerator,
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
	friendIDS := make([]uint64, 0, len(friends))
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
	friendInfos := make([]*FriendInfo, 0, len(friends))
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
	// 获取好友个人信息
	getUserProfileRsp, err := s.profileService.GetUserProfile(&profile.GetUserProfileReq{
		UserID: friendID,
	})
	if err != nil {
		return nil, err
	}

	// 获取好友信息
	friend := model.Friend{
		UserID:   userID,
		FriendID: friendID,
	}
	if err := s.db.FirstOrCreate(&friend, &friend).Error; err != nil {
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

// UpdateFriendInfo 更新好友信息
func (s *Service) UpdateFriendInfo(req *UpdateFriendInfoReq) (*UpdateFriendInfoRsp, error) {
	// 获取当前好友信息
	friendInfo, err := s.getFriendInfoByFriendID(req.UserID, req.FriendID)
	if err != nil {
		return nil, err
	}

	// 修改
	var (
		column string
		value  interface{}
	)
	if req.Action.IsDisturb != nil {
		column = "is_disturb"
		value = *req.Action.IsDisturb
		friendInfo.IsDisturb = *req.Action.IsDisturb
	} else if req.Action.IsBlacklist != nil {
		column = "is_blacklist"
		value = *req.Action.IsBlacklist
		friendInfo.IsBlacklist = *req.Action.IsBlacklist
	} else if req.Action.IsTop != nil {
		column = "is_top"
		value = *req.Action.IsTop
		friendInfo.IsTop = *req.Action.IsTop
	} else if req.Action.Remark != "" {
		column = "remark"
		value = req.Action.Remark
		friendInfo.Remark = req.Action.Remark
	} else if req.Action.Description != "" {
		column = "description"
		value = req.Action.Description
		friendInfo.Description = req.Action.Description
	} else {
		return nil, common.ErrCodeInvalidParameter
	}
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		// 修改好友信息
		if err := s.db.Model(model.Friend{}).Where("user_id = ? and friend_id = ?", req.UserID, req.FriendID).
			Update(column, value).Error; err != nil {
			return err
		}

		// 通知用户的多个端
		return s.sendEventMsg([]uint64{req.UserID}, &msg.EventMsg{
			FriendInfoChange: &msg.FriendInfoChangeEventMsg{
				FriendID: req.FriendID,
			},
		})
	}); err != nil {
		return nil, err
	}

	// 响应
	return &UpdateFriendInfoRsp{FriendInfo: friendInfo}, nil
}

// CreateAddFriendApplication 创建添加好友申请
func (s *Service) CreateAddFriendApplication(req *CreateAddFriendApplicationReq) (
	*CreateAddFriendApplicationRsp, error) {
	// 检查好友是否是自己
	if req.ApplicantID == req.FriendID {
		return nil, ErrCodeInvalidParameterCanNotAddYourself
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

	// 判断目前是否有一个申请等待确认
	var count int64
	if err := s.db.Model(model.AddFriendApplication{}).Where("applicant_id = ? and friend_id = ? and status = ?",
		req.ApplicantID, req.FriendID, AddFriendApplicationStatusWaitConfirm).Count(&count).Error; err != nil {
		return nil, err
	}
	if count != 0 {
		return nil, ErrCodeInvalidParameterApplicationIsPending
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

		// 通知对方和自己的其他端有新的好友申请，发送新添加好友申请事件消息
		return s.sendEventMsg([]uint64{req.ApplicantID, req.FriendID}, &msg.EventMsg{
			NewAddFriendApplication: &msg.NewAddFriendApplicationEventMsg{
				AddFriendApplicationID: addFriendApplication.ID,
			},
		})
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

// 发送事件消息
func (s *Service) sendEventMsg(receiverIDS []uint64, eventMsg *msg.EventMsg) error {
	msgs := make([]*msg.Msg, 0, len(receiverIDS))
	now := uint64(time.Now().Unix())
	msgID := s.idGenerator.GenMsgID()
	sysSender := &msg.Sender{
		Type: msg.SenderTypeSys,
	}
	content := msg.Content{
		EventMsg: eventMsg,
	}

	// 发送
	for _, receiverID := range receiverIDS {
		msgs = append(msgs, &msg.Msg{
			UserID: receiverID,
			MsgID:  msgID,
			Sender: sysSender,
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeUser,
				ReceiverID: receiverID,
			},
			SendTime:    now,
			ArrivalTime: now,
			Content:     &content,
		})
	}
	_, err := s.senderService.SendMsgs(&sender.SendMsgsReq{Msgs: msgs})
	return err
}
