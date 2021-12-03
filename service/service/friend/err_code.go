package friend

import "him/service/common"

var (
	ErrCodeInvalidParameterIsAlreadyFriend = common.NewErrCode("InvalidParameter.IsAlreadyFriend",
		"is already friend", "已经是好友")
	ErrCodeInvalidParameterInBlacklist = common.NewErrCode("InvalidParameter.InBlacklist",
		"in the blacklist", "您在对方的黑名单中，无法发出好友申请")
)
