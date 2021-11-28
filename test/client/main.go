package main

import (
	"context"
	"github.com/xiaohuashifu/him/api/authnz/session"
	"google.golang.org/grpc"
	"log"
	"time"
)

func main() {
	conn, err := grpc.Dial("localhost:3000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := session.NewSessionServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.GetSession(ctx, &session.GetSessionReq{Token: "xxxx"})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r)
}
