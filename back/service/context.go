package service

import (
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/sirupsen/logrus"
	"google.golang.org/protobuf/proto"
)

type Context struct {
	request *pkt.LogicPkt
	session *pkt.Session
	conn    him.Conn
	pusher  him.Pusher
}

func NewContext(request *pkt.LogicPkt, session *pkt.Session, conn him.Conn, pusher him.Pusher) him.Context {
	return &Context{
		request: request,
		session: session,
		conn:    conn,
		pusher:  pusher,
	}
}

// RespWithError response with error
func (c *Context) RespWithError(status pkt.Status, err error) error {
	return c.Resp(status, &pkt.ErrorResp{Message: err.Error()})
}

// Resp send a response message to sender, the header of packet copied from request
func (c *Context) Resp(status pkt.Status, body proto.Message) error {
	packet := pkt.NewFrom(&c.request.Header)
	packet.Status = status
	packet.WriteBody(body)
	packet.Flag = pkt.Flag_Response
	logrus.Debugf("<-- Resp command:%s  status: %v body: %s", &c.request.Header, status, body)

	err := c.conn.WriteFrame(him.OpBinary, pkt.Marshal(packet))
	return err
}

// Dispatch the packet to the Destination of request,
// the header flag of this packet will be set with FlagDelivery
// exceptMe:  exclude self if self is false
func (c *Context) Dispatch(body proto.Message, recvs ...*pkt.Location) error {
	if len(recvs) == 0 {
		return nil
	}
	packet := pkt.NewFrom(&c.request.Header)
	packet.Flag = pkt.Flag_Push
	packet.WriteBody(body)

	logrus.Debugf("<-- Dispatch to %d users command:%s", len(recvs), &c.request.Header)

	for _, recv := range recvs {
		err := c.pusher.Push(recv.ChannelId, pkt.Marshal(packet))
		if err != nil {
			logrus.Debugf("push 出错 %s", err.Error())
		}
	}
	return nil
}

func (c *Context) Header() *pkt.Header {
	return &c.request.Header
}

func (c *Context) ReadBody(val proto.Message) error {
	return c.request.ReadBody(val)
}

func (c *Context) Session() *pkt.Session {
	return c.session
}
