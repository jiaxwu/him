package logic

import (
	"bytes"
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/service"
	"github.com/XiaoHuaShiFu/him/back/wire"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/bwmarrin/snowflake"
	"github.com/sirupsen/logrus"
	"time"
)

// Handler 这里是逻辑层，对消息进行处理并转发到service层
type Handler struct {
	idGen            *snowflake.Node
	imLoginService   *service.IMLoginService
	imMessageService *service.IMMessageService
	imOfflineService *service.IMOfflineService
	userService      *service.UserService
	pusher           him.Pusher
	sessionStorage   him.SessionStorage
}

func NewHandler(imLoginService *service.IMLoginService, userService *service.UserService, pusher him.Pusher,
	sessionStorage him.SessionStorage, imMessageService *service.IMMessageService,
	imOfflineService *service.IMOfflineService) *Handler {
	return &Handler{
		idGen:            db.NewIDGen(),
		imLoginService:   imLoginService,
		userService:      userService,
		pusher:           pusher,
		sessionStorage:   sessionStorage,
		imMessageService: imMessageService,
		imOfflineService: imOfflineService,
	}
}

// Accept 其实就是身份验证，拿着token进行验证
func (h *Handler) Accept(conn him.Conn, timeout time.Duration) (string, error) {
	log := logrus.WithFields(logrus.Fields{
		"module":  "logic",
		"handler": "Accept",
	})

	// 1. 读取登陆包
	_ = conn.SetReadDeadline(time.Now().Add(timeout))
	frame, err := conn.ReadFrame()
	if err != nil {
		return "", err
	}

	buf := bytes.NewBuffer(frame.GetPayload())
	req, err := pkt.MustReadLogicPkt(buf)
	if err != nil {
		log.Error(err)
		return "", err
	}
	// 2. 必须是登陆包
	if req.Command != wire.CommandLoginSignIn {
		resp := pkt.NewFrom(&req.Header)
		resp.Status = pkt.Status_InvalidCommand
		_ = conn.WriteFrame(him.OpBinary, pkt.Marshal(resp))
		return "", fmt.Errorf("必须是登录请求")
	}

	// 3. 反序列化Body
	var login pkt.LoginReq
	if err = req.ReadBody(&login); err != nil {
		return "", err
	}

	// 4. 身份校验
	auth, err := h.userService.Auth(login.Token)
	if err != nil {
		resp := pkt.NewFrom(&req.Header)
		resp.Status = pkt.Status_Unauthorized
		_ = conn.WriteFrame(him.OpBinary, pkt.Marshal(resp))
		return "", err
	}

	// 4. 生成一个全局唯一的ChannelID
	id := generateChannelID(auth.UserId, auth.Terminal)

	// 5. 登录
	session := pkt.Session{
		UserId:    auth.UserId,
		ChannelId: id,
		Terminal:  auth.Terminal,
	}
	context := service.NewContext(req, &session, conn, h.pusher)
	if err = h.imLoginService.Login(context); err != nil {
		return "", err
	}
	return id, nil
}

// Receive 接收并处理消息
func (h *Handler) Receive(ch him.Channel, payload []byte) {
	buf := bytes.NewBuffer(payload)
	packet, err := pkt.Read(buf)
	if err != nil {
		logrus.Error(err)
		return
	}
	if basicPkt, ok := packet.(*pkt.BasicPkt); ok {
		if basicPkt.Code == pkt.CodePing {
			_ = ch.Push(pkt.Marshal(&pkt.BasicPkt{Code: pkt.CodePong}))
		}
		return
	}
	if logicPkt, ok := packet.(*pkt.LogicPkt); ok {
		fmt.Printf("%+v\n", logicPkt)
		session, _ := h.sessionStorage.Get(ch.ID())
		context := service.NewContext(logicPkt, session, ch, h.pusher)
		if logicPkt.Command == wire.CommandChatUserTalk {
			h.imMessageService.InsertUserMessage(context)
		}
		if logicPkt.Command == wire.CommandChatTalkAck {
			h.imMessageService.DoTalkAck(context)
		}
		if logicPkt.Command == wire.CommandOfflineIndex {
			h.imOfflineService.DoSyncIndex(context)
		}
		if logicPkt.Command == wire.CommandOfflineContent {
			h.imOfflineService.DoSyncContent(context)
		}
	}
}

func (h *Handler) Disconnect(ch him.Channel) error {
	logrus.WithFields(logrus.Fields{
		"module": "handler",
	}).Infof("断开连接： %s", ch.ID())
	logout := pkt.New(wire.CommandLoginSignOut)
	session := pkt.Session{
		ChannelId: ch.ID(),
	}
	context := service.NewContext(logout, &session, ch, h.pusher)
	if err := h.imLoginService.Logout(context); err != nil {
		logrus.WithFields(logrus.Fields{
			"module": "handler",
			"id":     ch.ID(),
		}).Error(err)
	}
	return nil
}

func generateChannelID(userID int64, terminal string) string {
	return fmt.Sprintf("%d_%s_%d", userID, terminal, Seq.Next())
}
