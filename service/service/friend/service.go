package friend

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/service/common"
	"github.com/jiaxwu/him/service/service/friend/model"
	"github.com/jiaxwu/him/service/service/msg"
	"github.com/jiaxwu/him/service/service/msg/sender"
	auth2 "github.com/jiaxwu/him/service/service/user/auth"
	"github.com/jiaxwu/him/service/service/user/profile"
	model2 "github.com/jiaxwu/him/service/service/user/profile/model"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"time"
)

type Service struct {
	db             *gorm.DB
	validate       *validator.Validate
	logger         *logrus.Logger
	config         *conf.Config
	profileService *profile.Service
	senderService  *sender.Service
	authService    *auth2.Service
	idGenerator    *msg.IDGenerator
}

func NewService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
	profileService *profile.Service, senderService *sender.Service, authService *auth2.Service,
	idGenerator *msg.IDGenerator) *Service {
	return &Service{
		db:             db,
		validate:       validate,
		logger:         logger,
		config:         config,
		profileService: profileService,
		senderService:  senderService,
		authService:    authService,
		idGenerator:    idGenerator,
	}
}

// GetFriendInfos 获取好友信息
func (s *Service) GetFriendInfos(req *GetFriendInfosReq) (*GetFriendInfosRsp, error) {
	// 如果用户名不为空，通过用户名查询好友编号
	if req.Condition.Username != "" {
		var userProfile model2.UserProfile
		err := s.db.Model(model2.UserProfile{}).Where("username = ?", req.Condition.Username).
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
	var profiles []*model2.UserProfile
	if err := s.db.Where("user_id in ?", friendIDS).Find(&profiles).Error; err != nil {
		return nil, err
	}
	// 关联
	userIDToProfileMap := make(map[uint64]*model2.UserProfile, len(profiles))
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

// IsFriend 是否是朋友
func (s Service) IsFriend(req *IsFriendReq) (*IsFriendRsp, error) {
	var count int64
	if err := s.db.Model(model.Friend{}).Where("user_id = ? and friend_id = ? and is_friend = ?",
		req.UserID, req.FriendID, true).Limit(1).Count(&count).Error; err != nil {
		return nil, err
	}
	var rsp IsFriendRsp
	if count != 0 {
		rsp.IsFriend = true
	}
	return &rsp, nil
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
		if err := tx.Model(model.Friend{}).Where("user_id = ? and friend_id = ?", req.UserID, req.FriendID).
			Update(column, value).Error; err != nil {
			s.logger.WithError(err).Error("db exception")
			return err
		}

		// 通知用户的多个端
		_, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
			UserIDS: []uint64{req.UserID},
			EventMsg: &msg.EventMsg{
				FriendInfoChange: &msg.FriendInfoChangeEventMsg{
					FriendID: req.FriendID,
				},
			},
		})
		return err
	}); err != nil {
		return nil, err
	}

	// 响应
	return &UpdateFriendInfoRsp{FriendInfo: friendInfo}, nil
}

// DeleteFriend 删除好友
func (s *Service) DeleteFriend(req *DeleteFriendReq) (*DeleteFriendRsp, error) {
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(model.Friend{}).Where("user_id = ? and friend_id = ?",
			req.UserID, req.FriendID).
			Update("is_friend", false).Error; err != nil {
			s.logger.WithError(err).Error("db exception")
			return err
		}
		if err := tx.Model(model.Friend{}).Where("user_id = ? and friend_id = ?",
			req.FriendID, req.UserID).
			Update("is_friend", false).Error; err != nil {
			s.logger.WithError(err).Error("db exception")
			return err
		}
		return nil
	}); err != nil {
		return nil, err
	}
	return &DeleteFriendRsp{}, nil
}

// GetAddFriendApplications 获取添加好友申请
func (s *Service) GetAddFriendApplications(req *GetAddFriendApplicationsReq) (*GetAddFriendApplicationsRsp, error) {
	var modelAddFriendApplications []*model.AddFriendApplication
	if err := s.db.Where("id > ? and (applicant_id = ? or friend_id = ?)",
		req.LastAddFriendApplicationId, req.UserID, req.UserID).Limit(req.Size).
		Find(&modelAddFriendApplications).Error; err != nil {
		s.logger.WithError(err).Error("db exception")
		return nil, err
	}

	addFriendApplications := make([]*AddFriendApplication, 0, len(modelAddFriendApplications))
	for _, modelAddFriendApplication := range modelAddFriendApplications {
		addFriendApplications = append(addFriendApplications, &AddFriendApplication{
			AddFriendApplicationID: modelAddFriendApplication.ID,
			ApplicantID:            modelAddFriendApplication.ApplicantID,
			FriendID:               modelAddFriendApplication.FriendID,
			ApplicationMsg:         modelAddFriendApplication.ApplicationMsg,
			FriendReply:            modelAddFriendApplication.FriendReply,
			Status:                 AddFriendApplicationStatus(modelAddFriendApplication.Status),
			ApplicationTime:        modelAddFriendApplication.ApplicationTime,
		})
	}
	return &GetAddFriendApplicationsRsp{AddFriendApplications: addFriendApplications}, nil
}

// CreateAddFriendApplication 创建添加好友申请
func (s *Service) CreateAddFriendApplication(req *CreateAddFriendApplicationReq) (
	*CreateAddFriendApplicationRsp, error) {
	// 检查好友是否是自己
	if req.ApplicantID == req.FriendID {
		return nil, ErrCodeInvalidParameterCanNotAddYourself
	}

	// 判断好友是否存在
	if _, err := s.authService.GetUser(&auth2.GetUserReq{UserID: req.FriendID}); err != nil {
		return nil, err
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
		s.logger.WithError(err).Error("db exception")
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
			s.logger.WithError(err).Error("db exception")
			return err
		}

		// 通知对方和自己的其他端有新的好友申请，发送新添加好友申请事件消息
		_, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
			UserIDS: []uint64{req.ApplicantID, req.FriendID},
			EventMsg: &msg.EventMsg{
				NewAddFriendApplication: &msg.NewAddFriendApplicationEventMsg{
					AddFriendApplicationID: addFriendApplication.ID,
				},
			},
		})
		return err
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

// UpdateAddFriendApplication 更新添加好友申请
func (s *Service) UpdateAddFriendApplication(req *UpdateAddFriendApplicationReq) (
	*UpdateAddFriendApplicationRsp, error) {
	// 查询申请
	var addFriendApplication model.AddFriendApplication
	err := s.db.Clauses(clause.Locking{
		Strength: "UPDATE",
	}).Take(&addFriendApplication, req.AddFriendApplicationID).Error
	if err != nil &&
		!errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithError(err).Error("db exception")
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.ErrCodeInvalidParameter
	}

	// 请求检查
	column, value, err := s.updateAddFriendApplicationReqCheck(&addFriendApplication, req)
	if err != nil {
		return nil, err
	}

	// 更新数据库
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(model.AddFriendApplication{}).
			Where("id = ?", req.AddFriendApplicationID).Update(column, value).Error; err != nil {
			s.logger.WithError(err).Error("db exception")
			return err
		}

		// 如果是接受好友申请的请求，则特殊处理
		if req.Action.Accept {
			if _, err := s.getFriendInfoByFriendID(addFriendApplication.ApplicantID, addFriendApplication.FriendID); err != nil {
				return err
			}
			if _, err := s.getFriendInfoByFriendID(addFriendApplication.FriendID, addFriendApplication.ApplicantID); err != nil {
				return err
			}
			if err := tx.Model(model.Friend{}).Where("user_id = ? and friend_id = ?",
				addFriendApplication.ApplicantID, addFriendApplication.FriendID).
				Update("is_friend", true).Error; err != nil {
				s.logger.WithError(err).Error("db exception")
				return err
			}
			if err := tx.Model(model.Friend{}).Where("user_id = ? and friend_id = ?",
				addFriendApplication.FriendID, addFriendApplication.ApplicantID).
				Update("is_friend", true).Error; err != nil {
				s.logger.WithError(err).Error("db exception")
				return err
			}
			if err := s.sendTextMsg(addFriendApplication.FriendID, addFriendApplication.ApplicantID,
				AddFriendSuccessTextMsgContent); err != nil {
				return err
			}
		}

		// 通知对方和自己的其他端有好友申请改变
		_, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
			UserIDS: []uint64{addFriendApplication.FriendID, addFriendApplication.ApplicantID},
			EventMsg: &msg.EventMsg{
				AddFriendApplicationChange: &msg.AddFriendApplicationChangeEventMsg{
					AddFriendApplicationID: addFriendApplication.ID,
				},
			},
		})
		return err
	}); err != nil {
		s.logger.WithError(err).Error("transaction exception")
		return nil, err
	}

	// 响应
	return &UpdateAddFriendApplicationRsp{AddFriendApplication: &AddFriendApplication{
		AddFriendApplicationID: addFriendApplication.ID,
		ApplicantID:            addFriendApplication.ApplicantID,
		FriendID:               addFriendApplication.FriendID,
		ApplicationMsg:         addFriendApplication.ApplicationMsg,
		FriendReply:            addFriendApplication.FriendReply,
		Status:                 AddFriendApplicationStatus(addFriendApplication.Status),
		ApplicationTime:        addFriendApplication.ApplicationTime,
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

// 更新添加好友申请请求检查，会有副作用，会修改addFriendApplication参数的值
func (s *Service) updateAddFriendApplicationReqCheck(addFriendApplication *model.AddFriendApplication,
	req *UpdateAddFriendApplicationReq) (column string, value interface{}, err error) {
	// 是不是申请的拥有者
	if addFriendApplication.FriendID != req.UserID && addFriendApplication.ApplicantID != req.UserID {
		return "", nil, common.ErrCodeForbidden
	}

	// 判断申请状态是否可以修改
	if addFriendApplication.Status != uint8(AddFriendApplicationStatusWaitConfirm) {
		return "", nil, ErrCodeInvalidParameterApplicationIsEnd
	}

	// 修改申请状态
	if req.Action.ApplicationMsg != "" {
		// 必须是申请者
		if req.UserID != addFriendApplication.ApplicantID {
			return "", nil, common.ErrCodeForbidden
		}

		column = "application_msg"
		value = req.Action.ApplicationMsg
		addFriendApplication.ApplicationMsg = req.Action.ApplicationMsg
	} else if req.Action.FriendReply != "" {
		// 必须是好友
		if req.UserID != addFriendApplication.FriendID {
			return "", nil, common.ErrCodeForbidden
		}

		column = "friend_reply"
		value = req.Action.FriendReply
		addFriendApplication.FriendReply = req.Action.FriendReply
	} else if req.Action.Accept {
		// 必须是好友
		if req.UserID != addFriendApplication.FriendID {
			return "", nil, common.ErrCodeForbidden
		}

		column = "status"
		value = AddFriendApplicationStatusAccept
		addFriendApplication.Status = uint8(AddFriendApplicationStatusAccept)
	} else if req.Action.Reject {
		// 必须是好友
		if req.UserID != addFriendApplication.FriendID {
			return "", nil, common.ErrCodeForbidden
		}

		column = "status"
		value = AddFriendApplicationStatusReject
		addFriendApplication.Status = uint8(AddFriendApplicationStatusReject)
	} else {
		return "", nil, common.ErrCodeInvalidParameter
	}

	return column, value, nil
}
