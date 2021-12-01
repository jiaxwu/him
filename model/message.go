package model

// Relationship 关系
type Relationship uint8

const (
	RelationshipFriend  Relationship = 1 // 朋友
	RelationshipBrother Relationship = 2 // 兄弟
	RelationshipSister  Relationship = 3 // 姐妹
	RelationshipLover   Relationship = 4 // 情侣
)


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

// MessageType 消息类型
type MessageType uint8

const (
	MessageTypeSingleChat  MessageType = 1 // 单聊
	MessageTypeNotice      MessageType = 2 // 通知
	MessageTypeChatChannel MessageType = 3 // 聊天频道
	MessageTypeHeartBeat   MessageType = 4 // 心跳
)

// Message 消息
type Message struct {
	ID        uint64
	UserID    uint64      `gorm:"not null; index"`     // 用户编号
	Type      MessageType `gorm:"not null; index"`     // 消息类型
	Content   []byte      `gorm:"not null; type:blob"` // 消息内容
	SendAt    uint64      `gorm:"not null; index"`     // 发送于
	CreatedAt uint64      `gorm:"not null; index"`
	UpdatedAt uint64      `gorm:"not null; index"`
}

// UnAckMessage 未ACK的消息
type UnAckMessage struct {
	ID        uint64
	UserID    uint64 `gorm:"not null; uniqueIndex:uk_user_id_message_id"`        // 用户编号
	MessageID uint64 `gorm:"not null; uniqueIndex:uk_user_id_message_id; index"` // 消息编号
	CreatedAt uint64 `gorm:"not null; index"`
	UpdatedAt uint64 `gorm:"not null; index"`
}
