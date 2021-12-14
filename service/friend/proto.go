package friend

import (
	"github.com/jiaxwu/him/service/user"
)

// FriendInfo 好友信息
type FriendInfo struct {
	FriendID    uint64        `json:"FriendID"`    // 好友编号
	UserType    user.UserType `json:"UserType"`    // 用户类型
	NickName    string        `json:"NickName"`    // 昵称
	Username    string        `json:"Username"`    // 用户名
	Avatar      string        `json:"Avatar"`      // 头像
	Gender      user.Gender   `json:"Gender"`      // 性别
	Remark      string        `json:"Remark"`      // 备注
	Description string        `json:"Description"` // 描述
	IsDisturb   bool          `json:"IsDisturb"`   // 是否免打扰
	IsBlacklist bool          `json:"IsBlacklist"` // 是否黑名单
	IsTop       bool          `json:"IsTop"`       // 是否置顶
	IsFriend    bool          `json:"IsFriend"`    // 是否是朋友(如果被删将不是朋友，陌生人也不是)
}

// GetFriendInfosReq 获取好友信息请求
type GetFriendInfosReq struct {
	UserID    uint64                      `json:"UserID"`    // 用户编号
	Condition *GetFriendInfosReqCondition `json:"Condition"` // 条件
}

// GetFriendInfosReqCondition 获取好友信息请求条件
type GetFriendInfosReqCondition struct {
	Username string `json:"Username"` // 好友用户名
	FriendID uint64 `json:"FriendID"` // 好友编号
	IsFriend bool   `json:"IsFriend"` // 全部朋友
}

// GetFriendInfosRsp 获取好友信息响应
type GetFriendInfosRsp struct {
	FriendInfos []*FriendInfo `json:"FriendInfos"` // 好友信息列表
}

// IsFriendReq 是否是朋友请求
type IsFriendReq struct {
	UserID   uint64 `json:"UserID"`   // 用户编号
	FriendID uint64 `json:"FriendID"` // 好友编号
}

// IsFriendRsp 是否是朋友响应
type IsFriendRsp struct {
	IsFriend bool `json:"IsFriend"` // 是否是好友
}

// UpdateFriendInfoReq 更新好友信息请求
type UpdateFriendInfoReq struct {
	UserID   uint64                     `json:"UserID"`   // 用户编号
	FriendID uint64                     `json:"FriendID"` // 好友编号
	Action   *UpdateFriendInfoReqAction `json:"Action"`   // 更新好友信息请求的行为
}

// UpdateFriendInfoReqAction 更新好友信息请求的行为
type UpdateFriendInfoReqAction struct {
	IsDisturb   *bool  `json:"IsDisturb"`   // 是否免打扰
	IsBlacklist *bool  `json:"IsBlacklist"` // 是否黑名单
	IsTop       *bool  `json:"IsTop"`       // 是否置顶
	Remark      string `json:"Remark"`      // 备注
	Description string `json:"Description"` // 描述
}

// UpdateFriendInfoRsp 更新好友信息响应
type UpdateFriendInfoRsp struct {
	FriendInfo *FriendInfo `json:"FriendInfo"` // 好友信息
}

// DeleteFriendReq 删除好友请求
type DeleteFriendReq struct {
	UserID   uint64 // 用户编号
	FriendID uint64 // 好友编号
}

// DeleteFriendRsp 删除好友响应
type DeleteFriendRsp struct{}

// GetAddFriendApplicationsReq 获取添加好友申请请求
type GetAddFriendApplicationsReq struct {
	UserID                     uint64 `json:"UserID"`                     // 用户编号
	LastAddFriendApplicationId uint64 `json:"LastAddFriendApplicationID"` // 最后一个添加好友请求的编号（因为是反过来排序的）
	Size                       int    `json:"Size"`                       // 多少条
}

// GetAddFriendApplicationsRsp 获取添加好友申请响应
type GetAddFriendApplicationsRsp struct {
	AddFriendApplications []*AddFriendApplication `json:"AddFriendApplications"` // 添加好友申请
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
	AddFriendApplicationID uint64                     `json:"AddFriendApplicationID"` // 添加好友申请编号
	ApplicantID            uint64                     `json:"ApplicantID"`            // 申请者用户编号
	FriendID               uint64                     `json:"FriendID"`               // 好友编号
	ApplicationMsg         string                     `json:"ApplicationMsg"`         // 申请消息
	FriendReply            string                     `json:"FriendReply"`            // 好友回复
	Status                 AddFriendApplicationStatus `json:"Status"`                 // 申请状态
	ApplicationTime        uint64                     `json:"ApplicationTime"`        // 申请时间
}

// CreateAddFriendApplicationReq 创建添加好友申请请求
type CreateAddFriendApplicationReq struct {
	ApplicantID    uint64 `json:"ApplicantID"`    // 申请人编号
	FriendID       uint64 `json:"FriendID"`       // 好友编号
	ApplicationMsg string `json:"ApplicationMsg"` // 申请消息
}

// CreateAddFriendApplicationRsp 创建添加好友申请响应
type CreateAddFriendApplicationRsp struct {
	AddFriendApplication *AddFriendApplication `json:"AddFriendApplication"` // 添加好友申请
}

// UpdateAddFriendApplicationReq 更新添加好友申请请求
type UpdateAddFriendApplicationReq struct {
	UserID                 uint64                               `json:"UserID"`                 // 用户编号
	AddFriendApplicationID uint64                               `json:"AddFriendApplicationID"` // 添加好友申请编号
	Action                 *UpdateAddFriendApplicationReqAction `json:"Action"`                 // 更新添加好友申请请求的行为
}

// UpdateAddFriendApplicationReqAction 更新添加好友申请请求的行为
type UpdateAddFriendApplicationReqAction struct {
	ApplicationMsg string `json:"ApplicationMsg"` // 申请消息
	FriendReply    string `json:"FriendReply"`    // 好友回复
	Accept         bool   `json:"Accept"`         // 接受
	Reject         bool   `json:"Reject"`         // 拒绝
}

// UpdateAddFriendApplicationRsp 更新添加好友申请响应
type UpdateAddFriendApplicationRsp struct {
	AddFriendApplication *AddFriendApplication `json:"AddFriendApplication"` // 添加好友申请
}
