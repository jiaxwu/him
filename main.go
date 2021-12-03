package main

import (
	"go.uber.org/fx"
	"him/conf"
	"him/conf/db"
	"him/conf/logger"
	"him/conf/mongo"
	"him/conf/rdb"
	"him/conf/validate"
	"him/service/server"
	"him/service/service/auth"
	authHandler "him/service/service/auth/handler"
	"him/service/service/friend"
	"him/service/service/msg"
	msgGateway "him/service/service/msg/gateway"
	msgSender "him/service/service/msg/sender"
	msgShort "him/service/service/msg/short"
	msgTransfer "him/service/service/msg/transfer"
	"him/service/service/sm"
	"him/service/service/user/profile"
	"him/service/wrap"
)

func main() {
	NewApp().Run()
}

func NewApp() *fx.App {
	return fx.New(
		fx.Provide(
			conf.NewConf,
			validate.NewValidate,
			logger.NewLogger,
			db.NewDB,
			mongo.NewMongoDB,
			rdb.NewRDB,
			server.NewEngine,
			server.NewServer,
			wrap.NewWrapper,
			fx.Annotate(
				msg.NewMongoOfflineMsgCollection,
				fx.ResultTags(`name:"MongoOfflineMsgCollection"`),
			),
			sm.NewService,
			fx.Annotate(
				auth.NewAuthEventProducer,
				fx.ResultTags(`name:"AuthEventProducer"`),
			),
			fx.Annotate(
				auth.NewService,
				fx.ParamTags(`name:"AuthEventProducer"`),
			),
			fx.Annotate(
				profile.NewUserAvatarBucketOSSClient,
				fx.ResultTags(`name:"UserAvatarBucketOSSClient"`),
			),
			fx.Annotate(
				profile.NewUserProfileEventProducer,
				fx.ResultTags(`name:"UserProfileEventProducer"`),
			),
			fx.Annotate(
				profile.NewService,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`, `name:"UserProfileEventProducer"`),
			),
			msg.NewIDGenerator,
			fx.Annotate(
				msgSender.NewSendMsgProducer,
				fx.ResultTags(`name:"SendMsgProducer"`),
			),
			fx.Annotate(msgSender.NewService,
				fx.ParamTags(`name:"SendMsgProducer"`),
			),
			msgGateway.NewGatewayServer,
			msgGateway.NewService,
			fx.Annotate(
				msgTransfer.NewPushMsgProducer,
				fx.ResultTags(`name:"PushMsgProducer"`),
			),
			fx.Annotate(
				msgShort.NewService,
				fx.ParamTags(`name:"MongoOfflineMsgCollection"`),
			),
			friend.NewService,
		),
		fx.Invoke(
			authHandler.RegisterHandler,
			profile.RegisterUserProfileHandler,
			msgShort.RegisterHandler,
			friend.RegisterHandler,
			profile.NewAuthEventConsumer,
			fx.Annotate(
				msgTransfer.NewSendMsgConsumer,
				fx.ParamTags(`name:"PushMsgProducer"`, `name:"MongoOfflineMsgCollection"`),
			),
			msgGateway.NewPushMsgConsumer,
			fx.Annotate(
				profile.NewUserAvatarClearTask,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`),
			),
			server.Start,
		),
		fx.WithLogger(logger.NewFxEventLogger),
	)
}
