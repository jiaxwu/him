package service

import (
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/bwmarrin/snowflake"
	"gorm.io/gorm"
	"time"
)

type IMCommunityService struct {
	sessionStorage him.SessionStorage
	pusher         him.Pusher
	db             *gorm.DB
	idGen          *snowflake.Node
}

func NewIMCommunityService(sessionStorage him.SessionStorage, pusher him.Pusher) *IMCommunityService {
	return &IMCommunityService{
		sessionStorage: sessionStorage,
		pusher:         pusher,
		db:             db.NewDB(),
		idGen:          db.NewIDGen(),
	}
}

func (h *IMCommunityService) CommunityPush(c him.Context) {
	// validate
	// 1. 解包
	var req pkt.MessageReq
	if err := c.ReadBody(&req); err != nil {
		_ = c.RespWithError(pkt.Status_InvalidPacketBody, err)
		return
	}

	// 2.获取所有接收者
	var fans []db.Fans
	if err := h.db.Where("user_a = ?", c.Session().GetUserId()).Find(&fans).Error; err != nil {
		_ = c.RespWithError(pkt.Status_SystemException, err)
		return
	}

	// 3. 获取接收方的位置信息
	var locs []*pkt.Location
	for _, fan := range fans {
		loc, err := h.sessionStorage.GetLocation(fan.UserB, "pc")
		if err != nil && err != him.ErrSessionNil {
			_ = c.RespWithError(pkt.Status_SystemException, err)
			return
		}
		locs = append(locs, loc)
	}

	// 3. 保存离线消息
	sendTime := time.Now().UnixNano()
	messageID, err := h.InsertMessages(&req, c.Session().GetUserId(), sendTime, fans)
	if err != nil {
		_ = c.RespWithError(pkt.Status_SystemException, err)
		return
	}

	// 4. 如果接收方在线，就推送一条消息过去。
	if locs != nil {
		if err = c.Dispatch(&pkt.MessagePush{
			MessageId: messageID,
			Type:      req.GetType(),
			Body:      req.GetBody(),
			Extra:     req.GetExtra(),
			Sender:    c.Session().GetUserId(),
			SendTime:  sendTime,
		}, locs...); err != nil {
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

func (h *IMCommunityService) InsertMessages(req *pkt.MessageReq, sender int64, sendTime int64,
	fans []db.Fans) (int64, error) {
	messageId := h.idGen.Generate().Int64()
	messageContent := db.MessageContent{
		ID:       messageId,
		Type:     byte(req.Type),
		Body:     req.Body,
		Extra:    req.Extra,
		SendTime: sendTime,
	}

	// 扩散写
	idxs := make([]db.MessageIndex, len(fans))
	for i, fan := range fans {
		idxs[i] = db.MessageIndex{
			ID:        h.idGen.Generate().Int64(),
			MessageID: messageId,
			UserA:     fan.UserB,
			UserB:     sender,
			Direction: 0,
			SendTime:  sendTime,
		}
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
