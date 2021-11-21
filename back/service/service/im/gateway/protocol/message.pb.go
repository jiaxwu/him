// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.18.0
// source: service/service/im/gateway/protocol/message.proto

package protocol

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

// 请求类型
type RequestType int32

const (
	RequestType_RequestTypeUnknown     RequestType = 0 // 未知
	RequestType_RequestTypeSendMessage RequestType = 1 // 发送消息
)

// Enum value maps for RequestType.
var (
	RequestType_name = map[int32]string{
		0: "RequestTypeUnknown",
		1: "RequestTypeSendMessage",
	}
	RequestType_value = map[string]int32{
		"RequestTypeUnknown":     0,
		"RequestTypeSendMessage": 1,
	}
)

func (x RequestType) Enum() *RequestType {
	p := new(RequestType)
	*p = x
	return p
}

func (x RequestType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (RequestType) Descriptor() protoreflect.EnumDescriptor {
	return file_service_service_im_gateway_protocol_message_proto_enumTypes[0].Descriptor()
}

func (RequestType) Type() protoreflect.EnumType {
	return &file_service_service_im_gateway_protocol_message_proto_enumTypes[0]
}

func (x RequestType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use RequestType.Descriptor instead.
func (RequestType) EnumDescriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{0}
}

// 请求版本
type RequestVersion int32

const (
	RequestVersion_RequestVersionUnknown RequestVersion = 0 // 未知
	RequestVersion_RequestVersionArcane  RequestVersion = 1 // 第一个版本
)

// Enum value maps for RequestVersion.
var (
	RequestVersion_name = map[int32]string{
		0: "RequestVersionUnknown",
		1: "RequestVersionArcane",
	}
	RequestVersion_value = map[string]int32{
		"RequestVersionUnknown": 0,
		"RequestVersionArcane":  1,
	}
)

func (x RequestVersion) Enum() *RequestVersion {
	p := new(RequestVersion)
	*p = x
	return p
}

func (x RequestVersion) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (RequestVersion) Descriptor() protoreflect.EnumDescriptor {
	return file_service_service_im_gateway_protocol_message_proto_enumTypes[1].Descriptor()
}

func (RequestVersion) Type() protoreflect.EnumType {
	return &file_service_service_im_gateway_protocol_message_proto_enumTypes[1]
}

func (x RequestVersion) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use RequestVersion.Descriptor instead.
func (RequestVersion) EnumDescriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{1}
}

// 消息类型
type MessageType int32

const (
	MessageType_MessageTypeUnknown MessageType = 0 // 未知
	MessageType_MessageTypeText    MessageType = 1 // 文字
	MessageType_MessageTypeImage   MessageType = 2 // 图片
)

// Enum value maps for MessageType.
var (
	MessageType_name = map[int32]string{
		0: "MessageTypeUnknown",
		1: "MessageTypeText",
		2: "MessageTypeImage",
	}
	MessageType_value = map[string]int32{
		"MessageTypeUnknown": 0,
		"MessageTypeText":    1,
		"MessageTypeImage":   2,
	}
)

func (x MessageType) Enum() *MessageType {
	p := new(MessageType)
	*p = x
	return p
}

func (x MessageType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (MessageType) Descriptor() protoreflect.EnumDescriptor {
	return file_service_service_im_gateway_protocol_message_proto_enumTypes[2].Descriptor()
}

func (MessageType) Type() protoreflect.EnumType {
	return &file_service_service_im_gateway_protocol_message_proto_enumTypes[2]
}

func (x MessageType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use MessageType.Descriptor instead.
func (MessageType) EnumDescriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{2}
}

// 接收者类型
type ReceiverType int32

const (
	ReceiverType_ReceiverTypeUnknown ReceiverType = 0 // 未知
	ReceiverType_ReceiverTypeUser    ReceiverType = 1 // 用户
	ReceiverType_ReceiverTypeGroup   ReceiverType = 2 // 群
)

// Enum value maps for ReceiverType.
var (
	ReceiverType_name = map[int32]string{
		0: "ReceiverTypeUnknown",
		1: "ReceiverTypeUser",
		2: "ReceiverTypeGroup",
	}
	ReceiverType_value = map[string]int32{
		"ReceiverTypeUnknown": 0,
		"ReceiverTypeUser":    1,
		"ReceiverTypeGroup":   2,
	}
)

func (x ReceiverType) Enum() *ReceiverType {
	p := new(ReceiverType)
	*p = x
	return p
}

func (x ReceiverType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (ReceiverType) Descriptor() protoreflect.EnumDescriptor {
	return file_service_service_im_gateway_protocol_message_proto_enumTypes[3].Descriptor()
}

func (ReceiverType) Type() protoreflect.EnumType {
	return &file_service_service_im_gateway_protocol_message_proto_enumTypes[3]
}

func (x ReceiverType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use ReceiverType.Descriptor instead.
func (ReceiverType) EnumDescriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{3}
}

// 请求
type Request struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Header *Header `protobuf:"bytes,1,opt,name=Header,proto3" json:"Header,omitempty"` // 请求头
	Body   []byte  `protobuf:"bytes,2,opt,name=Body,proto3" json:"Body,omitempty"`     // 请求体
}

func (x *Request) Reset() {
	*x = Request{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Request) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Request) ProtoMessage() {}

func (x *Request) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Request.ProtoReflect.Descriptor instead.
func (*Request) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{0}
}

func (x *Request) GetHeader() *Header {
	if x != nil {
		return x.Header
	}
	return nil
}

func (x *Request) GetBody() []byte {
	if x != nil {
		return x.Body
	}
	return nil
}

// 请求头
type Header struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	RequestType    RequestType    `protobuf:"varint,1,opt,name=RequestType,proto3,enum=him.RequestType" json:"RequestType,omitempty"`          // 请求的类型
	RequestVersion RequestVersion `protobuf:"varint,2,opt,name=RequestVersion,proto3,enum=him.RequestVersion" json:"RequestVersion,omitempty"` // 请求的版本
	CorrelationID  uint64         `protobuf:"varint,3,opt,name=CorrelationID,proto3" json:"CorrelationID,omitempty"`                           // 请求唯一标识
}

func (x *Header) Reset() {
	*x = Header{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Header) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Header) ProtoMessage() {}

func (x *Header) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Header.ProtoReflect.Descriptor instead.
func (*Header) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{1}
}

func (x *Header) GetRequestType() RequestType {
	if x != nil {
		return x.RequestType
	}
	return RequestType_RequestTypeUnknown
}

func (x *Header) GetRequestVersion() RequestVersion {
	if x != nil {
		return x.RequestVersion
	}
	return RequestVersion_RequestVersionUnknown
}

func (x *Header) GetCorrelationID() uint64 {
	if x != nil {
		return x.CorrelationID
	}
	return 0
}

// 响应
type Response struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	CorrelationID uint64 `protobuf:"varint,1,opt,name=CorrelationID,proto3" json:"CorrelationID,omitempty"` // 请求唯一标识
	Code          string `protobuf:"bytes,2,opt,name=Code,proto3" json:"Code,omitempty"`                    // 错误码
	Msg           string `protobuf:"bytes,3,opt,name=Msg,proto3" json:"Msg,omitempty"`                      // 错误信息
	Body          []byte `protobuf:"bytes,4,opt,name=Body,proto3" json:"Body,omitempty"`                    // 响应体
}

func (x *Response) Reset() {
	*x = Response{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Response) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Response) ProtoMessage() {}

func (x *Response) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Response.ProtoReflect.Descriptor instead.
func (*Response) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{2}
}

func (x *Response) GetCorrelationID() uint64 {
	if x != nil {
		return x.CorrelationID
	}
	return 0
}

func (x *Response) GetCode() string {
	if x != nil {
		return x.Code
	}
	return ""
}

func (x *Response) GetMsg() string {
	if x != nil {
		return x.Msg
	}
	return ""
}

func (x *Response) GetBody() []byte {
	if x != nil {
		return x.Body
	}
	return nil
}

// 接收者
type Receiver struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Type       ReceiverType `protobuf:"varint,1,opt,name=Type,proto3,enum=him.ReceiverType" json:"Type,omitempty"` // 接收者类型
	ReceiverID uint64       `protobuf:"varint,2,opt,name=ReceiverID,proto3" json:"ReceiverID,omitempty"`           // 接收者编号
}

func (x *Receiver) Reset() {
	*x = Receiver{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Receiver) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Receiver) ProtoMessage() {}

func (x *Receiver) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Receiver.ProtoReflect.Descriptor instead.
func (*Receiver) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{3}
}

func (x *Receiver) GetType() ReceiverType {
	if x != nil {
		return x.Type
	}
	return ReceiverType_ReceiverTypeUnknown
}

func (x *Receiver) GetReceiverID() uint64 {
	if x != nil {
		return x.ReceiverID
	}
	return 0
}

// 发送消息
type SendMessageRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Type     MessageType `protobuf:"varint,1,opt,name=Type,proto3,enum=him.MessageType" json:"Type,omitempty"` // 消息类型
	Receiver *Receiver   `protobuf:"bytes,2,opt,name=Receiver,proto3" json:"Receiver,omitempty"`               // 接收者
	Content  []byte      `protobuf:"bytes,3,opt,name=Content,proto3" json:"Content,omitempty"`                 // 消息内容
}

func (x *SendMessageRequest) Reset() {
	*x = SendMessageRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendMessageRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendMessageRequest) ProtoMessage() {}

func (x *SendMessageRequest) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendMessageRequest.ProtoReflect.Descriptor instead.
func (*SendMessageRequest) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{4}
}

func (x *SendMessageRequest) GetType() MessageType {
	if x != nil {
		return x.Type
	}
	return MessageType_MessageTypeUnknown
}

func (x *SendMessageRequest) GetReceiver() *Receiver {
	if x != nil {
		return x.Receiver
	}
	return nil
}

func (x *SendMessageRequest) GetContent() []byte {
	if x != nil {
		return x.Content
	}
	return nil
}

// 发送消息响应
type SendMessageResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	MessageID uint64 `protobuf:"varint,1,opt,name=MessageID,proto3" json:"MessageID,omitempty"` // 消息编号
	SendTime  uint64 `protobuf:"varint,2,opt,name=sendTime,proto3" json:"sendTime,omitempty"`   // 发送时间
}

func (x *SendMessageResponse) Reset() {
	*x = SendMessageResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendMessageResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendMessageResponse) ProtoMessage() {}

func (x *SendMessageResponse) ProtoReflect() protoreflect.Message {
	mi := &file_service_service_im_gateway_protocol_message_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendMessageResponse.ProtoReflect.Descriptor instead.
func (*SendMessageResponse) Descriptor() ([]byte, []int) {
	return file_service_service_im_gateway_protocol_message_proto_rawDescGZIP(), []int{5}
}

func (x *SendMessageResponse) GetMessageID() uint64 {
	if x != nil {
		return x.MessageID
	}
	return 0
}

func (x *SendMessageResponse) GetSendTime() uint64 {
	if x != nil {
		return x.SendTime
	}
	return 0
}

var File_service_service_im_gateway_protocol_message_proto protoreflect.FileDescriptor

var file_service_service_im_gateway_protocol_message_proto_rawDesc = []byte{
	0x0a, 0x31, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x2f, 0x69, 0x6d, 0x2f, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x2f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x03, 0x68, 0x69, 0x6d, 0x22, 0x42, 0x0a, 0x07, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x23, 0x0a, 0x06, 0x48, 0x65, 0x61, 0x64, 0x65, 0x72, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x68, 0x69, 0x6d, 0x2e, 0x48, 0x65, 0x61, 0x64, 0x65, 0x72,
	0x52, 0x06, 0x48, 0x65, 0x61, 0x64, 0x65, 0x72, 0x12, 0x12, 0x0a, 0x04, 0x42, 0x6f, 0x64, 0x79,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x04, 0x42, 0x6f, 0x64, 0x79, 0x22, 0x9f, 0x01, 0x0a,
	0x06, 0x48, 0x65, 0x61, 0x64, 0x65, 0x72, 0x12, 0x32, 0x0a, 0x0b, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x54, 0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x10, 0x2e, 0x68,
	0x69, 0x6d, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x54, 0x79, 0x70, 0x65, 0x52, 0x0b,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x54, 0x79, 0x70, 0x65, 0x12, 0x3b, 0x0a, 0x0e, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0e, 0x32, 0x13, 0x2e, 0x68, 0x69, 0x6d, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x0e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x12, 0x24, 0x0a, 0x0d, 0x43, 0x6f, 0x72, 0x72,
	0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x49, 0x44, 0x18, 0x03, 0x20, 0x01, 0x28, 0x04, 0x52,
	0x0d, 0x43, 0x6f, 0x72, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x49, 0x44, 0x22, 0x6a,
	0x0a, 0x08, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x24, 0x0a, 0x0d, 0x43, 0x6f,
	0x72, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x04, 0x52, 0x0d, 0x43, 0x6f, 0x72, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x49, 0x44,
	0x12, 0x12, 0x0a, 0x04, 0x43, 0x6f, 0x64, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x43, 0x6f, 0x64, 0x65, 0x12, 0x10, 0x0a, 0x03, 0x4d, 0x73, 0x67, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x03, 0x4d, 0x73, 0x67, 0x12, 0x12, 0x0a, 0x04, 0x42, 0x6f, 0x64, 0x79, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x0c, 0x52, 0x04, 0x42, 0x6f, 0x64, 0x79, 0x22, 0x51, 0x0a, 0x08, 0x52, 0x65,
	0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x12, 0x25, 0x0a, 0x04, 0x54, 0x79, 0x70, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0e, 0x32, 0x11, 0x2e, 0x68, 0x69, 0x6d, 0x2e, 0x52, 0x65, 0x63, 0x65, 0x69,
	0x76, 0x65, 0x72, 0x54, 0x79, 0x70, 0x65, 0x52, 0x04, 0x54, 0x79, 0x70, 0x65, 0x12, 0x1e, 0x0a,
	0x0a, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x49, 0x44, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x04, 0x52, 0x0a, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x49, 0x44, 0x22, 0x7f, 0x0a,
	0x12, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x24, 0x0a, 0x04, 0x54, 0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0e, 0x32, 0x10, 0x2e, 0x68, 0x69, 0x6d, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x54,
	0x79, 0x70, 0x65, 0x52, 0x04, 0x54, 0x79, 0x70, 0x65, 0x12, 0x29, 0x0a, 0x08, 0x52, 0x65, 0x63,
	0x65, 0x69, 0x76, 0x65, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x68, 0x69,
	0x6d, 0x2e, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x52, 0x08, 0x52, 0x65, 0x63, 0x65,
	0x69, 0x76, 0x65, 0x72, 0x12, 0x18, 0x0a, 0x07, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x07, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x22, 0x4f,
	0x0a, 0x13, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65,
	0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28, 0x04, 0x52, 0x09, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x49, 0x44, 0x12, 0x1a, 0x0a, 0x08, 0x73, 0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x04, 0x52, 0x08, 0x73, 0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x2a,
	0x41, 0x0a, 0x0b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x54, 0x79, 0x70, 0x65, 0x12, 0x16,
	0x0a, 0x12, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x54, 0x79, 0x70, 0x65, 0x55, 0x6e, 0x6b,
	0x6e, 0x6f, 0x77, 0x6e, 0x10, 0x00, 0x12, 0x1a, 0x0a, 0x16, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x54, 0x79, 0x70, 0x65, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65,
	0x10, 0x01, 0x2a, 0x45, 0x0a, 0x0e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x56, 0x65, 0x72,
	0x73, 0x69, 0x6f, 0x6e, 0x12, 0x19, 0x0a, 0x15, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x56,
	0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x55, 0x6e, 0x6b, 0x6e, 0x6f, 0x77, 0x6e, 0x10, 0x00, 0x12,
	0x18, 0x0a, 0x14, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f,
	0x6e, 0x41, 0x72, 0x63, 0x61, 0x6e, 0x65, 0x10, 0x01, 0x2a, 0x50, 0x0a, 0x0b, 0x4d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x54, 0x79, 0x70, 0x65, 0x12, 0x16, 0x0a, 0x12, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x54, 0x79, 0x70, 0x65, 0x55, 0x6e, 0x6b, 0x6e, 0x6f, 0x77, 0x6e, 0x10, 0x00,
	0x12, 0x13, 0x0a, 0x0f, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x54, 0x79, 0x70, 0x65, 0x54,
	0x65, 0x78, 0x74, 0x10, 0x01, 0x12, 0x14, 0x0a, 0x10, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65,
	0x54, 0x79, 0x70, 0x65, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x10, 0x02, 0x2a, 0x54, 0x0a, 0x0c, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x54, 0x79, 0x70, 0x65, 0x12, 0x17, 0x0a, 0x13, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x54, 0x79, 0x70, 0x65, 0x55, 0x6e, 0x6b, 0x6e, 0x6f,
	0x77, 0x6e, 0x10, 0x00, 0x12, 0x14, 0x0a, 0x10, 0x52, 0x65, 0x63, 0x65, 0x69, 0x76, 0x65, 0x72,
	0x54, 0x79, 0x70, 0x65, 0x55, 0x73, 0x65, 0x72, 0x10, 0x01, 0x12, 0x15, 0x0a, 0x11, 0x52, 0x65,
	0x63, 0x65, 0x69, 0x76, 0x65, 0x72, 0x54, 0x79, 0x70, 0x65, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x10,
	0x02, 0x42, 0x25, 0x5a, 0x23, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x2f, 0x69, 0x6d, 0x2f, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_service_service_im_gateway_protocol_message_proto_rawDescOnce sync.Once
	file_service_service_im_gateway_protocol_message_proto_rawDescData = file_service_service_im_gateway_protocol_message_proto_rawDesc
)

func file_service_service_im_gateway_protocol_message_proto_rawDescGZIP() []byte {
	file_service_service_im_gateway_protocol_message_proto_rawDescOnce.Do(func() {
		file_service_service_im_gateway_protocol_message_proto_rawDescData = protoimpl.X.CompressGZIP(file_service_service_im_gateway_protocol_message_proto_rawDescData)
	})
	return file_service_service_im_gateway_protocol_message_proto_rawDescData
}

var file_service_service_im_gateway_protocol_message_proto_enumTypes = make([]protoimpl.EnumInfo, 4)
var file_service_service_im_gateway_protocol_message_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_service_service_im_gateway_protocol_message_proto_goTypes = []interface{}{
	(RequestType)(0),            // 0: him.RequestType
	(RequestVersion)(0),         // 1: him.RequestVersion
	(MessageType)(0),            // 2: him.MessageType
	(ReceiverType)(0),           // 3: him.ReceiverType
	(*Request)(nil),             // 4: him.Request
	(*Header)(nil),              // 5: him.Header
	(*Response)(nil),            // 6: him.Response
	(*Receiver)(nil),            // 7: him.Receiver
	(*SendMessageRequest)(nil),  // 8: him.SendMessageRequest
	(*SendMessageResponse)(nil), // 9: him.SendMessageResponse
}
var file_service_service_im_gateway_protocol_message_proto_depIdxs = []int32{
	5, // 0: him.Request.Header:type_name -> him.Header
	0, // 1: him.Header.RequestType:type_name -> him.RequestType
	1, // 2: him.Header.RequestVersion:type_name -> him.RequestVersion
	3, // 3: him.Receiver.Type:type_name -> him.ReceiverType
	2, // 4: him.SendMessageRequest.Type:type_name -> him.MessageType
	7, // 5: him.SendMessageRequest.Receiver:type_name -> him.Receiver
	6, // [6:6] is the sub-list for method output_type
	6, // [6:6] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_service_service_im_gateway_protocol_message_proto_init() }
func file_service_service_im_gateway_protocol_message_proto_init() {
	if File_service_service_im_gateway_protocol_message_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_service_service_im_gateway_protocol_message_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Request); i {
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
		file_service_service_im_gateway_protocol_message_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Header); i {
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
		file_service_service_im_gateway_protocol_message_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Response); i {
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
		file_service_service_im_gateway_protocol_message_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Receiver); i {
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
		file_service_service_im_gateway_protocol_message_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendMessageRequest); i {
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
		file_service_service_im_gateway_protocol_message_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendMessageResponse); i {
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
			RawDescriptor: file_service_service_im_gateway_protocol_message_proto_rawDesc,
			NumEnums:      4,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_service_service_im_gateway_protocol_message_proto_goTypes,
		DependencyIndexes: file_service_service_im_gateway_protocol_message_proto_depIdxs,
		EnumInfos:         file_service_service_im_gateway_protocol_message_proto_enumTypes,
		MessageInfos:      file_service_service_im_gateway_protocol_message_proto_msgTypes,
	}.Build()
	File_service_service_im_gateway_protocol_message_proto = out.File
	file_service_service_im_gateway_protocol_message_proto_rawDesc = nil
	file_service_service_im_gateway_protocol_message_proto_goTypes = nil
	file_service_service_im_gateway_protocol_message_proto_depIdxs = nil
}
