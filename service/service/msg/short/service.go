package short

import (
	"context"
	"errors"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"gorm.io/gorm"
	"him/service/service/msg"
)

// Service 消息服务
type Service struct {
	db                        *gorm.DB
	rdb                       *redis.Client
	logger                    *logrus.Logger
	mongoOfflineMsgCollection *mongo.Collection
}

func NewService(mongoOfflineMsgCollection *mongo.Collection, db *gorm.DB, rdb *redis.Client,
	logger *logrus.Logger) *Service {
	return &Service{
		db:                        db,
		rdb:                       rdb,
		logger:                    logger,
		mongoOfflineMsgCollection: mongoOfflineMsgCollection,
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

// GetMsgs 获取消息
func (s *Service) GetMsgs(req *GetMsgsReq) (*GetMsgsRsp, error) {
	if len(req.SeqRanges) == 0 {
		return &GetMsgsRsp{Msgs: []*msg.Msg{}}, nil
	}

	// 参数转换
	seqRanges := make(bson.A, len(req.SeqRanges))
	for i, seqRange := range req.SeqRanges {
		seqRanges[i] = bson.D{{"Seq", bson.D{
			{"$gte", seqRange.StartSeq},
			{"$lte", seqRange.EndSeq},
		}}}
	}
	filter := bson.D{
		{"UserID", req.UserID},
		{"$or", seqRanges},
	}

	// 查询
	find, err := s.mongoOfflineMsgCollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	msgs := make([]*msg.Msg, 0)
	if err := find.All(context.Background(), &msgs); err != nil {
		return nil, err
	}
	return &GetMsgsRsp{Msgs: msgs}, nil
}
