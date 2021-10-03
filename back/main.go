package main

import (
	"github.com/XiaoHuaShiFu/him/back/http"
	"github.com/XiaoHuaShiFu/him/back/link"
	"github.com/XiaoHuaShiFu/him/back/logic"
	"github.com/XiaoHuaShiFu/him/back/service"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	server := link.NewServer()
	storage := service.NewRedisStorage()
	userService := service.NewUserService()
	imLoginService := service.NewIMLoginService(storage, server)
	imMessageService := service.NewIMMessageService(storage, server)
	handler := logic.NewHandler(imLoginService, userService, server, storage, imMessageService)
	channels := link.NewChannels()
	server.SetAcceptor(handler)
	server.SetMessageListener(handler)
	server.SetStateListener(handler)
	server.SetChannelMap(channels)

	router := http.NewRouter(userService)

	r.GET("/ws", func(c *gin.Context) {
		server.Handle(c.Request, c.Writer)
	})
	r.GET("/login", router.Login)
	r.Run() // listen and serve on 0.0.0.0:8080
}