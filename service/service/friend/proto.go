package friend

// AddFriendApplicationStatus 添加好友申请状态
type AddFriendApplicationStatus uint8

const (
	AddFriendApplicationStatusWaitConfirm  AddFriendApplicationStatus = 1 // 等待确认
	AddFriendApplicationStatusStatusReject AddFriendApplicationStatus = 2 // 拒绝
	AddFriendApplicationStatusStatusAccept AddFriendApplicationStatus = 3 // 接受
	AddFriendApplicationStatusStatusExpire AddFriendApplicationStatus = 4 // 过期
)

// CreateAddFriendApplicationReq 创建添加好友申请请求
type CreateAddFriendApplicationReq struct {
	ApplicantID    uint64 // 申请人编号
	FriendID       uint64 // 好友编号
	ApplicationMsg string // 申请消息
}

// CreateAddFriendApplicationRsp 创建添加好友申请响应
type CreateAddFriendApplicationRsp struct {
	AddFriendApplicationID uint64 // 添加好友申请编号
}
