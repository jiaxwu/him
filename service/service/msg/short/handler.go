package short

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/service/auth"
	"github.com/jiaxwu/him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("msg/short/upload", wrapper.Wrap(service.Upload, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("msg/short/seq/get", wrapper.Wrap(func(req *GetSeqReq, session *auth.Session) (
		*GetSeqRsp, error) {
		req.UserID = session.UserID
		return service.GetSeq(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))

	engine.POST("msg/short/msgs/get", wrapper.Wrap(func(req *GetMsgsReq, session *auth.Session) (
		*GetMsgsRsp, error) {
		req.UserID = session.UserID
		return service.GetMsgs(req)
	}, &wrap.Config{
		UserTypes: []auth.UserType{
			auth.UserTypeUser,
		},
	}))
}
