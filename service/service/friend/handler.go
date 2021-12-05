package friend

import (
	"github.com/gin-gonic/gin"
	"him/service/service/auth"
	"him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("friend/infos/get", wrapper.Wrap(func(req *GetFriendInfosReq,
		session *auth.Session) (*GetFriendInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetFriendInfos(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("friend/info/update", wrapper.Wrap(func(req *UpdateFriendInfoReq,
		session *auth.Session) (*UpdateFriendInfoRsp, error) {
		req.UserID = session.UserID
		return service.UpdateFriendInfo(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("friend/add-friend-application/create", wrapper.Wrap(func(req *CreateAddFriendApplicationReq,
		session *auth.Session) (*CreateAddFriendApplicationRsp, error) {
		req.ApplicantID = session.UserID
		return service.CreateAddFriendApplication(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))
}
