package gateway

import "him/service/common"

var (
	WebsocketUpgradeException = common.NewErrCode("Websocket.UpgradeException",
		"the upgrade of websocket is exception", "升级到Websocket异常，请重试")
)
