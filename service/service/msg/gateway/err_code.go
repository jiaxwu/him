package gateway

import "him/service/common"

var (
	ErrCodeWebsocketUpgradeException = common.NewErrCode("Websocket.UpgradeException",
		"the upgrade of websocket is exception", "升级到Websocket异常，请重试")
	ErrCodeInvalidParameterNotIsFriend = common.NewErrCode("InvalidParameter.NotIsFriend",
		"receiver not is sender friend", "对方不是你的好友，请添加好友后发送")
)
