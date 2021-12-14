package mongo

import (
	"context"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/conf/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// NewMongoDB 创建MongoDB实例
func NewMongoDB(config *conf.Config) *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(config.MongoDB.URI))
	if err != nil {
		log.WithError(err).Fatal("can not connect mongo")
	}
	return client
}
