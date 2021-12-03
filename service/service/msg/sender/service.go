package sender

import (
	"encoding/binary"
	"encoding/json"
	"github.com/Shopify/sarama"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"him/service/common"
	"him/service/service/msg"
	"time"
)

type Service struct {
	rdb             *redis.Client
	logger          *logrus.Logger
	sendMsgProducer sarama.SyncProducer
}

func NewService(sendMsgProducer sarama.SyncProducer, rdb *redis.Client, logger *logrus.Logger) *Service {
	return &Service{
		rdb:             rdb,
		logger:          logger,
		sendMsgProducer: sendMsgProducer,
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
	// 对接收者进行检查
	// todo 接收者必须存在,且和sender存在某种关系

	// 获取消息编号
	msgID := s.genMsgID()

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
	if err := s.sendMsgsToMQ(msgs); err != nil {
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

// 发送消息到消息队列
func (s *Service) sendMsgsToMQ(msgs []*msg.Msg) error {
	for i := 0; i < len(msgs); i++ {
		msgBytes, _ := json.Marshal(msgs[i])
		producerMsg := sarama.ProducerMessage{
			Topic: msg.SendMsgTopic,
			Key:   sarama.ByteEncoder(s.uint64ToBytes(msgs[i].UserID)),
			Value: sarama.ByteEncoder(msgBytes),
		}
		if _, _, err := s.sendMsgProducer.SendMessage(&producerMsg); err != nil {
			return err
		}
	}
	return nil
}

// uint64转bytes
func (s *Service) uint64ToBytes(n uint64) []byte {
	bytes := make([]byte, 8)
	binary.BigEndian.PutUint64(bytes, n)
	return bytes
}

// 获取消息编号
func (s *Service) genMsgID() string {
	return gofakeit.UUID()
}
