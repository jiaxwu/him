package common

import "fmt"

var (
	ErrCodeOK = NewErrCode("OK", "", "")

	ErrCodeInvalidParameter = NewErrCode("InvalidParameter", "the required parameter is not validate",
		"非法参数")

	ErrCodeForbidden = NewErrCode("Forbidden", "forbidden", "无权访问")

	ErrCodeNotFound = NewErrCode("NotFound", "the request resource not found", "找不到要访问的资源")

	ErrCodeInternalError = NewErrCode("InternalError",
		"the request processing has failed due to some unknown error", "给您带来的不便，深感抱歉，请稍后再试")
)

// ErrCode 错误码
type ErrCode struct {
	Code   string `json:"Code"`
	Msg    string `json:"Msg"`
	Advice string `json:"Advice"`
}

func (e *ErrCode) Error() string {
	return fmt.Sprintf("code: %s, msg: %s, advice: %s", e.Code, e.Msg, e.Advice)
}

// NewErrCode 新建一个错误码
func NewErrCode(code, msg, advice string) *ErrCode {
	return &ErrCode{
		Code:   code,
		Msg:    msg,
		Advice: advice,
	}
}
