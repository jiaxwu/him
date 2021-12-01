package transfer

import (
	"github.com/Shopify/sarama"
	"github.com/sirupsen/logrus"
	"him/conf"
)

// NewPushMsgProducer 创建推送消息生产者
func NewPushMsgProducer(config *conf.Config, logger *logrus.Logger) sarama.AsyncProducer {
	producerConfig := sarama.NewConfig()
	producer, err := sarama.NewAsyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		logger.WithField("err", err).Fatal("init kafka fail")
	}
	return producer
}
