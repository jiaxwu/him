package server

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/config/log"
)

// NewLogger 日志
func NewLogger() gin.HandlerFunc {
	return gin.LoggerWithConfig(gin.LoggerConfig{
		Output: log.GetOutput(),
	})
}
