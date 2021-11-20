package main

import (
	"fmt"
	"github.com/golang/protobuf/proto"
	"him/service/service/im/gateway/protocol"
)

func main() {
	getMessage := protocol.GetMessage{
		Key:           int32(protocol.Key_SendMsg),
		Version:       2,
		CorrelationID: 4,
		Age:           10111,
	}
	getMessageBytes, _ := proto.Marshal(&getMessage)
	request := protocol.Request{
		Header: &protocol.Header{
			Key:           1,
			Version:       2,
			CorrelationID: 3,
		},
		Body: getMessageBytes,
	}
	marshal, _ := proto.Marshal(&request)
	fmt.Println(marshal)
	var request2 protocol.Request
	bytes := []byte{10, 6, 8, 1, 16, 2, 24, 3, 18, 9, 8, 1, 16, 2, 24, 4, 32, 255, 78}
	fmt.Println(bytes)
	proto.Unmarshal(bytes, &request2)
	fmt.Println(request2.GetHeader())
	var getMessage2 protocol.GetMessage
	proto.Unmarshal(request2.GetBody(), &getMessage2)
	fmt.Println(getMessage2.String())
}
