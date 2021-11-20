package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	"him/service/service/login/service"
	"him/service/wrap"
)

func RegisterLoginHandler(engine *gin.Engine, loginService *service.LoginService, wrapper *wrap.Wrapper) {
	engine.POST("login", wrapper.Wrap(loginService.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("login/sms/send", wrapper.Wrap(loginService.SendSMSForLogin, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("logout", wrapper.Wrap(func(req *loginModel.LogoutReq, header *common.Header,
		session *common.Session) (*loginModel.LogoutRsp, common.Error) {
		req.Token = header.Token
		req.UserID = session.UserID
		return loginService.Logout(req)
	}, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))

	engine.POST("login/password/bind", wrapper.Wrap(func(req *loginModel.BindPasswordLoginReq,
		session *common.Session) (*loginModel.BindPasswordLoginRsp, common.Error) {
		req.UserID = session.UserID
		return loginService.BindPasswordLogin(req)
	}, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))
}
