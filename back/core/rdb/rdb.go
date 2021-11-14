package rdb

import (
	"github.com/go-redis/redis/v8"
	"lolmclient/conf"
)

func NewRDB(config *conf.Config) *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     config.Redis.Addr,
		Password: config.Redis.Password,
	})
	return rdb
}
