package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/common"
	"github.com/jiaxwu/him/service/service/user"
	"github.com/jiaxwu/him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, service *user.Service, wrapper *wrap.Wrapper) {
	engine.POST("user/infos/get", wrapper.Wrap(service.GetUserInfos, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("user/info/update", wrapper.Wrap(func(req *user.UpdateUserInfoReq, session *user.Session) (
		*user.UpdateUserInfoRsp, error) {
		req.UserID = session.UserID
		return service.UpdateUserInfo(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("user/info/avatar/upload", wrapper.Wrap(service.UploadAvatar, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("user/auth/login", wrapper.Wrap(service.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("user/auth/sm-ver-code/send", wrapper.Wrap(service.SendSmVerCode, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("user/auth/logout", wrapper.Wrap(func(req *user.LogoutReq, header *common.Header,
		session *user.Session) (*user.LogoutRsp, error) {
		req.Token = header.Token
		req.Terminal = session.Terminal
		req.UserID = session.UserID
		return service.Logout(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("user/auth/password/change", wrapper.Wrap(service.ChangePassword, &wrap.Config{
		NotNeedLogin: true,
	}))
}
