package wrapper

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	loginService "him/service/service/login/service"
	"reflect"
)

// ServiceWrapper Service的包装器
type ServiceWrapper struct {
	loginService *loginService.LoginService
}

// NewServiceWrapper 新建一个Service的包装器
func NewServiceWrapper(loginService *loginService.LoginService) *ServiceWrapper {
	return &ServiceWrapper{
		loginService: loginService,
	}
}

// Wrap 对Service进行包装，成为一个 func(*gin.Context) Handler
func (w *ServiceWrapper) Wrap(service interface{}, userType common.UserType) func(*gin.Context) {
	return func(c *gin.Context) {
		// 如果userType不为0则需要鉴权
		if userType != 0 {
			// 获取Token
			token := c.GetHeader(common.TokenHTTPHeaderKey)

			// 验证是否有权限
			if _, err := w.loginService.Authorize(&loginModel.AuthorizeReq{
				Token:    token,
				UserType: userType,
			}); err != nil {
				common.Failure(c, err)
				return
			}
		}

		// 参数绑定
		s := reflect.TypeOf(service)
		reqPointType := s.In(0)
		reqStructType := reqPointType.Elem()
		req := reflect.New(reqStructType)
		if err := c.ShouldBindJSON(req.Interface()); err != nil {
			common.Failure(c, common.ErrCodeInvalidParameter)
			return
		}

		// 调用服务
		params := []reflect.Value{reflect.ValueOf(req.Interface())}
		rets := reflect.ValueOf(service).Call(params)

		// 结果处理
		if !rets[1].IsNil() {
			common.Failure(c, rets[1].Interface().(common.ErrCode))
			return
		}
		common.Success(c, rets[0].Interface())
	}
}
