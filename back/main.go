package main

import (
	"go.uber.org/fx"
	"him/conf"
	"him/conf/db"
	"him/conf/logger"
	"him/conf/rdb"
	"him/conf/validate"
	"him/service/server"
	imAccessHandler "him/service/service/im/access/handler"
	loginConf "him/service/service/login/conf"
	loginHandler "him/service/service/login/handler"
	loginService "him/service/service/login/service"
	smsService "him/service/service/sms/service"
	userProfileConf "him/service/service/user/user_profile/conf"
	userProfileConsumer "him/service/service/user/user_profile/consumer"
	userProfileHandler "him/service/service/user/user_profile/handler"
	userProfileService "him/service/service/user/user_profile/service"
	userProfileTask "him/service/service/user/user_profile/task"
	"him/service/wrap"
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
			rdb.NewRDB,
			server.NewEngine,
			server.NewServer,
			wrap.NewWrapper,
			smsService.NewSMSService,
			fx.Annotate(
				loginConf.NewLoginEventProducer,
				fx.ResultTags(`name:"LoginEventProducer"`),
			),
			fx.Annotate(
				loginService.NewLoginService,
				fx.ParamTags(`name:"LoginEventProducer"`),
			),
			fx.Annotate(
				userProfileConf.NewUserAvatarBucketOSSClient,
				fx.ResultTags(`name:"UserAvatarBucketOSSClient"`),
			),
			fx.Annotate(
				userProfileConf.NewUserProfileEventProducer,
				fx.ResultTags(`name:"UserProfileEventProducer"`),
			),
			fx.Annotate(
				userProfileService.NewUserProfileService,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`, `name:"UserProfileEventProducer"`),
			),
		),
		fx.Invoke(
			loginHandler.RegisterLoginHandler,
			userProfileHandler.RegisterUserProfileHandler,
			imAccessHandler.NewAccessHandler,
			userProfileConsumer.NewLoginEventConsumer,
			fx.Annotate(
				userProfileTask.NewUserAvatarClearTask,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`),
			),
			server.Start,
		),
		fx.WithLogger(logger.NewFxEventLogger),
	)
}
