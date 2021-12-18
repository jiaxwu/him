package server

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/config/log"
)

// Recovery 异常恢复
func Recovery() gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, err any) {
		log.WithField("err", err).Error("a panic captured")
		common.Failure(c, common.ErrCodeInternalError)
	})
}
