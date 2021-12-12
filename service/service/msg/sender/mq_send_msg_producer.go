package sender

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/conf"
	"github.com/sirupsen/logrus"
)

// NewSendMsgProducer 创建发送消息生产者
func NewSendMsgProducer(config *conf.Config, logger *logrus.Logger) sarama.SyncProducer {
	producerConfig := sarama.NewConfig()
	producerConfig.Producer.Return.Successes = true
	producerConfig.Producer.RequiredAcks = sarama.WaitForAll
	producer, err := sarama.NewSyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		logger.WithError(err).Fatal("init kafka fail")
	}
	return producer
}
