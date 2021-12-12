package profile

import (
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"github.com/sirupsen/logrus"
	"github.com/jiaxwu/him/conf"
)

// NewUserProfileEventProducer 创建用户个人信息事件生产者
func NewUserProfileEventProducer(config *conf.Config, logger *logrus.Logger) rocketmq.Producer {
	nameSrvAddr, err := primitive.NewNamesrvAddr(config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		logger.Fatal(err)
	}
	p, err := rocketmq.NewProducer(
		producer.WithNameServer(nameSrvAddr),
		producer.WithRetry(2),
		producer.WithGroupName(UserProfileEventProducerGroupName),
	)
	if err != nil {
		logger.Fatal(err)
	}
	if err := p.Start(); err != nil {
		logger.Fatal(err)
	}
	return p
}

const (
	// UserProfileEventProducerGroupName 用户信息事件生产者群名
	UserProfileEventProducerGroupName string = "UserProfileEventProducer"
	// UserProfileEventConsumerGroupName 用户信息事件消费者群名
	UserProfileEventConsumerGroupName string = "UserProfileEventConsumer"
)

// UpdateUserProfileEvent 更新用户信息事件
type UpdateUserProfileEvent struct {
	UserID     uint64              `json:"UserID"`     // 用户编号
	Action     UpdateProfileAction `json:"Action"`     // 更新行为
	Value      string              `json:"Value"`      // 更新值
	UpdateTime uint64              `json:"UpdateTime"` // 更新时间
}

const (
	// TagUpdateUserProfileEvent 更新用户信息事件
	TagUpdateUserProfileEvent string = "UpdateUserProfileEvent"
)
