package profile

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/service/user/auth"
	"github.com/jiaxwu/him/service/wrap"
)

func RegisterUserProfileHandler(engine *gin.Engine, service *Service,
	wrapper *wrap.Wrapper) {
	engine.POST("user/profile/get", wrapper.Wrap(service.GetUserProfile, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/self/get", wrapper.Wrap(func(req *GetUserProfileReq, session *auth.Session) (
		*GetUserProfileRsp, error) {
		req.UserID = session.UserID
		return service.GetUserProfile(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/update", wrapper.Wrap(func(req *UpdateProfileReq, session *auth.Session) (
		*UpdateProfileRsp, error) {
		req.UserID = session.UserID
		return service.UpdateProfile(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("user/profile/avatar/upload", wrapper.Wrap(service.UploadAvatar, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))
}
