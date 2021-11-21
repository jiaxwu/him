package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"him/service/common"
	"him/service/service/im/gateway/protocol"
	"him/service/wrap"
)

func RegisterIMServiceHandler(engine *gin.Engine, wrapper *wrap.Wrapper) {
	engine.POST("test", wrapper.Wrap(func(req *protocol.Request) (*protocol.Response, common.Error) {
		fmt.Printf("%+v\n", req)
		return nil, nil
	}, &wrap.Config{
		NotNeedLogin:    true,
		NotNeedResponse: true,
	}))

}
