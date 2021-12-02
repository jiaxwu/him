package short

import "him/service/service/msg"

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
