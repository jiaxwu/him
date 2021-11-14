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
	UserProfile
}

type InitUserProfileReq struct {
	UserID   uint64 `json:"userID" validate:"required"`
	NickName string `json:"nickName" validate:"required,min=2,max=10"`
}

type InitUserProfileRsp struct {
	UserProfile
}

type UpdateAvatarReq struct {
	UserID      uint64 `json:"userID" validate:"required"`
	Avatar      []byte `json:"avatar" validate:"required,lte=5242880"`
	ContentType string `json:"contentType" validate:"required,oneof='image/png' 'image/jpg' 'image/jpeg'"`
}

type UpdateAvatarRsp struct {
	Avatar string `json:"avatar"`
}

type UpdateNickNameReq struct {
	UserID   uint64 `json:"userID" validate:"required"`
	NickName string `json:"nickName" validate:"required,min=2,max=10"`
}

type UpdateNickNameRsp struct {
	NickName string `json:"nickName"`
}
