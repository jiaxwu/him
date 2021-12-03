package msg

import "github.com/brianvoe/gofakeit/v6"

// IDGenerator id生成器
type IDGenerator struct{}

func NewIDGenerator() *IDGenerator {
	return &IDGenerator{}
}

// GenMsgID 获取消息编号
func (g *IDGenerator) GenMsgID() string {
	return gofakeit.UUID()
}
