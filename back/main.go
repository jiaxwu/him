package main

import (
	httpRouter "github.com/XiaoHuaShiFu/him/back/http"
	"github.com/XiaoHuaShiFu/him/back/link"
	"github.com/XiaoHuaShiFu/him/back/logic"
	"github.com/XiaoHuaShiFu/him/back/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Cors() gin.HandlerFunc {
	return func(context *gin.Context) {
		method := context.Request.Method
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		context.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		context.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		context.Header("Access-Control-Allow-Credentials", "true")
		if method == "OPTIONS" {
			context.AbortWithStatus(http.StatusNoContent)
		}
		context.Next()
	}
}

func main() {
	r := gin.Default()
	r.Use(Cors())
	server := link.NewServer()
	storage := service.NewRedisStorage()
	userService := service.NewUserService()
	imLoginService := service.NewIMLoginService(storage, server)
	imOfflineService := service.NewIMOfflineService(storage, server)
	imMessageService := service.NewIMMessageService(storage, server, imOfflineService)
	handler := logic.NewHandler(imLoginService, userService, server, storage, imMessageService, imOfflineService)
	channels := link.NewChannels()
	server.SetAcceptor(handler)
	server.SetMessageListener(handler)
	server.SetStateListener(handler)
	server.SetChannelMap(channels)

	router := httpRouter.NewRouter(userService)

	r.GET("/ws", func(c *gin.Context) {
		server.Handle(c.Request, c.Writer)
	})
	r.GET("/login", router.Login)
	r.Run() // listen and serve on 0.0.0.0:8080
}
