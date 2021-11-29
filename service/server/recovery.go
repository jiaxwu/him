package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"him/service/common"
)

// Recovery 异常恢复
func Recovery(logger *logrus.Logger) gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, err interface{}) {
		logger.WithField("err", err).Error("a panic captured")
		common.Failure(c, common.ErrCodeInternalError)
	})
}
