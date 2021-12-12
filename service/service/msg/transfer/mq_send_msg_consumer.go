package transfer

import (
	"context"
	"encoding/json"
	"github.com/Shopify/sarama"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/service/service/msg"
)

// SendMsgConsumer 发送消息消费者
type SendMsgConsumer struct {
	rdb                       *redis.Client
	logger                    *logrus.Logger
	pushMsgProducer           sarama.AsyncProducer
	mongoOfflineMsgCollection *mongo.Collection
}

// NewSendMsgConsumer 创建发送消息消费者
func NewSendMsgConsumer(pushMsgProducer sarama.AsyncProducer, mongoOfflineMsgCollection *mongo.Collection,
	config *conf.Config, logger *logrus.Logger, rdb *redis.Client) *SendMsgConsumer {
	consumerConfig := sarama.NewConfig()
	consumerConfig.Consumer.Return.Errors = false
	consumerConfig.Consumer.Offsets.Initial = sarama.OffsetNewest
	client, err := sarama.NewConsumerGroup(config.Kafka.Addrs, MQSendMsgConsumerGroupID, consumerConfig)
	if err != nil {
		logger.WithField("err", err).Fatal("init send msg consumer fail")
	}

	consumer := SendMsgConsumer{
		rdb:                       rdb,
		logger:                    logger,
		pushMsgProducer:           pushMsgProducer,
		mongoOfflineMsgCollection: mongoOfflineMsgCollection,
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
		if _, err := c.mongoOfflineMsgCollection.InsertOne(context.Background(), &protoMsg); err != nil &&
			!mongo.IsDuplicateKeyError(err) {
			c.logger.WithField("err", err).Fatal("insert msg into mongodb exception")
		}

		// 把消息发送到mq
		protoMsgBytes, _ := json.Marshal(&protoMsg)
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
