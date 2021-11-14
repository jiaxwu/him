package common

// UserType 用户类型
type UserType uint8

const (
	UserTypePlayer UserType = 1 // 玩家
)

// Session 会话
type Session interface {
	UserID() uint64
	UserType() UserType
}
