package gateway

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
	"him/service/wrap"
	"net/http"
	"sync"
)

type Conn struct {
	*websocket.Conn
	w *sync.Mutex
}

// Handler 长连接入口
type Handler struct {
	upgrader   *websocket.Upgrader
	connToUser map[*Conn]string
	userToConn map[string]*Conn
}

// NewGatewayHandler 创建一个长连接入口
func NewGatewayHandler(engine *gin.Engine, wrapper *wrap.Wrapper, logger *logrus.Logger) *Handler {
	server := Handler{
		connToUser: make(map[*Conn]string),
		userToConn: make(map[string]*Conn),
		upgrader: &websocket.Upgrader{
			HandshakeTimeout: WSHandshakeTimeout,
			ReadBufferSize:   WSReadBufferSize,
			CheckOrigin:      newWSOriginChecker(),
			Error:            newWSUpgradeErrorHandler(logger),
		},
	}
	engine.GET("/msg", wrapper.Wrap(func(w http.ResponseWriter, r *http.Request) {
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			return
		}

		fmt.Println(conn)
		//conn.WriteJSON("xxxxxx")
	}, &wrap.Config{
		NotNeedLogin:    true,
		NotNeedResponse: true,
	}))
	return &server
}

// 处理长连接请求
func (s *Handler) handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Header.Get("Token"))
	fmt.Println(r.URL.Query())
}

// 身份认证
// 验证token是否正确
//
func (s *Handler) auth(w http.ResponseWriter, r *http.Request) bool {
	return false
}
