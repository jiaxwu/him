package mongo

import (
	"context"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// NewMongoDB 创建MongoDB实例
func NewMongoDB(config *config.Config) *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(config.MongoDB.URI))
	if err != nil {
		log.WithError(err).Fatal("can not connect mongo")
	}
	return client
}
