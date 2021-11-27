package common

import "fmt"

var (
	CodeOK               = NewCode("OK", "", "")
	CodeInvalidParameter = NewCode("InvalidParameter", "the required parameter is not validate",
		"非法参数")
	CodeForbidden     = NewCode("Forbidden", "forbidden", "无权访问")
	CodeNotFound      = NewCode("NotFound", "the request resource not found", "找不到要访问的资源")
	CodeInternalError = NewCode("InternalError",
		"the request processing has failed due to some unknown error", "给您带来的不便，深感抱歉，请稍后再试")
)

// Code 错误码实现
type Code struct {
	code   string // 错误码
	msg    string // 错误消息
	advice string // 建议处理方式
}

// 实现 error 接口
func (c *Code) Error() string {
	return fmt.Sprintf("code: %s, msg: %s, advice: %s", c.code, c.msg, c.advice)
}

// NewCode 新建一个错误码
func NewCode(code, msg, advice string) *Code {
	return &Code{
		code:   code,
		msg:    msg,
		advice: advice,
	}
}
