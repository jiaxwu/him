package sender

import "him/service/service/msg"

// SendMsgsReq 发送消息请求
type SendMsgsReq struct {
	Msgs []*msg.Msg `json:"Msgs"`
}

// SendMsgsRsp 发送消息响应
type SendMsgsRsp struct{}

// SendEventMsgReq 发送事件消息请求
type SendEventMsgReq struct {
	UserIDS  []uint64      `json:"UserIDS"`
	EventMsg *msg.EventMsg `json:"EventMsg"`
}

// SendEventMsgRsp 发送事件消息响应
type SendEventMsgRsp struct{}
