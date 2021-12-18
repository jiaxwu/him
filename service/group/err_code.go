package group

import (
	"github.com/jiaxwu/him/common"
)

var (
	ErrCodeInvalidParameterMustBeFriend = common.NewErrCode("InvalidParameter.MustBeFriend",
		"the group member must be friend", "群成员必须是自己的好友")
	ErrCodeInvalidParameterMustBeMember = common.NewErrCode("InvalidParameter.MustBeMember",
		"the user must be the group member", "你不是该群的成员")
)
