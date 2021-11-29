package auth

// LoginType 登录类型
type LoginType string

const (
	LoginTypeSmVerCode LoginType = "SmVerCode" // 短信验证码登录
	LoginTypePassword  LoginType = "Password"  // 密码登录
)

type LoginReq struct {
	Type     LoginType     `json:"Type"`     // 登录类型
	Terminal Terminal      `json:"Terminal"` // 终端
	Content  *LoginContent `json:"Content"`  // 登录内容
}

// LoginContent 登录内容
type LoginContent struct {
	SmVerCodeLoginContent *SmVerCodeLoginContent `json:"SmVerCodeLoginContent"`
	PasswordLoginContent  *PasswordLoginContent  `json:"PasswordLoginContent"`
}

type SmVerCodeLoginContent struct {
	Phone     string `json:"Phone"`     // 手机号码
	SmVerCode string `json:"SmVerCode"` // 验证码
}

type PasswordLoginContent struct {
	Account  string `json:"Account"`  // 账号（用户名，手机，邮箱）
	Password string `json:"Password"` // 密码
}

type LoginRsp struct {
	Token  string `json:"Token"`
	UserID uint64 `json:"UserID"`
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
	SmVerCodeActionLogin          = "Login"          // 登录
	SmVerCodeActionChangePassword = "ChangePassword" // 修改密码
)

// SmVerCodeActionToTemplateIDMap 短信验证码行为到模板编号Map
var SmVerCodeActionToTemplateIDMap = map[SmVerCodeAction]string{
	SmVerCodeActionLogin:          SmVerCodeTemplateIDLogin,
	SmVerCodeActionChangePassword: SmVerCodeTemplateIDChangePassword,
}

type SendSmVerCodeRsp struct{}

type AuthorizeReq struct {
	Token     string     `validate:"required,len=36"`
	UserTypes []UserType `validate:"required"`
}

type AuthorizeRsp struct {
	Session *Session
}

type GetSessionReq struct {
	Token string `validate:"required,len=36"`
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

// UserType 用户类型
type UserType uint8

const (
	UserTypeUser UserType = 1 // 用户
)

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
