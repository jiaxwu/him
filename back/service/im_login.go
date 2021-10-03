package service

import (
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/sirupsen/logrus"
)

type IMLoginService struct {
	sessionStorage him.SessionStorage
	pusher         him.Pusher
}

func NewIMLoginService(sessionStorage him.SessionStorage, pusher him.Pusher) *IMLoginService {
	return &IMLoginService{
		sessionStorage: sessionStorage,
		pusher:         pusher,
	}
}

func (s *IMLoginService) Login(ctx him.Context) error {
	// 2. 检查当前账号是否已经登陆在其它地方
	old, err := s.sessionStorage.GetLocation(ctx.Session().GetUserId(), ctx.Session().GetTerminal())
	if err != nil && err != him.ErrSessionNil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return err
	}

	if old != nil {
		// 3. 通知这个用户下线
		_ = ctx.Dispatch(&pkt.KickoutNotify{
			ChannelId: old.ChannelId,
		}, old)
	}

	// 4. 添加到会话管理器中
	err = s.sessionStorage.Add(ctx.Session())
	if err != nil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return err
	}
	// 5. 返回一个登陆成功的消息
	var resp = &pkt.LoginResp{
		ChannelId: ctx.Session().ChannelId,
		UserId:    ctx.Session().UserId,
	}
	_ = ctx.Resp(pkt.Status_Success, resp)
	return nil
}

func (s *IMLoginService) Logout(ctx him.Context) error {
	logrus.WithFields(logrus.Fields{
		"module": "IMLoginService",
	}).Infof("退出登录 %s %s ", ctx.Session().GetChannelId(), ctx.Session().GetTerminal())

	err := s.sessionStorage.Delete(ctx.Session().GetChannelId())
	if err != nil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return err
	}

	_ = ctx.Resp(pkt.Status_Success, nil)
	return nil
}
