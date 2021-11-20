package constant

import "time"

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
