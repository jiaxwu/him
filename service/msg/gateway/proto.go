package gateway

import (
	"github.com/jiaxwu/him/service/msg"
)

// SendMsgReq 发送消息请求
type SendMsgReq struct {
	Sender        *msg.Sender   `json:"Sender"`        // 发送者
	Receiver      *msg.Receiver `json:"Receiver"`      // 接收者
	SendTime      uint64        `json:"SendTime"`      // 发送时间
	CorrelationID string        `json:"CorrelationID"` // 消息请求唯一标识
	Content       *msg.Content  `json:"Content"`       // 消息内容
}

// SendMsgRsp 发送消息响应
type SendMsgRsp struct {
	CorrelationID string `json:"CorrelationID"` // 消息请求唯一标识
	MsgID         string `json:"MsgID"`         // 消息编号
}
