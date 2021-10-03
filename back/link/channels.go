package link

import (
	"github.com/XiaoHuaShiFu/him/back/him"
	"sync"
)

// Channels 这是channel的一个集合
type Channels struct {
	channels *sync.Map
}

// NewChannels 创建一个Channels
func NewChannels() him.ChannelMap {
	return &Channels{
		channels: new(sync.Map),
	}
}

// Add 添加一个Channel到集合
func (ch *Channels) Add(channel him.Channel) {
	ch.channels.Store(channel.ID(), channel)
}

// Remove 从集合移除一个Channel
func (ch *Channels) Remove(id string) {
	ch.channels.Delete(id)
}

// Get 从集合获取一个Channel
func (ch *Channels) Get(id string) (him.Channel, bool) {
	val, ok := ch.channels.Load(id)
	if !ok {
		return nil, false
	}
	return val.(*Channel), true
}

// All 返回集合里的所有Channel
func (ch *Channels) All() []him.Channel {
	arr := make([]him.Channel, 0)
	ch.channels.Range(func(key, val interface{}) bool {
		arr = append(arr, val.(him.Channel))
		return true
	})
	return arr
}
