package conf

import (
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type Config struct {
	MySQL    *MySQL
	Redis    *Redis
	COS      *COS
	Server   *Server
	SMS      *SMS
	RocketMQ *RocketMQ
}

// NewConf 初始化配置
func NewConf(logger *logrus.Logger) *Config {
	var config Config
	viper.SetConfigName("conf")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./conf/")
	if err := viper.ReadInConfig(); err != nil {
		logger.Fatal("初始化配置失败", err)
	}
	if err := viper.Unmarshal(&config); err != nil {
		logger.Fatal("初始化配置失败", err)
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

type RocketMQ struct {
	Topic        string   // 主题
	NameSrvAddrs []string // 名字服务器地址
}
