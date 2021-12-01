package friend

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/service/sm"
	"strconv"
	"time"
)

type Service struct {
	db                *gorm.DB
	rdb               *redis.Client
	validate          *validator.Validate
	logger            *logrus.Logger
	smService         *sm.Service
	authEventProducer rocketmq.Producer
	config            *conf.Config
}

func NewService(authEventProducer rocketmq.Producer, db *gorm.DB, rdb *redis.Client, validate *validator.Validate,
	logger *logrus.Logger, smService *sm.Service, config *conf.Config) *Service {
	return &Service{
		db:                db,
		rdb:               rdb,
		validate:          validate,
		logger:            logger,
		smService:         smService,
		config:            config,
		authEventProducer: authEventProducer,
	}
}

// todo 好友信息是单向的,只有添加好友之后设置isfriend才可以认为建立了好友关系

// CreateAddFriendApplication 创建添加好友申请
func (s *Service) CreateAddFriendApplication(req *CreateAddFriendApplicationReq) (*CreateAddFriendApplicationRsp, error) {
	// 检查好友是否是自己

	// 检查好友是否已经是好友

	// 检查好友是否存在

	// 检查是否在对方的黑名单中

	// 发起请求

	// 通知

	return rsp, nil
}
