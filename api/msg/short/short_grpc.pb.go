// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package short

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// MsgShortServiceClient is the client API for MsgShortService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MsgShortServiceClient interface {
	Upload(ctx context.Context, in *UploadReq, opts ...grpc.CallOption) (*UploadResp, error)
	GetLastMailBoxMsgId(ctx context.Context, in *GetLastMailBoxMsgIdReq, opts ...grpc.CallOption) (*GetLastMailBoxMsgIdResp, error)
	GetMsgs(ctx context.Context, in *GetMsgsReq, opts ...grpc.CallOption) (*GetMsgsResp, error)
}

type msgShortServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewMsgShortServiceClient(cc grpc.ClientConnInterface) MsgShortServiceClient {
	return &msgShortServiceClient{cc}
}

func (c *msgShortServiceClient) Upload(ctx context.Context, in *UploadReq, opts ...grpc.CallOption) (*UploadResp, error) {
	out := new(UploadResp)
	err := c.cc.Invoke(ctx, "/msg.short.MsgShortService/Upload", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgShortServiceClient) GetLastMailBoxMsgId(ctx context.Context, in *GetLastMailBoxMsgIdReq, opts ...grpc.CallOption) (*GetLastMailBoxMsgIdResp, error) {
	out := new(GetLastMailBoxMsgIdResp)
	err := c.cc.Invoke(ctx, "/msg.short.MsgShortService/GetLastMailBoxMsgId", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgShortServiceClient) GetMsgs(ctx context.Context, in *GetMsgsReq, opts ...grpc.CallOption) (*GetMsgsResp, error) {
	out := new(GetMsgsResp)
	err := c.cc.Invoke(ctx, "/msg.short.MsgShortService/GetMsgs", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgShortServiceServer is the server API for MsgShortService service.
// All implementations must embed UnimplementedMsgShortServiceServer
// for forward compatibility
type MsgShortServiceServer interface {
	Upload(context.Context, *UploadReq) (*UploadResp, error)
	GetLastMailBoxMsgId(context.Context, *GetLastMailBoxMsgIdReq) (*GetLastMailBoxMsgIdResp, error)
	GetMsgs(context.Context, *GetMsgsReq) (*GetMsgsResp, error)
	mustEmbedUnimplementedMsgShortServiceServer()
}

// UnimplementedMsgShortServiceServer must be embedded to have forward compatible implementations.
type UnimplementedMsgShortServiceServer struct {
}

func (UnimplementedMsgShortServiceServer) Upload(context.Context, *UploadReq) (*UploadResp, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Upload not implemented")
}
func (UnimplementedMsgShortServiceServer) GetLastMailBoxMsgId(context.Context, *GetLastMailBoxMsgIdReq) (*GetLastMailBoxMsgIdResp, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLastMailBoxMsgId not implemented")
}
func (UnimplementedMsgShortServiceServer) GetMsgs(context.Context, *GetMsgsReq) (*GetMsgsResp, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetMsgs not implemented")
}
func (UnimplementedMsgShortServiceServer) mustEmbedUnimplementedMsgShortServiceServer() {}

// UnsafeMsgShortServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MsgShortServiceServer will
// result in compilation errors.
type UnsafeMsgShortServiceServer interface {
	mustEmbedUnimplementedMsgShortServiceServer()
}

func RegisterMsgShortServiceServer(s grpc.ServiceRegistrar, srv MsgShortServiceServer) {
	s.RegisterService(&MsgShortService_ServiceDesc, srv)
}

func _MsgShortService_Upload_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UploadReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgShortServiceServer).Upload(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/msg.short.MsgShortService/Upload",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgShortServiceServer).Upload(ctx, req.(*UploadReq))
	}
	return interceptor(ctx, in, info, handler)
}

func _MsgShortService_GetLastMailBoxMsgId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLastMailBoxMsgIdReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgShortServiceServer).GetLastMailBoxMsgId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/msg.short.MsgShortService/GetLastMailBoxMsgId",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgShortServiceServer).GetLastMailBoxMsgId(ctx, req.(*GetLastMailBoxMsgIdReq))
	}
	return interceptor(ctx, in, info, handler)
}

func _MsgShortService_GetMsgs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetMsgsReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgShortServiceServer).GetMsgs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/msg.short.MsgShortService/GetMsgs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgShortServiceServer).GetMsgs(ctx, req.(*GetMsgsReq))
	}
	return interceptor(ctx, in, info, handler)
}

// MsgShortService_ServiceDesc is the grpc.ServiceDesc for MsgShortService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MsgShortService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "msg.short.MsgShortService",
	HandlerType: (*MsgShortServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Upload",
			Handler:    _MsgShortService_Upload_Handler,
		},
		{
			MethodName: "GetLastMailBoxMsgId",
			Handler:    _MsgShortService_GetLastMailBoxMsgId_Handler,
		},
		{
			MethodName: "GetMsgs",
			Handler:    _MsgShortService_GetMsgs_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api/msg/short/short.proto",
}
