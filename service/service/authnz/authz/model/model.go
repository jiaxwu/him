package model

import (
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

