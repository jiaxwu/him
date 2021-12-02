package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"him/service/service/msg"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
	ctx, cancel = context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	err = client.Ping(ctx, readpref.Primary())
	collection := client.Database("him").Collection("offline_msg")
	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	msg0 := msg.Msg{
		UserID: 1,
		Seq:    6,
		MsgID:  "312312",
		Sender: &msg.Sender{
			Type:     "312",
			SenderID: 2,
			Terminal: "32131",
		},
		Receiver: &msg.Receiver{
			Type:       "321",
			ReceiverID: 65,
		},
		SendTime:      123321,
		ArrivalTime:   32131231,
		CorrelationID: "dazasdas",
		Content: &msg.Content{TextMsg: &msg.TextMsg{
			Content:     "312312",
			IsAtAll:     false,
			IsNotice:    true,
			AtUserIDS:   []uint64{1, 2, 3},
			QuotedMsgID: 0,
		}},
	}
	res, err := collection.InsertOne(ctx, &msg0)
	fmt.Printf("%+v\n", mongo.IsDuplicateKeyError(err))
	id := res.InsertedID
	fmt.Println(id)


	//filter := bson.D{
	//	{"UserID", 3},
	//	{"$or", bson.A{
	//		bson.D{{"Seq", bson.D{
	//			{"$gte", 3},
	//			{"$lte", 4},
	//		}}},
	//		bson.D{{"Seq", bson.D{
	//			{"$gte", 5},
	//			{"$lte", 6},
	//		}}},
	//	},
	//	}}
	//find, err := collection.Find(ctx, filter)
	//fmt.Println(err)
	//var msgs []msg.Msg
	//find.All(ctx, &msgs)
	//fmt.Printf("%+v\n", msgs)
}
