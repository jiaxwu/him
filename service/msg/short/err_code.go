package short

import (
	"github.com/jiaxwu/him/common"
)

var (
	ErrCodeInvalidParameterImageSize = common.NewErrCode("InvalidParameter.Image.Size",
		"the size of image must not be greater than 10485760B", "头像必须不大于10MB")
	ErrCodeInvalidParameterImageFormat = common.NewErrCode("InvalidParameter.Image.Format",
		"the format of image must be one of [png, jpeg, gif]", "头像类型必须是png、jpeg或gif")
)
