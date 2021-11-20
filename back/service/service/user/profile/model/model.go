package model

import "mime/multipart"

type UserProfile struct {
	UserID         uint64 `json:"UserID"`
	Username       string `json:"Username"`
	NickName       string `json:"NickName"`
	Avatar         string `json:"Avatar"`
	LastOnLineTime uint64 `json:"LastOnLineTime"`
}

type GetUserProfileReq struct {
	UserID uint64 `json:"userID"`
}

type GetUserProfileRsp struct {
	*UserProfile
}

// UpdateProfileAction 更新行为
type UpdateProfileAction string

const (
	UpdateProfileActionAvatar   = "Avatar"
	UpdateProfileActionNickName = "NickName"
	UpdateProfileActionUsername = "Username"
)

// UpdateProfileActionToDBColumnMap 转数据库字段
var UpdateProfileActionToDBColumnMap = map[UpdateProfileAction]string{
	UpdateProfileActionAvatar:   "avatar",
	UpdateProfileActionNickName: "nick_name",
	UpdateProfileActionUsername: "username",
}

type UpdateProfileReq struct {
	UserID uint64              `json:"UserID" validate:"required"`
	Action UpdateProfileAction `json:"Action" validate:"required"`
	Value  string              `json:"Value" validate:"required"`
}

type UpdateProfileRsp struct{}

type UploadAvatarReq struct {
	Avatar *multipart.FileHeader `form:"Avatar"`
}

type UploadAvatarRsp struct {
	Avatar string `json:"Avatar"`
}
