package group

import (
	"github.com/gin-gonic/gin"
	"him/service/service/auth"
	"him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("group/infos/get", wrapper.Wrap(func(req *GetGroupInfosReq,
		session *auth.Session) (*GetGroupInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetGroupInfos(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("group/create", wrapper.Wrap(func(req *CreateGroupReq,
		session *auth.Session) (*CreateGroupRsp, error) {
		req.UserID = session.UserID
		return service.CreateGroup(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))
}
