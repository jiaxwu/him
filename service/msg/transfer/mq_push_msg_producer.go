package transfer

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
)

// NewPushMsgProducer 创建推送消息生产者
func NewPushMsgProducer(config *config.Config) sarama.AsyncProducer {
	producerConfig := sarama.NewConfig()
	producer, err := sarama.NewAsyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		log.WithError(err).Fatal("init kafka fail")
	}
	return producer
}
