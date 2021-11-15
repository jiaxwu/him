package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/core/oss"
	"him/model"
	"him/service/common"
	loginModel "him/service/service/login/model"
	"him/service/service/user/user_profile/code"
	userProfileModel "him/service/service/user/user_profile/model"
	"him/service/service/user/user_profile/util"
	"strings"
)

type UserProfileService struct {
	db       *gorm.DB
	validate *validator.Validate
	logger   *logrus.Logger
	config   *conf.Config
	oss      *oss.OSS
}

func NewUserProfileService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
	oss *oss.OSS) *UserProfileService {
	userProfileService := &UserProfileService{
		db:       db,
		validate: validate,
		logger:   logger,
		config:   config,
		oss:      oss,
	}
	userProfileService.startConsumeLoginEvent()
	return userProfileService
}

// GetUserProfile 获取用户信息
func (s *UserProfileService) GetUserProfile(req *userProfileModel.GetUserProfileReq) (
	*userProfileModel.GetUserProfileRsp, common.Error) {
	var userProfile model.UserProfile
	err := s.db.Where("user_id = ?", req.UserID).Take(&userProfile).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	// 如果查询不到用户信息，先进行初始化
	var rsp userProfileModel.GetUserProfileRsp
	if errors.Is(err, gorm.ErrRecordNotFound) {
		userProfile, err := s.initUserProfile(req.UserID)
		if err != nil {
			return nil, err
		}
		rsp.UserProfile = userProfile
	} else
	// 如果查询得到直接返回
	{
		rsp.UserProfile = &userProfileModel.UserProfile{
			UserID:         userProfile.UserID,
			Username:       userProfile.Username,
			NickName:       userProfile.NickName,
			Avatar:         userProfile.Avatar,
			LastOnLineTime: userProfile.LastOnLineTime,
		}
	}

	return &rsp, nil
}

// initUserProfile 初始化用户信息
func (s *UserProfileService) initUserProfile(userID uint64) (*userProfileModel.UserProfile, common.Error) {
	// 判断用户是否存在
	var count int64
	if err := s.db.Model(&model.User{}).Where("id = ?", userID).Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}
	if count < 1 {
		return nil, common.NewError(code.NotFoundUser)
	}

	// 判断是否已经初始化了
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ?", userID).Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	// 用户已经初始化则直接查询返回
	var userProfile model.UserProfile
	if count > 0 {
		if err := s.db.Where("user_id = ?", userID).Take(&userProfile).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
		}
	} else
	// 否则创建用户信息
	{
		userProfile.UserID = userID
		userProfile.NickName = util.GenNickName()
		userProfile.Username = fmt.Sprintf("him_%s", strings.ToLower(gofakeit.LetterN(20)))
		if err := s.db.Create(&userProfile).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
		}
	}

	return &userProfileModel.UserProfile{
		UserID:         userProfile.UserID,
		Username:       userProfile.Username,
		NickName:       userProfile.NickName,
		Avatar:         userProfile.Avatar,
		LastOnLineTime: userProfile.LastOnLineTime,
	}, nil
}

// UpdateProfile 更新个人信息
func (s *UserProfileService) UpdateProfile(req *userProfileModel.UpdateProfileReq) (*userProfileModel.UpdateProfileRsp,
	common.Error) {
	// 判断更新类型是否支持
	column := userProfileModel.UpdateProfileActionToDBColumnMap[req.Action]
	if column == "" {
		return nil, common.NewError(common.ErrCodeInvalidParameter)
	}

	// 参数校验
	if req.Action == userProfileModel.UpdateProfileActionAvatar {
		if len(req.Value) > 200 {
			return nil, common.NewError(code.InvalidParameterAvatarLength)
		}
	}
	if req.Action == userProfileModel.UpdateProfileActionUsername {
		if len(req.Value) < 4 || len(req.Value) > 30 {
			return nil, common.NewError(code.InvalidParameterUsernameLength)
		}
		var count int64
		if err := s.db.Model(&model.UserProfile{}).Where("username = ?", req.Value).
			Count(&count).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
		}
		if count > 0 {
			return nil, common.NewError(code.ExistsUsername)
		}
	}
	if req.Action == userProfileModel.UpdateProfileActionNickName {
		if len(req.Value) < 2 || len(req.Value) > 10 {
			return nil, common.NewError(code.InvalidParameterNickNameLength)
		}
	}

	// 更新参数
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ?", req.UserID).
		Update(column, req.Value).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	// todo 用户信息更新事件
	return &userProfileModel.UpdateProfileRsp{}, nil
}

// StartConsumeLoginEvent 消费登录事件
func (s *UserProfileService) startConsumeLoginEvent() {
	// 创建消费者
	nameSrvAddr, err := primitive.NewNamesrvAddr(s.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		s.logger.Fatal(err)
	}
	c, err := rocketmq.NewPushConsumer(
		consumer.WithNameServer(nameSrvAddr),
		consumer.WithConsumerModel(consumer.Clustering),
		consumer.WithGroupName(loginModel.LoginEventConsumerGroupName),
	)
	if err != nil {
		s.logger.Fatal(err)
	}

	// 订阅登录事件
	messageSelector := consumer.MessageSelector{
		Type: consumer.TAG,
		Expression: strings.Join([]string{string(loginModel.LoginEventTagLogin),
			string(loginModel.LoginEventTagLogout)}, "||"),
	}
	receiveMessageCB := func(ctx context.Context, messages ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		s.consumeLoginEventMessages(messages)
		return consumer.ConsumeSuccess, nil
	}
	if err := c.Subscribe(s.config.RocketMQ.Topic, messageSelector, receiveMessageCB); err != nil {
		s.logger.Fatal(err)
	}
	if err := c.Start(); err != nil {
		s.logger.Fatal(err)
	}
}

// consumeLoginEventMessages 消费登录事件
func (s *UserProfileService) consumeLoginEventMessages(messages []*primitive.MessageExt) {
	for _, message := range messages {
		switch message.GetTags() {
		case string(loginModel.LoginEventTagLogin):
			s.consumeLoginMessage(message)
		case string(loginModel.LoginEventTagLogout):
			s.consumeLogoutMessage(message)
		default:
			s.logger.WithField("message", message).Error("receive an unknown tag message")
		}
	}
}

// consumeLoginMessage 消费登录消息
func (s *UserProfileService) consumeLoginMessage(message *primitive.MessageExt) {
	// 解析登录事件
	var loginEvent loginModel.LoginEvent
	if err := json.Unmarshal(message.Body, &loginEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err":     err,
			"message": message,
		}).Error("unmarshal message exception")
		return
	}

	// 更新最后一次登录时间
	s.updateLastOnLineTime(loginEvent.UserID, loginEvent.LoginTime)
}

// consumeLogoutMessage 消费退出登录消息
func (s *UserProfileService) consumeLogoutMessage(message *primitive.MessageExt) {
	// 解析退出登录事件
	var logoutEvent loginModel.LogoutEvent
	if err := json.Unmarshal(message.Body, &logoutEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err":     err,
			"message": message,
		}).Error("unmarshal message exception")
		return
	}

	// 更新最后一次登录时间
	s.updateLastOnLineTime(logoutEvent.UserID, logoutEvent.LogoutTime)
}

// updateLastOnLineTime 更新最后一次登录时间
func (s *UserProfileService) updateLastOnLineTime(userID uint64, lasOnLineTime uint64) {
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ? and last_on_line_time < ?", userID,
		lasOnLineTime).Update("last_on_line_time", lasOnLineTime).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
	}
}
