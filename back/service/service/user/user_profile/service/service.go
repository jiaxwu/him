package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/mq"
	"him/service/service/user/user_profile/code"
	"him/service/service/user/user_profile/constant"
	userProfileModel "him/service/service/user/user_profile/model"
	"him/service/service/user/user_profile/util"
	"strings"
	"time"
)

type UserProfileService struct {
	db                        *gorm.DB
	validate                  *validator.Validate
	logger                    *logrus.Logger
	config                    *conf.Config
	userAvatarBucketOSSClient *cos.Client
	userProfileEventProducer  rocketmq.Producer
}

func NewUserProfileService(userAvatarBucketOSSClient *cos.Client, userProfileEventProducer rocketmq.Producer,
	db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config) *UserProfileService {
	return &UserProfileService{
		db:                        db,
		validate:                  validate,
		logger:                    logger,
		config:                    config,
		userAvatarBucketOSSClient: userAvatarBucketOSSClient,
		userProfileEventProducer:  userProfileEventProducer,
	}
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

	// 发送用户信息更新事件
	s.sendProfileUpdateEvent(&mq.UpdateUserProfileEvent{
		UserID:     req.UserID,
		Action:     req.Action,
		Value:      req.Value,
		UpdateTime: uint64(time.Now().Unix()),
	})
	return &userProfileModel.UpdateProfileRsp{}, nil
}

// UploadAvatar 上传头像
func (s *UserProfileService) UploadAvatar(req *userProfileModel.UploadAvatarReq) (*userProfileModel.UploadAvatarRsp,
	common.Error) {
	// 头像不能为空
	if req.Avatar == nil {
		return nil, common.NewError(code.InvalidParameterAvatarEmpty)
	}

	// 用户头像最大1MB
	if req.Avatar.Size > constant.MaxUserAvatarSize {
		return nil, common.NewError(code.InvalidParameterAvatarSize)
	}

	// 检查头像类型
	contentType := req.Avatar.Header.Get("Content-Type")
	if constant.UserAvatarContentTypeToFileTypeMap[contentType] == "" {
		return nil, common.NewError(code.InvalidParameterAvatarContentType)
	}

	// 上传头像
	avatar, err := req.Avatar.Open()
	if err != nil {
		s.logger.WithField("err", err).Error("can not open file")
		return nil, common.NewError(code.CanNotOpenFile)
	}
	objectName := gofakeit.UUID()
	if _, err = s.userAvatarBucketOSSClient.Object.Put(context.Background(), objectName, avatar, &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: contentType,
		},
	}); err != nil {
		s.logger.WithField("err", err).Error("put object to cos exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorOSS, err)
	}

	return &userProfileModel.UploadAvatarRsp{
		Avatar: constant.UserAvatarBucketURL + objectName,
	}, nil
}

// 发送用户信息更新事件
func (s *UserProfileService) sendProfileUpdateEvent(event *mq.UpdateUserProfileEvent) {
	body, _ := json.Marshal(event)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagUpdateUserProfileEvent))
	s.sendEventMessage(message)
}

// sendEventMessage 发送事件消息
func (s *UserProfileService) sendEventMessage(message *primitive.Message) {
	resCB := func(ctx context.Context, result *primitive.SendResult, err error) {
		s.logger.WithField("res", result).Info("send im success")
	}
	if err := s.userProfileEventProducer.SendAsync(context.Background(), resCB, message); err != nil {
		s.logger.WithField("err", err).Error("consumer im exception")
	}
}
