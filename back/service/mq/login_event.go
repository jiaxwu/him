package mq

import "him/service/service/login/model"

const (
	// LoginEventProducerGroupName 登录事件生产者群名
	LoginEventProducerGroupName GroupName = "LoginEventProducer"
	// LoginEventConsumerGroupName 登录事件消费者群名
	LoginEventConsumerGroupName GroupName = "LoginEventConsumer"
)

type LoginEvent struct {
	UserID    uint64          `json:"userID"`    // 用户编号
	LoginType model.LoginType `json:"type"`      // 登录类型
	LoginTime uint64          `json:"loginTime"` // 登录时间
}

type LogoutEvent struct {
	UserID     uint64 `json:"userID"`     // 用户编号
	LogoutTime uint64 `json:"logoutTime"` // 退出登录时间
}

const (
	TagLoginEvent  Tag = "LoginEvent"  // 登录事件
	TagLogoutEvent Tag = "LogoutEvent" // 退出登录事件
)
