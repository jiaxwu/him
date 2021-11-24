package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/service/common"
	userProfileModel "github.com/xiaohuashifu/him/service/service/user/profile/model"
	"github.com/xiaohuashifu/him/service/service/user/profile/service"
	"github.com/xiaohuashifu/him/service/wrap"
)

func RegisterUserProfileHandler(engine *gin.Engine, userProfileService *service.UserProfileService,
	wrapper *wrap.Wrapper) {
	engine.POST("user/profile/get", wrapper.Wrap(userProfileService.GetUserProfile, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))

	engine.POST("user/profile/self/get", wrapper.Wrap(func(req *userProfileModel.GetUserProfileReq,
		session *common.Session) (*userProfileModel.GetUserProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.GetUserProfile(req)
	}, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))

	engine.POST("user/profile/update", wrapper.Wrap(func(req *userProfileModel.UpdateProfileReq,
		session *common.Session) (*userProfileModel.UpdateProfileRsp, common.Error) {
		req.UserID = session.UserID
		return userProfileService.UpdateProfile(req)
	}, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))

	engine.POST("user/profile/avatar/upload", wrapper.Wrap(userProfileService.UploadAvatar, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))
}
