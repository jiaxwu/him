package log

import (
	"github.com/jiaxwu/him/conf"
)

// InitLog 初始化log
func InitLog(config *conf.Config) {
	SetLevel(config.Log.Level)
}
