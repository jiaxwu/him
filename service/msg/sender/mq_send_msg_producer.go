package sender

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
)

// NewSendMsgProducer 创建发送消息生产者
func NewSendMsgProducer(config *config.Config) sarama.SyncProducer {
	producerConfig := sarama.NewConfig()
	producerConfig.Producer.Return.Successes = true
	producerConfig.Producer.RequiredAcks = sarama.WaitForAll
	producer, err := sarama.NewSyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		log.WithError(err).Fatal("init kafka fail")
	}
	return producer
}
