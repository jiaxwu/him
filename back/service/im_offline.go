package service

import (
	"context"
	"errors"
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/bwmarrin/snowflake"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
	"time"
)

type IMOfflineService struct {
	sessionStorage him.SessionStorage
	pusher         him.Pusher
	db             *gorm.DB
	rdb            *redis.Client
	idGen          *snowflake.Node
}

func NewIMOfflineService(sessionStorage him.SessionStorage, pusher him.Pusher) *IMOfflineService {
	return &IMOfflineService{
		sessionStorage: sessionStorage,
		pusher:         pusher,
		db:             db.NewDB(),
		idGen:          db.NewIDGen(),
		rdb:            db.NewRDB(),
	}
}

func (h *IMOfflineService) DoSyncIndex(ctx him.Context) {
	var req pkt.MessageIndexReq
	if err := ctx.ReadBody(&req); err != nil {
		_ = ctx.RespWithError(pkt.Status_InvalidPacketBody, err)
		return
	}
	resp, err := h.GetOfflineMessageIndex(ctx.Session().GetUserId(), req.MessageId, ctx.Session().GetTerminal())
	if err != nil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return
	}
	_ = ctx.Resp(pkt.Status_Success, &pkt.MessageIndexResp{
		Indexes: resp,
	})
}

func (h *IMOfflineService) GetOfflineMessageIndex(userID int64, messageId int64, terminal string) ([]*pkt.MessageIndex, error) {
	start, err := h.getSentTime(userID, messageId, terminal)
	if err != nil {
		return nil, err
	}
	var indexes []*pkt.MessageIndex
	tx := h.db.Model(&db.MessageIndex{}).Select("send_time", "user_b", "direction", "message_id", "group")
	err = tx.Where("user_a=? and send_time>? and direction=?", userID, start, 0).Order("send_time asc").
		Limit(wire.OfflineSyncIndexCount).Find(&indexes).Error
	if err != nil {
		return nil, err
	}
	err = h.setMessageAck(userID, messageId, terminal)
	if err != nil {
		return nil, err
	}
	return indexes, nil
}

func (h *IMOfflineService) getSentTime(userId int64, msgId int64, terminal string) (int64, error) {
	// 1. 冷启动情况，从服务端拉取消息索引
	if msgId == 0 {
		key := h.keyMessageAckIndex(userId, terminal)
		msgId, _ = h.rdb.Get(context.Background(), key).Int64() // 如果一次都没有发ack包，这里就是0
	}
	var start int64
	if msgId > 0 {
		// 2.根据消息ID读取此条消息的发送时间。
		var content db.MessageContent
		err := h.db.Select("send_time").First(&content, msgId).Error
		if err != nil {
			//3.如果此条消息不存在，返回最近一天
			start = time.Now().AddDate(0, 0, -1).UnixNano()
		} else {
			start = content.SendTime
		}
	}
	// 4.返回默认的离线消息过期时间
	earliestKeepTime := time.Now().AddDate(0, 0, -1*wire.OfflineMessageExpiresIn).UnixNano()
	if start == 0 || start < earliestKeepTime {
		start = earliestKeepTime
	}
	return start, nil
}

func (h *IMOfflineService) keyMessageAckIndex(userId int64, terminal string) string {
	return fmt.Sprintf("chat:ack:%d:%s", userId, terminal)
}

func (h *IMOfflineService) setMessageAck(userId int64, msgId int64, terminal string) error {
	if msgId == 0 {
		return nil
	}
	key := h.keyMessageAckIndex(userId, terminal)
	return h.rdb.Set(context.Background(), key, msgId, wire.OfflineReadIndexExpiresIn).Err()
}

func (h *IMOfflineService) DoSyncContent(ctx him.Context) {
	var req pkt.MessageContentReq
	if err := ctx.ReadBody(&req); err != nil {
		_ = ctx.RespWithError(pkt.Status_InvalidPacketBody, err)
		return
	}
	if len(req.MessageIds) == 0 {
		_ = ctx.RespWithError(pkt.Status_InvalidPacketBody, errors.New("empty MessageIds"))
		return
	}
	resp, err := h.GetOfflineMessageContent(req.MessageIds)
	if err != nil {
		_ = ctx.RespWithError(pkt.Status_SystemException, err)
		return
	}
	_ = ctx.Resp(pkt.Status_Success, &pkt.MessageContentResp{
		Contents: resp,
	})
}

func (h *IMOfflineService) GetOfflineMessageContent(messageIds []int64) ([]*pkt.MessageContent, error) {
	mlen := len(messageIds)
	if mlen > wire.MessageMaxCountPerPage {
		return nil, errors.New("too many MessageIds")
	}
	var contents []*pkt.MessageContent
	err := h.db.Where(messageIds).Find(&contents).Error
	if err != nil {
		return nil, err
	}
	return contents, nil
}
