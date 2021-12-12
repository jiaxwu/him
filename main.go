package main

import (
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/conf/db"
	"github.com/jiaxwu/him/conf/logger"
	"github.com/jiaxwu/him/conf/mongo"
	"github.com/jiaxwu/him/conf/rdb"
	"github.com/jiaxwu/him/conf/validate"
	"github.com/jiaxwu/him/service/server"
	"github.com/jiaxwu/him/service/service/friend"
	"github.com/jiaxwu/him/service/service/group"
	"github.com/jiaxwu/him/service/service/msg"
	msgGateway "github.com/jiaxwu/him/service/service/msg/gateway"
	msgSender "github.com/jiaxwu/him/service/service/msg/sender"
	msgShort "github.com/jiaxwu/him/service/service/msg/short"
	msgTransfer "github.com/jiaxwu/him/service/service/msg/transfer"
	"github.com/jiaxwu/him/service/service/sm"
	"github.com/jiaxwu/him/service/service/user/auth"
	authHandler "github.com/jiaxwu/him/service/service/user/auth/handler"
	"github.com/jiaxwu/him/service/service/user/profile"
	"github.com/jiaxwu/him/service/wrap"
	"go.uber.org/fx"
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
			auth.NewService,
			fx.Annotate(
				profile.NewUserAvatarBucketOSSClient,
				fx.ResultTags(`name:"UserAvatarBucketOSSClient"`),
			),
			fx.Annotate(
				profile.NewUserProfileUpdateEventProducer,
				fx.ResultTags(`name:"UserProfileUpdateEventProducer"`),
			),
			fx.Annotate(
				profile.NewService,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`, `name:"UserProfileUpdateEventProducer"`),
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
				msgShort.NewMsgBucketOSSClient,
				fx.ResultTags(`name:"MsgBucketOSSClient"`),
			),
			fx.Annotate(
				msgShort.NewService,
				fx.ParamTags(`name:"MongoOfflineMsgCollection"`, `name:"MsgBucketOSSClient"`),
			),
			friend.NewService,
			group.NewService,
		),
		fx.Invoke(
			authHandler.RegisterHandler,
			profile.RegisterUserProfileHandler,
			msgShort.RegisterHandler,
			friend.RegisterHandler,
			group.RegisterHandler,
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
