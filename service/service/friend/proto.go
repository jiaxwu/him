package friend

import "him/service/service/user/profile"

// FriendInfo 好友信息
type FriendInfo struct {
	FriendID    uint64         // 好友编号
	NickName    string         // 昵称
	Username    string         // 用户名
	Avatar      string         // 头像
	Gender      profile.Gender // 性别
	Remark      string         // 备注
	Description string         // 描述
	IsDisturb   bool           // 是否免打扰
	IsBlacklist bool           // 是否黑名单
	IsTop       bool           // 是否置顶
	IsFriend    bool           // 是否是朋友(如果被删将不是朋友，陌生人也不是)
}

// GetFriendInfosReq 获取好友信息请求
type GetFriendInfosReq struct {
	UserID    uint64                      // 用户编号
	Condition *GetFriendInfosReqCondition // 条件
}

// GetFriendInfosReqCondition 获取好友信息请求条件
type GetFriendInfosReqCondition struct {
	Username string // 好友用户名
	FriendID uint64 // 好友编号
	IsFriend bool   // 全部朋友
}

// GetFriendInfosRsp 获取好友信息响应
type GetFriendInfosRsp struct {
	FriendInfos []*FriendInfo // 好友信息列表
}

// UpdateFriendInfoReq 更新好友信息请求
type UpdateFriendInfoReq struct {
	UserId   uint64                     // 用户编号
	FriendId uint64                     // 好友编号
	Action   *UpdateFriendInfoReqAction // 更新好友信息请求的行为
}

// UpdateFriendInfoReqAction 更新好友信息请求的行为
type UpdateFriendInfoReqAction struct {
	isDisturb   bool   // 是否免打扰
	isBlacklist bool   // 是否黑名单
	IsTop       bool   // 是否置顶
	Remark      string // 备注
	Description string // 描述
}

// UpdateFriendInfoRsp 更新好友信息响应
type UpdateFriendInfoRsp struct {
	FriendInfo *FriendInfo // 好友信息
}

// AddFriendApplicationStatus 添加好友申请状态
type AddFriendApplicationStatus uint8

const (
	AddFriendApplicationStatusWaitConfirm AddFriendApplicationStatus = 1 // 等待确认
	AddFriendApplicationStatusReject      AddFriendApplicationStatus = 2 // 拒绝
	AddFriendApplicationStatusAccept      AddFriendApplicationStatus = 3 // 接受
	AddFriendApplicationStatusExpire      AddFriendApplicationStatus = 4 // 过期
)

// AddFriendApplication 添加好友申请
type AddFriendApplication struct {
	AddFriendApplicationID uint64                     // 添加好友申请编号
	ApplicantID            uint64                     // 申请者用户编号
	FriendID               uint64                     // 好友编号
	ApplicationMsg         string                     // 申请消息
	FriendReply            string                     // 好友回复
	Status                 AddFriendApplicationStatus // 申请状态
	ApplicationTime        uint64                     // 申请时间
}

// CreateAddFriendApplicationReq 创建添加好友申请请求
type CreateAddFriendApplicationReq struct {
	ApplicantID    uint64 // 申请人编号
	FriendID       uint64 // 好友编号
	ApplicationMsg string // 申请消息
}

// CreateAddFriendApplicationRsp 创建添加好友申请响应
type CreateAddFriendApplicationRsp struct {
	AddFriendApplication *AddFriendApplication // 添加好友申请
}
