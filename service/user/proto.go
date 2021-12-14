package user

import (
	"mime/multipart"
)

// Gender 性别
type Gender uint8

const (
	GenderUnknown Gender = 0 // 未知
	GenderMale    Gender = 1 // 男性
	GenderFemale  Gender = 2 // 女性
)

var GenderSet = map[Gender]bool{
	GenderUnknown: true,
	GenderMale:    true,
	GenderFemale:  true,
}

type UserType string

const (
	UserTypeUser UserType = "User" // 用户
	UserTypeSys  UserType = "Sys"  // 系统
)

var UserTypeSet = map[UserType]bool{
	UserTypeUser: true,
	UserTypeSys:  true,
}

// Terminal 终端类型
type Terminal string

const (
	TerminalWeb Terminal = "Web" // 网页端
	TerminalApp Terminal = "App" // 移动端
	TerminalPC  Terminal = "PC"  // PC
)

// TerminalSet 终端集合
var TerminalSet = map[Terminal]bool{
	TerminalWeb: true,
	TerminalApp: true,
	TerminalPC:  true,
}

type UserInfo struct {
	UserID       uint64   `json:"UserID"`       // 用户编号
	UserType     UserType `json:"UserType"`     // 用户类型
	Username     string   `json:"Username"`     // 用户名
	NickName     string   `json:"NickName"`     // 昵称
	Avatar       string   `json:"Avatar"`       // 头像
	Gender       Gender   `json:"Gender"`       // 性别
	Phone        string   `json:"Phone"`        // 手机号码
	Email        string   `json:"Email"`        // 手机号码
	RegisteredAt uint64   `json:"RegisteredAt"` // 注册时间
}

// GetUserInfosReq 获取用户信息，条件只能选1个
type GetUserInfosReq struct {
	UserID   uint64   `json:"UserID"`
	Username string   `json:"Username"`
	UserIDS  []uint64 `json:"UserIDS"`
}

type GetUserInfosRsp struct {
	UserInfos []*UserInfo `json:"UserInfos"`
}

// UpdateUserInfoAction 更新行为
type UpdateUserInfoAction struct {
	Avatar   string  `json:"Avatar"`
	NickName string  `json:"NickName"`
	Username string  `json:"Username"`
	Gender   *Gender `json:"Gender"`
}

type UpdateUserInfoReq struct {
	UserID uint64               `json:"UserID" validate:"required"`
	Action UpdateUserInfoAction `json:"Action" validate:"required"`
}

type UpdateUserInfoRsp struct {
	UserInfo *UserInfo `json:"UserInfo"`
}

type UploadAvatarReq struct {
	Avatar *multipart.FileHeader `form:"Avatar"`
}

type UploadAvatarRsp struct {
	Avatar string `json:"Avatar"`
}

// LoginReq 登录请求
type LoginReq struct {
	Terminal       Terminal        `json:"Terminal"`       // 终端
	SmVerCodeLogin *SmVerCodeLogin `json:"SmVerCodeLogin"` // 短信验证码登录
	PasswordLogin  *PasswordLogin  `json:"PasswordLogin"`  // 密码登录
}

type SmVerCodeLogin struct {
	Phone     string `json:"Phone"`     // 手机号码
	SmVerCode string `json:"SmVerCode"` // 验证码
}

type PasswordLogin struct {
	Account  string `json:"Account"`  // 账号（用户名，手机，邮箱）
	Password string `json:"Password"` // 密码
}

// LoginRsp 登录响应
type LoginRsp struct {
	Token    string    `json:"Token"`    // 凭证
	UserInfo *UserInfo `json:"UserInfo"` // 用户信息
}

type ChangePasswordReq struct {
	Phone     string `json:"Phone"`     // 手机号码
	Password  string `json:"Password"`  // 新密码
	SmVerCode string `json:"SmVerCode"` // 验证码
}

type ChangePasswordRsp struct{}

type LogoutReq struct {
	Token    string   `json:"Token"`
	Terminal Terminal `json:"Terminal"`
	UserID   uint64   `json:"UserID"`
}

type LogoutRsp struct{}

type SendSmVerCodeReq struct {
	Phone  string          `json:"Phone" validate:"required,phone"`
	Action SmVerCodeAction `json:"Action" validate:"required"`
}

// SmVerCodeAction 短信验证码行为
type SmVerCodeAction string

const (
	SmVerCodeActionLogin          SmVerCodeAction = "Login"          // 登录
	SmVerCodeActionChangePassword SmVerCodeAction = "ChangePassword" // 修改密码
)

type SendSmVerCodeRsp struct{}

type AuthorizeReq struct {
	Token     string
	UserTypes []UserType
}

type AuthorizeRsp struct {
	Session *Session
}

type GetSessionReq struct {
	Token string `json:"Token" validate:"required,len=36"`
}

type GetSessionRsp struct {
	Session *Session
}

// Session 会话
type Session struct {
	UserID   uint64   `json:"UserID"`
	UserType UserType `json:"UserType"`
	Terminal Terminal `json:"Terminal"`
}
