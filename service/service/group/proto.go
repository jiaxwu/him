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

// GroupInfo 群信息
type GroupInfo struct {
	GroupID                      uint64 `json:"GroupID"`                      // 群编号
	Name                         string `json:"Name"`                         // 群名
	Icon                         string `json:"Icon"`                         // 图标
	Members                      uint32 `json:"Members"`                      // 成员数
	Notice                       string `json:"Notice"`                       // 群公告
	IsJoinApplication            bool   `json:"IsJoinApplication"`            // 是否接受入群申请（默认不需要申请直接入群）
	IsInviteJoinGroupNeedConfirm bool   `json:"IsInviteJoinGroupNeedConfirm"` // 是否邀请入群需要管理员或群主确认（默认不需要确认直接入群）
}

// CreateGroupReq 创建群请求
type CreateGroupReq struct {
	UserID    uint64   `json:"UserID"`    // 用户编号
	Name      string   `json:"Name"`      // 群名
	Icon      string   `json:"Icon"`      // 图标
	MemberIDS []uint64 `json:"memberIDS"` // 初始成员编号列表
}

// CreateGroupRsp 创建群响应
type CreateGroupRsp struct {
	GroupInfo *GroupInfo `json:"GroupInfo"` // 群信息
}
