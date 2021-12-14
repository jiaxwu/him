package friend

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/user"
	"github.com/jiaxwu/him/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("friend/infos/get", wrapper.Wrap(func(req *GetFriendInfosReq, session *user.Session) (
		*GetFriendInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetFriendInfos(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("friend/info/update", wrapper.Wrap(func(req *UpdateFriendInfoReq, session *user.Session) (
		*UpdateFriendInfoRsp, error) {
		req.UserID = session.UserID
		return service.UpdateFriendInfo(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("friend/delete", wrapper.Wrap(func(req *DeleteFriendReq, session *user.Session) (
		*DeleteFriendRsp, error) {
		req.UserID = session.UserID
		return service.DeleteFriend(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("friend/add-friend-applications/get", wrapper.Wrap(func(req *GetAddFriendApplicationsReq,
		session *user.Session) (*GetAddFriendApplicationsRsp, error) {
		req.UserID = session.UserID
		return service.GetAddFriendApplications(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("friend/add-friend-application/create", wrapper.Wrap(func(req *CreateAddFriendApplicationReq,
		session *user.Session) (*CreateAddFriendApplicationRsp, error) {
		req.ApplicantID = session.UserID
		return service.CreateAddFriendApplication(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("friend/add-friend-application/update", wrapper.Wrap(func(req *UpdateAddFriendApplicationReq,
		session *user.Session) (*UpdateAddFriendApplicationRsp, error) {
		req.UserID = session.UserID
		return service.UpdateAddFriendApplication(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))
}
