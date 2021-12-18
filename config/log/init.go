package log

import (
	"github.com/jiaxwu/him/config"
)

// InitLog 初始化log
func InitLog(config *config.Config) {
	SetLevel(config.Log.Level)
}
