package code

import "github.com/xiaohuashifu/him/service/common"

var (
	InvalidParameterLoginPhone = common.NewCode("InvalidParameter.Login.Phone", "the phone format invalid",
		"非法手机号码格式")
	InvalidParameterLoginSmVerCode = common.NewCode("InvalidParameter.Login.SmVerCode",
		"the sm ver code must consist of 6 digits", "验证码必须由6位数字组成")
	InvalidParameterLoginSmVerCodeNotExist = common.NewCode("InvalidParameter.Login.SmVerCodeNotExist",
		"the sm ver code not exist", "短信验证码不存在")
	InvalidParameterLoginSmVerCodeError = common.NewCode("InvalidParameter.Login.SmVerCodeError",
		"the sm ver code error", "短信验证码错误")
	InvalidParameterLoginUsernameOrPwd = common.NewCode("InvalidParameter.Login.UsernameOrPwd",
		"the username or pwd is not validate", "账号或密码错误")
	InvalidParameterLoginPwdNotMeetRequirements = common.NewCode("InvalidParameter.Login.PwdNotMeetRequirements",
		"the pwd not meet requirements",
		"密码长度必须8-20个字符且包含数字、小写字母、大写字母和符号!@#~$%^&*()+|_中的三种")

	UnauthorizedInvalidToken = common.NewCode("Unauthorized.InvalidToken", "the token is not validate",
		"无效Token")
)
