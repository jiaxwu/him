package conf

import (
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"github.com/sirupsen/logrus"
	"him/conf"
	"him/service/mq"
)

// NewLoginEventProducer 创建登录事件生产者
func NewLoginEventProducer(config *conf.Config, logger *logrus.Logger) rocketmq.Producer {
	nameSrvAddr, err := primitive.NewNamesrvAddr(config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		logger.Fatal(err)
	}
	p, err := rocketmq.NewProducer(
		producer.WithNameServer(nameSrvAddr),
		producer.WithRetry(2),
		producer.WithGroupName(string(mq.LoginEventProducerGroupName)),
	)
	if err != nil {
		logger.Fatal(err)
	}
	if err := p.Start(); err != nil {
		logger.Fatal(err)
	}
	return p
}
