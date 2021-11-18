package code

import "him/service/common"

var (
	InvalidProtocolWebsocket = common.NewErrCode("InvalidProtocol.Websocket", "the protocol not is Websocket",
		"必须使用Websocket协议")
)
