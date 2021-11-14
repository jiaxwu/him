package model

const (
	// LoginEventProducerGroupName 登录事件生产者群名
	LoginEventProducerGroupName = "ProductLoginEvent"
	// LoginEventConsumerGroupName 登录事件消费者群名
	LoginEventConsumerGroupName = "ConsumerLoginEvent"
)

type LoginEvent struct {
	UserID    uint64    `json:"userID"`    // 用户编号
	LoginType LoginType `json:"type"`      // 登录类型
	LoginTime uint64    `json:"loginTime"` // 登录时间
}

type LogoutEvent struct {
	UserID     uint64 `json:"userID"`     // 用户编号
	LogoutTime uint64 `json:"logoutTime"` // 退出登录时间
}

// LoginEventTag 登录事件
type LoginEventTag string

const (
	LoginEventTagLogin  LoginEventTag = "Login"  // 登录
	LoginEventTagLogout LoginEventTag = "Logout" // 退出登录
)
