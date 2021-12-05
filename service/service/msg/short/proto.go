package short

import (
	"him/service/service/msg"
	"mime/multipart"
)

// UploadReq 上传请求（通过字节流）
type UploadReq struct {
	Image *multipart.FileHeader `form:"Image"` // 图片
	Voice *multipart.FileHeader `form:"Voice"` // 语音
	Video *multipart.FileHeader `form:"Video"` // 视频
	File  *multipart.FileHeader `form:"File"`  // 文件
}

// UploadRsp 上传响应
type UploadRsp struct {
	Image *msg.Image `json:"Image"` // 图片
	Voice *msg.Voice `json:"Voice"` // 语音
	Video *msg.Video `json:"Video"` // 视频
	File  *msg.File  `json:"File"`  // 文件
}

// GetSeqReq 获取用户序列号请求
type GetSeqReq struct {
	UserID uint64 `json:"UserID"` // 用户编号
}

// GetSeqRsp 获取用户序列号响应
type GetSeqRsp struct {
	LastSeq uint64 `json:"LastSeq"` // 最后一个序列号
}

// SeqRange 序列号范围
type SeqRange struct {
	StartSeq uint64 `json:"StartSeq"` // 起始序列号
	EndSeq   uint64 `json:"EndSeq"`   // 结尾序列号
}

// GetMsgsReq 获取消息请求
type GetMsgsReq struct {
	UserID    uint64      `json:"UserID"`    // 用户编号
	SeqRanges []*SeqRange `json:"SeqRanges"` // 序列号范围
}

// GetMsgsRsp 获取消息响应
type GetMsgsRsp struct {
	Msgs []*msg.Msg `json:"Msgs"` // 消息列表
}
