package profile

import (
	"context"
	"errors"
	"fmt"
	"github.com/Shopify/sarama"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/jiaxwu/him/common/bytes"
	httpHeaderKey "github.com/jiaxwu/him/common/constant/http/header/key"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/model"
	"github.com/jiaxwu/him/service/common"
	"github.com/sirupsen/logrus"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
	"regexp"
	"strings"
	"time"
)

type Service struct {
	db                             *gorm.DB
	validate                       *validator.Validate
	logger                         *logrus.Logger
	config                         *conf.Config
	userAvatarBucketOSSClient      *cos.Client
	userProfileUpdateEventProducer sarama.AsyncProducer
}

func NewService(userAvatarBucketOSSClient *cos.Client, userProfileUpdateEventProducer sarama.AsyncProducer,
	db *gorm.DB, validate *validator.Validate, logger *logrus.Logger, config *conf.Config) *Service {
	return &Service{
		db:                             db,
		validate:                       validate,
		logger:                         logger,
		config:                         config,
		userAvatarBucketOSSClient:      userAvatarBucketOSSClient,
		userProfileUpdateEventProducer: userProfileUpdateEventProducer,
	}
}

// GetUserProfile 获取用户信息
func (s *Service) GetUserProfile(req *GetUserProfileReq) (*GetUserProfileRsp, error) {
	var userProfile model.UserProfile
	err := s.db.Where("user_id = ?", req.UserID).Take(&userProfile).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 如果查询不到用户信息，先进行初始化
	var rsp GetUserProfileRsp
	if errors.Is(err, gorm.ErrRecordNotFound) {
		userProfile, err := s.initUserProfile(req.UserID)
		if err != nil {
			return nil, err
		}
		rsp.UserProfile = userProfile
	} else
	// 如果查询得到直接返回
	{
		rsp.UserProfile = &UserProfile{
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
func (s *Service) initUserProfile(userID uint64) (*UserProfile, error) {
	// 判断用户是否存在
	var count int64
	if err := s.db.Model(&model.User{}).Where("id = ?", userID).Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	if count < 1 {
		return nil, ErrCodeNotFoundUser
	}

	// 判断是否已经初始化了
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ?", userID).Count(&count).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 用户已经初始化则直接查询返回
	var userProfile model.UserProfile
	if count > 0 {
		if err := s.db.Where("user_id = ?", userID).Take(&userProfile).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, err
		}
	} else
	// 否则创建用户信息
	{
		userProfile.UserID = userID
		userProfile.NickName = GenNickName()
		userProfile.Username = fmt.Sprintf("him_%s", strings.ToLower(gofakeit.LetterN(20)))
		if err := s.db.Create(&userProfile).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, err
		}
	}

	return &UserProfile{
		UserID:         userProfile.UserID,
		Username:       userProfile.Username,
		NickName:       userProfile.NickName,
		Avatar:         userProfile.Avatar,
		LastOnLineTime: userProfile.LastOnLineTime,
	}, nil
}

// UpdateProfile 更新个人信息
func (s *Service) UpdateProfile(req *UpdateProfileReq) (*UpdateProfileRsp, error) {
	// 参数校验
	var (
		column string
		value  interface{}
	)
	if req.Action.Avatar != "" {
		if len(req.Action.Avatar) > 200 {
			return nil, ErrCodeInvalidParameterAvatarLength
		}
		column = "avatar"
		value = req.Action.Avatar
	} else if req.Action.Username != "" {
		if err := s.checkUsername(req.Action.Username); err != nil {
			return nil, err
		}
		var count int64
		if err := s.db.Model(&model.UserProfile{}).Where("username = ?", req.Action.Username).
			Count(&count).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, err
		}
		if count > 0 {
			return nil, ErrCodeExistsUsername
		}
		column = "username"
		value = req.Action.Username
	} else if req.Action.Gender != nil {
		if *req.Action.Gender < GenderUnknown || *req.Action.Gender > GenderFemale {
			return nil, ErrCodeInvalidParameterGender
		}
		column = "gender"
		value = req.Action.Gender
	} else if req.Action.NickName != "" {
		if len(req.Action.NickName) < 2 || len(req.Action.NickName) > 10 {
			return nil, ErrCodeInvalidParameterNickNameLength
		}
		column = "nick_name"
		value = req.Action.NickName
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 更新参数
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ?", req.UserID).
		Update(column, value).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 发送用户信息更新事件
	s.sendUserProfileUpdateEvent(&UserProfileUpdateEvent{
		UserID:     req.UserID,
		Action:     req.Action,
		UpdateTime: uint64(time.Now().Unix()),
	})
	return &UpdateProfileRsp{}, nil
}

// 检查用户名
func (s *Service) checkUsername(username string) error {
	// 用户名必须由组成 [0-9a-zA-Z_] 字符集组成
	if !UsernameCharSetRegexp.MatchString(username) {
		return ErrCodeInvalidParameterUsername
	}

	// 不能为纯数字
	isPureDigitRegexp := fmt.Sprintf(`\d{%d}`, len(username))
	if match, _ := regexp.MatchString(isPureDigitRegexp, username); match {
		return ErrCodeInvalidParameterUsername
	}

	return nil
}

// UploadAvatar 上传头像
func (s *Service) UploadAvatar(req *UploadAvatarReq) (*UploadAvatarRsp, error) {
	// 头像不能为空
	if req.Avatar == nil {
		return nil, ErrCodeInvalidParameterAvatarEmpty
	}

	// 用户头像最大1MB
	if req.Avatar.Size > MaxUserAvatarSize {
		return nil, ErrCodeInvalidParameterAvatarSize
	}

	// 检查头像类型
	contentType := req.Avatar.Header.Get(httpHeaderKey.ContentType)
	if UserAvatarContentTypeToImageFormatMap[contentType] == "" {
		return nil, ErrCodeInvalidParameterAvatarContentType
	}

	// 上传头像
	avatar, err := req.Avatar.Open()
	if err != nil {
		s.logger.WithField("err", err).Error("can not open file")
		return nil, ErrCodeCanNotOpenFile
	}
	objectName := gofakeit.UUID()
	if _, err = s.userAvatarBucketOSSClient.Object.Put(context.Background(), objectName, avatar, &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: contentType,
		},
	}); err != nil {
		s.logger.WithField("err", err).Error("put object to cos exception")
		return nil, err
	}

	return &UploadAvatarRsp{
		Avatar: UserAvatarBucketURL + objectName,
	}, nil
}

// 发送用户信息更新事件
func (s *Service) sendUserProfileUpdateEvent(event *UserProfileUpdateEvent) {
	s.userProfileUpdateEventProducer.Input() <- &sarama.ProducerMessage{
		Topic: UserProfileUpdateEventTopic,
		Key:   sarama.ByteEncoder(bytes.Uint64ToBytes(event.UserID)),
		Value: sarama.ByteEncoder(jsons.MarshalToBytes(event)),
	}
}
