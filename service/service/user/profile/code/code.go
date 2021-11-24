package code

import "github.com/xiaohuashifu/him/service/common"

var (
	InvalidParameterAvatarLength = common.NewErrCode("InvalidParameter.Avatar.Length",
		"the length of avatar must not be greater than 200", "头像长度必须在200之间")
	InvalidParameterUsernameLength = common.NewErrCode("InvalidParameter.Username.Length",
		"the length of username must be between 5 and 30", "用户名长度必须在5-30之间")
	InvalidParameterNickNameLength = common.NewErrCode("InvalidParameter.NickName.Length",
		"the length of nick name must be between 2 and 10", "昵称长度必须在2-10之间")

	InvalidParameterAvatarEmpty = common.NewErrCode("InvalidParameter.Avatar.Empty", "the avatar is empty",
		"头像不能为空")
	InvalidParameterAvatarSize = common.NewErrCode("InvalidParameter.Avatar.Size",
		"the size of avatar must not be greater than 1048576B", "头像必须小于1MB")
	InvalidParameterAvatarContentType = common.NewErrCode("InvalidParameter.Avatar.ContentType",
		"the content type of avatar must be one of [image/png, image/jpg, image/jpeg]",
		"头像类型必须是png、jpg或jpeg")

	CanNotOpenFile = common.NewErrCode("CanNotOpenFile", "can not open the FileHeader",
		"无法打开文件，请重试")

	ExistsUsername = common.NewErrCode("Exists.Username", "the username exists", "用户名已经存在")

	NotFoundUser = common.NewErrCode("NotFound.User", "the request user not found", "找不到要访问的用户")
)
