package logger

import (
	"github.com/sirupsen/logrus"
	"os"
	"strings"
)

type RocketMqLogger struct {
	logger *logrus.Logger
}

func (l *RocketMqLogger) Debug(msg string, fields map[string]interface{}) {
	if msg == "" && len(fields) == 0 {
		return
	}
	l.logger.WithFields(fields).Debug(msg)
}

func (l *RocketMqLogger) Info(msg string, fields map[string]interface{}) {
	if msg == "" && len(fields) == 0 {
		return
	}
	l.logger.WithFields(fields).Info(msg)
}

func (l *RocketMqLogger) Warning(msg string, fields map[string]interface{}) {
	if msg == "" && len(fields) == 0 {
		return
	}
	l.logger.WithFields(fields).Warning(msg)
}

func (l *RocketMqLogger) Error(msg string, fields map[string]interface{}) {
	if msg == "" && len(fields) == 0 {
		return
	}
	l.logger.WithFields(fields).WithFields(fields).Error(msg)
}

func (l *RocketMqLogger) Fatal(msg string, fields map[string]interface{}) {
	if msg == "" && len(fields) == 0 {
		return
	}
	l.logger.WithFields(fields).Fatal(msg)
}

func (l *RocketMqLogger) Level(level string) {
	switch strings.ToLower(level) {
	case "debug":
		l.logger.SetLevel(logrus.DebugLevel)
	case "warn":
		l.logger.SetLevel(logrus.WarnLevel)
	case "error":
		l.logger.SetLevel(logrus.ErrorLevel)
	default:
		l.logger.SetLevel(logrus.InfoLevel)
	}
}

func (l *RocketMqLogger) OutputPath(path string) (err error) {
	var file *os.File
	file, err = os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		return
	}

	l.logger.Out = file
	return
}
