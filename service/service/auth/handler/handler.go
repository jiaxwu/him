package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	"him/service/service/auth"
	"him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, authService *auth.Service, wrapper *wrap.Wrapper) {
	engine.POST("auth/login", wrapper.Wrap(authService.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("auth/sm-ver-code/send", wrapper.Wrap(authService.SendSmVerCode, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("auth/logout", wrapper.Wrap(func(req *auth.LogoutReq, header *common.Header,
		session *auth.Session) (*auth.LogoutRsp, error) {
		req.Token = header.Token
		req.Terminal = session.Terminal
		req.UserID = session.UserID
		return authService.Logout(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("auth/password/change", wrapper.Wrap(authService.ChangePassword, &wrap.Config{
		NotNeedLogin: true,
	}))
}
