package common

// UserType 用户类型
type UserType uint8

const (
	UserTypePlayer UserType = 1 // 玩家
)

// Session 会话
type Session struct {
	UserID   uint64   `json:"UserID"`
	UserType UserType `json:"UserType"`
}
