package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"log"
	"os"
	"sync"
	"time"
)

type Model struct {
	ID        int64 `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type MessageIndex struct {
	ID        int64  `gorm:"primarykey"`
	UserA  int64 `gorm:"index;size:60;not null;comment:队列唯一标识"`
	UserB  int64 `gorm:"size:60;not null;comment:另一方"`
	Direction byte   `gorm:"default:0;not null;comment:1表示AccountA为发送者"`
	MessageID int64  `gorm:"not null;comment:关联消息内容表中的ID"`
	SendTime  int64  `gorm:"index;not null;comment:消息发送时间"`
}

type MessageContent struct {
	ID       int64  `gorm:"primarykey"`
	Type     byte   `gorm:"default:0"`
	Body     string `gorm:"size:5000;not null"`
	Extra    string `gorm:"size:500"`
	SendTime int64  `gorm:"index"`
}

type User struct {
	Model
	Username string `gorm:"uniqueIndex;size:60"`
	Password string `gorm:"size:30"`
	Avatar   string `gorm:"size:200"`
	Nickname string `gorm:"size:20"`
}

type Fans struct {
	UserA int64 // 自己
	UserB int64 // 粉丝
}

type DB struct {
	db   *gorm.DB
	once sync.Once
}

var db = &DB{}

func NewDB() *gorm.DB {
	db.once.Do(func() {
		defaultLogger := logger.New(log.New(os.Stdout, "\r\n", log.LstdFlags), logger.Config{
			SlowThreshold: 200 * time.Millisecond,
			LogLevel:      logger.Warn,
			Colorful:      true,
		})
		dsn := "root:root@tcp(127.0.0.1:3306)/him?parseTime=True"
		mysqlDB, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
			NamingStrategy: schema.NamingStrategy{
				SingularTable: true,
			},
			Logger: defaultLogger,
		})
		if err != nil {
			log.Fatal("初始化DB失败", err)
		}
		_ = mysqlDB.AutoMigrate(&User{}, &MessageContent{}, &MessageIndex{}, &Fans{})
		db.db = mysqlDB
	})
	return db.db
}
