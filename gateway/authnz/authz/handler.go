package authz

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaohuashifu/him/api/authnz"
	pb "github.com/xiaohuashifu/him/api/authnz/authz"
	"github.com/xiaohuashifu/him/service/authnz/authz/service"
	"github.com/xiaohuashifu/him/service/wrap"
	"net/http"
)

func RegisterLoginHandler(engine *gin.Engine, authzService *service.AuthzService, wrapper *wrap.Wrapper) {
	engine.POST("authnz", wrapper.Wrap(authzService.Login, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("authnz/sm/send", wrapper.Wrap(authzService.SendSMSForLogin, &wrap.Config{
		NotNeedLogin: true,
	}))

	engine.POST("logout", wrapper.Wrap(func(req *pb.LogoutReq, header http.Header,
		session *authnz.Session) (*pb.LogoutResp, error) {
		req.Token = header.Token
		req.UserID = session.UserID
		return loginService.Logout(req)
	}, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))

	engine.POST("authnz/password/bind", wrapper.Wrap(func(req *pb.SetPwdLoginReq, session *authnz.Session) (
		*pb.SetPwdLoginResp, error) {
		req.UserId = session.GetUserId()
		return authzService.SetPwdLogin(req)
	}, &wrap.Config{
		UserTypes: []authnz.UserType{
			authnz.UserType_USER_TYPE_USER,
		},
	}))
}
