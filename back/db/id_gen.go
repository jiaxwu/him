package db

import (
	"github.com/bwmarrin/snowflake"
	"sync"
)

type IDGenerator struct {
	node *snowflake.Node
	once sync.Once
}

var idGen = &IDGenerator{}

func NewIDGen() *snowflake.Node {
	idGen.once.Do(func() {
		node, _ := snowflake.NewNode(233)
		idGen.node = node
	})
	return idGen.node
}
