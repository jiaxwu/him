package rdb

import (
	"github.com/go-redis/redis/v8"
	"github.com/jiaxwu/him/config"
)

func NewRDB(config *config.Config) *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     config.Redis.Addr,
		Password: config.Redis.Password,
	})
	return rdb
}
