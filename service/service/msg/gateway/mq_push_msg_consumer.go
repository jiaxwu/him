package gateway

import (
	"context"
	"encoding/binary"
	"encoding/json"
	"github.com/Shopify/sarama"
	"github.com/sirupsen/logrus"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/service/service/auth"
	"github.com/jiaxwu/him/service/service/msg"
)

// PushMsgConsumer 推送消息消费者
type PushMsgConsumer struct {
	logger *logrus.Logger
	server *Server
}

// NewPushMsgConsumer 创建推送消息消费者
func NewPushMsgConsumer(config *conf.Config, logger *logrus.Logger, server *Server) *PushMsgConsumer {
	consumerConfig := sarama.NewConfig()
	consumerConfig.Consumer.Return.Errors = false
	consumerConfig.Consumer.Offsets.Initial = sarama.OffsetNewest
	client, err := sarama.NewConsumerGroup(config.Kafka.Addrs, MQPushMsgConsumerGroupID, consumerConfig)
	if err != nil {
		logger.WithField("err", err).Fatal("init push msg consumer fail")
	}

	consumer := PushMsgConsumer{
		logger: logger,
		server: server,
	}
	go func() {
		var err error
		for {
			if err = client.Consume(context.Background(), []string{msg.PushMsgTopic}, &consumer); err != nil {
				break
			}
		}
		logger.WithField("err", err).Error("push msg consumer exception")
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
			c.logger.WithField("err", err).Error("unmarshal msg fail")
			continue
		}

		// 获取用户编号
		userID := binary.BigEndian.Uint64(message.Key)

		// 发送给这个用户的所有终端
		for terminal := range auth.TerminalSet {
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
