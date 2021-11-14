package common

// Header 头部
type Header interface {
	Token() string // 令牌
}

// TokenHTTPHeaderKey Token在HTTP头的Key
const TokenHTTPHeaderKey = "Token"
