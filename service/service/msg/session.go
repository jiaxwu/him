package msg

import (
	"fmt"
	"him/service/service/auth"
)

// SessionID 会话编号
func SessionID(userID uint64, terminal auth.Terminal) string {
	return fmt.Sprintf("msg:%d:%s", userID, terminal)
}
