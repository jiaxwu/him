package db

import (
	"github.com/go-redis/redis/v8"
	"sync"
)

type RDB struct {
	rdb  *redis.Client
	once sync.Once
}

var rdb = new(RDB)

func NewRDB() *redis.Client {
	rdb.once.Do(func() {
		redisDB := redis.NewClient(&redis.Options{
			Addr:     "127.0.0.1:6379",
			Password: "",
		})
		rdb.rdb = redisDB
	})
	return rdb.rdb
}
