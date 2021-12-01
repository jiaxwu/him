package model

// Friend 好友
type Friend struct {
	ID          uint64
	UserID      uint64 `gorm:"not null; uniqueIndex:uk_user_id_friend_id"` // 用户编号
	FriendID    uint64 `gorm:"not null; uniqueIndex:uk_user_id_friend_id"` // 朋友的编号
	Remark      string `gorm:"not null; size:20"`                          // 备注
	Description string `gorm:"not null; size:50"`                          // 描述
	IsDisturb   bool   `gorm:"not null; type:tinyint(1) unsigned"`         // 是否免打扰
	IsBlacklist bool   `gorm:"not null; type:tinyint(1) unsigned"`         // 是否黑名单
	IsTop       bool   `gorm:"not null; type:tinyint(1) unsigned"`         // 是否置顶
	CreatedAt   uint64 `gorm:"not null; index"`
	UpdatedAt   uint64 `gorm:"not null; index"`
}

// AddFriendApplication 添加好友申请
type AddFriendApplication struct {
	ID              uint64
	ApplicantID     uint64 `gorm:"not null; index"`   // 申请者用户编号
	FriendID        uint64 `gorm:"not null; index"`   // 好友编号
	ApplicationMsg  string `gorm:"not null; size:50"` // 申请消息
	FriendReply     string `gorm:"not null; size:50"` // 好友回复
	Status          uint8  `gorm:"not null"`          // 申请状态
	ApplicationTime uint64 `gorm:"not null; index"`   // 申请时间
	CreatedAt       uint64 `gorm:"not null; index"`
	UpdatedAt       uint64 `gorm:"not null; index"`
}
