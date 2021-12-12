package mongo

import (
	"context"
	"github.com/jiaxwu/him/conf"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// NewMongoDB 创建MongoDB实例
func NewMongoDB(config *conf.Config, logger *logrus.Logger) *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(config.MongoDB.URI))
	if err != nil {
		logger.WithField("err", err).Fatal("can not connect mongo")
	}
	return client
}
