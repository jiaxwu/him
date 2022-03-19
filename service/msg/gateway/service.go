package gateway

import (
	"github.com/go-redis/redis/v8"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/service/friend"
	"github.com/jiaxwu/him/service/group"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type Service struct {
	rdb           *redis.Client
	db            *gorm.DB
	logger        *logrus.Logger
	senderService *sender.Service
	idGenerator   *msg.IDGenerator
	friendService *friend.Service
	groupService  *group.Service
}

func NewService(senderService *sender.Service, rdb *redis.Client, idGenerator *msg.IDGenerator, db *gorm.DB,
	friendService *friend.Service, groupService *group.Service) *Service {
	return &Service{
		rdb:           rdb,
		senderService: senderService,
		idGenerator:   idGenerator,
		db:            db,
		friendService: friendService,
		groupService:  groupService,
	}
}

// SendMsg 发送消息
func (s *Service) SendMsg(req *SendMsgReq) (*SendMsgRsp, error) {
	// 参数校验
	if req.Receiver == nil || req.Content == nil || req.SendTime == 0 || req.CorrelationID == "" ||
		(req.Content.TextMsg == nil && req.Content.ImageMsg == nil) {
		return nil, common.ErrCodeInvalidParameter
	}
	if req.Content.TextMsg != nil && req.Content.TextMsg.Content == "" {
		return nil, common.ErrCodeInvalidParameter
	}
	if req.Content.ImageMsg != nil &&
		(req.Content.ImageMsg.Thumbnail == nil || req.Content.ImageMsg.OriginalImage == nil) {
		return nil, common.ErrCodeInvalidParameter
	}

	// 根据对应接收者类型发送
	switch req.Receiver.Type {
	case msg.ReceiverTypeUser:
		return s.sendToUser(req)
	case msg.ReceiverTypeGroup:
		return s.sendToGroup(req)
	default:
		return nil, common.ErrCodeInvalidParameter
	}
}

// 发送给用户
func (s *Service) sendToUser(req *SendMsgReq) (*SendMsgRsp, error) {
	// 接收者和发送者必须是好友
	if req.Sender.Type == msg.SenderTypeUser {
		rsp, err := s.friendService.IsFriend(&friend.IsFriendReq{
			UserID:   req.Sender.SenderID,
			FriendID: req.Receiver.ReceiverID,
		})
		if err != nil {
			return nil, err
		}
		if !rsp.IsFriend {
			return nil, ErrCodeInvalidParameterNotIsFriend
		}
	}

	// 获取消息编号
	msgID := s.idGenerator.GenMsgID()

	// 构造消息
	// 如果发送者是用户，那么也要给他本人发送一条
	now := time.Now().Unix()
	var msgs []*msg.Msg
	if req.Sender.Type == msg.SenderTypeUser {
		msgs = append(msgs, &msg.Msg{
			UserID:        req.Sender.SenderID,
			MsgID:         msgID,
			Sender:        req.Sender,
			Receiver:      req.Receiver,
			SendTime:      req.SendTime,
			ArrivalTime:   uint64(now),
			CorrelationID: req.CorrelationID,
			Content:       req.Content,
		})
	}
	msgs = append(msgs, &msg.Msg{
		UserID:      req.Receiver.ReceiverID,
		MsgID:       msgID,
		Sender:      req.Sender,
		Receiver:    req.Receiver,
		SendTime:    req.SendTime,
		ArrivalTime: uint64(now),
		Content:     req.Content,
	})

	// 发送到mq
	if _, err := s.senderService.SendMsgs(&sender.SendMsgsReq{Msgs: msgs}); err != nil {
		return nil, err
	}

	return &SendMsgRsp{
		CorrelationID: req.CorrelationID,
		MsgID:         msgID,
	}, nil
}

// 发送给群
func (s *Service) sendToGroup(req *SendMsgReq) (*SendMsgRsp, error) {
	// 发送者必须是群成员
	if req.Sender.Type == msg.SenderTypeUser {
		_, err := s.groupService.IsGroupMember(&group.IsGroupMemberReq{
			UserID:  req.Sender.SenderID,
			GroupID: req.Receiver.ReceiverID,
		})
		if err != nil {
			return nil, err
		}
	}

	// 获取群成员编号
	getAllGroupMemberIDSRsp, err := s.groupService.GetAllGroupMemberIDS(&group.GetAllGroupMemberIDSReq{
		GroupID: req.Receiver.ReceiverID,
	})
	if err != nil {
		return nil, err
	}

	// 构造群消息
	memberIDS := getAllGroupMemberIDSRsp.MemberIDS
	msgs := make([]*msg.Msg, 0, len(memberIDS))
	msgID := s.idGenerator.GenMsgID()
	now := uint64(time.Now().Unix())
	for _, userID := range memberIDS {
		msgs = append(msgs, &msg.Msg{
			UserID:      userID,
			MsgID:       msgID,
			Sender:      req.Sender,
			Receiver:    req.Receiver,
			SendTime:    req.SendTime,
			ArrivalTime: now,
			Content:     req.Content,
		})
	}

	// 发送到mq
	if _, err := s.senderService.SendMsgs(&sender.SendMsgsReq{Msgs: msgs}); err != nil {
		return nil, err
	}

	return &SendMsgRsp{
		CorrelationID: req.CorrelationID,
		MsgID:         msgID,
	}, nil
}
