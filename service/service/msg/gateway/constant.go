package gateway

import "time"

const (
	// WSHandshakeTimeout 握手超时时间
	WSHandshakeTimeout = time.Second * 10
	// WSReadBufferSize 读缓冲大小
	WSReadBufferSize = 4096
	// WSReadExpireTime 读过期时间
	WSReadExpireTime = time.Minute
	// WSHeartbeatTimeInterval 心跳时间间隔
	WSHeartbeatTimeInterval = 50 * time.Second
)

const (
	// MsgIDRedisKey 消息编号Redis Key
	MsgIDRedisKey = "msg:id"
)
