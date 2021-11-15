package model

type UserProfile struct {
	UserID         uint64 `json:"userID"`
	Username       string `json:"username"`
	NickName       string `json:"nickName"`
	Avatar         string `json:"avatar"`
	LastOnLineTime uint64 `json:"lastOnLineTime"`
}

type GetUserProfileReq struct {
	UserID uint64 `json:"userID"`
}

type GetUserProfileRsp struct {
	*UserProfile
}

type UpdateProfileAction string

const (
	UpdateProfileActionAvatar   = "avatar"
	UpdateProfileActionNickName = "nickName"
	UpdateProfileActionUsername = "username"
)

// UpdateProfileActionToDBColumnMap 转数据库字段
var UpdateProfileActionToDBColumnMap = map[UpdateProfileAction]string{
	UpdateProfileActionAvatar:   "avatar",
	UpdateProfileActionNickName: "nick_name",
	UpdateProfileActionUsername: "username",
}

type UpdateProfileReq struct {
	UserID uint64              `json:"userID" validate:"required"`
	Action UpdateProfileAction `json:"action" validate:"required"`
	Value  string              `json:"value" validate:"required"`
}

type UpdateProfileRsp struct {}