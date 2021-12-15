package user

import (
	"fmt"
	"regexp"
	"strings"
	"time"
)

const (
	// UserAvatarBucketURL 用户头像桶路径
	UserAvatarBucketURL = "https://him-avatar-1256931327.cos.ap-beijing.myqcloud.com/"
	// MaxUserAvatarSize 用户头像最大长度 5MB
	MaxUserAvatarSize = 1048576
)

// UsernameCharSetRegexp 用户名字符集正则表达式
var UsernameCharSetRegexp = regexp.MustCompile(`\w{5,30}`)

const (
	// UserAvatarClearTaskCron 用户头像清理任务cron
	UserAvatarClearTaskCron = "0 0 * * *"
	// UserAvatarClearTaskBloomLength 布隆过滤器长度
	UserAvatarClearTaskBloomLength = 1000000
	// UserAvatarClearTaskBloomFP 布隆过滤器失误概率
	UserAvatarClearTaskBloomFP = 0.01
	// UserAvatarClearTaskAvatarExpireTime 用户头像清理任务头像过期事件
	UserAvatarClearTaskAvatarExpireTime = time.Hour * 24
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

// SmVerCodeTemplateID 短信验证码模板编号
type SmVerCodeTemplateID string

const (
	SmVerCodeTemplateIDLogin          SmVerCodeTemplateID = "1179214" // 短信模板-发送登录短信验证码
	SmVerCodeTemplateIDChangePassword SmVerCodeTemplateID = "1219668" // 短信模板-发送修改密码短信验证码
)

// SmVerCodeActionToTemplateIDMap 短信验证码行为到模板编号Map
func SmVerCodeActionToTemplateIDMap() map[SmVerCodeAction]SmVerCodeTemplateID {
	return map[SmVerCodeAction]SmVerCodeTemplateID{
		SmVerCodeActionLogin:          SmVerCodeTemplateIDLogin,
		SmVerCodeActionChangePassword: SmVerCodeTemplateIDChangePassword,
	}
}

// SmVerCodeTemplateParamsCount 短信验证码模板的参数数量
func SmVerCodeTemplateParamsCount() map[SmVerCodeTemplateID]int {
	return map[SmVerCodeTemplateID]int{
		SmVerCodeTemplateIDLogin:          2,
		SmVerCodeTemplateIDChangePassword: 1,
	}
}

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
