package common

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// rsp 响应
type rsp struct {
	Code string      `json:"code,omitempty"` // 错误码
	Msg  string      `json:"msg,omitempty"`  // 消息
	Data interface{} `json:"data,omitempty"` // 数据
}

// Success 请求成功
func Success(c *gin.Context, data interface{}) {
	jsonRsp(c, ErrCodeOK, data)
}

// Failure 请求失败
func Failure(c *gin.Context, errCode ErrCode) {
	jsonRsp(c, errCode, nil)
}

// jsonRsp 响应
func jsonRsp(c *gin.Context, errCode ErrCode, data interface{}) {
	c.JSON(http.StatusOK, &rsp{
		Code: errCode.Code(),
		Msg:  errCode.Advice(),
		Data: data,
	})
}
