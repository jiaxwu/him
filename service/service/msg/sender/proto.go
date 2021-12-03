package sender

import "him/service/service/msg"

// SendMsgsReq 发送消息请求
type SendMsgsReq struct {
	Msgs []*msg.Msg `json:"Msgs"`
}

// SendMsgsRsp 发送消息响应
type SendMsgsRsp struct{}
