package short

import (
	"github.com/jiaxwu/him/common"
)

var (
	ErrCodeInvalidParameterImageSize = common.NewErrCode("InvalidParameter.Image.Size",
		"the size of image must not be greater than 10485760B", "图片必须不大于10MB")
	ErrCodeInvalidParameterImageFormat = common.NewErrCode("InvalidParameter.Image.Format",
		"the format of image must be one of [png, jpeg, gif]", "图片类型必须是png、jpeg或gif")
)
