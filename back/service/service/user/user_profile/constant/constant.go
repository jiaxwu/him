package constant

import (
	httpHeaderValue "him/common/constant/http/header/value"
	imageSuffix "him/common/constant/image/suffix"
)

const (
	// UserAvatarBucketURL 用户头像桶路径
	UserAvatarBucketURL = "https://him-avatar-1256931327.cos.ap-beijing.myqcloud.com/"

	// MaxUserAvatarSize 用户头像最大长度 5MB
	MaxUserAvatarSize = 1048576
)

// UserAvatarContentTypeToFileTypeMap 用户头像的 ContentType 到 FileType 的转换
var UserAvatarContentTypeToFileTypeMap = map[string]string{
	httpHeaderValue.ImagePNG:  imageSuffix.PNG,
	httpHeaderValue.ImageJPG:  imageSuffix.JPG,
	httpHeaderValue.ImageJPEG: imageSuffix.JPEG,
}
