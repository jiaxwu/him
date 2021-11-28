package conf

import (
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"github.com/sirupsen/logrus"
	"github.com/xiaohuashifu/him/api/authnz/authz/mq"
	"github.com/xiaohuashifu/him/conf"
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
		producer.WithGroupName(mq.AuthzGroup_name[int32(mq.AuthzGroup_AUTHZ_GROUP_PRODUCER)]),
	)
	if err != nil {
		logger.Fatal(err)
	}
	if err := p.Start(); err != nil {
		logger.Fatal(err)
	}
	return p
}
