package group

import (
	"github.com/jiaxwu/him/common"
)

var (
	ErrCodeInvalidParameterMustBeFriend = common.NewErrCode("InvalidParameter.MustBeFriend",
		"the group member must be friend", "群成员必须是自己的好友")
	ErrCodeInvalidParameterNotGroupMember = common.NewErrCode("InvalidParameter.NotGroupMember",
		"the user not group member", "你不是该群的成员")
	ErrCodeInvalidParameterAlreadyIsGroupMember = common.NewErrCode("InvalidParameter.AlreadyIsGroupMember",
		"the user already is the group member", "你已经是该群成员")
	ErrCodeInvalidParameterNeedApply = common.NewErrCode("InvalidParameter.NeedApply",
		"join group need apply", "需要申请入群")
	ErrCodeInvalidParameterNeedInvite = common.NewErrCode("InvalidParameter.NeedInvite",
		"join group need invite", "需要邀请入群")
	ErrCodeInvalidParameterNotNeedApply = common.NewErrCode("InvalidParameter.NotNeedApply",
		"join group not need apply", "不需要申请入群，请重新尝试")
	ErrCodeInvalidParameterGroupNotExists = common.NewErrCode("InvalidParameter.GroupNotExists",
		"the group not exists", "该群不存在")
	ErrCodeInvalidParameterGroupQRCodeExpired = common.NewErrCode("InvalidParameter.GroupQRCode.Expired",
		"the group qrcode already expired", "群二维码已经过期")
	ErrCodeInvalidParameterGroupMemberNotExists = common.NewErrCode("InvalidParameter.GroupMember.NotExists",
		"the group member not exists", "查询不到群成员")
)
