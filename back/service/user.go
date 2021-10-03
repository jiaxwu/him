package service

import (
	"context"
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/go-basic/uuid"
	"github.com/go-redis/redis/v8"
	"google.golang.org/protobuf/proto"
	"gorm.io/gorm"
	"time"
)

type UserService struct {
	db  *gorm.DB
	rdb *redis.Client
}

func NewUserService() *UserService {
	return &UserService{
		db:  db.NewDB(),
		rdb: db.NewRDB(),
	}
}

// Auth 对token进行校验，返回userID，和terminal
func (s *UserService) Auth(token string) (*pkt.TokenSession, error) {
	key := s.AuthTokenRedisKey(token)

	res, err := s.rdb.Get(context.Background(), key).Bytes()
	if err != nil {
		return nil, err
	}

	var tokenSession pkt.TokenSession
	err = proto.Unmarshal(res, &tokenSession)
	if err != nil {
		return nil, err
	}

	return &tokenSession, nil
}

// Login 登录，登录后返回一个token表示登录态
func (s *UserService) Login(username, password, terminal string) (string, error) {
	var user db.User
	err := s.db.Where("username = ?", username).Take(&user).Error
	if err != nil {
		return "", err
	}

	tokenSession := pkt.TokenSession{
		UserId:   user.ID,
		Terminal: terminal,
	}
	bytes, err := proto.Marshal(&tokenSession)
	if err != nil {
		return "", err
	}

	token := uuid.New()
	err = s.rdb.Set(context.Background(), s.AuthTokenRedisKey(token), bytes, time.Hour*24).Err()
	if err != nil {
		return "", err
	}

	return token, nil
}

// AuthTokenRedisKey token在Redis里的key
func (*UserService) AuthTokenRedisKey(token string) string {
	return fmt.Sprintf("auth:token:%s", token)
}
