package sender

import (
	"encoding/binary"
	"encoding/json"
	"github.com/Shopify/sarama"
	"him/service/service/msg"
	"time"
)

// Service 消息发送者
type Service struct {
	sendMsgProducer sarama.SyncProducer
	idGenerator     *msg.IDGenerator
}

func NewService(sendMsgProducer sarama.SyncProducer, idGenerator *msg.IDGenerator) *Service {
	return &Service{
		sendMsgProducer: sendMsgProducer,
		idGenerator:     idGenerator,
	}
}

// SendMsgs 发送消息到消息队列
func (s *Service) SendMsgs(req *SendMsgsReq) (*SendMsgsRsp, error) {
	msgs := req.Msgs
	for i := 0; i < len(msgs); i++ {
		msgBytes, _ := json.Marshal(msgs[i])
		producerMsg := sarama.ProducerMessage{
			Topic: msg.SendMsgTopic,
			Key:   sarama.ByteEncoder(s.uint64ToBytes(msgs[i].UserID)),
			Value: sarama.ByteEncoder(msgBytes),
		}
		if _, _, err := s.sendMsgProducer.SendMessage(&producerMsg); err != nil {
			return nil, err
		}
	}
	return &SendMsgsRsp{}, nil
}

// SendTipMsg 发送tip消息
func (s *Service) SendTipMsg(req *SendTipMsgReq) (*SendTipMsgRsp, error) {
	msgs := make([]*msg.Msg, 0, len(req.UserIDS))
	now := uint64(time.Now().Unix())
	msgID := s.idGenerator.GenMsgID()
	sysSender := &msg.Sender{
		Type: msg.SenderTypeSys,
	}
	content := msg.Content{
		TipMsg: req.TipMsg,
	}

	// 发送
	for _, userID := range req.UserIDS {
		msgs = append(msgs, &msg.Msg{
			UserID:      userID,
			MsgID:       msgID,
			Sender:      sysSender,
			Receiver:    req.Receiver,
			SendTime:    now,
			ArrivalTime: now,
			Content:     &content,
		})
	}
	if _, err := s.SendMsgs(&SendMsgsReq{Msgs: msgs}); err != nil {
		return nil, err
	}
	return &SendTipMsgRsp{}, nil
}

// SendEventMsg 发送事件消息
func (s *Service) SendEventMsg(req *SendEventMsgReq) (*SendEventMsgRsp, error) {
	msgs := make([]*msg.Msg, 0, len(req.UserIDS))
	now := uint64(time.Now().Unix())
	msgID := s.idGenerator.GenMsgID()
	sysSender := &msg.Sender{
		Type: msg.SenderTypeSys,
	}
	content := msg.Content{
		EventMsg: req.EventMsg,
	}

	// 发送
	for _, userID := range req.UserIDS {
		msgs = append(msgs, &msg.Msg{
			UserID: userID,
			MsgID:  msgID,
			Sender: sysSender,
			Receiver: &msg.Receiver{
				Type:       msg.ReceiverTypeUser,
				ReceiverID: userID,
			},
			SendTime:    now,
			ArrivalTime: now,
			Content:     &content,
		})
	}
	if _, err := s.SendMsgs(&SendMsgsReq{Msgs: msgs}); err != nil {
		return nil, err
	}
	return &SendEventMsgRsp{}, nil
}

// uint64转bytes
func (s *Service) uint64ToBytes(n uint64) []byte {
	bytes := make([]byte, 8)
	binary.BigEndian.PutUint64(bytes, n)
	return bytes
}
