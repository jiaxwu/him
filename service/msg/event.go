package msg

import (
	"github.com/jiaxwu/him/common"
)

// Event 事件用于给用户推送消息
// 会被发送到客户端，不会持久化，不可靠
// 用于推送响应，消息或其他事件给客户端，同时客户端应该尽量保证消息被成功处理
// 必须是客户端在线才会推送
type Event struct {
	Rsp *common.Rsp `json:"Rsp,omitempty"` // 响应，用户不一定收到，但是可以通过用户本地自行同步消息最终同步到消息
	Msg *Msg        `json:"Msg,omitempty"` // 消息，用户不一定收到，但是可以通过用户本地自行同步消息最终同步到消息
}
