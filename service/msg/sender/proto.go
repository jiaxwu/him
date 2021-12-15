package sender

import (
	"github.com/jiaxwu/him/service/msg"
)

// SendMsgsReq 发送消息请求
type SendMsgsReq struct {
	Msgs []*msg.Msg `json:"Msgs"`
}

// SendMsgsRsp 发送消息响应
type SendMsgsRsp struct{}

// SendTextMsgReq 发送text消息请求
type SendTextMsgReq struct {
	UserIDS  []uint64      `json:"UserIDS"`
	TextMsg   *msg.TextMsg   `json:"TextMsg"`
	Receiver *msg.Receiver `json:"Receiver"`
}

// SendTextMsgRsp 发送text消息响应
type SendTextMsgRsp struct{}

// SendTipMsgReq 发送tip消息请求
type SendTipMsgReq struct {
	UserIDS  []uint64      `json:"UserIDS"`
	TipMsg   *msg.TipMsg   `json:"TipMsg"`
	Receiver *msg.Receiver `json:"Receiver"`
}

// SendTipMsgRsp 发送tip消息响应
type SendTipMsgRsp struct{}

// SendEventMsgReq 发送事件消息请求
type SendEventMsgReq struct {
	UserIDS  []uint64      `json:"UserIDS"`
	EventMsg *msg.EventMsg `json:"EventMsg"`
}

// SendEventMsgRsp 发送事件消息响应
type SendEventMsgRsp struct{}
