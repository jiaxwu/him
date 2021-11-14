package wrapper

import (
	"github.com/gin-gonic/gin"
	"lolmclient/service/common"
	loginModel "lolmclient/service/service/login/model"
	loginService "lolmclient/service/service/login/service"
	"reflect"
)

// header 头部实现
type header struct {
	Token_ string `json:"token" header:"Token"`
}

func (h *header) Token() string {
	return h.Token_
}

// HandlerWrapper Handler的包装器
type HandlerWrapper struct {
	loginService *loginService.LoginService
}

// NewHandlerWrapper 新建一个Handler的包装器
func NewHandlerWrapper(loginService *loginService.LoginService) *HandlerWrapper {
	return &HandlerWrapper{
		loginService: loginService,
	}
}

// Wrap 对handler进行包装，成为一个 func(*gin.Context) Handler
func (w *HandlerWrapper) Wrap(handler interface{}, userType common.UserType) func(*gin.Context) {
	return func(c *gin.Context) {
		// 获取header
		var httpHeader header
		if err := c.ShouldBindHeader(&httpHeader); err != nil {
			common.Failure(c, common.ErrCodeInvalidParameter)
			return
		}

		// 获取session
		authorizeRsp, err := w.loginService.Authorize(&loginModel.AuthorizeReq{
			Token:    httpHeader.Token(),
			UserType: userType,
		})
		if err != nil {
			common.Failure(c, err)
			return
		}

		// 参数绑定
		h := reflect.TypeOf(handler)
		reqPointType := h.In(2)
		reqStructType := reqPointType.Elem()
		req := reflect.New(reqStructType)
		if err := c.ShouldBindJSON(req.Interface()); err != nil {
			common.Failure(c, common.ErrCodeInvalidParameter)
			return
		}

		// 调用服务
		params := []reflect.Value{reflect.ValueOf(&httpHeader), reflect.ValueOf(authorizeRsp.Session),
			reflect.ValueOf(req.Interface())}
		rets := reflect.ValueOf(handler).Call(params)

		// 结果处理
		if !rets[1].IsNil() {
			common.Failure(c, rets[1].Interface().(common.ErrCode))
			return
		}
		common.Success(c, rets[0].Interface())
	}
}
