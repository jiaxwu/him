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
		// 建立连接
		conn, err := server.upgrader.Upgrade(w, r, nil)
		if err != nil {
			return
		}

		// 进行登录
		if err := server.login(conn); err != nil {
			return
		}

		// 保持长连接

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

// 登录
func (s *Handler) login(conn *websocket.Conn) error {
	var loginReq LoginReq
	if err := conn.ReadJSON(&loginReq); err != nil {
		return err
	}
	fmt.Printf("%+v\n", loginReq)
	return nil
}
