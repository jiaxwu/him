package transfer

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/conf/log"
)

// NewPushMsgProducer 创建推送消息生产者
func NewPushMsgProducer(config *conf.Config) sarama.AsyncProducer {
	producerConfig := sarama.NewConfig()
	producer, err := sarama.NewAsyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		log.WithError(err).Fatal("init kafka fail")
	}
	return producer
}
