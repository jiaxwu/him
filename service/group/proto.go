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
	Name                         *string `json:"Name,omitempty"`                         // 群名
	Icon                         *string `json:"Icon,omitempty"`                         // 图标
	Notice                       *string `json:"Notice,omitempty"`                       // 群公告
	IsInviteJoinGroupNeedConfirm *bool   `json:"IsInviteJoinGroupNeedConfirm,omitempty"` // 是否邀请入群需要管理员或群主确认（默认不需要确认直接入群）
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

// InviteStatus 入群邀请状态
type InviteStatus string

const (
	InviteStatusWaitConfirm    InviteStatus = "WaitConfirm"    // 等待确认
	InviteStatusAlreadyConfirm InviteStatus = "AlreadyConfirm" // 已确认
)

// InviteJoinGroupReq 邀请入群请求
type InviteJoinGroupReq struct {
	InviterID  uint64   `json:"InviterID"`  // 邀请者编号
	GroupID    uint64   `json:"GroupID"`    // 群编号
	InviteeIDS []uint64 `json:"InviteeIDS"` // 被邀请人编号列表
	Reason     string   `json:"Reason"`     // 邀请理由
}

// InviteJoinGroupRsp 邀请入群响应
type InviteJoinGroupRsp struct{}

// GetJoinGroupInviteReq 获取入群邀请请求
type GetJoinGroupInviteReq struct {
	UserID            uint64 `json:"UserID"`            // 用户编号
	JoinGroupInviteID uint64 `json:"JoinGroupInviteID"` // 入群邀请编号
}

// GetJoinGroupInviteRsp 获取入群邀请响应
type GetJoinGroupInviteRsp struct {
	JoinGroupInviteID uint64       `json:"JoinGroupInviteID"` // 入群邀请编号
	GroupID           uint64       `json:"GroupID"`           // 群编号
	InviterID         uint64       `json:"InviterID"`         // 邀请者编号
	InviteeIDS        []uint64     `json:"InviteeIDS"`        // 被邀请人编号列表
	Reason            string       `json:"Reason"`            // 邀请理由
	Status            InviteStatus `json:"Status"`            // 入群邀请状态
}

// ConfirmJoinGroupInviteReq 确认入群邀请请求
type ConfirmJoinGroupInviteReq struct {
	UserID            uint64 `json:"UserID"`            // 用户编号
	JoinGroupInviteID uint64 `json:"JoinGroupInviteID"` // 入群邀请编号
}

// ConfirmJoinGroupInviteRsp 确认入群邀请响应
type ConfirmJoinGroupInviteRsp struct{}

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
