package group

// GroupMemberRole 群成员角色
type GroupMemberRole string

const (
	GroupMemberRoleMember  GroupMemberRole = "Member"  // 成员
	GroupMemberRoleManager GroupMemberRole = "Manager" // 管理员
	GroupMemberRoleLeader  GroupMemberRole = "Leader"  // 群主
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

// GroupInfo 群信息（这里会带上当前用户相关的信息）
type GroupInfo struct {
	GroupID                      uint64 `json:"GroupID"`                      // 群编号
	Name                         string `json:"Name"`                         // 群名
	Icon                         string `json:"Icon"`                         // 图标
	Members                      uint32 `json:"Members"`                      // 成员数
	Notice                       string `json:"Notice"`                       // 群公告
	IsJoinApplication            bool   `json:"IsJoinApplication"`            // 是否接受入群申请（默认不需要申请直接入群）
	IsInviteJoinGroupNeedConfirm bool   `json:"IsInviteJoinGroupNeedConfirm"` // 是否邀请入群需要管理员或群主确认（默认不需要确认直接入群）
}

// GetGroupInfosReq 获取群信息请求
type GetGroupInfosReq struct {
	UserID    uint64                 `json:"UserID"`    // 用户编号
	Condition GetGroupInfosCondition `json:"Condition"` // 条件
}

// GetGroupInfosCondition 获取群信息条件
type GetGroupInfosCondition struct {
	GroupID uint64 `json:"GroupID,omitempty"` // 群编号
	All     bool   `json:"All,omitempty"`     // 全部
}

// GetGroupInfosRsp 获取群信息响应
type GetGroupInfosRsp struct {
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

// GetGroupMemberInfosReq 获取群成员信息请求
type GetGroupMemberInfosReq struct {
	UserID    uint64                       `json:"UserID"`    // 用户编号
	GroupID   uint64                       `json:"GroupID"`   // 群编号
	Condition GetGroupMemberInfosCondition `json:"Condition"` // 条件
}

// GetGroupMemberInfosCondition 获取群成员信息条件
type GetGroupMemberInfosCondition struct {
	All      bool   `json:"All"`      // 全部
	MemberID uint64 `json:"MemberID"` // 成员编号
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
