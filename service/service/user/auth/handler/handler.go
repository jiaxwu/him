package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/common"
	auth2 "github.com/jiaxwu/him/service/service/user/auth"
	"github.com/jiaxwu/him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, authService *auth2.Service, wrapper *wrap.Wrapper) {
	engine.POST("user/auth/login", wrapper.Wrap(authService.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("user/auth/sm-ver-code/send", wrapper.Wrap(authService.SendSmVerCode, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("user/auth/logout", wrapper.Wrap(func(req *auth2.LogoutReq, header *common.Header,
		session *auth2.Session) (*auth2.LogoutRsp, error) {
		req.Token = header.Token
		req.Terminal = session.Terminal
		req.UserID = session.UserID
		return authService.Logout(req)
	}, &wrap.Config{
		UserTypes: []auth2.UserType{
			auth2.UserTypeUser,
		},
	}))

	engine.POST("user/auth/password/change", wrapper.Wrap(authService.ChangePassword, &wrap.Config{
		NotNeedLogin: true,
	}))
}
