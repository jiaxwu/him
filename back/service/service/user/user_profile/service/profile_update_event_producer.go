package service

import (
	"context"
	"encoding/json"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/apache/rocketmq-client-go/v2/producer"
	"him/service/mq"
)

// 发送用户信息更新事件
func (s *UserProfileService) sendProfileUpdateEvent(event *mq.UpdateUserProfileEvent) {
	body, _ := json.Marshal(event)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagUpdateUserProfileEvent))
	s.sendEventMessage(message)
}

// sendEventMessage 发送事件消息
func (s *UserProfileService) sendEventMessage(message *primitive.Message) {
	resCB := func(ctx context.Context, result *primitive.SendResult, err error) {
		s.logger.WithField("res", result).Info("send message success")
	}
	if err := s.updateUserProfileEventProducer.SendAsync(context.Background(), resCB, message); err != nil {
		s.logger.WithField("err", err).Error("consumer message exception")
	}
}

// initUpdateUserProfileEventProducer 初始化用户个人信息更新事件生产者
func (s *UserProfileService) initUpdateUserProfileEventProducer() {
	nameSrvAddr, err := primitive.NewNamesrvAddr(s.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		s.logger.Fatal(err)
	}
	p, err := rocketmq.NewProducer(
		producer.WithNameServer(nameSrvAddr),
		producer.WithRetry(2),
		producer.WithGroupName(mq.UpdateUserProfileEventProducerGroupName),
	)
	if err != nil {
		s.logger.Fatal(err)
	}
	if err := p.Start(); err != nil {
		s.logger.Fatal(err)
	}
	s.updateUserProfileEventProducer = p
}
