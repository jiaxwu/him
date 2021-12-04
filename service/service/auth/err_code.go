package auth

import "him/service/common"

var (
	ErrCodeInvalidParameterSmVerCodeNotExist = common.NewErrCode("InvalidParameter.SmVerCodeNotExist",
		"the sm ver code not exist", "短信验证码不存在")
	ErrCodeInvalidParameterSmVerCodeError = common.NewErrCode("InvalidParameter.SmVerCodeError",
		"the sm ver code error", "短信验证码错误")
	ErrCodeInvalidParameterLoginUsernameOrPassword = common.NewErrCode("InvalidParameter.Login.UsernameOrPassword",
		"the username or password is not validate", "账号或密码错误")
	ErrCodeInvalidParameterLoginPasswordNotMeetRequirements = common.NewErrCode(
		"InvalidParameter.Login.PasswordNotMeetRequirements", "the password not meet requirements",
		"密码长度必须8-20个字符且由数字、小写字母、大写字母和符号!@#~$%^&*()+|_中的三种组成")
	ErrCodeInvalidParameterPhoneNotRegister = common.NewErrCode("InvalidParameter.Phone.NotRegister",
		"the phone has not been register", "手机号码还没有注册，请先进行注册")
	ErrCodeUnauthorizedInvalidToken = common.NewErrCode("Unauthorized.InvalidToken",
		"the token is not validate", "无效Token")
)
