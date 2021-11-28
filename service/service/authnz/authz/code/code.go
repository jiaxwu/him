package code

import "github.com/xiaohuashifu/him/service/common"

var (
	InvalidParameterLoginSMSAuthCodeNotExist = common.NewCode("InvalidParameter.Login.SMSAuthCodeNotExist",
		"the sm auth Code_ not exist", "短信验证码不存在")
	InvalidParameterLoginSMSAuthCodeError = common.NewCode("InvalidParameter.Login.SMSAuthCodeError",
		"the sm auth Code_ error", "短信验证码错误")
	InvalidParameterLoginUsernameOrPassword = common.NewCode("InvalidParameter.Login.UsernameOrPassword",
		"the username or password is not validate", "账号或密码错误")
	InvalidParameterLoginPasswordNotMeetRequirements = common.NewCode(
		"InvalidParameter.Login.PasswordNotMeetRequirements", "the password not meet requirements",
		"密码长度必须8-20个字符且包含数字、小写字母、大写字母和符号!@#~$%^&*()+|_中的三种")

	UnauthorizedInvalidToken = common.NewCode("Unauthorized.InvalidToken", "the token is not validate",
		"无效Token")

)
