package db

import (
	"github.com/sirupsen/logrus"
	"github.com/xiaohuashifu/him/conf"
	db3 "github.com/xiaohuashifu/him/service/authnz/authz/db"
	userProfileDB "github.com/xiaohuashifu/him/service/user/profile/db"
	model2 "github.com/xiaohuashifu/him/test/model"
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
	if err := db.AutoMigrate(db3.User{}, userProfileDB.UserProfile{}, model2.Wallet{}, model2.Trade{},
		model2.Friend{}, model2.ChatChannel{}, model2.ChatChannelSubscribe{}, model2.Message{}, model2.UnAckMessage{},
		db3.PwdLogin{}, db3.PhoneLogin{}, model2.Announcement{}); err != nil {
		log.Fatal("自动迁移数据库失败", err)
	}
	return db
}
