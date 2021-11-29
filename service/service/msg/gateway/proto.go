package gateway

import "him/service/service/auth"

type LoginReq struct {
	Terminal auth.Terminal `json:"Terminal"` // 终端
	Token    string        `json:"Token"`    // 凭证
}

type LoginRsp struct{}
