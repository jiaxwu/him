package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/authnz"
	"github.com/xiaohuashifu/him/service/common"
	userProfileModel "github.com/xiaohuashifu/him/service/user/profile/model"
	"github.com/xiaohuashifu/him/service/user/profile/service"
	"github.com/xiaohuashifu/him/service/wrap"
)

func RegisterUserProfileHandler(engine *gin.Engine, userProfileService *service.UserProfileService,
	wrapper *wrap.Wrapper) {
	engine.POST("user/profile/get", wrapper.Wrap(userProfileService.GetUserProfile, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))

	engine.POST("user/profile/self/get", wrapper.Wrap(func(req *userProfileModel.GetUserProfileReq,
		session *authnz.Session) (*userProfileModel.GetUserProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.GetUserProfile(req)
	}, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))

	engine.POST("user/profile/update", wrapper.Wrap(func(req *userProfileModel.UpdateProfileReq,
		session *authnz.Session) (*userProfileModel.UpdateProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.UpdateProfile(req)
	}, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))

	engine.POST("user/profile/avatar/upload", wrapper.Wrap(userProfileService.UploadAvatar, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))
}
