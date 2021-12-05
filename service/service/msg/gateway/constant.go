package gateway

import "time"

const (
	// WSHandshakeTimeout 握手超时时间
	WSHandshakeTimeout = time.Second * 10
	// WSReadBufferSize 读缓冲大小
	WSReadBufferSize = 4096
	// WSReadExpireTime 读过期时间
	WSReadExpireTime = 70 * time.Second
	// WSHeartbeatTimeInterval 心跳时间间隔
	WSHeartbeatTimeInterval = 60 * time.Second
)

const (
	MQPushMsgConsumerGroupID = "PushMsg" // 推送消息消费者GroupID
)
