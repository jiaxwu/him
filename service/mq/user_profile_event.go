package mq

import (
	"github.com/xiaohuashifu/him/service/user/profile/model"
)

const (
	// UserProfileEventProducerGroupName 用户信息事件生产者群名
	UserProfileEventProducerGroupName GroupName = "UserProfileEventProducer"
	// UserProfileEventConsumerGroupName 用户信息事件消费者群名
	UserProfileEventConsumerGroupName GroupName = "UserProfileEventConsumer"
)

// UpdateUserProfileEvent 更新用户信息事件
type UpdateUserProfileEvent struct {
	UserID     uint64                    `json:"userID"`     // 用户编号
	Action     model.UpdateProfileAction `json:"action"`     // 更新行为
	Value      string                    `json:"value"`      // 更新值
	UpdateTime uint64                    `json:"updateTime"` // 更新时间
}

const (
	// TagUpdateUserProfileEvent 更新用户信息事件
	TagUpdateUserProfileEvent Tag = "UpdateUserProfileEvent"
)
