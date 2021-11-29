package profile

import (
	"github.com/gin-gonic/gin"
	"him/service/service/auth"
	"him/service/wrap"
)

func RegisterUserProfileHandler(engine *gin.Engine, userProfileService *Service,
	wrapper *wrap.Wrapper) {
	engine.POST("user/profile/get", wrapper.Wrap(userProfileService.GetUserProfile, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/self/get", wrapper.Wrap(func(req *GetUserProfileReq,
		session *auth.Session) (*GetUserProfileRsp, error) {
		req.UserID = session.UserID
		return userProfileService.GetUserProfile(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/update", wrapper.Wrap(func(req *UpdateProfileReq,
		session *auth.Session) (*UpdateProfileRsp, error) {
		req.UserID = session.UserID
		return userProfileService.UpdateProfile(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/avatar/upload", wrapper.Wrap(userProfileService.UploadAvatar, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))
}
