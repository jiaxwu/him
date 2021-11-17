package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	userProfileModel "him/service/service/user/user_profile/model"
	"him/service/service/user/user_profile/service"
	"him/service/wrapper"
)

func RegisterUserProfileHandler(engine *gin.Engine, userProfileService *service.UserProfileService,
	wrapper *wrapper.Wrapper) {
	engine.POST("user/profile/get", wrapper.Wrap(userProfileService.GetUserProfile,
		true, common.UserTypePlayer))

	engine.POST("user/profile/self/get", wrapper.Wrap(func(req *userProfileModel.GetUserProfileReq,
		session *common.Session) (*userProfileModel.GetUserProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.GetUserProfile(req)
	}, true, common.UserTypePlayer))

	engine.POST("user/profile/update", wrapper.Wrap(func(req *userProfileModel.UpdateProfileReq,
		session *common.Session) (*userProfileModel.UpdateProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.UpdateProfile(req)
	}, true, common.UserTypePlayer))

	engine.POST("user/profile/avatar/upload", wrapper.Wrap(func(req *userProfileModel.UploadAvatarReq,
		session *common.Session) (*userProfileModel.UploadAvatarRsp, common.Error) {
		return userProfileService.UploadAvatar(req)
	}, true, common.UserTypePlayer))
}
