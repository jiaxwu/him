// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.18.0
// source: api/sms/sms.proto

package sms

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// 发送验证码短信用于登录请求
type SendVecCodeForLoginReq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Phone     string `protobuf:"bytes,1,opt,name=Phone,proto3" json:"Phone,omitempty"`          // 手机号码
	VecCode   string `protobuf:"bytes,2,opt,name=VecCode,proto3" json:"VecCode,omitempty"`      // 验证码
	ExpMinute uint32 `protobuf:"varint,3,opt,name=ExpMinute,proto3" json:"ExpMinute,omitempty"` // 过期时间
}

func (x *SendVecCodeForLoginReq) Reset() {
	*x = SendVecCodeForLoginReq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_sms_sms_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendVecCodeForLoginReq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendVecCodeForLoginReq) ProtoMessage() {}

func (x *SendVecCodeForLoginReq) ProtoReflect() protoreflect.Message {
	mi := &file_api_sms_sms_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendVecCodeForLoginReq.ProtoReflect.Descriptor instead.
func (*SendVecCodeForLoginReq) Descriptor() ([]byte, []int) {
	return file_api_sms_sms_proto_rawDescGZIP(), []int{0}
}

func (x *SendVecCodeForLoginReq) GetPhone() string {
	if x != nil {
		return x.Phone
	}
	return ""
}

func (x *SendVecCodeForLoginReq) GetVecCode() string {
	if x != nil {
		return x.VecCode
	}
	return ""
}

func (x *SendVecCodeForLoginReq) GetExpMinute() uint32 {
	if x != nil {
		return x.ExpMinute
	}
	return 0
}

// 发送验证码短信用于登录响应
type SendVecCodeForLoginRsp struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *SendVecCodeForLoginRsp) Reset() {
	*x = SendVecCodeForLoginRsp{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_sms_sms_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendVecCodeForLoginRsp) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendVecCodeForLoginRsp) ProtoMessage() {}

func (x *SendVecCodeForLoginRsp) ProtoReflect() protoreflect.Message {
	mi := &file_api_sms_sms_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendVecCodeForLoginRsp.ProtoReflect.Descriptor instead.
func (*SendVecCodeForLoginRsp) Descriptor() ([]byte, []int) {
	return file_api_sms_sms_proto_rawDescGZIP(), []int{1}
}

// 发送短信请求
type SendReq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Phone      string   `protobuf:"bytes,1,opt,name=Phone,proto3" json:"Phone,omitempty"`           // 手机
	TemplateID string   `protobuf:"bytes,2,opt,name=TemplateID,proto3" json:"TemplateID,omitempty"` // 模板ID
	Params     []string `protobuf:"bytes,3,rep,name=Params,proto3" json:"Params,omitempty"`         // 参数
}

func (x *SendReq) Reset() {
	*x = SendReq{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_sms_sms_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendReq) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendReq) ProtoMessage() {}

func (x *SendReq) ProtoReflect() protoreflect.Message {
	mi := &file_api_sms_sms_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendReq.ProtoReflect.Descriptor instead.
func (*SendReq) Descriptor() ([]byte, []int) {
	return file_api_sms_sms_proto_rawDescGZIP(), []int{2}
}

func (x *SendReq) GetPhone() string {
	if x != nil {
		return x.Phone
	}
	return ""
}

func (x *SendReq) GetTemplateID() string {
	if x != nil {
		return x.TemplateID
	}
	return ""
}

func (x *SendReq) GetParams() []string {
	if x != nil {
		return x.Params
	}
	return nil
}

// 发送短信响应
type SendRsp struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *SendRsp) Reset() {
	*x = SendRsp{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_sms_sms_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendRsp) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendRsp) ProtoMessage() {}

func (x *SendRsp) ProtoReflect() protoreflect.Message {
	mi := &file_api_sms_sms_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendRsp.ProtoReflect.Descriptor instead.
func (*SendRsp) Descriptor() ([]byte, []int) {
	return file_api_sms_sms_proto_rawDescGZIP(), []int{3}
}

var File_api_sms_sms_proto protoreflect.FileDescriptor

var file_api_sms_sms_proto_rawDesc = []byte{
	0x0a, 0x11, 0x61, 0x70, 0x69, 0x2f, 0x73, 0x6d, 0x73, 0x2f, 0x73, 0x6d, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x03, 0x73, 0x6d, 0x73, 0x22, 0x66, 0x0a, 0x16, 0x53, 0x65, 0x6e, 0x64,
	0x56, 0x65, 0x63, 0x43, 0x6f, 0x64, 0x65, 0x46, 0x6f, 0x72, 0x4c, 0x6f, 0x67, 0x69, 0x6e, 0x52,
	0x65, 0x71, 0x12, 0x14, 0x0a, 0x05, 0x50, 0x68, 0x6f, 0x6e, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x05, 0x50, 0x68, 0x6f, 0x6e, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x56, 0x65, 0x63, 0x43,
	0x6f, 0x64, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x56, 0x65, 0x63, 0x43, 0x6f,
	0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x45, 0x78, 0x70, 0x4d, 0x69, 0x6e, 0x75, 0x74, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x09, 0x45, 0x78, 0x70, 0x4d, 0x69, 0x6e, 0x75, 0x74, 0x65,
	0x22, 0x18, 0x0a, 0x16, 0x53, 0x65, 0x6e, 0x64, 0x56, 0x65, 0x63, 0x43, 0x6f, 0x64, 0x65, 0x46,
	0x6f, 0x72, 0x4c, 0x6f, 0x67, 0x69, 0x6e, 0x52, 0x73, 0x70, 0x22, 0x57, 0x0a, 0x07, 0x53, 0x65,
	0x6e, 0x64, 0x52, 0x65, 0x71, 0x12, 0x14, 0x0a, 0x05, 0x50, 0x68, 0x6f, 0x6e, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x50, 0x68, 0x6f, 0x6e, 0x65, 0x12, 0x1e, 0x0a, 0x0a, 0x54,
	0x65, 0x6d, 0x70, 0x6c, 0x61, 0x74, 0x65, 0x49, 0x44, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0a, 0x54, 0x65, 0x6d, 0x70, 0x6c, 0x61, 0x74, 0x65, 0x49, 0x44, 0x12, 0x16, 0x0a, 0x06, 0x50,
	0x61, 0x72, 0x61, 0x6d, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x50, 0x61, 0x72,
	0x61, 0x6d, 0x73, 0x22, 0x09, 0x0a, 0x07, 0x53, 0x65, 0x6e, 0x64, 0x52, 0x73, 0x70, 0x42, 0x25,
	0x5a, 0x23, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x78, 0x69, 0x61,
	0x6f, 0x68, 0x75, 0x61, 0x73, 0x68, 0x69, 0x66, 0x75, 0x2f, 0x68, 0x69, 0x6d, 0x2f, 0x61, 0x70,
	0x69, 0x2f, 0x73, 0x6d, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_sms_sms_proto_rawDescOnce sync.Once
	file_api_sms_sms_proto_rawDescData = file_api_sms_sms_proto_rawDesc
)

func file_api_sms_sms_proto_rawDescGZIP() []byte {
	file_api_sms_sms_proto_rawDescOnce.Do(func() {
		file_api_sms_sms_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_sms_sms_proto_rawDescData)
	})
	return file_api_sms_sms_proto_rawDescData
}

var file_api_sms_sms_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_api_sms_sms_proto_goTypes = []interface{}{
	(*SendVecCodeForLoginReq)(nil), // 0: sms.SendVecCodeForLoginReq
	(*SendVecCodeForLoginRsp)(nil), // 1: sms.SendVecCodeForLoginRsp
	(*SendReq)(nil),                // 2: sms.SendReq
	(*SendRsp)(nil),                // 3: sms.SendRsp
}
var file_api_sms_sms_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_api_sms_sms_proto_init() }
func file_api_sms_sms_proto_init() {
	if File_api_sms_sms_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_api_sms_sms_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendVecCodeForLoginReq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_sms_sms_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendVecCodeForLoginRsp); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_sms_sms_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendReq); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_sms_sms_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendRsp); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_api_sms_sms_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_sms_sms_proto_goTypes,
		DependencyIndexes: file_api_sms_sms_proto_depIdxs,
		MessageInfos:      file_api_sms_sms_proto_msgTypes,
	}.Build()
	File_api_sms_sms_proto = out.File
	file_api_sms_sms_proto_rawDesc = nil
	file_api_sms_sms_proto_goTypes = nil
	file_api_sms_sms_proto_depIdxs = nil
}
