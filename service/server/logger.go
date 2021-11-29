package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// NewLogger 日志
func NewLogger(logger *logrus.Logger) gin.HandlerFunc {
	return gin.LoggerWithConfig(gin.LoggerConfig{
		Output: logger.Out,
	})
}
