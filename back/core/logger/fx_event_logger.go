package logger

import (
	"github.com/sirupsen/logrus"
	"go.uber.org/fx/fxevent"
)

// NewFxEventLogger fx_event 的logger
func NewFxEventLogger(logger *logrus.Logger) fxevent.Logger {
	return &fxevent.ConsoleLogger{
		W: logger.Out,
	}
}