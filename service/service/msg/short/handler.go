package short

import (
	"github.com/gin-gonic/gin"
	"github.com/jiaxwu/him/service/service/user"
	"github.com/jiaxwu/him/service/wrap"
)

func RegisterHandler(engine *gin.Engine, service *Service, wrapper *wrap.Wrapper) {
	engine.POST("msg/short/upload", wrapper.Wrap(service.Upload, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("msg/short/seq/get", wrapper.Wrap(func(req *GetSeqReq, session *user.Session) (
		*GetSeqRsp, error) {
		req.UserID = session.UserID
		return service.GetSeq(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))

	engine.POST("msg/short/msgs/get", wrapper.Wrap(func(req *GetMsgsReq, session *user.Session) (
		*GetMsgsRsp, error) {
		req.UserID = session.UserID
		return service.GetMsgs(req)
	}, &wrap.Config{
		UserTypes: []user.UserType{
			user.UserTypeUser,
		},
	}))
}
