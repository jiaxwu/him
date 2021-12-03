package msg

import "him/service/service/auth"

// Msg 消息会持久化存储
// 通过客户端信箱编号同步机制，保证消息可靠性，同时客户端需要保证消息被成功处理
// 消息通过事件推送给客户端
type Msg struct {
	UserID      uint64    `json:"UserID" bson:"UserID"`           // 信箱拥有者用户编号
	Seq         uint64    `json:"Seq" bson:"Seq"`                 // 每人一个，序列号会递增（保证不丢失消息）
	MsgID       string    `json:"MsgID" bson:"MsgID"`             // 消息编号，全局唯一
	Sender      *Sender   `json:"Sender" bson:"Sender"`           // 发送者
	Receiver    *Receiver `json:"Receiver" bson:"Receiver"`       // 接收者
	SendTime    uint64    `json:"SendTime" bson:"SendTime"`       // 发送时间
	ArrivalTime uint64    `json:"ArrivalTime" bson:"ArrivalTime"` // 到达服务器时间
	// 发送者的一个终端的一个请求的唯一标识
	// （避免消息重复，比如消息发送成功，但是用户没有收到响应（断网），
	// 再回来的时候同步消息，通过CorrelationID就可以把发送失败的消息设置为发送成功）
	// 唯一标识可以是 UUID
	CorrelationID string   `json:"CorrelationID" bson:"CorrelationID"`
	Content       *Content `json:"Content" bson:"Content"` // 消息内容
}

// SenderType 发送者类型
type SenderType string

const (
	SenderTypeUser = "User" // 普通用户
	SenderTypeSys  = "Sys"  // 系统
)

// Sender 发送者
type Sender struct {
	Type     SenderType    `json:"Type" bson:"Type"`         // 发送者类型
	SenderID uint64        `json:"SenderID" bson:"SenderID"` // 发送者编号
	Terminal auth.Terminal `json:"Terminal" bson:"Terminal"` // 发送者终端
}

// ReceiverType 接收者类型
type ReceiverType string

const (
	ReceiverTypeUser  = "User"  // 普通用户
	ReceiverTypeGroup = "Group" // 群
)

// Receiver 接收者
type Receiver struct {
	Type       ReceiverType `json:"Type" bson:"Type"`             // 接收者类型
	ReceiverID uint64       `json:"ReceiverID" bson:"ReceiverID"` // 接收者编号
}

// Content 消息内容
type Content struct {
	TextMsg *TextMsg `json:"TextMsg,omitempty" bson:"TextMsg,omitempty"`
}

// TextMsg 文本消息
type TextMsg struct {
	Content     string   `json:"Content" bson:"Content"`         // 文本消息内容
	IsAtAll     bool     `json:"IsAtAll" bson:"IsAtAll"`         // 是否@所有人
	IsNotice    bool     `json:"IsNotice" bson:"IsNotice"`       // 是否群公告
	AtUserIDS   []uint64 `json:"AtUserIDS" bson:"AtUserIDS"`     // 被@的用户
	QuotedMsgID uint64   `json:"QuotedMsgID" bson:"QuotedMsgID"` // 被引用消息编号
}
