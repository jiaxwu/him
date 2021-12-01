package gateway

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
	httpQueryKey "him/common/constant/http/query/key"
	"him/service/common"
	"him/service/service/auth"
	"him/service/service/msg"
	"him/service/wrap"
	"net/http"
	"sync"
	"time"
)

// Conn 一个连接
type Conn struct {
	conn    *websocket.Conn
	session *auth.Session
	mutex   sync.Mutex
}

// Server 长连接入口
type Server struct {
	upgrader        *websocket.Upgrader
	sessionIDToConn map[string]*Conn
	connToSessionID map[*Conn]string
	authService     *auth.Service
	rdb             *redis.Client
	logger          *logrus.Logger
	mutex           sync.Mutex
	msgService      *Service
}

// NewGatewayServer 创建一个长连接入口
func NewGatewayServer(engine *gin.Engine, wrapper *wrap.Wrapper, logger *logrus.Logger,
	authService *auth.Service, rdb *redis.Client, msgService *Service) *Server {
	server := Server{
		upgrader: &websocket.Upgrader{
			HandshakeTimeout: WSHandshakeTimeout,
			ReadBufferSize:   WSReadBufferSize,
			CheckOrigin:      newWSOriginChecker(),
			Error:            newWSUpgradeErrorHandler(logger),
		},
		sessionIDToConn: make(map[string]*Conn),
		connToSessionID: make(map[*Conn]string),
		authService:     authService,
		rdb:             rdb,
		logger:          logger,
		msgService:      msgService,
	}
	engine.GET("/msg", wrapper.Wrap(func(w http.ResponseWriter, r *http.Request) {
		// 建立连接
		conn, err := server.buildConn(w, r)
		if err != nil {
			return
		}

		// 保持长连接
		go server.handle(conn)
	}, &wrap.Config{
		NotNeedLogin:    true,
		NotNeedResponse: true,
	}))
	return &server
}

// 处理长连接请求
func (h *Server) handle(conn *Conn) {
	for {
		// Step 1 读取消息
		if err := conn.conn.SetReadDeadline(time.Now().Add(WSReadExpireTime)); err != nil {
			break
		}
		msgType, reqBytes, err := conn.conn.ReadMessage()
		if err != nil {
			break
		}

		// Step 2 如果是 ping 不管
		if msgType == websocket.PingMessage {
			continue
		}

		// Step 3 处理请求
		if err := h.writeEvent(conn, &msg.Event{
			Rsp: h.sendMsg(conn.session, reqBytes),
		}); err != nil {
			break
		}
	}
	h.clearConn(conn)
}

// 发送消息
func (h *Server) sendMsg(session *auth.Session, reqBytes []byte) *common.Rsp {
	var req SendMsgReq
	if err := json.Unmarshal(reqBytes, &req); err != nil {
		return common.FailureRsp(common.ErrCodeInvalidParameter)
	}
	req.Sender = &msg.Sender{
		Type:     msg.SenderTypeUser,
		SenderID: session.UserID,
		Terminal: session.Terminal,
	}
	sendMsgRsp, err := h.msgService.SendMsg(&req)
	if err != nil {
		return common.FailureRsp(err)
	}
	return common.SuccessRsp(sendMsgRsp)
}

// 写事件
func (h *Server) writeEvent(conn *Conn, event *msg.Event) error {
	conn.mutex.Lock()
	defer conn.mutex.Unlock()
	return conn.conn.WriteJSON(&event)
}

// 建立连接
func (h *Server) buildConn(w http.ResponseWriter, r *http.Request) (*Conn, error) {
	// 获取会话
	token := r.URL.Query().Get(httpQueryKey.Token)
	if token == "" {
		return nil, errors.New("token is empty")
	}
	rsp, err := h.authService.GetSession(&auth.GetSessionReq{
		Token: token,
	})
	if err != nil {
		return nil, err
	}
	session := rsp.Session

	// Step 1 清理旧连接
	sessionID := msg.SessionID(session.UserID, session.Terminal)
	h.mutex.Lock()
	defer h.mutex.Unlock()
	if oldConn := h.sessionIDToConn[sessionID]; oldConn != nil {
		// 断开ws连接
		if err := oldConn.conn.Close(); err != nil {
			h.logger.WithField("err", err).Error("close conn exception")
		}
		// 删除连接
		delete(h.sessionIDToConn, sessionID)
		delete(h.connToSessionID, oldConn)
		// 删除Redis会话
		if err := h.rdb.Del(context.Background(), sessionID).Err(); err != nil {
			h.logger.WithField("err", err).Error("delete redis session exception")
			return nil, err
		}
	}

	// Step 2 建立连接
	conn, err := h.upgrader.Upgrade(w, r, nil)
	if err != nil {
		return nil, err
	}
	newConn := Conn{
		conn:    conn,
		session: session,
	}
	h.sessionIDToConn[sessionID] = &newConn
	h.connToSessionID[&newConn] = sessionID
	// 添加Redis会话
	if err := h.rdb.Set(context.Background(), sessionID, "", 0).Err(); err != nil {
		h.logger.WithField("err", err).Error("set redis session exception")
		// 删除连接
		delete(h.sessionIDToConn, sessionID)
		delete(h.connToSessionID, &newConn)
		return nil, err
	}
	return &newConn, nil
}

// 清理连接
func (h *Server) clearConn(conn *Conn) {
	h.mutex.Lock()
	defer h.mutex.Unlock()
	// 会话已经被删除
	sessionID := h.connToSessionID[conn]
	if sessionID == "" {
		return
	}

	// 删除会话
	// 断开ws连接
	if err := conn.conn.Close(); err != nil {
		h.logger.WithField("err", err).Error("close conn exception")
	}
	// 删除连接
	delete(h.sessionIDToConn, sessionID)
	delete(h.connToSessionID, conn)
	// 删除Redis会话
	if err := h.rdb.Del(context.Background(), sessionID).Err(); err != nil {
		h.logger.WithField("err", err).Error("delete redis session exception")
	}
}
