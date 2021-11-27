package wrap

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/authnz/authn"
	sess "github.com/xiaohuashifu/him/api/authnz/session"
	"github.com/xiaohuashifu/him/api/user"
	httpHeaderKey "github.com/xiaohuashifu/him/common/constant/http/header/key"
	"github.com/xiaohuashifu/him/service/common"
	loginService "github.com/xiaohuashifu/him/service/service/authnz/authz/service"
	"mime/multipart"
	"reflect"
)

// Config 配置
type Config struct {
	NotNeedResponse bool            // 不需要响应
	NotNeedLogin    bool            // 不需要登录
	UserTypes       []user.UserType // 有权访问的用户类型
}

// Wrapper Handler的包装器
type Wrapper struct {
	loginService *loginService.AuthzService
}

// NewWrapper 新建一个Handler的包装器
func NewWrapper(loginService *loginService.AuthzService) *Wrapper {
	return &Wrapper{
		loginService: loginService,
	}
}

// Wrap 对handler进行包装，成为一个 func(*gin.Context) Handler
func (w *Wrapper) Wrap(handler interface{}, config *Config) func(*gin.Context) {
	return func(c *gin.Context) {
		w.wrap(c, handler, config)
	}
}

// wrap 抽象包装类
func (w *Wrapper) wrap(c *gin.Context, handler interface{}, config *Config) {
	// 获取header
	header := c.Request.Header

	// 如果需要登录则进行验证
	var session *a.Session
	if !config.NotNeedLogin {
		// 获取session
		authnRsp, err := w.loginService.Authorize(&authn.AuthnReq{
			Token:     header[httpHeaderKey.Token][0],
			UserTypes: config.UserTypes,
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
		paramValue, err := w.getParamValue(fn, i, c, &header, session)
		if err != nil {
			common.Failure(c, common.ErrCodeInvalidParameter)
			return
		}
		params = append(params, reflect.ValueOf(paramValue))
	}

	// 调用函数
	rets := reflect.ValueOf(handler).Call(params)

	// 不需要响应就直接返回
	if config.NotNeedResponse {
		return
	}

	// 结果处理
	if !rets[1].IsNil() {
		common.Failure(c, rets[1].Interface().(common.ErrCode))
		return
	}
	common.Success(c, rets[0].Interface())
}

// 获取参数值
func (w *Wrapper) getParamValue(fn reflect.Type, paramIndex int, c *gin.Context, header *common.Header,
	session *common.Session) (interface{}, error) {
	paramPointType := fn.In(paramIndex)
	if reflect.TypeOf(&common.Header{}).AssignableTo(paramPointType) {
		return header, nil
	}
	if reflect.TypeOf(&common.Session{}).AssignableTo(paramPointType) {
		return session, nil
	}
	if reflect.TypeOf(&multipart.Form{}).AssignableTo(paramPointType) {
		return c.MultipartForm()
	}
	if reflect.TypeOf(c.Writer).AssignableTo(paramPointType) {
		return c.Writer, nil
	}
	if reflect.TypeOf(c.Request).AssignableTo(paramPointType) {
		return c.Request, nil
	}

	// 否则必须是自定义struct，并从请求获取参数
	reqStructType := paramPointType.Elem()
	req := reflect.New(reqStructType)
	if err := c.ShouldBind(req.Interface()); err != nil {
		return nil, err
	}
	return req.Interface(), nil
}
