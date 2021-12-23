package user

import (
	"context"
	"errors"
	"fmt"
	"github.com/Shopify/sarama"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/common/bytes"
	httpHeaderKey "github.com/jiaxwu/him/common/constant/http/header/key"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/service/sm"
	"github.com/jiaxwu/him/service/user/model"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
	"regexp"
	"time"
)

type Service struct {
	db                        *gorm.DB
	rdb                       *redis.Client
	validate                  *validator.Validate
	config                    *config.Config
	smService                 *sm.Service
	userAvatarBucketOSSClient *cos.Client
	updateUserEventProducer   sarama.AsyncProducer
}

func NewService(userAvatarBucketOSSClient *cos.Client, updateUserEventProducer sarama.AsyncProducer, db *gorm.DB,
	validate *validator.Validate, config *config.Config, smService *sm.Service, rdb *redis.Client) *Service {
	return &Service{
		db:                        db,
		rdb:                       rdb,
		validate:                  validate,
		config:                    config,
		userAvatarBucketOSSClient: userAvatarBucketOSSClient,
		updateUserEventProducer:   updateUserEventProducer,
		smService:                 smService,
	}
}

// GetUserInfo 根据id获取用户信息
func (s *Service) GetUserInfo(req *GetUserInfoReq) (*GetUserInfoRsp, error) {
	// 拼接条件
	var condition *gorm.DB
	if req.UserID != 0 {
		condition = s.db.Where("id = ?", req.UserID)
	} else if req.Username != "" {
		condition = s.db.Where("username = ?", req.Username)
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 查询
	var user model.User
	err := condition.Take(&user).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterUserNotExists
	}

	// 转换
	return &GetUserInfoRsp{UserInfo: &UserInfo{
		UserID:       user.ID,
		UserType:     UserType(user.Type),
		Username:     user.Username,
		NickName:     user.NickName,
		Avatar:       UserAvatarBucketURL + user.Avatar,
		Gender:       Gender(user.Gender),
		Phone:        user.Phone,
		Email:        user.Email,
		RegisteredAt: user.RegisteredAt,
	}}, nil
}

// GetUserInfos 获取用户信息
func (s *Service) GetUserInfos(req *GetUserInfosReq) (*GetUserInfosRsp, error) {
	// 拼接条件
	var condition *gorm.DB
	if len(req.UserIDS) != 0 {
		condition = s.db.Where("id in ?", req.UserIDS)
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 查询
	var users []*model.User
	if err := condition.Find(&users).Error; err != nil {
		return nil, err
	}

	// 转换
	userInfos := make([]*UserInfo, 0, len(users))
	for _, user := range users {
		userInfos = append(userInfos, &UserInfo{
			UserID:       user.ID,
			UserType:     UserType(user.Type),
			Username:     user.Username,
			NickName:     user.NickName,
			Avatar:       UserAvatarBucketURL + user.Avatar,
			Gender:       Gender(user.Gender),
			Phone:        user.Phone,
			Email:        user.Email,
			RegisteredAt: user.RegisteredAt,
		})
	}
	return &GetUserInfosRsp{UserInfos: userInfos}, nil
}

// UpdateUserInfo 更新用户信息
func (s *Service) UpdateUserInfo(req *UpdateUserInfoReq) (*UpdateUserInfoRsp, error) {
	// 参数校验
	var (
		column string
		value  any
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
		// 判断用户名是否已经存在
		var user model.User
		err := s.db.Where("username = ?", req.Action.Username).Take(&user).Error
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrCodeInvalidParameterUsernameExists
		}
		column = "username"
		value = req.Action.Username
	} else if req.Action.Gender != nil {
		if !GenderSet()[*req.Action.Gender] {
			return nil, ErrCodeInvalidParameterGender
		}
		column = "gender"
		value = req.Action.Gender
	} else if req.Action.NickName != "" {
		if len(req.Action.NickName) < 1 || len(req.Action.NickName) > 20 {
			return nil, ErrCodeInvalidParameterNickNameLength
		}
		column = "nick_name"
		value = req.Action.NickName
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 更新
	if err := s.db.Model(&model.User{}).Where("id = ?", req.UserID).
		Update(column, value).Error; err != nil {
		return nil, err
	}

	// 发送用户信息更新事件
	s.sendUpdateUserEvent(&UpdateUserEvent{
		UserID:     req.UserID,
		Action:     req.Action,
		UpdateTime: uint64(time.Now().Unix()),
	})

	// 获取新的用户信息
	getUserInfoRsp, err := s.GetUserInfo(&GetUserInfoReq{UserID: req.UserID})
	if err != nil {
		return nil, err
	}
	return &UpdateUserInfoRsp{UserInfo: getUserInfoRsp.UserInfo}, nil
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

	// 上传头像
	avatar, err := req.Avatar.Open()
	if err != nil {
		return nil, ErrCodeCanNotOpenFile
	}
	objectName := gofakeit.UUID()
	if _, err = s.userAvatarBucketOSSClient.Object.Put(context.Background(), objectName, avatar, &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: req.Avatar.Header.Get(httpHeaderKey.ContentType),
		},
	}); err != nil {
		return nil, err
	}

	return &UploadAvatarRsp{
		Avatar: objectName,
	}, nil
}

// 发送用户信息更新事件
func (s *Service) sendUpdateUserEvent(event *UpdateUserEvent) {
	s.updateUserEventProducer.Input() <- &sarama.ProducerMessage{
		Topic: UpdateUserEventTopic,
		Key:   sarama.ByteEncoder(bytes.Uint64ToBytes(event.UserID)),
		Value: sarama.ByteEncoder(jsons.MarshalToBytes(event)),
	}
}
