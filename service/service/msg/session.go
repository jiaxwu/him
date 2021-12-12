package msg

import (
	"fmt"
	"github.com/jiaxwu/him/service/service/auth"
)

// SessionID 会话编号
func SessionID(userID uint64, terminal auth.Terminal) string {
	return fmt.Sprintf("msg:%d:%s", userID, terminal)
}

// SeqKey 序列号的key
func SeqKey(userID uint64) string {
	return fmt.Sprintf("msg:seq:%d", userID)
}
