package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	loginModel "him/service/service/login/model"
	"him/service/service/login/service"
	"him/service/wrapper"
)

func RegisterLoginHandler(engine *gin.Engine, loginService *service.LoginService,
	handlerWrapper *wrapper.HandlerWrapper, serviceWrapper *wrapper.ServiceWrapper) {
	engine.POST("login", serviceWrapper.Wrap(loginService.Login, 0))
	engine.POST("login/sms/send", serviceWrapper.Wrap(loginService.SendSMSForLogin, 0))
	engine.POST("logout", handlerWrapper.Wrap(func(header common.Header, session common.Session,
		req *loginModel.LogoutReq) (*loginModel.LogoutRsp, common.Error) {
		req.Token = header.Token()
		req.UserID = session.UserID()
		return loginService.Logout(req)
	}, common.UserTypePlayer))
	engine.POST("login/password/bind", handlerWrapper.Wrap(func(_ common.Header, session common.Session,
		req *loginModel.BindPasswordLoginReq) (*loginModel.BindPasswordLoginRsp, common.Error) {
		req.UserID = session.UserID()
		return loginService.BindPasswordLogin(req)
	}, common.UserTypePlayer))
}
