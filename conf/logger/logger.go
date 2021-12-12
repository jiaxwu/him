package logger

import (
	"github.com/apache/rocketmq-client-go/v2/rlog"
	"github.com/sirupsen/logrus"
	"github.com/jiaxwu/him/conf"
)

func NewLogger(config *conf.Config) *logrus.Logger {
	logger := logrus.New()
	level, err := logrus.ParseLevel(config.Logger.Level)
	if err != nil {
		logger.Fatal(err)
	}
	logger.SetLevel(level)
	rlog.SetLogger(&RocketMqLogger{logger: logger})
	return logger
}
