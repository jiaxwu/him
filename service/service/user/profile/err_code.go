package profile

import "github.com/jiaxwu/him/service/common"

var (
	ErrCodeInvalidParameterAvatarLength = common.NewErrCode("InvalidParameter.Avatar.Length",
		"the length of avatar must not be greater than 200", "头像长度必须在200之间")
	ErrCodeInvalidParameterUsername = common.NewErrCode("InvalidParameter.Username",
		"the username is invalid", "用户名长度必须在5-30之间，且只由数字、小写字母、大写字母和_组成，并且不能为纯数字")
	ErrCodeInvalidParameterNickNameLength = common.NewErrCode("InvalidParameter.NickName.Length",
		"the length of nick name must be between 2 and 10", "昵称长度必须在2-10之间")
	ErrCodeInvalidParameterGender = common.NewErrCode("InvalidParameter.Gender",
		"the gender must be one of [0, 1, 2]", "性别必须是[0未知,1男,2女]中的一个")
	ErrCodeInvalidParameterAvatarEmpty = common.NewErrCode("InvalidParameter.Avatar.Empty",
		"the avatar is empty", "头像不能为空")
	ErrCodeInvalidParameterAvatarSize = common.NewErrCode("InvalidParameter.Avatar.Size",
		"the size of avatar must not be greater than 1048576B", "头像必须小于1MB")
	ErrCodeInvalidParameterAvatarContentType = common.NewErrCode("InvalidParameter.Avatar.ContentType",
		"the content type of avatar must be one of [image/png, image/jpg, image/jpeg]",
		"头像类型必须是png、jpg或jpeg")

	ErrCodeCanNotOpenFile = common.NewErrCode("CanNotOpenFile", "can not open the FileHeader",
		"无法打开文件，请重试")

	ErrCodeExistsUsername = common.NewErrCode("Exists.Username", "the username exists",
		"用户名已经存在")


)
