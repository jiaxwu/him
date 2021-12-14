package server

import "github.com/jiaxwu/him/common"

var (
	ErrCodeNotFoundAPI = common.NewErrCode("NotFound.API", "the request api not found",
		"找不到要访问的接口")
)
