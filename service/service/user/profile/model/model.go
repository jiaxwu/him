package model

import "mime/multipart"

type UserProfile struct {
	UserID         uint64 `json:"user_id"`
	Username       string `json:"username"`
	NickName       string `json:"nick_name"`
	Avatar         string `json:"avatar"`
	LastOnLineTime uint64 `json:"last_on_line_time"`
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
	UpdateProfileActionAvatar   = "avatar"
	UpdateProfileActionNickName = "nick_name"
	UpdateProfileActionUsername = "username"
)

// UpdateProfileActionToDBColumnMap 转数据库字段
var UpdateProfileActionToDBColumnMap = map[UpdateProfileAction]string{
	UpdateProfileActionAvatar:   "avatar",
	UpdateProfileActionNickName: "nick_name",
	UpdateProfileActionUsername: "username",
}

type UpdateProfileReq struct {
	UserID uint64              `json:"user_id" validate:"required"`
	Action UpdateProfileAction `json:"Action" validate:"required"`
	Value  string              `json:"Value" validate:"required"`
}

type UpdateProfileRsp struct{}

type UploadAvatarReq struct {
	Avatar *multipart.FileHeader `form:"avatar"`
}

type UploadAvatarRsp struct {
	Avatar string `json:"avatar"`
}
