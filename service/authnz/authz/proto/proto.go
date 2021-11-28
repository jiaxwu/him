package proto


// LoginType 登录类型
type LoginType uint8

const (
	LoginTypeSMS LoginType = 1 // 短信验证码登录
	LoginTypePwd LoginType = 2 // 密码登录
)

type LoginReq struct {
	Type     LoginType `json:"type"`     // 登录类型
	Phone    string    `json:"phone"`    // 手机号码
	AuthCode string    `json:"authCode"` // 验证码
	Username string    `json:"username"` // 用户名
	Password string    `json:"password"` // 密码
}

type LoginRsp struct {
	Token  string `json:"token"`
	UserID uint64 `json:"userID"`
}

type BindPasswordLoginReq struct {
	UserID   uint64 `json:"userID"`
	Password string `json:"password"`
}

type BindPasswordLoginRsp struct{}

type LogoutReq struct {
	Token  string `json:"token"`
	UserID uint64 `json:"userID"`
}

type LogoutRsp struct{}

type SendSMSForLoginReq struct {
	Phone string `json:"phone" validate:"required,phone"`
}

type SendSMSForLoginRsp struct{}

//type AuthorizeReq struct {
//	Token     string            `validate:"required,len=36"`
//	UserTypes []common.UserType `validate:"required"`
//}
//
//type AuthorizeRsp struct {
//	Session *common.Session
//}
//
//type GetSessionReq struct {
//	Token string `validate:"required,len=36"`
//}
//
//type GetSessionRsp struct {
//	Session *common.Session
//}