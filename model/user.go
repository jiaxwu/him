package model

// User 用户
type User struct {
	ID           uint64
	Type         uint8  `gorm:"not null; index"` // 用户类型
	RegisteredAt uint64 `gorm:"not null; index"` // 注册时间
	CreatedAt    uint64 `gorm:"not null; index"`
	UpdatedAt    uint64 `gorm:"not null; index"`
}

// UserProfile 用户信息
type UserProfile struct {
	ID             uint64
	UserID         uint64 `gorm:"not null; unique"`          // 用户编号
	Username       string `gorm:"not null; size:30; unique"` // 用户名，可以唯一标识一个用户，但是可以被修改
	NickName       string `gorm:"not null; size:10"`         // 昵称
	Avatar         string `gorm:"not null; size:200"`        // 头像
	Gender         uint8  `gorm:"not null;"`                 // 性别
	LastOnLineTime uint64 `gorm:"not null; index"`           // 最后一次在线的时间
	CreatedAt      uint64 `gorm:"not null; index"`
	UpdatedAt      uint64 `gorm:"not null; index"`
}
