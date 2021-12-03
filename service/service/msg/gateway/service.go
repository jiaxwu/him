package gateway

import (
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/model"
	"him/service/common"
	"him/service/service/msg"
	"him/service/service/msg/sender"
	"time"
)

type Service struct {
	rdb           *redis.Client
	db            *gorm.DB
	logger        *logrus.Logger
	senderService *sender.Service
	idGenerator   *msg.IDGenerator
}

func NewService(senderService *sender.Service, rdb *redis.Client, logger *logrus.Logger,
	idGenerator *msg.IDGenerator, db *gorm.DB) *Service {
	return &Service{
		rdb:           rdb,
		logger:        logger,
		senderService: senderService,
		idGenerator:   idGenerator,
		db:            db,
	}
}

// SendMsg 发送消息
func (s *Service) SendMsg(req *SendMsgReq) (*SendMsgRsp, error) {
	// 参数校验
	if req.Receiver == nil {
		return nil, common.ErrCodeInvalidParameter
	}

	// 根据对应接收者类型发送
	switch req.Receiver.Type {
	case msg.ReceiverTypeUser:
		return s.sendToUser(req)
	case msg.ReceiverTypeGroup:
		return s.sendToGroup(req)
	default:
		return nil, common.ErrCodeInvalidParameter
	}
}

// 发送给用户
func (s *Service) sendToUser(req *SendMsgReq) (*SendMsgRsp, error) {
	// 接收者和发送者必须是好友
	if req.Sender.Type == msg.SenderTypeUser {
		var count int64
		if err := s.db.Model(model.Friend{}).Where("user_id = ? and friend_id = ? and is_friend = ?",
			req.Sender.SenderID, req.Receiver.ReceiverID, true).Limit(1).Count(&count).Error; err != nil {
			return nil, err
		}
		if count == 0 {
			return nil, ErrCodeInvalidParameterNotIsFriend
		}
	}

	// 获取消息编号
	msgID := s.idGenerator.GenMsgID()

	// 构造消息
	// 如果发送者是用户，那么也要给他本人发送一条
	now := time.Now().Unix()
	var msgs []*msg.Msg
	if req.Sender.Type == msg.SenderTypeUser {
		msgs = append(msgs, &msg.Msg{
			UserID:        req.Sender.SenderID,
			MsgID:         msgID,
			Sender:        req.Sender,
			Receiver:      req.Receiver,
			SendTime:      req.SendTime,
			ArrivalTime:   uint64(now),
			CorrelationID: req.CorrelationID,
			Content:       req.Content,
		})
	}
	msgs = append(msgs, &msg.Msg{
		UserID:        req.Receiver.ReceiverID,
		MsgID:         msgID,
		Sender:        req.Sender,
		Receiver:      req.Receiver,
		SendTime:      req.SendTime,
		ArrivalTime:   uint64(now),
		CorrelationID: req.CorrelationID,
		Content:       req.Content,
	})

	// 发送到mq
	if err := s.senderService.SendMsgs(msgs); err != nil {
		return nil, err
	}

	return &SendMsgRsp{
		CorrelationID: req.CorrelationID,
		MsgID:         msgID,
	}, nil
}

// 发送给群
func (s *Service) sendToGroup(req *SendMsgReq) (*SendMsgRsp, error) {
	panic("未实现")
}
