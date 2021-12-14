package server

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/conf/log"
)

// NewEngine 新建一个Gin Engine
func NewEngine() *gin.Engine {
	r := gin.New()
	r.Use(NewLogger(), Cors(), ExceptionHandler(), Recovery())
	return r
}

// Server 服务器
type Server struct {
	engine *gin.Engine
}

// NewServer 创建一个服务器
func NewServer(engine *gin.Engine) *Server {
	return &Server{
		engine: engine,
	}
}

// Start 启动服务器
func Start(server *Server, config *conf.Config) {
	log.WithField("msg", "handler exit").Warn(server.engine.Run(config.Server.Addr))
}
