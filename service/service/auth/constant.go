package auth

import (
	"fmt"
	"regexp"
	"strings"
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
	// PasswordCharSets 密码字符集
	PasswordCharSets = []string{`0-9`, `a-z`, `A-Z`, `!@#~$%^&*()+|_`}
	// PasswordCharSet 密码字符集
	PasswordCharSet = strings.Join(PasswordCharSets, "")
	// PasswordCharSetRegexps 密码字符集正则列表
	PasswordCharSetRegexps = buildPasswordCharSetRegexps()
)

// 构造密码字符集正则列表
func buildPasswordCharSetRegexps() []*regexp.Regexp {
	regexps := make([]*regexp.Regexp, 0, len(PasswordCharSets))
	for _, passwordCharSet := range PasswordCharSets {
		regexps = append(regexps, regexp.MustCompile(fmt.Sprintf(`[%s]`, passwordCharSet)))
	}
	return regexps
}
