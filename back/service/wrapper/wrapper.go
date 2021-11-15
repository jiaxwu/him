package wrapper

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	loginService "him/service/service/login/service"
	"io"
	"math"
	"reflect"
)

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
	var header common.Header
	if err := c.ShouldBindHeader(&header); err != nil {
		common.Failure(c, common.ErrCodeInvalidParameter)
		return
	}

	// 如果需要登录则进行验证
	var session *common.Session
	if isNeedLogin {
		// 获取session
		authorizeRsp, err := w.loginService.Authorize(&loginModel.AuthorizeReq{
			Token:     header.Token,
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
		paramValue, err := w.getParamValue(fn, i, c, &header, session)
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
func (w *Wrapper) getParamValue(fn reflect.Type, paramIndex int, c *gin.Context, header *common.Header,
	session *common.Session) (interface{}, error) {
	paramPointType := fn.In(paramIndex)
	if reflect.TypeOf(&common.Header{}).AssignableTo(paramPointType) {
		return header, nil
	}
	if reflect.TypeOf(&common.Session{}).AssignableTo(paramPointType) {
		return session, nil
	}
	if reflect.TypeOf(&common.File{}).AssignableTo(paramPointType) {
		return w.getFile(c)
	}
	if reflect.TypeOf([]*common.File{}).AssignableTo(paramPointType) {
		return w.getFiles(c, math.MaxInt)
	}

	// 否则必须是自定义struct，并从请求获取参数
	reqStructType := paramPointType.Elem()
	req := reflect.New(reqStructType)
	if err := c.ShouldBind(req.Interface()); err != nil {
		return nil, err
	}
	return req.Interface(), nil
}

// 从MultipartForm获取一个文件
func (w *Wrapper) getFile(c *gin.Context) (*common.File, error) {
	files, err := w.getFiles(c, 1)
	if err != nil {
		return nil, err
	}
	return files[0], err
}

// 从MultipartForm获取文件
func (w *Wrapper) getFiles(c *gin.Context, size int) ([]*common.File, error) {
	multipartForm, err := c.MultipartForm()
	if err != nil {
		return nil, err
	}
	multipartFiles := multipartForm.File
	if len(multipartFiles) < 1 {
		return nil, nil
	}

	var files []*common.File
	for _, fileHeaders := range multipartFiles {
		for _, fileHeader := range fileHeaders {
			file, err := fileHeader.Open()
			if err != nil {
				return nil, err
			}

			fileBytes, err := io.ReadAll(file)
			if err != nil {
				return nil, err
			}
			files = append(files, &common.File{
				Content:     fileBytes,
				Name:        fileHeader.Filename,
				ContentType: fileHeader.Header.Get("Content-Type"),
			})
			if len(files) >= size {
				break
			}
		}
		break
	}

	return files, nil
}
