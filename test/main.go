package main

import (
	"fmt"
	"github.com/Shopify/sarama"
	"log"
)

func main() {
	config := sarama.NewConfig()
	config.Producer.Return.Successes = true
	config.Producer.RequiredAcks = sarama.WaitForAll

	producer, err := sarama.NewSyncProducer([]string{"49.233.30.197:9092"}, config)
	if err != nil {
		panic(err)
	}
	partition, offset, err := producer.SendMessage(&sarama.ProducerMessage{
		Topic: "topic-1",
		Key:   sarama.StringEncoder("user_id"),
		Value: sarama.StringEncoder("msg"),
	})
	if err != nil {
		log.Fatalf("unable to produce message: %q", err)
	}
	fmt.Println("partition", partition)
	fmt.Println("offset", offset)
}
