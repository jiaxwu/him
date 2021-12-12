package msg

import (
	"github.com/jiaxwu/him/service/service/user/auth"
)

// ------------------------- 基础资源

// Image 图片
type Image struct {
	URL    string `json:"URL" bson:"URL"`       // 地址
	Width  int    `json:"Width" bson:"Width"`   // 宽
	Height int    `json:"Height" bson:"Height"` // 高
	Format string `json:"Format" bson:"Format"` // 图片类型
	Size   int64  `json:"Size" bson:"Size"`     // 大小，单位B
}

// Voice 语音
type Voice struct {
	URL      string      `json:"URL" bson:"URL"`           // 地址
	Duration uint32      `json:"Duration" bson:"Duration"` // 时长，单位秒
	Format   VoiceFormat `json:"Format" bson:"Format"`     // 语音类型
	Size     int64       `json:"Size" bson:"Size"`         // 大小，单位B
}

// VoiceFormat 语音类型
type VoiceFormat string

const (
	VoiceFormatMP3 = "MP3" // MP3格式
)

// Video 视频
type Video struct {
	URL      string      `json:"URL" bson:"URL"`           // 地址
	Duration uint32      `json:"Duration" bson:"Duration"` // 时长，单位秒
	Format   VideoFormat `json:"Format" bson:"Format"`     // 视频类型
	Size     int64       `json:"Size" bson:"Size"`         // 大小，单位B
}

// VideoFormat 视频类型
type VideoFormat string

const (
	VideoFormatMP4 = "MP4" // MP4格式
)

// File 文件
type File struct {
	URL    string     `json:"URL" bson:"URL"`       // 地址
	Name   string     `json:"Name" bson:"Name"`     // 文件名
	Format FileFormat `json:"Format" bson:"Format"` // 文件类型
	Size   int64      `json:"Size" bson:"Size"`     // 大小，单位B
}

// FileFormat 文件类型
type FileFormat string

const (
	FileFormatPDF = "PDF" // PDF格式
)

// ----------------------------- 消息，这些是会被存储的

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
	TextMsg  *TextMsg  `json:"TextMsg,omitempty" bson:"TextMsg,omitempty"`
	ImageMsg *ImageMsg `json:"ImageMsg,omitempty" bson:"ImageMsg,omitempty"`
	TipMsg   *TipMsg   `json:"TipMsg,omitempty" bson:"TipMsg,omitempty"`
	EventMsg *EventMsg `json:"EventMsg,omitempty" bson:"EventMsg,omitempty"`
}

// TextMsg 文本消息
type TextMsg struct {
	Content     string   `json:"Content" bson:"Content"`         // 文本消息内容
	IsAtAll     bool     `json:"IsAtAll" bson:"IsAtAll"`         // 是否@所有人
	IsNotice    bool     `json:"IsNotice" bson:"IsNotice"`       // 是否群公告
	AtUserIDS   []uint64 `json:"AtUserIDS" bson:"AtUserIDS"`     // 被@的用户
	QuotedMsgID uint64   `json:"QuotedMsgID" bson:"QuotedMsgID"` // 被引用消息编号
}

// ImageMsg 图片消息
type ImageMsg struct {
	Thumbnail     *Image `json:"Thumbnail" bson:"Thumbnail"`         // 缩略图
	OriginalImage *Image `json:"OriginalImage" bson:"OriginalImage"` // 原图
}

// TipMsg 提示消息
type TipMsg struct {
	TextTip         *TextTip         `json:"TextTip,omitempty" bson:"TextTip,omitempty"`
	NickNameTextTip *NickNameTextTip `json:"NickNameTextTip,omitempty" bson:"NickNameTextTip,omitempty"`
}

// TextTip 文本提示
type TextTip struct {
	Content string `json:"Content,omitempty" bson:"Content,omitempty"` // 提示内容
}

// NickNameTextTip 昵称文本提示
type NickNameTextTip struct {
	ClickableTexts []*ClickableText `json:"ClickableTexts,omitempty" bson:"ClickableTexts,omitempty"`
}

// ClickableText 可点击文本
type ClickableText struct {
	Link string `json:"Link,omitempty" bson:"Link,omitempty"` // 点击的目标
	Text string `json:"Text,omitempty" bson:"Text,omitempty"` // 文本
}

// EventMsg 事件消息
type EventMsg struct {
	NewFriend                  *NewFriendEventMsg                  `json:"NewFriend,omitempty" bson:"NewFriend,omitempty"`
	FriendInfoChange           *FriendInfoChangeEventMsg           `json:"FriendInfoChange,omitempty" bson:"FriendInfoChange,omitempty"`
	DeleteFriend               *DeleteFriendEventMsg               `json:"DeleteFriend,omitempty" bson:"DeleteFriend,omitempty"`
	NewAddFriendApplication    *NewAddFriendApplicationEventMsg    `json:"NewAddFriendApplication,omitempty" bson:"NewAddFriendApplication,omitempty"`
	AddFriendApplicationChange *AddFriendApplicationChangeEventMsg `json:"AddFriendApplicationChange,omitempty" bson:"AddFriendApplicationChange,omitempty"`

	NewGroup              *NewGroupEventMsg              `json:"NewGroup,omitempty" bson:"NewGroup,omitempty"`
	GroupInfoChange       *GroupInfoChangeEventMsg       `json:"GroupInfoChange,omitempty" bson:"GroupInfoChange,omitempty"`
	GroupMemberInfoChange *GroupMemberInfoChangeEventMsg `json:"GroupMemberInfoChange,omitempty" bson:"GroupMemberInfoChange,omitempty"`
	NewJoinGroupEvent     *NewJoinGroupEventEventMsg     `json:"NewJoinGroupEvent,omitempty" bson:"NewJoinGroupEvent,omitempty"`
	JoinGroupEventChange  *JoinGroupEventChangeEventMsg  `json:"JoinGroupEventChange,omitempty" bson:"JoinGroupEventChange,omitempty"`
}

// NewFriendEventMsg 新的好友事件消息
type NewFriendEventMsg struct {
	FriendID uint64 `json:"FriendID" bson:"FriendID"` // 用户编号
}

// FriendInfoChangeEventMsg 好友信息改变事件消息
type FriendInfoChangeEventMsg struct {
	FriendID uint64 `json:"FriendID" bson:"FriendID"` // 用户编号
}

// DeleteFriendEventMsg 删除好友事件消息
type DeleteFriendEventMsg struct {
	FriendID uint64 `json:"FriendID" bson:"FriendID"` // 用户编号
}

// NewAddFriendApplicationEventMsg 新的添加好友申请事件消息
type NewAddFriendApplicationEventMsg struct {
	AddFriendApplicationID uint64 `json:"AddFriendApplicationID" bson:"AddFriendApplicationID"` // 好友申请编号
}

// AddFriendApplicationChangeEventMsg 添加好友申请状态改变事件消息
type AddFriendApplicationChangeEventMsg struct {
	AddFriendApplicationID uint64 `json:"AddFriendApplicationID" bson:"AddFriendApplicationID"` // 状态改变的添加好友申请编号
}

//NewGroupEventMsg 新的群事件消息（xx邀请xx，xxx，xxx等加入了群聊tip，你通过扫描xx分享的二维码加入群聊tip，xx邀请你加入了群聊tip）
type NewGroupEventMsg struct {
	GroupID uint64 `json:"GroupID" bson:"GroupID"` // 群编号
}

// GroupInfoChangeEventMsg 群信息改变事件消息（头像、群名、群公告，xx修改群名为xx tip）
type GroupInfoChangeEventMsg struct {
	GroupID uint64 `json:"GroupID" bson:"GroupID"` // 群编号
}

// GroupMemberInfoChangeEventMsg
// 群成员信息改变事件消息（直接拉群群成员信息列表和本地比较进行同步）
// 群成员信息更改（换群主，管理员变动，xx成为了新的群主tip，xx成为了新的管理员）
// 群成员加入（加入，邀请加入，xx通过扫描xx分析的二维码进群tip，xx邀请xx，xx，xx加入了群聊tip）
// 群成员退出（退出，被踢，xx退出了群聊tip，xx被踢出群聊tip）
type GroupMemberInfoChangeEventMsg struct {
	GroupID uint64 `json:"GroupID" bson:"GroupID"` // 群编号
}

// NewJoinGroupEventEventMsg 新的入群事件事件消息
type NewJoinGroupEventEventMsg struct {
	JoinGroupEventID uint64 `json:"JoinGroupEventID" bson:"JoinGroupEventID"` // 入群事件编号
}

// JoinGroupEventChangeEventMsg 入群事件改变事件消息
type JoinGroupEventChangeEventMsg struct {
	JoinGroupEventID uint64 `json:"JoinGroupEventID" bson:"JoinGroupEventID"` // 入群事件编号
}
