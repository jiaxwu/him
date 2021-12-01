package short

// GetSeqReq 获取用户序列号请求
type GetSeqReq struct {
	UserID uint64 // 用户编号
}

// GetSeqRsp 获取用户序列号响应
type GetSeqRsp struct {
	LastSeq uint64 // 最后一个序列号
}
