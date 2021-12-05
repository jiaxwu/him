package short

import (
	httpHeaderValue "him/common/constant/http/header/value"
	imageFormat "him/common/constant/image/format"
)

const (
	// MsgBucketURL 消息桶路径
	MsgBucketURL = "https://him-msg-1256931327.cos.ap-nanjing.myqcloud.com/"

	// MaxImageSize 最大图片长度
	MaxImageSize = 10485760
)

// ImageFormatToContentTypeMap 图片的 FileFormat 到 ContentType 的转换
var ImageFormatToContentTypeMap = map[string]string{
	imageFormat.JPEG: httpHeaderValue.ImageJPEG,
	imageFormat.PNG:  httpHeaderValue.ImagePNG,
	imageFormat.GIF:  httpHeaderValue.ImageGIF,
}
