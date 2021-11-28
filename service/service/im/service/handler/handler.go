package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/service/common"
	"github.com/xiaohuashifu/him/service/wrap"
)

func RegisterIMServiceHandler(engine *gin.Engine, wrapper *wrap.Wrapper) {
	engine.POST("test", wrapper.Wrap(func(req *content.Image) (*content.Image, common.Error) {
		fmt.Printf("%+v\n", req)
		return nil, nil
	}, &wrap.Config{
		NotNeedLogin:    true,
		NotNeedResponse: true,
	}))

}
