package user

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
)

// NewUpdateUserEventProducer 创建用户信息更新事件生产者
func NewUpdateUserEventProducer(config *config.Config) sarama.AsyncProducer {
	producerConfig := sarama.NewConfig()
	producer, err := sarama.NewAsyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		log.WithError(err).Fatal("init kafka fail")
	}
	return producer
}

// UpdateUserEvent 更新用户信息事件
type UpdateUserEvent struct {
	UserID     uint64               `json:"UserID"`     // 用户编号
	Action     UpdateUserInfoAction `json:"Action"`     // 更新行为
	UpdateTime uint64               `json:"UpdateTime"` // 更新时间
}

const UpdateUserEventTopic = "UpdateUserEventTopic" // 更新用户信息事件主题
