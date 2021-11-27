package common

var (
	ErrCodeOK               = NewErrCode("OK", "", "")
	ErrCodeInvalidParameter = NewErrCode("InvalidParameter", "the required parameter is not validate",
		"非法参数")
	ErrCodeForbidden     = NewErrCode("Forbidden", "forbidden", "无权访问")
	ErrCodeNotFound      = NewErrCode("NotFound", "the request resource not found", "找不到要访问的资源")
	ErrCodeInternalError = NewErrCode("InternalError",
		"the request processing has failed due to some unknown error", "给您带来的不便，深感抱歉，请稍后再试")
)

// ErrCode 错误码实现
type ErrCode struct {
	Code   string `json:"Code"`   // 错误码
	Msg    string `json:"Msg"`    // 错误消息
	Advice string `json:"Advice"` // 建议处理方式
}

// NewErrCode 新建一个错误码
func NewErrCode(code, msg, advice string) *ErrCode {
	return &ErrCode{
		Code:   code,
		Msg:    msg,
		Advice: advice,
	}
}
