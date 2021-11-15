package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	"him/service/service/login/service"
	"him/service/wrapper"
)

func RegisterLoginHandler(engine *gin.Engine, loginService *service.LoginService, wrapper *wrapper.Wrapper) {
	engine.POST("login", wrapper.Wrap(loginService.Login, false))
	engine.POST("login/sms/send", wrapper.Wrap(loginService.SendSMSForLogin, false))
	engine.POST("logout", wrapper.Wrap(func(req *loginModel.LogoutReq, header common.Header,
		session common.Session) (*loginModel.LogoutRsp, common.Error) {
		req.Token = header.Token()
		req.UserID = session.UserID()
		return loginService.Logout(req)
	}, true, common.UserTypePlayer))
	engine.POST("login/password/bind", wrapper.Wrap(func(req *loginModel.BindPasswordLoginReq,
		session common.Session) (*loginModel.BindPasswordLoginRsp, common.Error) {
		req.UserID = session.UserID()
		return loginService.BindPasswordLogin(req)
	}, true, common.UserTypePlayer))
}
