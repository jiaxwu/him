package validate

import (
	"github.com/go-playground/validator/v10"
	"regexp"
)

var (
	phoneRegexp = regexp.MustCompile(
		"^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$")
	emailRegexp = regexp.MustCompile("^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z].){1,4}[a-z]{2,4}$")
)

// Phone 验证手机号码
func Phone(fl validator.FieldLevel) bool {
	return phoneRegexp.MatchString(fl.Field().String())
}

// Email 验证邮箱
func Email(fl validator.FieldLevel) bool {
	return emailRegexp.MatchString(fl.Field().String())
}
