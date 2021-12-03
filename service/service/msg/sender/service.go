package sender

import (
	"encoding/binary"
	"encoding/json"
	"github.com/Shopify/sarama"
	"him/service/service/msg"
)

// Service 消息发送者
type Service struct {
	sendMsgProducer sarama.SyncProducer
}

func NewService(sendMsgProducer sarama.SyncProducer) *Service {
	return &Service{sendMsgProducer: sendMsgProducer}
}

// SendMsgs 发送消息到消息队列
func (s *Service) SendMsgs(msgs []*msg.Msg) error {
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
