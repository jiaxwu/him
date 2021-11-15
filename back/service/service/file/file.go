package file

// File 文件
type File struct {
	Name        string // 原始文件名
	ContentType string // 文件类型
	Content     []byte // 文件
}

//ErrCodeInvalidParameterAvatarEmpty = NewErrCode("InvalidParameter.Avatar.Empty", "the avatar is empty",
//"头像不能为空")
//ErrCodeInvalidParameterAvatarContentType = NewErrCode("InvalidParameter.Avatar.ContentType",
//"the content type of avatar must be one of [image/png, image/jpg, image/jpeg]",
//"头像类型必须是png、jpg或jpeg")