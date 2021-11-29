package auth

import (
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"github.com/sirupsen/logrus"
	"him/conf"
)

// NewAuthEventProducer 创建授权认证事件生产者
func NewAuthEventProducer(config *conf.Config, logger *logrus.Logger) rocketmq.Producer {
	nameSrvAddr, err := primitive.NewNamesrvAddr(config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		logger.Fatal(err)
	}
	p, err := rocketmq.NewProducer(
		producer.WithNameServer(nameSrvAddr),
		producer.WithRetry(2),
		producer.WithGroupName(AuthEventProducerGroupName),
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
	// AuthEventProducerGroupName 登录事件生产者群名
	AuthEventProducerGroupName string = "AuthEventProducer"
	// AuthEventConsumerGroupName 登录事件消费者群名
	AuthEventConsumerGroupName string = "AuthEventConsumer"
)

type LoginEvent struct {
	UserID    uint64    `json:"UserID"`    // 用户编号
	Terminal  Terminal  `json:"Terminal"`  // 终端
	LoginType LoginType `json:"Type"`      // 登录类型
	LoginTime uint64    `json:"LoginTime"` // 登录时间
}

type LogoutEvent struct {
	UserID     uint64   `json:"UserID"`     // 用户编号
	Terminal   Terminal `json:"Terminal"`   // 终端
	LogoutTime uint64   `json:"LogoutTime"` // 退出登录时间
}

const (
	LoginEventTag  string = "LoginEvent"  // 登录事件
	LogoutEventTag string = "LogoutEvent" // 退出登录事件
)
