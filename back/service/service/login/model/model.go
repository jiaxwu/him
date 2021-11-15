package model

import (
	"him/service/common"
	"regexp"
	"time"
)

const (
	// SMSAuthCodeLen 短信验证码长度
	SMSAuthCodeLen uint = 6
	// SMSAuthCodeExpMinute 短信验证码有效时间
	SMSAuthCodeExpMinute = 5
	// TokenExp Token有效时间
	TokenExp = time.Hour * 24 * 30
	// LogoutRedisScript 退出登录Redis脚本
	LogoutRedisScript = `
local tokenKey = tostring(KEYS[1])
local antiKey = tostring(KEYS[2])
local count = redis.call("DEL", tokenKey)
if count == 0 then
	return -1
end
return redis.call("DEL", antiKey)
`
)

var (
	// PasswordCharRegexpSet 密码字符正则表达式集合
	PasswordCharRegexpSet = []*regexp.Regexp{regexp.MustCompile(`[0-9]`), regexp.MustCompile(`[a-z]`),
		regexp.MustCompile(`[A-Z]`), regexp.MustCompile(`[!@#~$%^&*()+|_]`)}
)

// LoginType 登录类型
type LoginType uint8

const (
	LoginTypeSMS LoginType = 1 // 短信验证码登录
	LoginTypePwd LoginType = 2 // 密码登录
)

type LoginReq struct {
	Type     LoginType `json:"type"`     // 登录类型
	Phone    string    `json:"phone"`    // 手机号码
	AuthCode string    `json:"authCode"` // 验证码
	Username string    `json:"username"` // 用户名
	Password string    `json:"password"` // 密码
}

type LoginRsp struct {
	Token  string `json:"token"`
	UserID uint64 `json:"userID"`
}

type BindPasswordLoginReq struct {
	UserID   uint64 `json:"userID"`
	Password string `json:"password"`
}

type BindPasswordLoginRsp struct{}

type LogoutReq struct {
	Token  string `json:"token"`
	UserID uint64 `json:"userID"`
}

type LogoutRsp struct{}

type SendSMSForLoginReq struct {
	Phone string `json:"phone" validate:"required,phone"`
}

type SendSMSForLoginRsp struct{}

type AuthorizeReq struct {
	Token     string            `validate:"required,len=36"`
	UserTypes []common.UserType `validate:"required"`
}

type AuthorizeRsp struct {
	Session *common.Session
}

type GetSessionReq struct {
	Token string `validate:"required,len=36"`
}

type GetSessionRsp struct {
	Session *common.Session
}
