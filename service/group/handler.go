package group

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/user"
	"github.com/jiaxwu/him/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("group/info/get", wrapper.Wrap(func(req *GetGroupInfoReq,
		session *user.Session) (*GetGroupInfoRsp, error) {
		req.UserID = session.UserID
		return service.GetGroupInfo(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("user/group/infos/get", wrapper.Wrap(func(req *GetUserGroupInfosReq,
		session *user.Session) (*GetUserGroupInfosRsp, error) {
		req.UserID = session.UserID
		return service.GetUserGroupInfos(req)
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
		req.UserID = session.UserID
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

	engine.POST("group/member/info/change", wrapper.Wrap(func(req *ChangeGroupMemberInfoReq,
		session *user.Session) (*ChangeGroupMemberInfoRsp, error) {
		req.UserID = session.UserID
		return service.ChangeGroupMemberInfo(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/qrcode/gen", wrapper.Wrap(func(req *GenGroupQRCodeReq, session *user.Session,
	) (*GenGroupQRCodeRsp, error) {
		req.UserID = session.UserID
		return service.GenGroupQRCode(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/join/code/scan", wrapper.Wrap(func(req *ScanCodeJoinGroupReq, session *user.Session,
	) (*ScanCodeJoinGroupRsp, error) {
		req.UserID = session.UserID
		return service.ScanCodeJoinGroup(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/join/invite", wrapper.Wrap(func(req *InviteJoinGroupReq, session *user.Session,
	) (*InviteJoinGroupRsp, error) {
		req.InviterID = session.UserID
		return service.InviteJoinGroup(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/join/invite/get", wrapper.Wrap(func(req *GetJoinGroupInviteReq, session *user.Session,
	) (*GetJoinGroupInviteRsp, error) {
		req.UserID = session.UserID
		return service.GetJoinGroupInvite(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("group/join/invite/confirm", wrapper.Wrap(func(req *ConfirmJoinGroupInviteReq,
		session *user.Session) (*ConfirmJoinGroupInviteRsp, error) {
		req.UserID = session.UserID
		return service.ConfirmJoinGroupInvite(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))
}
