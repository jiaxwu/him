package him

import (
	"context"
	"errors"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"google.golang.org/protobuf/proto"
	"net"
	"net/http"
	"time"
)

const (
	DefaultReadWait  = time.Minute * 3
	DefaultWriteWait = time.Second * 10
	DefaultLoginWait = time.Second * 10
	DefaultHeartbeat = time.Second * 55
)

// OpCode OpCode
type OpCode byte

// Opcode type
const (
	OpContinuation OpCode = 0x0
	OpText         OpCode = 0x1
	OpBinary       OpCode = 0x2
	OpClose        OpCode = 0x8
	OpPing         OpCode = 0x9
	OpPong         OpCode = 0xa
)

// Server 定义了一个tcp/websocket不同协议通用的服务端的接口
type Server interface {
	// SetAcceptor 设置Acceptor
	SetAcceptor(Acceptor)
	//SetMessageListener 设置上行消息监听器
	SetMessageListener(MessageListener)
	//SetStateListener 设置连接状态监听服务
	SetStateListener(StateListener)
	// SetChannelMap 设置Channel管理服务
	SetChannelMap(ChannelMap)

	// Handle 这里处理了一个websocket连接的整个生命周期
	Handle(*http.Request, http.ResponseWriter)
	Pusher
	// Shutdown 服务下线，关闭连接
	Shutdown(context.Context) error
}

// Pusher 推送器，给service层的一个接口，让service层能够进行消息推送
type Pusher interface {
	// Push 消息到指定的Channel中
	// 	string channelID
	// 	[]byte 序列化之后的消息数据
	Push(string, []byte) error
}

// ChannelMap ChannelMap
type ChannelMap interface {
	Add(channel Channel)
	Remove(id string)
	Get(id string) (channel Channel, ok bool)
	All() []Channel
}

// Acceptor 连接接收器
type Acceptor interface {
	// Accept 返回一个握手完成的Channel对象或者一个error。
	// 业务层需要处理不同协议和网络环境的下连接握手协议
	Accept(Conn, time.Duration) (string, error)
}

// MessageListener 监听消息
type MessageListener interface {
	// Receive 收到消息回调
	Receive(Channel, []byte)
}

// StateListener 状态监听器
type StateListener interface {
	// Disconnect 连接断开回调
	Disconnect(Channel) error
}

// Agent 给handler的关于连接的抽象
type Agent interface {
	ID() string
	Push([]byte) error
}

// Conn 连接
type Conn interface {
	net.Conn
	ReadFrame() (Frame, error)
	WriteFrame(OpCode, []byte) error
	Flush() error
}

// Channel 对一个连接的抽象
type Channel interface {
	Conn
	Agent
	// Close 关闭连接
	Close() error
	ReadLoop(listener MessageListener) error
}

// Frame Frame
type Frame interface {
	SetOpCode(OpCode)
	GetOpCode() OpCode
	SetPayload([]byte)
	GetPayload() []byte
}

// ErrSessionNil ErrSessionNil
var ErrSessionNil = errors.New("err:session nil")

// SessionStorage 用于对会话进行操作
type SessionStorage interface {
	// Add 添加一个session
	Add(session *pkt.Session) error
	// Delete 删除一个session
	Delete(channelId string) error
	// Get 获取session通过channelId
	Get(channelId string) (*pkt.Session, error)
	// GetLocations 获取Locations 通过userIds
	GetLocations(userIds ...int64) ([]*pkt.Location, error)
	// GetLocation 获取Location 通过userId和terminal
	GetLocation(userId int64, terminal string) (*pkt.Location, error)
}

// Context 请求上下文，包含各种读写操作
type Context interface {
	Header() *pkt.Header
	// Session 会话
	Session() *pkt.Session
	// ReadBody 读取请求体
	ReadBody(val proto.Message) error
	// RespWithError 响应错误消息给发送者
	RespWithError(status pkt.Status, err error) error
	// Resp 响应消息给发送者
	Resp(status pkt.Status, body proto.Message) error
	// Dispatch 发送消息给目标
	Dispatch(body proto.Message, recvs ...*pkt.Location) error
}
