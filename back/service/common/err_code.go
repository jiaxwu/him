package common

var (
	ErrCodeOK               = newErrCode("OK", "", "")

	ErrCodeInvalidParameter = newErrCode("InvalidParameter", "the required parameter is not validate",
		"非法参数")
	ErrCodeInvalidParameterLoginSMSAuthCodeNotExist = newErrCode("InvalidParameter.Login.SMSAuthCodeNotExist",
		"the sms auth Code_ not exist", "短信验证码不存在")
	ErrCodeInvalidParameterLoginSMSAuthCodeError = newErrCode("InvalidParameter.Login.SMSAuthCodeError",
		"the sms auth Code_ error", "短信验证码错误")
	ErrCodeInvalidParameterLoginUsernameOrPassword = newErrCode("InvalidParameter.Login.UsernameOrPassword",
		"the username or password is not validate", "账号或密码错误")
	ErrCodeInvalidParameterLoginPasswordNotMeetRequirements = newErrCode(
		"InvalidParameter.Login.PasswordNotMeetRequirements", "the password not meet requirements",
		"密码长度必须8-20个字符且包含数字、小写字母、大写字母和符号!@#~$%^&*()+|_中的三种")

	ErrCodeUnauthorizedInvalidToken = newErrCode("Unauthorized.InvalidToken", "the token is not validate",
		"无效Token")
	ErrCodeForbidden      = newErrCode("Forbidden", "forbidden", "无权访问")

	ErrCodeNotFound       = newErrCode("NotFound", "the request resource not found", "找不到要访问的资源")
	ErrCodeNotFoundURL    = newErrCode("NotFound.URL", "the request url not found", "找不到要访问的URL")

	ErrCodeAlreadyInit    = newErrCode("AlreadyInit", "already init", "已经初始化")
	ErrCodeExistsNickName = newErrCode("Exists.NickName", "the nick name exists", "用户名已经存在")

	ErrCodeThrottlingSMSCode = newErrCode("Throttling.SMSCode",
		"Too many sms code requests within a short time.", "频繁发送短信验证码，请稍后重试")

	ErrCodeInternalError  = newErrCode("InternalError",
		"the request processing has failed due to some unknown error", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorDB = newErrCode("InternalError.DB",
		"the request processing has failed due to db exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorRDB = newErrCode("InternalError.RDB",
		"the request processing has failed due to rdb exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorOSS = newErrCode("InternalError.OSS",
		"the request processing has failed due to oss exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorSDK = newErrCode("InternalError.SDK",
		"the request processing has failed due to sdk exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorThirdPartyTencentCloud = newErrCode("InternalError.ThirdParty.TencentCloud",
		"The request processing has failed due to tencent cloud.", "给您带来的不便，深感抱歉，请稍后再试")
)

// ErrCode 错误码
type ErrCode interface {
	Code() string   // 错误码
	Msg() string    // 错误消息
	Advice() string // 建议处理方式
}

// errCodeImpl 错误码实现
type errCodeImpl struct {
	Code_   string `json:"code"`
	Msg_    string `json:"msg"`
	Advice_ string `json:"advice"`
}

func (e *errCodeImpl) Code() string {
	return e.Code_
}

func (e *errCodeImpl) Msg() string {
	return e.Msg_
}

func (e *errCodeImpl) Advice() string {
	return e.Advice_
}

// newErrCode 新建一个错误码
func newErrCode(code, msg, advice string) ErrCode {
	return &errCodeImpl{
		Code_:   code,
		Msg_:    msg,
		Advice_: advice,
	}
}
