package common

// UserType 用户类型
type UserType uint8

const (
	UserTypeUser UserType = 1 // 用户
)

// Session 会话
type Session struct {
	UserID   uint64   `json:"user_id"`
	UserType UserType `json:"UserType"`
}
