package db

import (
	"github.com/jiaxwu/him/conf"
	friendModel "github.com/jiaxwu/him/service/service/friend/model"
	groupModel "github.com/jiaxwu/him/service/service/group/model"
	authModel "github.com/jiaxwu/him/service/service/user/auth/model"
	userProfileModel "github.com/jiaxwu/him/service/service/user/profile/model"
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
	if err := db.AutoMigrate(authModel.User{}, authModel.PasswordLogin{}, authModel.PhoneLogin{},
		userProfileModel.UserProfile{}, friendModel.Friend{}, friendModel.AddFriendApplication{}, groupModel.Group{},
		groupModel.GroupMember{}); err != nil {
		log.Fatal("自动迁移数据库失败", err)
	}
	return db
}
