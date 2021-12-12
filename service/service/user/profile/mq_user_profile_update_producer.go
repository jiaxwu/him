package profile

import (
	"github.com/Shopify/sarama"
	"github.com/jiaxwu/him/conf"
	"github.com/sirupsen/logrus"
)

// NewUserProfileUpdateEventProducer 创建用户信息更新事件生产者
func NewUserProfileUpdateEventProducer(config *conf.Config, logger *logrus.Logger) sarama.AsyncProducer {
	producerConfig := sarama.NewConfig()
	producer, err := sarama.NewAsyncProducer(config.Kafka.Addrs, producerConfig)
	if err != nil {
		logger.WithError(err).Fatal("init kafka fail")
	}
	return producer
}

// UserProfileUpdateEvent 用户信息更新事件
type UserProfileUpdateEvent struct {
	UserID     uint64              `json:"UserID"`     // 用户编号
	Action     UpdateProfileAction `json:"Action"`     // 更新行为
	UpdateTime uint64              `json:"UpdateTime"` // 更新时间
}

const UserProfileUpdateEventTopic = "UserProfileUpdateEventTopic" // 更新用户信息事件主题
