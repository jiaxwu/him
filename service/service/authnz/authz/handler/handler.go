package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/service/common"
	loginModel "github.com/xiaohuashifu/him/service/service/authnz/authz/model"
	"github.com/xiaohuashifu/him/service/service/authnz/authz/service"
	"github.com/xiaohuashifu/him/service/wrap"
)

func RegisterLoginHandler(engine *gin.Engine, loginService *service.AuthzService, wrapper *wrap.Wrapper) {
	engine.POST("authnz", wrapper.Wrap(loginService.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("authnz/sms/send", wrapper.Wrap(loginService.SendSMSForLogin, &wrap.Config{
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

	engine.POST("authnz/password/bind", wrapper.Wrap(func(req *loginModel.BindPasswordLoginReq,
		session *common.Session) (*loginModel.BindPasswordLoginRsp, common.Error) {
		req.UserID = session.UserID
		return loginService.BindPasswordLogin(req)
	}, &wrap.Config{
		UserTypes: []common.UserType{
			common.UserTypeUser,
		},
	}))
}
