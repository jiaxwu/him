package model

// User 用户
type User struct {
	ID           uint64
	Type         string `gorm:"not null; size:10"`         // 用户类型
	Username     string `gorm:"not null; size:30; unique"` // 用户名，可以唯一标识一个用户，但是可以被修改
	NickName     string `gorm:"not null; size:20"`         // 昵称
	Avatar       string `gorm:"not null; size:200"`        // 头像
	Gender       uint8  `gorm:"not null"`                  // 性别
	Password     string `gorm:"not null; size:100"`        // 密码
	Phone        string `gorm:"not null; size:15; index"`  // 手机号码
	Email        string `gorm:"not null; size:30; index"`  // 手机号码
	RegisteredAt uint64 `gorm:"not null; index"`           // 注册时间
	CreatedAt    uint64 `gorm:"not null; index"`
	UpdatedAt    uint64 `gorm:"not null; index"`
}
