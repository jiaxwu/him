package code

import "him/service/common"

var (
	InvalidParameterAvatarLength = common.NewErrCode("InvalidParameter.Avatar.Length",
		"the length of avatar must not be greater than 200", "头像长度必须在200之间")
	InvalidParameterUsernameLength = common.NewErrCode("InvalidParameter.Username.Length",
		"the length of username must be between 5 and 30", "用户名长度必须在5-30之间")
	InvalidParameterNickNameLength = common.NewErrCode("InvalidParameter.NickName.Length",
		"the length of nick name must be between 2 and 10", "昵称长度必须在2-10之间")

	ExistsUsername = common.NewErrCode("Exists.Username", "the username exists", "用户名已经存在")

	NotFoundUser = common.NewErrCode("NotFound.User", "the request user not found", "找不到要访问的用户")
)
