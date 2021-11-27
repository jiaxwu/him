package code

import "github.com/xiaohuashifu/him/service/common"

var (
	WebsocketUpgradeException = common.NewCode("Websocket.UpgradeException",
		"the upgrade of websocket is exception", "升级到Websocket异常，请重试")
)
