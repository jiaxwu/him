package db

import (
	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"him/conf"
	"him/model"
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
	if err := db.AutoMigrate(model.User{}, model.UserProfile{}, model.Friend{}, model.ChatChannel{},
		model.ChatChannelSubscribe{}, model.PasswordLogin{}, model.PhoneLogin{},
		model.AddFriendApplication{}); err != nil {
		log.Fatal("自动迁移数据库失败", err)
	}
	return db
}
