package msg

import (
	"context"
	"github.com/jiaxwu/him/config/log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	MongoDBOfflineMsgDatabaseName   = "him"         // mongo离线消息数据库名
	MongoDBOfflineMsgCollectionName = "offline_msg" // mongo离线消息集合名
)

// NewMongoOfflineMsgCollection mongo离线消息集合
func NewMongoOfflineMsgCollection(client *mongo.Client) *mongo.Collection {
	collection := client.Database(MongoDBOfflineMsgDatabaseName).Collection(MongoDBOfflineMsgCollectionName)
	if _, err := collection.Indexes().CreateOne(context.Background(), mongo.IndexModel{
		Keys: bson.D{
			{"UserID", 1},
			{"Seq", 1},
		},
		Options: options.Index().SetUnique(true),
	}); err != nil {
		log.WithError(err).Fatal("can not create index")
	}
	return collection
}
