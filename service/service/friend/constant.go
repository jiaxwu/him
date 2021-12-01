package friend

import (
	"regexp"
	"time"
)

const (
	// SmVerCodeLen 短信验证码长度
	SmVerCodeLen uint = 6
	// SmVerCodeExpMinute 短信验证码有效时间
	SmVerCodeExpMinute = 5
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

const (
	SmVerCodeTemplateIDLogin          = "1179214" // 短信模板-发送登录短信验证码
	SmVerCodeTemplateIDChangePassword = "1219668" // 短信模板-发送修改密码短信验证码
)

var (
	// PasswordCharRegexpSet 密码字符正则表达式集合
	PasswordCharRegexpSet = []*regexp.Regexp{regexp.MustCompile(`[0-9]`), regexp.MustCompile(`[a-z]`),
		regexp.MustCompile(`[A-Z]`), regexp.MustCompile(`[!@#~$%^&*()+|_]`)}
)
