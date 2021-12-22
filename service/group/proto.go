package group

// GroupMemberRole 群成员角色
type GroupMemberRole uint8

const (
	GroupMemberRoleLeader  GroupMemberRole = 1  // 群主
	GroupMemberRoleManager GroupMemberRole = 10 // 管理员
	GroupMemberRoleMember  GroupMemberRole = 20 // 成员

)

// GroupMemberInfo 群成员信息
type GroupMemberInfo struct {
	GroupID        uint64          `json:"GroupID"`        // 群编号
	MemberID       uint64          `json:"MemberID"`       // 成员编号
	Role           GroupMemberRole `json:"Role"`           // 角色
	GroupNickName  string          `json:"GroupNickName"`  // 群昵称
	IsDisturb      bool            `json:"IsDisturb"`      // 是否免打扰
	IsTop          bool            `json:"IsTop"`          // 是否置顶
	IsShowNickName bool            `json:"IsShowNickName"` // 是显示群成员昵称
	JoinTime       uint64          `json:"JoinTime"`       // 入群时间
}

// GroupInfo 群信息
type GroupInfo struct {
	GroupID                      uint64           `json:"GroupID"`                      // 群编号
	Name                         string           `json:"Name"`                         // 群名
	Icon                         string           `json:"Icon"`                         // 图标
	Members                      uint32           `json:"Members"`                      // 成员数
	IsInviteJoinGroupNeedConfirm bool             `json:"IsInviteJoinGroupNeedConfirm"` // 是否邀请入群需要管理员或群主确认（默认不需要确认直接入群）
	Notice                       string           `json:"Notice,omitempty"`             // 群公告
	GroupMemberInfo              *GroupMemberInfo `json:"GroupMemberInfo,omitempty"`    // 群成员信息
}

// GetGroupInfoReq 获取群信息请求
type GetGroupInfoReq struct {
	UserID  uint64 `json:"UserID"`  // 用户编号
	GroupID uint64 `json:"GroupID"` // 群编号
}

// GetGroupInfoRsp 获取群信息响应
type GetGroupInfoRsp struct {
	GroupInfo *GroupInfo `json:"GroupInfo"` // 群信息
}

// GetUserGroupInfosReq 获取用户群信息请求
type GetUserGroupInfosReq struct {
	UserID uint64 `json:"UserID"` // 用户编号
	Page   uint64 `json:"Page"`   // 页码
	Size   uint64 `json:"Size"`   // 页大小
}

// GetUserGroupInfosRsp 获取用户群信息响应
type GetUserGroupInfosRsp struct {
	GroupInfos []*GroupInfo `json:"GroupInfos"` // 群信息
}

// CreateGroupReq 创建群请求
type CreateGroupReq struct {
	UserID    uint64   `json:"UserID"`    // 用户编号
	Name      string   `json:"Name"`      // 群名
	Icon      string   `json:"Icon"`      // 图标
	MemberIDS []uint64 `json:"MemberIDS"` // 初始成员编号列表
}

// CreateGroupRsp 创建群响应
type CreateGroupRsp struct {
	GroupInfo *GroupInfo `json:"GroupInfo"` // 群信息
}

// UpdateGroupInfoReq 更新群信息请求
type UpdateGroupInfoReq struct {
	UserID  uint64                `json:"UserID"`  // 用户编号
	GroupID uint64                `json:"GroupID"` // 群编号
	Action  UpdateGroupInfoAction `json:"Action"`  // 更新群信息行为
}

// UpdateGroupInfoAction 更新群信息行为
type UpdateGroupInfoAction struct {
	Name   string `json:"Name"`   // 群名
	Icon   string `json:"Icon"`   // 图标
	Notice string `json:"Notice"` // 群公告
}

// UpdateGroupInfoRsp 更新群信息响应
type UpdateGroupInfoRsp struct {
	GroupInfo *GroupInfo `json:"GroupInfo"` // 群信息
}

// GetGroupMemberInfoReq 获取群成员信息请求
type GetGroupMemberInfoReq struct {
	MemberID uint64 `json:"MemberID"` // 群成员编号
	GroupID  uint64 `json:"GroupID"`  // 群编号
}

// GetGroupMemberInfoRsp 获取群成员信息响应
type GetGroupMemberInfoRsp struct {
	GroupMemberInfo *GroupMemberInfo `json:"GroupMemberInfo"` // 群成员信息
}

// GetGroupMemberInfosReq 获取群成员信息请求
type GetGroupMemberInfosReq struct {
	UserID  uint64 `json:"UserID"`  // 用户编号
	GroupID uint64 `json:"GroupID"` // 群编号
	Page    uint64 `json:"Page"`    // 页码
	Size    uint64 `json:"Size"`    // 页大小
}

// GetGroupMemberInfosRsp 获取群成员信息响应
type GetGroupMemberInfosRsp struct {
	GroupMemberInfos []*GroupMemberInfo `json:"GroupMemberInfos"` // 群成员信息列表
}

// ChangeGroupMemberInfoReq 改变群成员信息请求
type ChangeGroupMemberInfoReq struct {
	UserID  uint64                      `json:"UserID"`  // 用户编号
	GroupID uint64                      `json:"GroupID"` // 群编号
	Action  ChangeGroupMemberInfoAction `json:"Action"`  // 行为
}

// ChangeGroupMemberInfoAction 改变群成员信息行为
type ChangeGroupMemberInfoAction struct {
	GroupNickName  *string `json:"GroupNickName,omitempty"`  // 群昵称
	IsDisturb      *bool   `json:"IsDisturb,omitempty"`      // 是否免打扰
	IsTop          *bool   `json:"IsTop,omitempty"`          // 是否置顶
	IsShowNickName *bool   `json:"IsShowNickName,omitempty"` // 是显示群成员昵称
}

// ChangeGroupMemberInfoRsp 改变群成员信息响应
type ChangeGroupMemberInfoRsp struct {
	GroupMemberInfo *GroupMemberInfo `json:"GroupMemberInfo"` // 群成员信息
}

// ApplicationStatus 入群申请状态
type ApplicationStatus string

const (
	ApplicationStatusWaitConfirm ApplicationStatus = "WaitConfirm" // 等待确认
	ApplicationStatusReject      ApplicationStatus = "Reject"      // 拒绝
	ApplicationStatusAccept      ApplicationStatus = "Accept"      // 接受
	ApplicationStatusExpire      ApplicationStatus = "Expire"      // 过期
)

// InviteStatus 入群邀请状态
type InviteStatus string

const (
	InviteStatusWaitManagerConfirm InviteStatus = "WaitManagerConfirm" // 等待管理员确认
	InviteStatusWaitInviteeConfirm InviteStatus = "WaitInviteeConfirm" // 等待被邀请人确认
	InviteStatusInviteeAccept      InviteStatus = "InviteeAccept"      // 被邀请人接受
	InviteStatusManagerReject      InviteStatus = "ManagerReject"      // 管理员拒绝
	InviteStatusInviteeReject      InviteStatus = "InviteeReject"      // 被邀请人拒绝
	InviteStatusExpire             InviteStatus = "Expire"             // 过期
)

// JoinGroupEvent 入群事件
type JoinGroupEvent struct {
	JoinGroupEventID uint64          `json:"JoinGroupEventID"` // 入群事件编号
	GroupID          uint64          `json:"GroupID"`          // 群编号
	ManagerMsg       string          `json:"ManagerMsg"`       // 管理员消息
	Action           JoinGroupAction `json:"Action"`           // 入群行为
	CreatedAt        uint64          `json:"CreatedAt"`        // 创建时间
	UpdatedAt        uint64          `json:"UpdatedAt"`        // 更新时间
}

// JoinGroupReq 入群请求
type JoinGroupReq1 struct {
	UserID  uint64          `json:"UserID"`  // 用户编号
	GroupID uint64          `json:"GroupID"` // 群编号
	Action  JoinGroupAction `json:"Action"`  // 入群事件行为
}

// JoinGroupAction 入群行为
type JoinGroupAction struct {
	Application *Application `json:"Application,omitempty"` // 入群申请
	Invite      *Invite      `json:"Invite,omitempty"`      // 入群邀请
}

// Application 入群申请
type Application struct {
	JoinGroupUserID   uint64            `json:"JoinGroupUserID"`   // 入群用户编号
	JoinGroupUserMsg  string            `json:"JoinGroupUserMsg"`  // 入群用户消息
	ApplicationStatus ApplicationStatus `json:"ApplicationStatus"` // 入群申请状态
}

// Invite 入群邀请
type Invite struct {
	InviterID    uint64       `json:"InviterID"`    // 邀请者编号
	InviteeIDS   []uint64     `json:"InviteeIDS"`   // 被邀请人编号列表
	InviterMsg   string       `json:"InviterMsg"`   // 邀请者消息
	InviteStatus InviteStatus `json:"InviteStatus"` // 入群邀请状态
}

// JoinGroupRsp 入群响应
type JoinGroupRsp1 struct {
	JoinGroupEvent *JoinGroupEvent `json:"JoinGroupEvent"` // 入群事件
}

// GenGroupQRCodeReq 生成群二维码请求
type GenGroupQRCodeReq struct {
	UserID  uint64 `json:"UserID"`  // 用户编号
	GroupID uint64 `json:"GroupID"` // 群编号
}

// GenGroupQRCodeRsp 生成群二维码响应
type GenGroupQRCodeRsp struct {
	QRCode         string `json:"QRCode"`         // 二维码
	ExpirationTime int64  `json:"ExpirationTime"` // 过期时间
}

// ScanCodeJoinGroupReq 扫码入群请求
type ScanCodeJoinGroupReq struct {
	UserID uint64 `json:"UserID"` // 用户编号
	QRCode string `json:"QRCode"` // 二维码
}

// ScanCodeJoinGroupRsp 扫码入群响应
type ScanCodeJoinGroupRsp struct {
	GroupInfo *GroupInfo `json:"GroupInfo"` // 群信息
}
