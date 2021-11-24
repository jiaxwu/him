package common

// Header 头部
type Header struct {
	Token string `header:"Token"` // 令牌
}

// TokenHTTPHeaderKey Token在HTTP头的Key
const TokenHTTPHeaderKey = "Token"
