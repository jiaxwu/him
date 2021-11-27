package main

import (
	"github.com/xiaohuashifu/him/common/db"
	logger2 "github.com/xiaohuashifu/him/common/logger"
	"github.com/xiaohuashifu/him/common/rdb"
	"github.com/xiaohuashifu/him/common/validate"
	"github.com/xiaohuashifu/him/conf"
	"github.com/xiaohuashifu/him/service/server"
	loginConf "github.com/xiaohuashifu/him/service/service/authnz/authz/conf"
	loginHandler "github.com/xiaohuashifu/him/service/service/authnz/authz/handler"
	loginService "github.com/xiaohuashifu/him/service/service/authnz/authz/service"
	imGatewayHandler "github.com/xiaohuashifu/him/service/service/im/gateway/handler"
	imServiceHandler "github.com/xiaohuashifu/him/service/service/im/service/handler"
	smsService "github.com/xiaohuashifu/him/service/service/sms/service"
	userProfileConf "github.com/xiaohuashifu/him/service/service/user/profile/conf"
	userProfileConsumer "github.com/xiaohuashifu/him/service/service/user/profile/consumer"
	userProfileHandler "github.com/xiaohuashifu/him/service/service/user/profile/handler"
	userProfileService "github.com/xiaohuashifu/him/service/service/user/profile/service"
	userProfileTask "github.com/xiaohuashifu/him/service/service/user/profile/task"
	"github.com/xiaohuashifu/him/service/wrap"
	"go.uber.org/fx"
)

func main() {
	NewApp().Run()
}

func NewApp() *fx.App {
	return fx.New(
		fx.Provide(
			logger2.NewLogger,
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
				loginService.NewAuthzService,
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
			imServiceHandler.RegisterIMServiceHandler,
			imGatewayHandler.NewGatewayHandler,
			userProfileConsumer.NewLoginEventConsumer,
			fx.Annotate(
				userProfileTask.NewUserAvatarClearTask,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`),
			),
			server.Start,
		),
		fx.WithLogger(logger2.NewFxEventLogger),
	)
}
