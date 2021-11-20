package consumer

import (
	"context"
	"encoding/json"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"him/conf"
	"him/service/mq"
	"him/service/service/user/profile/db"
	"strings"
)

type LoginEventConsumer struct {
	config *conf.Config
	logger *logrus.Logger
	db     *gorm.DB
}

func NewLoginEventConsumer(db *gorm.DB, logger *logrus.Logger, config *conf.Config) *LoginEventConsumer {
	loginEventConsumer := &LoginEventConsumer{
		db:     db,
		logger: logger,
		config: config,
	}
	loginEventConsumer.start()
	return loginEventConsumer
}

// 开始消费登录事件
func (c *LoginEventConsumer) start() {
	// 创建消费者
	nameSrvAddr, err := primitive.NewNamesrvAddr(c.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		c.logger.Fatal(err)
	}
	pushConsumer, err := rocketmq.NewPushConsumer(
		consumer.WithNameServer(nameSrvAddr),
		consumer.WithConsumerModel(consumer.Clustering),
		consumer.WithGroupName(string(mq.LoginEventConsumerGroupName)),
	)
	if err != nil {
		c.logger.Fatal(err)
	}

	// 订阅登录事件
	messageSelector := consumer.MessageSelector{
		Type: consumer.TAG,
		Expression: strings.Join([]string{string(mq.TagLoginEvent),
			string(mq.TagLogoutEvent)}, "||"),
	}
	receiveMessageCB := func(ctx context.Context, messages ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		c.consumeLoginEventMessages(messages)
		return consumer.ConsumeSuccess, nil
	}
	if err := pushConsumer.Subscribe(c.config.RocketMQ.Topic, messageSelector, receiveMessageCB); err != nil {
		c.logger.Fatal(err)
	}
	if err := pushConsumer.Start(); err != nil {
		c.logger.Fatal(err)
	}
}

// consumeLoginEventMessages 消费登录事件
func (c *LoginEventConsumer) consumeLoginEventMessages(messages []*primitive.MessageExt) {
	for _, message := range messages {
		switch message.GetTags() {
		case string(mq.TagLoginEvent):
			c.consumeLoginMessage(message)
		case string(mq.TagLogoutEvent):
			c.consumeLogoutMessage(message)
		default:
			c.logger.WithField("im", message).Error("receive an unknown tag im")
		}
	}
}

// consumeLoginMessage 消费登录消息
func (c *LoginEventConsumer) consumeLoginMessage(message *primitive.MessageExt) {
	// 解析登录事件
	var loginEvent mq.LoginEvent
	if err := json.Unmarshal(message.Body, &loginEvent); err != nil {
		c.logger.WithFields(logrus.Fields{
			"err": err,
			"im":  message,
		}).Error("unmarshal im exception")
		return
	}

	// 更新最后一次登录时间
	c.updateLastOnLineTime(loginEvent.UserID, loginEvent.LoginTime)
}

// consumeLogoutMessage 消费退出登录消息
func (c *LoginEventConsumer) consumeLogoutMessage(message *primitive.MessageExt) {
	// 解析退出登录事件
	var logoutEvent mq.LogoutEvent
	if err := json.Unmarshal(message.Body, &logoutEvent); err != nil {
		c.logger.WithFields(logrus.Fields{
			"err": err,
			"im":  message,
		}).Error("unmarshal im exception")
		return
	}

	// 更新最后一次登录时间
	c.updateLastOnLineTime(logoutEvent.UserID, logoutEvent.LogoutTime)
}

// updateLastOnLineTime 更新最后一次登录时间
func (c *LoginEventConsumer) updateLastOnLineTime(userID uint64, lasOnLineTime uint64) {
	if err := c.db.Model(&db.UserProfile{}).Where("user_id = ? and last_on_line_time < ?", userID,
		lasOnLineTime).Update("last_on_line_time", lasOnLineTime).Error; err != nil {
		c.logger.WithField("err", err).Error("db exception")
	}
}
