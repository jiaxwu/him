package common

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/common"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
	"net/http"
)

// SuccessRsp 成功响应
func SuccessRsp(data proto.Message) *common.Resp {
	bytesData, _ := proto.Marshal(data)
	return baseRsp(ErrCodeOK, bytesData)
}

// FailureRsp 失败响应
func FailureRsp(errCode *ErrCode) *common.Rsp {
	return baseRsp(errCode, nil)
}

// Success 请求成功
func Success(c *gin.Context, data proto.Message) {
	ginRsp(c, SuccessRsp(data))
}

// Failure 请求失败
func Failure(c *gin.Context, errCode *ErrCode) {
	ginRsp(c, FailureRsp(errCode))
}

// gin响应
func ginRsp(c *gin.Context, rsp *common.Rsp) {
	c.ProtoBuf(http.StatusOK, rsp)
}

// 响应
func baseRsp(errCode *ErrCode, data proto.Message) *common.Resp {
	content, _ := anypb.New(data)
	return &common.Resp{
		Code:    errCode.Code,
		Msg:     errCode.Advice,
		Content: content,
	}
}
