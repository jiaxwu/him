package profile

import (
	"context"
	"encoding/json"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/consumer"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/model"
	"github.com/jiaxwu/him/service/service/auth"
	"strings"
)

type AuthEventConsumer struct {
	config *conf.Config
	logger *logrus.Logger
	db     *gorm.DB
}

func NewAuthEventConsumer(db *gorm.DB, logger *logrus.Logger, config *conf.Config) *AuthEventConsumer {
	authEventConsumer := &AuthEventConsumer{
		db:     db,
		logger: logger,
		config: config,
	}
	authEventConsumer.start()
	return authEventConsumer
}

// 开始消费授权认证事件
func (c *AuthEventConsumer) start() {
	// 创建消费者
	nameSrvAddr, err := primitive.NewNamesrvAddr(c.config.RocketMQ.NameSrvAddrs...)
	if err != nil {
		c.logger.Fatal(err)
	}
	pushConsumer, err := rocketmq.NewPushConsumer(
		consumer.WithNameServer(nameSrvAddr),
		consumer.WithConsumerModel(consumer.Clustering),
		consumer.WithGroupName(auth.AuthEventConsumerGroupName),
	)
	if err != nil {
		c.logger.Fatal(err)
	}

	// 订阅认证授权事件
	messageSelector := consumer.MessageSelector{
		Type:       consumer.TAG,
		Expression: strings.Join([]string{auth.LoginEventTag, auth.LogoutEventTag}, "||"),
	}
	receiveMessageCB := func(ctx context.Context, messages ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
		c.consumeAuthEventMessages(messages)
		return consumer.ConsumeSuccess, nil
	}
	if err := pushConsumer.Subscribe(c.config.RocketMQ.Topic, messageSelector, receiveMessageCB); err != nil {
		c.logger.Fatal(err)
	}
	if err := pushConsumer.Start(); err != nil {
		c.logger.Fatal(err)
	}
}

// consumeAuthEventMessages 消费认证授权事件
func (c *AuthEventConsumer) consumeAuthEventMessages(messages []*primitive.MessageExt) {
	for _, message := range messages {
		switch message.GetTags() {
		case auth.LoginEventTag:
			c.consumeLoginMessage(message)
		case auth.LogoutEventTag:
			c.consumeLogoutMessage(message)
		default:
			c.logger.WithField("msg", message).Error("receive an unknown tag msg")
		}
	}
}

// consumeLoginMessage 消费登录消息
func (c *AuthEventConsumer) consumeLoginMessage(message *primitive.MessageExt) {
	// 解析登录事件
	var loginEvent auth.LoginEvent
	if err := json.Unmarshal(message.Body, &loginEvent); err != nil {
		c.logger.WithFields(logrus.Fields{
			"err": err,
			"msg":  message,
		}).Error("unmarshal msg exception")
		return
	}

	// 更新最后一次登录时间
	c.updateLastOnLineTime(loginEvent.UserID, loginEvent.LoginTime)
}

// consumeLogoutMessage 消费退出登录消息
func (c *AuthEventConsumer) consumeLogoutMessage(message *primitive.MessageExt) {
	// 解析退出登录事件
	var logoutEvent auth.LogoutEvent
	if err := json.Unmarshal(message.Body, &logoutEvent); err != nil {
		c.logger.WithFields(logrus.Fields{
			"err": err,
			"msg":  message,
		}).Error("unmarshal msg exception")
		return
	}

	// 更新最后一次登录时间
	c.updateLastOnLineTime(logoutEvent.UserID, logoutEvent.LogoutTime)
}

// updateLastOnLineTime 更新最后一次登录时间
func (c *AuthEventConsumer) updateLastOnLineTime(userID uint64, lasOnLineTime uint64) {
	if err := c.db.Model(&model.UserProfile{}).Where("user_id = ? and last_on_line_time < ?", userID,
		lasOnLineTime).Update("last_on_line_time", lasOnLineTime).Error; err != nil {
		c.logger.WithField("err", err).Error("db exception")
	}
}
