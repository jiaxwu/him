package transfer

import (
	"context"
	"encoding/json"
	"github.com/Shopify/sarama"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/service/msg"
)

// SendMsgConsumer 发送消息消费者
type SendMsgConsumer struct {
	rdb             *redis.Client
	logger          *logrus.Logger
	db              *gorm.DB
	pushMsgProducer sarama.AsyncProducer
}

// NewSendMsgConsumer 创建发送消息消费者
func NewSendMsgConsumer(pushMsgProducer sarama.AsyncProducer, config *conf.Config, logger *logrus.Logger,
	rdb *redis.Client, db *gorm.DB) *SendMsgConsumer {
	consumerConfig := sarama.NewConfig()
	consumerConfig.Consumer.Return.Errors = false
	consumerConfig.Consumer.Offsets.Initial = sarama.OffsetNewest
	client, err := sarama.NewConsumerGroup(config.Kafka.Addrs, MQSendMsgConsumerGroupID, consumerConfig)
	if err != nil {
		logger.WithField("err", err).Fatal("init send msg consumer fail")
	}

	consumer := SendMsgConsumer{
		rdb:             rdb,
		logger:          logger,
		db:              db,
		pushMsgProducer: pushMsgProducer,
	}
	go func() {
		var err error
		for {
			if err = client.Consume(context.Background(), []string{msg.SendMsgTopic}, &consumer); err != nil {
				break
			}
		}
		logger.WithField("err", err).Error("send msg consumer exception")
		defer client.Close()
	}()
	return &consumer
}

// ConsumeClaim 对消息进行入库处理,并进行推送
func (c *SendMsgConsumer) ConsumeClaim(session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	for message := range claim.Messages() {
		// 解析消息
		var protoMsg msg.Msg
		if err := json.Unmarshal(message.Value, &protoMsg); err != nil {
			c.logger.WithField("err", err).Fatal("unmarshal msg fail")
		}

		// 为消息生成seq
		seq, err := c.genSeq(protoMsg.UserID)
		if err != nil {
			c.logger.WithField("err", err).Fatal("gen seq exception")
		}

		// 把消息插入数据库
		protoMsg.Seq = seq
		protoMsgBytes, _ := json.Marshal(&protoMsg)
		offlineMsg := model.OfflineMsg{
			UserID: protoMsg.UserID,
			Seq:    seq,
			Msg:    protoMsgBytes,
		}
		if err := c.db.Create(&offlineMsg).Error; err != nil {
			c.logger.WithField("err", err).Fatal("insert msg into db exception")
		}

		// 把消息发送到mq
		c.pushMsgProducer.Input() <- &sarama.ProducerMessage{
			Topic: msg.PushMsgTopic,
			Key:   sarama.ByteEncoder(message.Key),
			Value: sarama.ByteEncoder(protoMsgBytes),
		}

		session.MarkMessage(message, "")
	}
	return nil
}

// 产生序列号
func (c *SendMsgConsumer) genSeq(userID uint64) (uint64, error) {
	seq, err := c.rdb.Incr(context.Background(), msg.SeqKey(userID)).Result()
	if err != nil {
		return 0, err
	}
	return uint64(seq), nil
}

func (c *SendMsgConsumer) Setup(sarama.ConsumerGroupSession) error {
	return nil
}

func (c *SendMsgConsumer) Cleanup(sarama.ConsumerGroupSession) error {
	return nil
}
