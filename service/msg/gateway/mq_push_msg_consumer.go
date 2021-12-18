package gateway

import (
	"context"
	"encoding/binary"
	"encoding/json"
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/user"
)

// PushMsgConsumer 推送消息消费者
type PushMsgConsumer struct {
	server *Server
}

// NewPushMsgConsumer 创建推送消息消费者
func NewPushMsgConsumer(config *config.Config, server *Server) *PushMsgConsumer {
	consumerConfig := sarama.NewConfig()
	consumerConfig.Consumer.Return.Errors = false
	consumerConfig.Consumer.Offsets.Initial = sarama.OffsetNewest
	client, err := sarama.NewConsumerGroup(config.Kafka.Addrs, MQPushMsgConsumerGroupID, consumerConfig)
	if err != nil {
		log.WithError(err).Fatal("init push msg consumer fail")
	}

	consumer := PushMsgConsumer{
		server: server,
	}
	go func() {
		var err error
		for {
			if err = client.Consume(context.Background(), []string{msg.PushMsgTopic}, &consumer); err != nil {
				break
			}
		}
		log.WithError(err).Fatal("push msg consumer exception")
		defer client.Close()
	}()
	return &consumer
}

// ConsumeClaim 对消息进行入库处理,并进行推送
func (c *PushMsgConsumer) ConsumeClaim(session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	for message := range claim.Messages() {
		session.MarkMessage(message, "")

		// 解析消息
		var protoMsg msg.Msg
		if err := json.Unmarshal(message.Value, &protoMsg); err != nil {
			log.WithError(err).Error("unmarshal msg fail")
			continue
		}

		// 获取用户编号
		userID := binary.BigEndian.Uint64(message.Key)

		// 发送给这个用户的所有终端
		for terminal := range user.TerminalSet() {
			sessionID := msg.SessionID(userID, terminal)
			if conn := c.server.sessionIDToConn[sessionID]; conn != nil {
				c.server.writeEvent(conn, &msg.Event{
					Msg: &protoMsg,
				})
			}
		}
	}
	return nil
}

func (c *PushMsgConsumer) Setup(sarama.ConsumerGroupSession) error {
	return nil
}

func (c *PushMsgConsumer) Cleanup(sarama.ConsumerGroupSession) error {
	return nil
}
