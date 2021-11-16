package service

import (
	"context"
	"encoding/json"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"him/service/mq"
)

// sendLoginEvent 发送登录事件
func (s *LoginService) sendLoginEvent(loginEvent *mq.LoginEvent) {
	body, _ := json.Marshal(loginEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagLoginEvent))
	s.sendEventMessage(message)
}

// sendLogoutEvent 发送退出登录事件
func (s *LoginService) sendLogoutEvent(logoutEvent *mq.LogoutEvent) {
	body, _ := json.Marshal(logoutEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagLogoutEvent))
	s.sendEventMessage(message)
}

// sendEventMessage 发送事件消息
func (s *LoginService) sendEventMessage(message *primitive.Message) {
	resCB := func(ctx context.Context, result *primitive.SendResult, err error) {
		s.logger.WithField("res", result).Info("send message success")
	}
	if err := s.loginEventProducer.SendAsync(context.Background(), resCB, message); err != nil {
		s.logger.WithField("err", err).Error("consumer message exception")
	}
}

// initLoginEventProducer 初始化登录事件生产者
func (s *LoginService) initLoginEventProducer() {
	nameSrvAddr, err := primitive.NewNamesrvAddr(s.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		s.logger.Fatal(err)
	}
	p, err := rocketmq.NewProducer(
		producer.WithNameServer(nameSrvAddr),
		producer.WithRetry(2),
		producer.WithGroupName(mq.LoginEventProducerGroupName),
	)
	if err != nil {
		s.logger.Fatal(err)
	}
	if err := p.Start(); err != nil {
		s.logger.Fatal(err)
	}
	s.loginEventProducer = p
}
