package short

import (
	"context"
	"errors"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/service/service/msg"
)

// Service 消息服务
type Service struct {
	db     *gorm.DB
	rdb    *redis.Client
	logger *logrus.Logger
}

func NewService(db *gorm.DB, rdb *redis.Client, logger *logrus.Logger) *Service {
	return &Service{
		db:     db,
		rdb:    rdb,
		logger: logger,
	}
}

// GetSeq 获取序列
func (s *Service) GetSeq(req *GetSeqReq) (*GetSeqRsp, error) {
	seqKey := msg.SeqKey(req.UserID)
	lastSeq, err := s.rdb.Get(context.Background(), seqKey).Uint64()
	if err != nil && !errors.Is(err, redis.Nil) {
		return nil, err
	}
	return &GetSeqRsp{LastSeq: lastSeq}, nil
}
