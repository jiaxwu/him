package link

import (
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/gobwas/ws"
	"net"
)

type Frame struct {
	raw ws.Frame
}

func (f *Frame) SetOpCode(code him.OpCode) {
	f.raw.Header.OpCode = ws.OpCode(code)
}

func (f *Frame) GetOpCode() him.OpCode {
	return him.OpCode(f.raw.Header.OpCode)
}

func (f *Frame) SetPayload(payload []byte) {
	f.raw.Payload = payload
}

func (f *Frame) GetPayload() []byte {
	if f.raw.Header.Masked {
		ws.Cipher(f.raw.Payload, f.raw.Header.Mask, 0)
	}
	f.raw.Header.Masked = false
	return f.raw.Payload
}

type Conn struct {
	net.Conn
}

func NewConn(conn net.Conn) him.Conn {
	return &Conn{
		Conn: conn,
	}
}

func (c *Conn) ReadFrame() (him.Frame, error) {
	f, err := ws.ReadFrame(c.Conn)
	if err != nil {
		return nil, err
	}
	return &Frame{raw: f}, nil
}

func (c *Conn) WriteFrame(code him.OpCode, payload []byte) error {
	f := ws.NewFrame(ws.OpCode(code), true, payload)
	return ws.WriteFrame(c.Conn, f)
}

func (c *Conn) Flush() error {
	return nil
}
