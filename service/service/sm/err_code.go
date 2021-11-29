package sm

import "him/service/common"

var (
	ErrCodeThrottlingSm = common.NewErrCode("Throttling.Sm", "Too many sm requests within a short time.",
		"频繁发送短信，请稍后重试")
)
