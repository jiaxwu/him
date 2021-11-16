package service

import (
	"context"
	"encoding/json"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/sirupsen/logrus"
	"him/model"
	"him/service/mq"
	"strings"
)

// StartConsumeLoginEvent 消费登录事件
func (s *UserProfileService) startConsumeLoginEvent() {
	// 创建消费者
	nameSrvAddr, err := primitive.NewNamesrvAddr(s.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		s.logger.Fatal(err)
	}
	c, err := rocketmq.NewPushConsumer(
		consumer.WithNameServer(nameSrvAddr),
		consumer.WithConsumerModel(consumer.Clustering),
		consumer.WithGroupName(mq.LoginEventConsumerGroupName),
	)
	if err != nil {
		s.logger.Fatal(err)
	}

	// 订阅登录事件
	messageSelector := consumer.MessageSelector{
		Type: consumer.TAG,
		Expression: strings.Join([]string{string(mq.TagLoginEvent),
			string(mq.TagLogoutEvent)}, "||"),
	}
	receiveMessageCB := func(ctx context.Context, messages ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		s.consumeLoginEventMessages(messages)
		return consumer.ConsumeSuccess, nil
	}
	if err := c.Subscribe(s.config.RocketMQ.Topic, messageSelector, receiveMessageCB); err != nil {
		s.logger.Fatal(err)
	}
	if err := c.Start(); err != nil {
		s.logger.Fatal(err)
	}
}

// consumeLoginEventMessages 消费登录事件
func (s *UserProfileService) consumeLoginEventMessages(messages []*primitive.MessageExt) {
	for _, message := range messages {
		switch message.GetTags() {
		case string(mq.TagLoginEvent):
			s.consumeLoginMessage(message)
		case string(mq.TagLogoutEvent):
			s.consumeLogoutMessage(message)
		default:
			s.logger.WithField("message", message).Error("receive an unknown tag message")
		}
	}
}

// consumeLoginMessage 消费登录消息
func (s *UserProfileService) consumeLoginMessage(message *primitive.MessageExt) {
	// 解析登录事件
	var loginEvent mq.LoginEvent
	if err := json.Unmarshal(message.Body, &loginEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err":     err,
			"message": message,
		}).Error("unmarshal message exception")
		return
	}

	// 更新最后一次登录时间
	s.updateLastOnLineTime(loginEvent.UserID, loginEvent.LoginTime)
}

// consumeLogoutMessage 消费退出登录消息
func (s *UserProfileService) consumeLogoutMessage(message *primitive.MessageExt) {
	// 解析退出登录事件
	var logoutEvent mq.LogoutEvent
	if err := json.Unmarshal(message.Body, &logoutEvent); err != nil {
		s.logger.WithFields(logrus.Fields{
			"err":     err,
			"message": message,
		}).Error("unmarshal message exception")
		return
	}

	// 更新最后一次登录时间
	s.updateLastOnLineTime(logoutEvent.UserID, logoutEvent.LogoutTime)
}

// updateLastOnLineTime 更新最后一次登录时间
func (s *UserProfileService) updateLastOnLineTime(userID uint64, lasOnLineTime uint64) {
	if err := s.db.Model(&model.UserProfile{}).Where("user_id = ? and last_on_line_time < ?", userID,
		lasOnLineTime).Update("last_on_line_time", lasOnLineTime).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
	}
}
