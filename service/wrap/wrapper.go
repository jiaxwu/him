package wrap

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/authnz"
	"github.com/xiaohuashifu/him/api/authnz/authn"
	httpHeaderKey "github.com/xiaohuashifu/him/common/constant/http/header/key"
	authzService "github.com/xiaohuashifu/him/service/authnz/authz/service"
	"github.com/xiaohuashifu/him/service/common"
	"google.golang.org/protobuf/proto"
	"mime/multipart"
	"net/http"
	"reflect"
)

// Config 配置
type Config struct {
	NotNeedResponse bool              // 不需要响应
	NotNeedLogin    bool              // 不需要登录
	UserTypes       []authnz.UserType // 有权访问的用户类型
}

// Wrapper Handler的包装器
type Wrapper struct {
	authzService *authzService.AuthzService
}

// NewWrapper 新建一个Handler的包装器
func NewWrapper(authzService *authzService.AuthzService) *Wrapper {
	return &Wrapper{
		authzService: authzService,
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
	var session *authnz.Session
	if !config.NotNeedLogin {
		// 获取session
		authnResp, err := w.authzService.Authorize(&authn.AuthnReq{
			Token:     header[httpHeaderKey.Token][0],
			UserTypes: config.UserTypes,
		})
		if err != nil {
			common.Failure(c, err)
			return
		}
		session = authnResp.Session
	}

	// 参数绑定
	fn := reflect.TypeOf(handler)
	var params []reflect.Value
	for i := 0; i < fn.NumIn(); i++ {
		paramValue, err := w.getParamValue(fn, i, c, header, session)
		if err != nil {
			common.Failure(c, common.CodeInvalidParameter)
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
		common.Failure(c, rets[1].Interface().(error))
		return
	}
	common.Success(c, rets[0].Interface().(proto.Message))
}

// 获取参数值
func (w *Wrapper) getParamValue(fn reflect.Type, paramIndex int, c *gin.Context, header http.Header,
	session *authnz.Session) (interface{}, error) {
	paramPointType := fn.In(paramIndex)
	if reflect.TypeOf(http.Header{}).AssignableTo(paramPointType) {
		return header, nil
	}
	if reflect.TypeOf(&authnz.Session{}).AssignableTo(paramPointType) {
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
