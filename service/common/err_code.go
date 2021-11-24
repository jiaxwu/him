package common

var (
	ErrCodeOK = NewErrCode("OK", "", "")

	ErrCodeInvalidParameter = NewErrCode("InvalidParameter", "the required parameter is not validate",
		"非法参数")

	ErrCodeForbidden = NewErrCode("Forbidden", "forbidden", "无权访问")

	ErrCodeNotFound    = NewErrCode("NotFound", "the request resource not found", "找不到要访问的资源")
	ErrCodeNotFoundURL = NewErrCode("NotFound.URL", "the request url not found", "找不到要访问的URL")

	ErrCodeInternalError = NewErrCode("InternalError",
		"the request processing has failed due to some unknown error", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorDB = NewErrCode("InternalError.DB",
		"the request processing has failed due to db exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorRDB = NewErrCode("InternalError.RDB",
		"the request processing has failed due to rdb exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorOSS = NewErrCode("InternalError.OSS",
		"the request processing has failed due to oss exception", "给您带来的不便，深感抱歉，请稍后再试")
	ErrCodeInternalErrorSDK = NewErrCode("InternalError.SDK",
		"the request processing has failed due to sdk exception", "给您带来的不便，深感抱歉，请稍后再试")
)

// ErrCode 错误码
type ErrCode interface {
	Code() string   // 错误码
	Msg() string    // 错误消息
	Advice() string // 建议处理方式
}

// errCodeImpl 错误码实现
type errCodeImpl struct {
	Code_   string `json:"Code"`
	Msg_    string `json:"Msg"`
	Advice_ string `json:"Advice"`
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

// NewErrCode 新建一个错误码
func NewErrCode(code, msg, advice string) ErrCode {
	return &errCodeImpl{
		Code_:   code,
		Msg_:    msg,
		Advice_: advice,
	}
}
