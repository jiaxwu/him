package main

import (
	context "context"
	"github.com/xiaohuashifu/him/api/authnz"
	"github.com/xiaohuashifu/him/api/authnz/session"
	"google.golang.org/grpc"
	"log"
	"net"
)

type SessionServiceServer struct {
	session.UnimplementedSessionServiceServer
}

func (s *SessionServiceServer) GetSession(ctx context.Context, req *session.GetSessionReq) (*session.GetSessionResp, error) {
	return &session.GetSessionResp{Session: &authnz.Session{
		UserId:   1,
		UserType: 3,
		Terminal: 4,
	}}, nil
}

func main() {
	listen, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatalln(err)
	}
	server := grpc.NewServer()
	session.RegisterSessionServiceServer(server, &SessionServiceServer{})
	server.Serve(listen)
}
