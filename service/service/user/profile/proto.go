package profile

import "mime/multipart"

// Gender 性别
type Gender uint8

const (
	GenderUnknown Gender = 0 // 未知
	GenderMale    Gender = 1 // 男性
	GenderFemale  Gender = 2 // 女性
)

type UserProfile struct {
	UserID         uint64 `json:"UserID"`
	Username       string `json:"Username"`
	NickName       string `json:"NickName"`
	Avatar         string `json:"Avatar"`
	Gender         Gender `json:"Gender"`
	LastOnLineTime uint64 `json:"LastOnLineTime"`
}

// GetUserProfileReq 获取用户信息
// 其中根据UserID获取的情况，如果用户
type GetUserProfileReq struct {
	UserID   uint64   `json:"UserID"`
	Username string   `json:"Username"`
	UserIDS  []uint64 `json:"UserIDS"`
}

type GetUserProfileRsp struct {
	*UserProfile
}

// UpdateProfileAction 更新行为
type UpdateProfileAction struct {
	Avatar   string  `json:"Avatar"`
	NickName string  `json:"NickName"`
	Username string  `json:"Username"`
	Gender   *Gender `json:"Gender"`
}

type UpdateProfileReq struct {
	UserID uint64              `json:"UserID" validate:"required"`
	Action UpdateProfileAction `json:"Action" validate:"required"`
}

type UpdateProfileRsp struct{}

type UploadAvatarReq struct {
	Avatar *multipart.FileHeader `form:"Avatar"`
}

type UploadAvatarRsp struct {
	Avatar string `json:"Avatar"`
}
