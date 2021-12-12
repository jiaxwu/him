package db

import (
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/model"
	"github.com/jiaxwu/him/service/service/auth"
	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

func NewDB(log *logrus.Logger, config *conf.Config) *gorm.DB {
	newLogger := logger.New(
		log,
		logger.Config{
			LogLevel: logger.Info,
		},
	)
	db, err := gorm.Open(mysql.Open(config.MySQL.DSN), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger: newLogger,
	})
	if err != nil {
		log.Fatal("打开数据库失败", err)
	}
	if err := db.AutoMigrate(auth.User{}, model.UserProfile{}, model.Friend{}, model.ChatChannel{},
		model.ChatChannelSubscribe{}, auth.PasswordLogin{}, auth.PhoneLogin{},
		model.AddFriendApplication{}, model.Group{}, model.GroupMember{}); err != nil {
		log.Fatal("自动迁移数据库失败", err)
	}
	return db
}
