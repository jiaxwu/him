package main

import (
	"go.uber.org/fx"
	"lolmclient/conf"
	"lolmclient/core/db"
	"lolmclient/core/logger"
	"lolmclient/core/oss"
	"lolmclient/core/rdb"
	"lolmclient/core/validate"
	"lolmclient/service/server"
	loginHandler "lolmclient/service/service/login/handler"
	loginService "lolmclient/service/service/login/service"
	smsService "lolmclient/service/service/sms/service"
	userProfileHandler "lolmclient/service/service/user/user_profile/handler"
	userProfileService "lolmclient/service/service/user/user_profile/service"
	"lolmclient/service/wrapper"
)

func main() {
	NewApp().Run()
}

func NewApp() *fx.App {
	return fx.New(
		fx.Provide(
			logger.NewLogger,
			validate.NewValidate,
			conf.NewConf,
			db.NewDB,
			oss.NewOSS,
			rdb.NewRDB,
			server.NewEngine,
			server.NewServer,
			wrapper.NewHandlerWrapper,
			wrapper.NewServiceWrapper,
			smsService.NewSMSService,
			loginService.NewLoginService,
			userProfileService.NewUserProfileService,
		),
		fx.Invoke(
			loginHandler.RegisterLoginHandler,
			userProfileHandler.RegisterUserProfileHandler,
			server.Start,
		),
		fx.WithLogger(logger.NewFxEventLogger),
	)
}
