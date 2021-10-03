package pkt

import (
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/wire"
	"github.com/XiaoHuaShiFu/him/back/wire/endian"
	"strings"

	"io"

	"google.golang.org/protobuf/proto"
)

// LogicPkt 定义了网关对外的client消息结构
type LogicPkt struct {
	Header
	Body []byte `json:"body,omitempty"`
}

// HeaderOption HeaderOption
type HeaderOption func(*Header)

// WithStatus WithStatus
func WithStatus(status Status) HeaderOption {
	return func(h *Header) {
		h.Status = status
	}
}

// WithSeq WithSeq
func WithSeq(seq uint32) HeaderOption {
	return func(h *Header) {
		h.Sequence = seq
	}
}

// New new a empty payload message
func New(command string, options ...HeaderOption) *LogicPkt {
	pkt := &LogicPkt{}
	pkt.Command = command

	for _, option := range options {
		option(&pkt.Header)
	}
	if pkt.Sequence == 0 {
		pkt.Sequence = wire.Seq.Next()
	}
	return pkt
}

// NewFrom new packet from a header
func NewFrom(header *Header) *LogicPkt {
	pkt := &LogicPkt{}
	pkt.Header = Header{
		Command:   header.Command,
		Sequence:  header.Sequence,
		Status:    header.Status,
	}
	return pkt
}

// ReadPkt read bytes to LogicPkt from a reader
func (p *LogicPkt) Decode(r io.Reader) error {
	headerBytes, err := endian.ReadBytes(r)
	if err != nil {
		return err
	}
	if err := proto.Unmarshal(headerBytes, &p.Header); err != nil {
		return err
	}
	// read body
	p.Body, err = endian.ReadBytes(r)
	if err != nil {
		return err
	}
	return nil
}

// Encode Encode Header to writer
func (p *LogicPkt) Encode(w io.Writer) error {
	headerBytes, err := proto.Marshal(&p.Header)
	if err != nil {
		return err
	}
	if err := endian.WriteBytes(w, headerBytes); err != nil {
		return err
	}
	if err := endian.WriteBytes(w, p.Body); err != nil {
		return err
	}
	return nil
}

// ReadBody val must be a pointer
func (p *LogicPkt) ReadBody(val proto.Message) error {
	return proto.Unmarshal(p.Body, val)
}

// WritePb WritePb
func (p *LogicPkt) WriteBody(val proto.Message) *LogicPkt {
	if val == nil {
		return p
	}
	p.Body, _ = proto.Marshal(val)
	return p
}

// StringBody return string body
func (p *LogicPkt) StringBody() string {
	return string(p.Body)
}

func (p *LogicPkt) String() string {
	return fmt.Sprintf("header:%v body:%dbits", &p.Header, len(p.Body))
}

func (h *Header) ServiceName() string {
	arr := strings.SplitN(h.Command, ".", 2)
	if len(arr) <= 1 {
		return "default"
	}
	return arr[0]
}
