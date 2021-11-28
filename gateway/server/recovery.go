package server

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/common/logger"
	"github.com/xiaohuashifu/him/service/common"
)

// Recovery 异常恢复
func Recovery() func(c *gin.Context) {
	return gin.CustomRecovery(func(c *gin.Context, err interface{}) {
		logger.NewLogger().WithField("err", err).Error("a panic captured")
		common.Failure(c, common.CodeInternalError)
	})
}
