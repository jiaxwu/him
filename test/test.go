package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/xiaohuashifu/him/api/common"
	"github.com/xiaohuashifu/him/api/user/info"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
)

func main() {
	//cli, err := clientv3.New(clientv3.Config{
	//	Endpoints:   []string{"49.233.30.197:2379"},
	//	DialTimeout: 5 * time.Second,
	//})
	//if err != nil {
	//	// handle error!
	//}
	//defer cli.Close()
	//queue := recipe.NewPriorityQueue(cli, "test")
	//queue.Enqueue("lalaliskey", 16)
	//queue.Enqueue("323232", 1)
	//dequeue, err := queue.Dequeue()
	//fmt.Println(err)
	//fmt.Println(dequeue)

	content, _ := anypb.New(&info.GetUserInfoResp{UserInfo: &info.UserInfo{
		UserId:         1,
		Username:       "das",
		NickName:       "zz",
		Avatar:         "das",
		Gender:         4,
		LastOnLineTime: 6,
	}})
	r := &common.Resp{
		Code: "xxx",
		Msg: "xxzz",
		Content: content,
	}
	marshal, _ := proto.Marshal(r)
	for _, b := range marshal {
		fmt.Printf("%d", b)
		fmt.Printf(",")
	}
	fmt.Println()
	bytes, _ := json.Marshal(r.GetContent().GetValue())
	fmt.Printf(string(bytes))
	context.WithValue()
}
