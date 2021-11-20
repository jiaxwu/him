package db

// User 用户
type User struct {
	ID           uint64
	Type         uint8  `gorm:"not null; index"` // 用户类型
	RegisteredAt uint64 `gorm:"not null; index"` // 注册时间
	CreatedAt    uint64 `gorm:"not null; index"`
	UpdatedAt    uint64 `gorm:"not null; index"`
}
