package access

import "github.com/gorilla/websocket"

type Conn struct {
	*websocket.Conn

}
