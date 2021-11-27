package common

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/common"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
	"net/http"
)

// SuccessResp 成功响应
func SuccessResp(content proto.Message) *common.Resp {
	return baseResp(CodeOK, content)
}

// FailureResp 失败响应
func FailureResp(code *Code) *common.Resp {
	return baseResp(code, nil)
}

// Success 请求成功
func Success(c *gin.Context, content proto.Message) {
	ginResp(c, SuccessResp(content))
}

// Failure 请求失败
func Failure(c *gin.Context, err error) {
	code, ok := err.(*Code)
	if ok {
		ginResp(c, FailureResp(code))
	} else {
		ginResp(c, FailureResp(CodeInternalError))
	}
}

// gin响应
func ginResp(c *gin.Context, resp *common.Resp) {
	c.ProtoBuf(http.StatusOK, resp)
}

// 响应
func baseResp(code *Code, content proto.Message) *common.Resp {
	anyContent, _ := anypb.New(content)
	return &common.Resp{
		Code:    code.code,
		Msg:     code.advice,
		Content: anyContent,
	}
}
