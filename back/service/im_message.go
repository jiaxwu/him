package service

import (
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/bwmarrin/snowflake"
	"gorm.io/gorm"
	"time"
)

type IMMessageService struct {
	sessionStorage   him.SessionStorage
	pusher           him.Pusher
	db               *gorm.DB
	idGen            *snowflake.Node
	imOfflineService *IMOfflineService
}

func NewIMMessageService(sessionStorage him.SessionStorage, pusher him.Pusher,
	imOfflineService *IMOfflineService) *IMMessageService {
	return &IMMessageService{
		sessionStorage:   sessionStorage,
		pusher:           pusher,
		db:               db.NewDB(),
		idGen:            db.NewIDGen(),
		imOfflineService: imOfflineService,
	}
}

func (h *IMMessageService) InsertUserMessage(c him.Context) {
	// validate
	// 1. 解包
	var req pkt.MessageReq
	if err := c.ReadBody(&req); err != nil {
		_ = c.RespWithError(pkt.Status_InvalidPacketBody, err)
		return
	}
	// 2. 获取接收方的位置信息
	receiver := req.GetDest()
	loc, err := h.sessionStorage.GetLocation(receiver, "pc")
	if err != nil && err != him.ErrSessionNil {
		_ = c.RespWithError(pkt.Status_SystemException, err)
		return
	}
	// 3. 保存离线消息
	sendTime := time.Now().UnixNano()
	messageID, err := h.InsertMessage(&req, c.Session().GetUserId(), sendTime)
	if err != nil {
		_ = c.RespWithError(pkt.Status_SystemException, err)
		return
	}

	// 4. 如果接收方在线，就推送一条消息过去。
	if loc != nil {
		if err = c.Dispatch(&pkt.MessagePush{
			MessageId: messageID,
			Type:      req.GetType(),
			Body:      req.GetBody(),
			Extra:     req.GetExtra(),
			Sender:    c.Session().GetUserId(),
			SendTime:  sendTime,
		}, loc); err != nil {
			_ = c.RespWithError(pkt.Status_SystemException, err)
			return
		}
	}
	// 5. 返回一条resp消息
	_ = c.Resp(pkt.Status_Success, &pkt.MessageResp{
		MessageId: messageID,
		SendTime:  sendTime,
	})
}

func (h *IMMessageService) InsertMessage(req *pkt.MessageReq, sender int64, sendTime int64) (int64, error) {
	messageId := h.idGen.Generate().Int64()
	messageContent := db.MessageContent{
		ID:       messageId,
		Type:     byte(req.Type),
		Body:     req.Body,
		Extra:    req.Extra,
		SendTime: sendTime,
	}

	// 扩散写
	idxs := make([]db.MessageIndex, 2)
	idxs[0] = db.MessageIndex{
		ID:        h.idGen.Generate().Int64(),
		MessageID: messageId,
		UserA:     req.Dest,
		UserB:     sender,
		Direction: 0,
		SendTime:  sendTime,
	}
	idxs[1] = db.MessageIndex{
		ID:        h.idGen.Generate().Int64(),
		MessageID: messageId,
		UserA:     sender,
		UserB:     req.Dest,
		Direction: 1,
		SendTime:  sendTime,
	}

	err := h.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&messageContent).Error; err != nil {
			return err
		}
		if err := tx.Create(&idxs).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return 0, err
	}
	return messageId, nil
}

func (h *IMMessageService) DoTalkAck(ctx him.Context) {
	var req pkt.MessageAckReq
	if err := ctx.ReadBody(&req); err != nil {
		_ = ctx.RespWithError(pkt.Status_InvalidPacketBody, err)
		return
	}
	err := h.imOfflineService.setMessageAck(ctx.Session().GetUserId(), req.MessageId, ctx.Session().GetTerminal())
	if err != nil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return
	}
	_ = ctx.Resp(pkt.Status_Success, nil)
}
