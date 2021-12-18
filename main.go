package main

import (
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/db"
	"github.com/jiaxwu/him/config/log"
	"github.com/jiaxwu/him/config/mongo"
	"github.com/jiaxwu/him/config/rdb"
	"github.com/jiaxwu/him/config/validate"
	"github.com/jiaxwu/him/server"
	"github.com/jiaxwu/him/service/friend"
	"github.com/jiaxwu/him/service/group"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/gateway"
	"github.com/jiaxwu/him/service/msg/sender"
	"github.com/jiaxwu/him/service/msg/short"
	"github.com/jiaxwu/him/service/msg/transfer"
	"github.com/jiaxwu/him/service/sm"
	"github.com/jiaxwu/him/service/user"
	userHandler "github.com/jiaxwu/him/service/user/handler"
	"github.com/jiaxwu/him/wrap"
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
)

func main() {
	NewApp().Run()
}

func NewApp() *fx.App {
	return fx.New(
		fx.Provide(config.New),
		fx.Invoke(log.InitLog),
		fx.Provide(
			validate.NewValidate,
			db.NewDB,
			mongo.NewMongoDB,
			rdb.NewRDB,
			server.NewEngine,
			server.NewServer,
			wrap.NewWrapper,
			sm.NewTencentSMSClient,
			sm.NewService,
			fx.Annotate(
				user.NewAvatarBucketOSSClient,
				fx.ResultTags(`name:"UserAvatarBucketOSSClient"`),
			),
			fx.Annotate(
				user.NewUpdateUserEventProducer,
				fx.ResultTags(`name:"UpdateUserEventProducer"`),
			),
			fx.Annotate(
				user.NewService,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`, `name:"UpdateUserEventProducer"`),
			),
			msg.NewIDGenerator,
			fx.Annotate(
				msg.NewMongoOfflineMsgCollection,
				fx.ResultTags(`name:"MongoOfflineMsgCollection"`),
			),
			fx.Annotate(
				sender.NewSendMsgProducer,
				fx.ResultTags(`name:"SendMsgProducer"`),
			),
			fx.Annotate(
				sender.NewService,
				fx.ParamTags(`name:"SendMsgProducer"`),
			),
			gateway.NewGatewayServer,
			gateway.NewService,
			fx.Annotate(
				transfer.NewPushMsgProducer,
				fx.ResultTags(`name:"PushMsgProducer"`),
			),
			fx.Annotate(
				short.NewMsgBucketOSSClient,
				fx.ResultTags(`name:"MsgBucketOSSClient"`),
			),
			fx.Annotate(
				short.NewService,
				fx.ParamTags(`name:"MongoOfflineMsgCollection"`, `name:"MsgBucketOSSClient"`),
			),
			friend.NewService,
			group.NewService,
		),
		fx.Invoke(
			userHandler.RegisterHandler,
			short.RegisterHandler,
			friend.RegisterHandler,
			group.RegisterHandler,
			fx.Annotate(
				transfer.NewSendMsgConsumer,
				fx.ParamTags(`name:"PushMsgProducer"`, `name:"MongoOfflineMsgCollection"`),
			),
			gateway.NewPushMsgConsumer,
			fx.Annotate(
				user.NewUserAvatarClearTask,
				fx.ParamTags(`name:"UserAvatarBucketOSSClient"`),
			),
			server.Start,
		),
		fx.WithLogger(NewFxEventLogger),
	)
}

// NewFxEventLogger fx_event 的logger
func NewFxEventLogger() fxevent.Logger {
	return &fxevent.ConsoleLogger{
		W: log.GetOutput(),
	}
}
