package model

// ChatChannelType 聊天频道类型
type ChatChannelType uint8

const (
	ChatChannelTypeComprehensive ChatChannelType = 1 // 综合频道
	ChatChannelTypeArea          ChatChannelType = 2 // 地区频道
	ChatChannelTypeTeam          ChatChannelType = 3 // 队伍频道
)

// ChatChannel 聊天频道
type ChatChannel struct {
	ID                 uint64
	Type               ChatChannelType `gorm:"not null; index"`                    // 频道类型
	Name               string          `gorm:"not null; type:varchar(10); unique"` // 频道名
	Subscribers        uint64          `gorm:"not null"`                           // 订阅人数
	IsTemporaryChannel bool            `gorm:"not null; type:tinyint(1) unsigned"` // 是否是临时频道
	CreatedAt          uint64          `gorm:"not null; index"`
	UpdatedAt          uint64          `gorm:"not null; index"`
}

// ChatChannelSubscribe 聊天频道订阅
type ChatChannelSubscribe struct {
	ID            uint64
	UserID        uint64 `gorm:"not null; uniqueIndex:uk_user_id_chat_channel_id"` // 用户编号
	ChatChannelID uint64 `gorm:"not null; uniqueIndex:uk_user_id_chat_channel_id"` // 聊天频道的编号
	SubscribedAt  uint64 `gorm:"not null"`                                         // 订阅时间
	CreatedAt     uint64 `gorm:"not null; index"`
	UpdatedAt     uint64 `gorm:"not null; index"`
}
