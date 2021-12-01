package model

// OfflineMsg 离线消息表
type OfflineMsg struct {
	UserID uint64 `gorm:"primary_key"` // 用户编号
	Seq    uint64 `gorm:"primary_key"` // 序列号
	Msg    []byte `gorm:"not null"`    // 消息
}
