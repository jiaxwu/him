package conf

import (
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	MySQL    *MySQL
	Redis    *Redis
	COS      *COS
	Server   *Server
	SMS      *SMS
	Logger   *Logger
	Kafka    *Kafka
	MongoDB  *MongoDB
}

// NewConf 初始化配置
func NewConf() *Config {
	var config Config
	viper.SetConfigName("conf")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./conf/")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("初始化配置失败", err)
	}
	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal("初始化配置失败", err)
	}
	return &config
}

type MySQL struct {
	DSN string
}

type Redis struct {
	Addr     string
	Password string
}

type COS struct {
	SecretID  string
	SecretKey string
}

type Server struct {
	Addr string // 服务器监听地址
	Env  string // 当前环境，dev开发，pro生产
}

type SMS struct {
	SecretID    string // 密钥编号
	SecretKey   string // 密钥
	Region      string // 区域
	SMSSDKAppID string // 应用ID
	SignName    string // 签名
}

type Logger struct {
	Level string // 日志等级
}

type Kafka struct {
	Addrs []string // 地址
}

type MongoDB struct {
	URI string // 地址
}
