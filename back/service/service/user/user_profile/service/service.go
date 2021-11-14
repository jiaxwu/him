package service

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	loginModel "him/service/service/login/model"
	userProfileModel "him/service/service/user/user_profile/model"
	"strings"
)

type UserProfileService struct {
	db       *gorm.DB
	validate *validator.Validate
	logger   *logrus.Logger
	config   *conf.Config
}

func NewUserProfileService(db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config,
) *UserProfileService {
	userProfileService := &UserProfileService{
		db:       db,
		validate: validate,
		logger:   logger,
		config:   config,
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

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, common.NewError(common.ErrCodeNotFound)
	}

	return &userProfileModel.GetUserProfileRsp{
		UserProfile: userProfileModel.UserProfile{
			UserID:         userProfile.UserID,
			NickName:       userProfile.NickName,
			Avatar:         userProfile.Avatar,
			LastOnLineTime: userProfile.LastOnLineTime,
		},
	}, nil
}

// InitUserProfile 初始化用户信息
func (s *UserProfileService) InitUserProfile(req *userProfileModel.InitUserProfileReq) (
	*userProfileModel.InitUserProfileRsp, common.Error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, common.WrapError(common.ErrCodeInvalidParameter, err)
	}

	// 判断是否已经初始化了
	var count int64
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ?", req.UserID).
		Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	if count > 0 {
		return nil, common.NewError(common.ErrCodeAlreadyInit)
	}

	// 判断昵称是否重复
	if err := s.db.Model(&model.UserProfile{}).Where("nick_name = ?", req.NickName).
		Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	if count > 0 {
		return nil, common.NewError(common.ErrCodeExistsNickName)
	}

	// 创建用户信息
	userProfile := model.UserProfile{
		UserID:   req.UserID,
		NickName: req.NickName,
	}
	if err := s.db.Create(&userProfile).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorDB, err)
	}

	// 返回
	return &userProfileModel.InitUserProfileRsp{
		UserProfile: userProfileModel.UserProfile{
			UserID:         userProfile.UserID,
			NickName:       userProfile.NickName,
			Avatar:         userProfile.Avatar,
			LastOnLineTime: userProfile.LastOnLineTime,
		},
	}, nil
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
	receiveMsgCB := func(ctx context.Context, msgs ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		s.consumeLoginEventMsgs(msgs)
		return consumer.ConsumeSuccess, nil
	}
	if err := c.Subscribe(s.config.RocketMQ.Topic, messageSelector, receiveMsgCB); err != nil {
		s.logger.Fatal(err)
	}
	if err := c.Start(); err != nil {
		s.logger.Fatal(err)
	}
}

// consumeLoginEventMsgs 消费登录事件
func (s *UserProfileService) consumeLoginEventMsgs(msgs []*primitive.MessageExt) {
	for _, msg := range msgs {
		switch msg.GetTags() {
		case string(loginModel.LoginEventTagLogin):
			s.consumeLoginMsg(msg)
		case string(loginModel.LoginEventTagLogout):
			s.consumeLogoutMsg(msg)
		default:
			s.logger.WithField("msg", msg).Error("receive an unknown tag msg")
		}
	}
}

// consumeLoginMsg 消费登录消息
func (s *UserProfileService) consumeLoginMsg(msg *primitive.MessageExt) {
	// 解析登录事件
	var loginEvent loginModel.LoginEvent
	if err := json.Unmarshal(msg.Body, &loginEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err": err,
			"msg": msg,
		}).Error("unmarshal msg exception")
		return
	}

	// 更新最后一次登录时间
	s.updateLastOnLineTime(loginEvent.UserID, loginEvent.LoginTime)
}

// consumeLogoutMsg 消费退出登录消息
func (s *UserProfileService) consumeLogoutMsg(msg *primitive.MessageExt) {
	// 解析退出登录事件
	var logoutEvent loginModel.LogoutEvent
	if err := json.Unmarshal(msg.Body, &logoutEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err": err,
			"msg": msg,
		}).Error("unmarshal msg exception")
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
