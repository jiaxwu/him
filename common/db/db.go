package db

import (
	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"github.com/xiaohuashifu/him/conf"
	loginDB "github.com/xiaohuashifu/him/service/service/login/db"
	userProfileDB "github.com/xiaohuashifu/him/service/service/user/profile/db"
	model2 "github.com/xiaohuashifu/him/test/model"
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
	if err := db.AutoMigrate(loginDB.User{}, userProfileDB.UserProfile{}, model2.Wallet{}, model2.Trade{},
		model2.Friend{}, model2.ChatChannel{}, model2.ChatChannelSubscribe{}, model2.Message{}, model2.UnAckMessage{},
		loginDB.PasswordLogin{}, loginDB.PhoneLogin{}, model2.Announcement{}); err != nil {
		log.Fatal("自动迁移数据库失败", err)
	}
	return db
}
