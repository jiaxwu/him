package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"him/service/service/im/gateway/protocol"
)

func main() {
	engine := gin.Default()
	engine.Use(cors.Default())
	engine.POST("test", func(c *gin.Context) {
		var req protocol.Request
		if err := c.ShouldBind(&req); err != nil {
			fmt.Println(err)
			return
		}
		fmt.Printf("%+v\n", req)
	})
}
