package server

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/common"
	"net/http"
)

// ExceptionHandler 处理异常情况
// 让异常情况也返回统一的响应格式
func ExceptionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		switch c.Writer.Status() {
		case http.StatusOK:
		case http.StatusNotFound:
			common.Failure(c, common.ErrCodeNotFound)
		default:
			common.Failure(c, common.ErrCodeInternalError)
		}
	}
}
