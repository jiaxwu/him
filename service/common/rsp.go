package common

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Rsp 响应
type Rsp struct {
	Code string      `json:"Code,omitempty"` // 错误码
	Msg  string      `json:"Msg,omitempty"`  // 消息
	Data interface{} `json:"Data,omitempty"` // 数据
}

// SuccessRsp 成功响应
func SuccessRsp(data interface{}) *Rsp {
	return rsp(ErrCodeOK, data)
}

// FailureRsp 失败响应
func FailureRsp(err error) *Rsp {
	errCode, ok := err.(*ErrCode)
	if !ok {
		errCode = ErrCodeInternalError
	}
	return rsp(errCode, nil)
}

// Success 请求成功
func Success(c *gin.Context, data interface{}) {
	ginRsp(c, SuccessRsp(data))
}

// Failure 请求失败
func Failure(c *gin.Context, err error) {
	ginRsp(c, FailureRsp(err))
}

// gin响应
func ginRsp(c *gin.Context, rsp *Rsp) {
	c.JSON(http.StatusOK, rsp)
}

// 响应
func rsp(errCode *ErrCode, data interface{}) *Rsp {
	return &Rsp{
		Code: errCode.Code,
		Msg:  errCode.Advice,
		Data: data,
	}
}
