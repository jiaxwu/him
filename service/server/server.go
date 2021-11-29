package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"him/conf"
)

// NewEngine 新建一个Gin Engine
func NewEngine(logger *logrus.Logger) *gin.Engine {
	r := gin.New()
	r.Use(NewLogger(logger), ExceptionHandler(), Recovery(logger))
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
func Start(server *Server, logger *logrus.Logger, config *conf.Config) {
	logger.WithField("msg", "handler exit").Warn(server.engine.Run(config.Server.Addr))
}
