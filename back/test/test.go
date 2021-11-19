package main

import (
	"fmt"
	"github.com/golang/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
	"him/service/service/im/access/model/protocol"
)

func main() {
	any, _ := anypb.New(&protocol.GetMessage{
		Key:           1,
		Version:       2,
		CorrelationID: 4,
	})
	request := protocol.Request{
		Header: &protocol.Header{
			Key:           1,
			Version:       2,
			CorrelationID: 3,
		},
		Body: any,
	}
	marshal, _ := proto.Marshal(&request)
	fmt.Println(marshal)
	var request2 protocol.Request
	bytes := []byte{10, 6, 8, 1, 16, 2, 24, 3, 18, 47, 10, 34, 116, 121, 112, 101, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 46, 99, 111, 109, 47, 104, 105, 109, 46, 71, 101, 116, 77, 101, 115, 115, 97, 103, 101, 18, 9, 8, 1, 16, 2, 24, 4, 32, 255, 78}
	fmt.Println(bytes)
	proto.Unmarshal(bytes, &request2)
	fmt.Println(request2.GetHeader())
	var getMessage2 protocol.GetMessage
	proto.Unmarshal(request2.GetBody().GetValue(), &getMessage2)
	fmt.Println(getMessage2.String())
	fmt.Printf("%+v\n", request.GetBody().GetTypeUrl())
}

