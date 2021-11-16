package code

import "him/service/common"

var (
	ThrottlingSMSCode = common.NewErrCode("Throttling.SMSCode",
		"Too many sms code requests within a short time.", "频繁发送短信验证码，请稍后重试")

	InternalErrorThirdPartyTencentCloud = common.NewErrCode("InternalError.ThirdParty.TencentCloud",
		"The request processing has failed due to tencent cloud.", "给您带来的不便，深感抱歉，请稍后再试")
)