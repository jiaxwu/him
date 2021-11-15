package handler

import (
	"github.com/gin-gonic/gin"
	"him/service/common"
	userProfileModel "him/service/service/user/user_profile/model"
	"him/service/service/user/user_profile/service"
	"him/service/wrapper"
)

func RegisterUserProfileHandler(engine *gin.Engine, userProfileService *service.UserProfileService,
	serviceWrapper *wrapper.ServiceWrapper, handlerWrapper *wrapper.HandlerWrapper) {
	engine.POST("user/profile/get", serviceWrapper.Wrap(userProfileService.GetUserProfile,
		common.UserTypePlayer))
	engine.POST("user/profile/self/get", handlerWrapper.Wrap(func(_ common.Header, session common.Session,
		req *userProfileModel.GetUserProfileReq) (*userProfileModel.GetUserProfileRsp, common.Error) {
		req.UserID = session.UserID()
		return userProfileService.GetUserProfile(req)
	}, common.UserTypePlayer))
}
