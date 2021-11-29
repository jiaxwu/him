package model

// PasswordLogin 密码登录
type PasswordLogin struct {
	ID        uint64
	UserID    uint64 `gorm:"not null; unique"`   // 用户编号
	Password  string `gorm:"not null; size:100"` // 密码
	CreatedAt uint64 `gorm:"not null; index"`
	UpdatedAt uint64 `gorm:"not null; index"`
}

// PhoneLogin 手机号码登录
type PhoneLogin struct {
	ID        uint64
	UserID    uint64 `gorm:"not null; unique"`                // 用户编号
	Phone     string `gorm:"not null; type:char(11); unique"` // 手机号码
	CreatedAt uint64 `gorm:"not null; index"`
	UpdatedAt uint64 `gorm:"not null; index"`
}
