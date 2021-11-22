package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/proto"
	"him/service/service/im/gateway/protocol"
	"net/http"
)

func main() {
	engine := gin.Default()
	engine.Use(cors.Default())
	engine.POST("test", func(c *gin.Context) {
		c
		//bytes := []byte{10, 7, 8, 1, 16, 1, 24, 205, 2}
		var req protocol.Request

		if err := c.ShouldBind(&req); err != nil {
			fmt.Println(err)
			return
		}
		response := protocol.Response{
			CorrelationID: req.Header.CorrelationID,
			Code:          "333",
			Msg:           "4444",
			Body:          nil,
		}
		c.ProtoBuf(http.StatusOK, &response)
	})
	engine.Run()
}
