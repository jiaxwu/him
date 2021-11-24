package server

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/service/common"
	"net/http"
)

// ExceptionHandler 处理异常情况
// 让异常情况也返回统一的响应格式
func ExceptionHandler() func(c *gin.Context) {
	return func(c *gin.Context) {
		c.Next()
		switch c.Writer.Status() {
		case http.StatusOK:
		case http.StatusNotFound:
			common.Failure(c, common.ErrCodeNotFoundURL)
		default:
			common.Failure(c, common.ErrCodeInternalError)
		}
	}
}
