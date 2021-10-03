package link

import (
	"errors"
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/sirupsen/logrus"
	"sync/atomic"
	"time"
)

const (
	channelStateInit   int32 = 0 // 初始化
	channelStateStart  int32 = 1 // 已经开始（运行中）
	channelStateClosed int32 = 2 // 已经关闭
)

// Channel 一个底层连接会被封装成一个channel
// 提供读写的监听和push，writeFrame操作
// 也提供连接的关闭操作
type Channel struct {
	id        string        // 连接的编号
	him.Conn                // 底层连接
	writeChan chan []byte   // push的时候会推到这个chan，writeLoop会读取这个chan
	readWait  time.Duration // 读超时
	writeWait time.Duration // 写超时
	state     int32         // channel的状态
}

// NewChannel 创建一个Channel，并开始监听写事件
func NewChannel(id string, conn him.Conn) him.Channel {
	log := logrus.WithFields(logrus.Fields{
		"module": "channel",
		"id":     id,
	})
	ch := &Channel{
		id:        id,
		Conn:      conn,
		writeChan: make(chan []byte, 5),
		writeWait: him.DefaultWriteWait,
		readWait:  him.DefaultReadWait,
		state:     channelStateInit,
	}
	go func() {
		if err := ch.writeLoop(); err != nil {
			log.Info(err)
		}
	}()
	return ch
}

// writeLoop 监听写事件，也就是写入前端的消息
// 消息是handler通过push异步写入的
func (ch *Channel) writeLoop() error {
	for payload := range ch.writeChan {
		if err := ch.WriteFrame(him.OpBinary, payload); err != nil {
			return err
		}
		chanLen := len(ch.writeChan)
		for i := 0; i < chanLen; i++ {
			payload = <-ch.writeChan
			if err := ch.WriteFrame(him.OpBinary, payload); err != nil {
				return err
			}
		}
		_ = ch.SetWriteDeadline(time.Now().Add(ch.writeWait))
		if err := ch.Flush(); err != nil {
			return err
		}
	}
	return nil
}

// ID id
func (ch *Channel) ID() string {
	return ch.id
}

// Push 异步写数据
func (ch *Channel) Push(payload []byte) error {
	if atomic.LoadInt32(&ch.state) != channelStateStart {
		return fmt.Errorf("channel %s 已经关闭了", ch.id)
	}
	// 异步写
	ch.writeChan <- payload
	return nil
}

// WriteFrame 对底层的Conn进行重写，设置写超时时间
func (ch *Channel) WriteFrame(code him.OpCode, payload []byte) error {
	_ = ch.SetWriteDeadline(time.Now().Add(ch.writeWait))
	return ch.Conn.WriteFrame(code, payload)
}

// Close 关闭连接
func (ch *Channel) Close() error {
	if !atomic.CompareAndSwapInt32(&ch.state, channelStateStart, channelStateClosed) {
		return fmt.Errorf("channel已经开始开始")
	}
	close(ch.writeChan)
	return nil
}

// ReadLoop 监听读事件，也就是从前端发过来的消息
// 除了close和ping消息，其他消息都会转发给handler处理
func (ch *Channel) ReadLoop(listener him.MessageListener) error {
	if !atomic.CompareAndSwapInt32(&ch.state, channelStateInit, channelStateStart) {
		return fmt.Errorf("channel已经开始")
	}
	for {
		_ = ch.SetReadDeadline(time.Now().Add(ch.readWait))

		frame, err := ch.ReadFrame() // 读取帧
		if err != nil {
			return err
		}
		if frame.GetOpCode() == him.OpClose {
			return errors.New("客户端关闭连接")
		}
		payload := frame.GetPayload()
		if len(payload) == 0 {
			continue
		}
		// 给handler处理
		go listener.Receive(ch, payload)
	}
}
