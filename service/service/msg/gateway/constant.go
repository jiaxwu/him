package gateway

import "time"

const (
	// WSHandshakeTimeout 握手超时时间
	WSHandshakeTimeout = time.Second * 10
	// WSReadBufferSize 读缓冲大小
	WSReadBufferSize = 4096
)
