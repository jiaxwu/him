package wrapper

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	loginService "him/service/service/login/service"
	"reflect"
)

// header 头部实现
type header struct {
	Token_ string `json:"token" header:"Token"`
}

func (h *header) Token() string {
	return h.Token_
}

// Wrapper Handler的包装器
type Wrapper struct {
	loginService *loginService.LoginService
}

// NewWrapper 新建一个Handler的包装器
func NewWrapper(loginService *loginService.LoginService) *Wrapper {
	return &Wrapper{
		loginService: loginService,
	}
}

// Wrap 对handler进行包装，成为一个 func(*gin.Context) Handler
func (w *Wrapper) Wrap(handler interface{}, isNeedLogin bool, userTypes ...common.UserType) func(*gin.Context) {
	return func(c *gin.Context) {
		w.wrap(c, handler, isNeedLogin, userTypes...)
	}
}

// wrap 抽象包装类
func (w *Wrapper) wrap(c *gin.Context, handler interface{}, isNeedLogin bool, userTypes ...common.UserType) {
	// 获取header
	var httpHeader header
	if err := c.ShouldBindHeader(&httpHeader); err != nil {
		common.Failure(c, common.ErrCodeInvalidParameter)
		return
	}

	// 如果需要登录则进行验证
	var session common.Session
	if isNeedLogin {
		// 获取session
		authorizeRsp, err := w.loginService.Authorize(&loginModel.AuthorizeReq{
			Token:     httpHeader.Token(),
			UserTypes: userTypes,
		})
		if err != nil {
			common.Failure(c, err)
			return
		}
		session = authorizeRsp.Session
	}

	// 参数绑定
	fn := reflect.TypeOf(handler)
	var params []reflect.Value
	for i := 0; i < fn.NumIn(); i++ {
		paramValue, err := w.getParamValue(fn, i, c, &httpHeader, session)
		if err != nil {
			common.Failure(c, common.ErrCodeInvalidParameter)
			return
		}
		params = append(params, reflect.ValueOf(paramValue))
	}

	// 调用函数
	rets := reflect.ValueOf(handler).Call(params)

	// 结果处理
	if !rets[1].IsNil() {
		common.Failure(c, rets[1].Interface().(common.ErrCode))
		return
	}
	common.Success(c, rets[0].Interface())
}

// 获取参数值
func (w *Wrapper) getParamValue(fn reflect.Type, paramIndex int, c *gin.Context, httpHeader common.Header,
	session common.Session) (interface{}, error) {
	paramPointType := fn.In(paramIndex)
	if httpHeader != nil && reflect.TypeOf(httpHeader).AssignableTo(paramPointType) {
		return httpHeader, nil
	}
	if session != nil && reflect.TypeOf(session).AssignableTo(paramPointType) {
		return session, nil
	}

	// 否则必须是自定义struct，并从请求获取参数
	reqStructType := paramPointType.Elem()
	req := reflect.New(reqStructType)
	if err := c.ShouldBindJSON(req.Interface()); err != nil {
		return nil, err
	}
	return req.Interface(), nil
}
