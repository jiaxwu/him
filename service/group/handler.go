package group

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/user"
	"github.com/jiaxwu/him/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("group/infos/get", wrapper.Wrap(func(req *GetGroupInfosReq,
		session *user.Session) (*GetGroupInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetGroupInfos(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/create", wrapper.Wrap(func(req *CreateGroupReq,
		session *user.Session) (*CreateGroupRsp, error) {
		req.UserID = session.UserID
		return service.CreateGroup(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/info/update", wrapper.Wrap(func(req *UpdateGroupInfoReq,
		session *user.Session) (*UpdateGroupInfoRsp, error) {
		req.OperatorID = session.UserID
		return service.UpdateGroupInfo(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/member/infos/get", wrapper.Wrap(func(req *GetGroupMemberInfosReq,
		session *user.Session) (*GetGroupMemberInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetGroupMemberInfos(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))
}
