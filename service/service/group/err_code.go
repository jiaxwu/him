package group

import "him/service/common"

var (
	ErrCodeInvalidParameterMustBeFriend = common.NewErrCode("InvalidParameter.MustBeFriend",
		"the group member must be friend", "群成员必须是自己的好友")
	ErrCodeInvalidParameterIsAlreadyFriend = common.NewErrCode("InvalidParameter.IsAlreadyFriend",
		"is already friend", "已经是好友")
	ErrCodeInvalidParameterInBlacklist = common.NewErrCode("InvalidParameter.InBlacklist",
		"in the blacklist", "您在对方的黑名单中，无法发出好友申请")
	ErrCodeInvalidParameterApplicationIsPending = common.NewErrCode("InvalidParameter.ApplicationIsPending",
		"the application is pending", "正在申请中，请勿重复申请")
	ErrCodeInvalidParameterApplicationIsEnd = common.NewErrCode("InvalidParameter.ApplicationIsEnd",
		"the application is end", "申请已经结束")
)
