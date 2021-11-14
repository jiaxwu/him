package main

import (
	"go.uber.org/fx"
	"him/conf"
	"him/core/db"
	"him/core/logger"
	"him/core/oss"
	"him/core/rdb"
	"him/core/validate"
	"him/service/server"
	loginHandler "him/service/service/login/handler"
	loginService "him/service/service/login/service"
	smsService "him/service/service/sms/service"
	userProfileHandler "him/service/service/user/user_profile/handler"
	userProfileService "him/service/service/user/user_profile/service"
	"him/service/wrapper"
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
