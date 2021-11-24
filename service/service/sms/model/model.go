package model

const (
	SendSMSTencentCloudURL                     = "sms.tencentcloudapi.com" // 腾讯云短信url
	SendLoginSMSAuthCodeTencentCloudTemplateID = "1179214"                 // 腾讯云短信模板-发送登录短信验证码
)

type SendAuthCodeForLoginReq struct {
	Phone     string `validate:"required,phone"`               // 手机号码
	AuthCode  string `validate:"required,min=4,max=6,numeric"` // 验证码
	ExpMinute uint   `validate:"required"`                     // 过期时间
}

type SendAuthCodeForLoginRsp struct{}

type SendSMSReq struct {
	Phone      string   // 手机
	TemplateID string   // 模板ID
	Params     []string // 参数
}

type SendSMSRsp struct{}

// TencentCloudStatusCode 短信发送状态的错误码
type TencentCloudStatusCode string

const (
	// TencentCloudStatusCodeOK 发送成功
	TencentCloudStatusCodeOK TencentCloudStatusCode = "Ok"
	// TencentCloudStatusCodeLimitExceededPhoneNumberThirtySecondLimit 触发限频策略
	TencentCloudStatusCodeLimitExceededPhoneNumberThirtySecondLimit TencentCloudStatusCode = "LimitExceeded.PhoneNumberThirtySecondLimit"
)
