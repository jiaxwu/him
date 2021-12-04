package profile

import (
	httpHeaderValue "him/common/constant/http/header/value"
	imageSuffix "him/common/constant/image/suffix"
	"regexp"
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

// UserAvatarContentTypeToFileTypeMap 用户头像的 ContentType 到 FileType 的转换
var UserAvatarContentTypeToFileTypeMap = map[string]string{
	httpHeaderValue.ImagePNG:  imageSuffix.PNG,
	httpHeaderValue.ImageGIF:  imageSuffix.GIF,
	httpHeaderValue.ImageJPEG: imageSuffix.JPEG,
}

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
