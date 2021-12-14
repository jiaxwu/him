package main

import (
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/conf/db"
	"github.com/jiaxwu/him/conf/log"
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
	"github.com/jiaxwu/him/service/service/user"
	userHandler "github.com/jiaxwu/him/service/service/user/handler"
	"github.com/jiaxwu/him/service/wrap"
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
)

func main() {
	NewApp().Run()
}

func NewApp() *fx.App {
	return fx.New(
		fx.Provide(conf.NewConf),
		fx.Invoke(log.InitLog),
		fx.Provide(
			validate.NewValidate,
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
			userHandler.RegisterHandler,
			msgShort.RegisterHandler,
			friend.RegisterHandler,
			group.RegisterHandler,
			fx.Annotate(
				msgTransfer.NewSendMsgConsumer,
				fx.ParamTags(`name:"PushMsgProducer"`, `name:"MongoOfflineMsgCollection"`),
			),
			msgGateway.NewPushMsgConsumer,
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
