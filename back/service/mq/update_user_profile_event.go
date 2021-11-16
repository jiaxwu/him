package mq

import "him/service/service/user/user_profile/model"

const (
	// UpdateUserProfileEventProducerGroupName 更新用户信息事件生产者群名
	UpdateUserProfileEventProducerGroupName = "ProducerUpdateUserProfileEvent"
	// UpdateUserProfileEventConsumerGroupName 更新用户信息事件消费者群名
	UpdateUserProfileEventConsumerGroupName = "ConsumerUpdateUserProfileEvent"
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
