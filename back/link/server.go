package link

import (
	"context"
	"errors"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/gobwas/ws"
	"github.com/sirupsen/logrus"
	"net/http"
	"sync"
	"time"
)

// Server 是link层的抽象，它接收并处理每个连接，负责每个连接的生命周期
type Server struct {
	shutdownOnce        sync.Once     // 保证服务器下线安全
	him.ChannelMap                    // channel集合
	him.Acceptor                      // 处理登录请求
	him.MessageListener               // 处理一般消息
	him.StateListener                 // 处理连接断开回调
	loginWait           time.Duration // 登陆超时
	readWait            time.Duration // 读超时
	writeWait           time.Duration // 写超时
}

func NewServer() him.Server {
	return &Server{
		loginWait: him.DefaultLoginWait,
		readWait:  him.DefaultReadWait,
		writeWait: him.DefaultWriteWait,
	}
}

// Handle 这里处理了一个websocket连接的整个生命周期
func (s *Server) Handle(r *http.Request, w http.ResponseWriter) {
	log := logrus.WithFields(logrus.Fields{
		"module": "server",
	})

	// step 1 升级连接为websocket连接
	rawConn, _, _, err := ws.UpgradeHTTP(r, w)
	if err != nil {
		s.resp(w, http.StatusBadRequest, err.Error())
		return
	}

	// step 2 包装conn
	conn := NewConn(rawConn)

	// step 3 让逻辑层进行身份校验
	id, err := s.Accept(conn, s.loginWait)
	if err != nil {
		log.Warn(err)
		_ = conn.WriteFrame(him.OpClose, []byte(err.Error()))
		_ = conn.Close()
		return
	}
	if _, ok := s.Get(id); ok {
		log.Warnf("channel %s 已经存在", id)
		_ = conn.WriteFrame(him.OpClose, []byte("channelID重复了"))
		_ = conn.Close()
		return
	}

	// step 4 加入channel集合
	channel := NewChannel(id, conn)
	s.Add(channel)

	go func(ch him.Channel) {
		// step 5 监听请求
		if err := ch.ReadLoop(s); err != nil {
			log.Info(err)
		}
		// step 6 移除channel，让逻辑层处理断开连接请求，关闭连接
		s.Remove(ch.ID())
		if err = s.Disconnect(ch); err != nil {
			log.Warn(err)
		}
		_ = ch.Close()
	}(channel)
}

// Shutdown 关闭Server，这里会把channel都close
func (s *Server) Shutdown(ctx context.Context) error {
	log := logrus.WithFields(logrus.Fields{
		"module": "server",
	})
	s.shutdownOnce.Do(func() {
		defer func() {
			log.Infoln("shutdown")
		}()
		// close channels
		channels := s.All()
		for _, ch := range channels {
			_ = ch.Close()

			select {
			case <-ctx.Done():
				return
			default:
				continue
			}
		}

	})
	return nil
}

// Push 推送消息到一个连接
func (s *Server) Push(id string, data []byte) error {
	ch, ok := s.Get(id)
	if !ok {
		return errors.New("channel不存在")
	}
	return ch.Push(data)
}

func (*Server) resp(w http.ResponseWriter, code int, body string) {
	w.WriteHeader(code)
	if body != "" {
		_, _ = w.Write([]byte(body))
	}
	logrus.Warnf("响应:%d %s", code, body)
}

// SetAcceptor SetAcceptor
func (s *Server) SetAcceptor(acceptor him.Acceptor) {
	s.Acceptor = acceptor
}

// SetMessageListener SetMessageListener
func (s *Server) SetMessageListener(listener him.MessageListener) {
	s.MessageListener = listener
}

// SetStateListener SetStateListener
func (s *Server) SetStateListener(listener him.StateListener) {
	s.StateListener = listener
}

// SetChannelMap SetChannelMap
func (s *Server) SetChannelMap(channels him.ChannelMap) {
	s.ChannelMap = channels
}
