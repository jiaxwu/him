package group

import (
	"errors"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/common/mysql"
	"github.com/jiaxwu/him/service/group/model"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"github.com/jiaxwu/him/service/user"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"strconv"
	"time"
)

// GenGroupQRCode 生成入群二维码
func (s *Service) GenGroupQRCode(req *GenGroupQRCodeReq) (*GenGroupQRCodeRsp, error) {
	// 获取群信息
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.UserID,
		GroupID: req.GroupID,
	})
	if err != nil {
		return nil, err
	}
	groupInfo := getGroupInfoRsp.GroupInfo

	// 必须是群成员
	if groupInfo.GroupMemberInfo == nil {
		return nil, ErrCodeInvalidParameterAlreadyIsGroupMember
	}

	// 必须是可以扫码入群（也就是不是需要邀请才能进群）
	if groupInfo.IsInviteJoinGroupNeedConfirm {
		return nil, ErrCodeInvalidParameterNeedInvite
	}

	// 生成群二维码
	expirationTime := time.Now().Add(GroupQRCodeEffectiveTime).Unix()
	groupQRCode := GroupQRCode{
		GroupID:        req.GroupID,
		InviterID:      req.UserID,
		ExpirationTime: expirationTime,
	}
	encryptedGroupQRCode, err := groupQRCodeEncrypt(&groupQRCode)
	if err != nil {
		return nil, err
	}
	return &GenGroupQRCodeRsp{
		QRCode:         encryptedGroupQRCode,
		ExpirationTime: expirationTime,
	}, nil
}

// ScanCodeJoinGroup 扫码入群
func (s *Service) ScanCodeJoinGroup(req *ScanCodeJoinGroupReq) (*ScanCodeJoinGroupRsp, error) {
	// 解析二维码
	groupQRCode, err := groupQRCodeDecrypt(req.QRCode)
	if err != nil {
		return nil, err
	}

	// 判断二维码是否已经过期
	if groupQRCode.ExpirationTime < time.Now().Unix() {
		return nil, ErrCodeInvalidParameterGroupQRCodeExpired
	}

	// 获取群信息
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.UserID,
		GroupID: groupQRCode.GroupID,
	})
	if err != nil {
		return nil, err
	}
	groupInfo := getGroupInfoRsp.GroupInfo

	// 必须不是群成员
	if groupInfo.GroupMemberInfo != nil {
		return nil, ErrCodeInvalidParameterAlreadyIsGroupMember
	}

	// 必须可以扫码入群
	if groupInfo.IsInviteJoinGroupNeedConfirm {
		return nil, ErrCodeInvalidParameterNeedInvite
	}

	// 加入群
	textTip, err := s.assembleScanCodeJoinGroupNickNameTextTip(req.UserID, groupQRCode.InviterID)
	if err != nil {
		return nil, err
	}
	if err := s.joinGroup([]uint64{req.UserID}, groupQRCode.GroupID, textTip); err != nil {
		return nil, err
	}

	// 获取群信息
	getGroupInfoRsp, err = s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.UserID,
		GroupID: groupQRCode.GroupID,
	})
	if err != nil {
		return nil, err
	}
	return &ScanCodeJoinGroupRsp{GroupInfo: getGroupInfoRsp.GroupInfo}, nil
}

// InviteJoinGroup 邀请入群
func (s *Service) InviteJoinGroup(req *InviteJoinGroupReq) (*InviteJoinGroupRsp, error) {
	// 被邀请者数量必须大于0
	if len(req.InviteeIDS) == 0 {
		return nil, common.ErrCodeInvalidParameter
	}

	// 获取群信息
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  req.InviterID,
		GroupID: req.GroupID,
	})
	if err != nil {
		return nil, err
	}
	groupInfo := getGroupInfoRsp.GroupInfo

	// 必须是群成员才能邀请
	if groupInfo.GroupMemberInfo == nil {
		return nil, ErrCodeInvalidParameterNotGroupMember
	}

	// 如果不需要确认，或需要确认但邀请者是群管理员或群主，直接进群
	if !groupInfo.IsInviteJoinGroupNeedConfirm || groupInfo.GroupMemberInfo.Role == GroupMemberRoleManager ||
		groupInfo.GroupMemberInfo.Role == GroupMemberRoleLeader {
		if err := s.inviteJoinGroup(req.InviteeIDS, req.InviterID, req.GroupID); err != nil {
			return nil, err
		}
	} else {
		// 否则发送入群邀请通知群管理员和群主
		if err := s.sendJoinGroupInviteToLeaderAndManager(req); err != nil {
			return nil, err
		}
	}
	return &InviteJoinGroupRsp{}, nil
}

// GetJoinGroupInvite 获取入群邀请
func (s *Service) GetJoinGroupInvite(req *GetJoinGroupInviteReq) (*GetJoinGroupInviteRsp, error) {
	// 获取入群邀请
	var joinGroupInvite model.JoinGroupInvite
	err := s.db.Take(&joinGroupInvite, req.JoinGroupInviteID).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterJoinGroupInviteNotExists
	}

	// 获取群信息
	getGroupMemberInfoRsp, err := s.GetGroupMemberInfo(&GetGroupMemberInfoReq{
		MemberID: req.UserID,
		GroupID:  joinGroupInvite.GroupID,
	})
	if err != nil {
		return nil, err
	}
	groupMemberInfo := getGroupMemberInfoRsp.GroupMemberInfo

	// 必须是管理员或群主才能获取
	if groupMemberInfo.Role != GroupMemberRoleManager && groupMemberInfo.Role != GroupMemberRoleLeader {
		return nil, common.ErrCodeForbidden
	}

	// 封装结果
	return &GetJoinGroupInviteRsp{
		JoinGroupInviteID: joinGroupInvite.ID,
		GroupID:           joinGroupInvite.GroupID,
		InviterID:         joinGroupInvite.InviterID,
		InviteeIDS:        jsons.UnmarshalString[[]uint64](joinGroupInvite.InviteeIDS),
		Reason:            joinGroupInvite.Reason,
		Status:            InviteStatus(joinGroupInvite.Status),
	}, nil
}

// ConfirmJoinGroupInvite 确认入群邀请
func (s *Service) ConfirmJoinGroupInvite(req *ConfirmJoinGroupInviteReq) (*ConfirmJoinGroupInviteRsp, error) {
	// 获取入群邀请（主要是进行各种判断）
	getJoinGroupInviteRsp, err := s.GetJoinGroupInvite(&GetJoinGroupInviteReq{
		UserID:            req.UserID,
		JoinGroupInviteID: req.JoinGroupInviteID,
	})
	if err != nil {
		return nil, err
	}

	// 如果已经确认过，直接忽略
	if getJoinGroupInviteRsp.Status == InviteStatusAlreadyConfirm {
		return &ConfirmJoinGroupInviteRsp{}, nil
	}

	// 入群
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		// 给入群邀请加锁
		var joinGroupInvite model.JoinGroupInvite
		err := tx.Clauses(clause.Locking{
			Strength: "UPDATE",
			Options:  "NOWAIT",
		}).Where("id = ?", req.JoinGroupInviteID).Take(&joinGroupInvite).Error
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		// 如果已经确认过，直接忽略
		if getJoinGroupInviteRsp.Status == InviteStatusAlreadyConfirm {
			return nil
		}

		// 修改为已确认
		if err := tx.Model(model.JoinGroupInvite{}).Where("id = ?", req.JoinGroupInviteID).
			Update("status", InviteStatusAlreadyConfirm).Error; err != nil {
			return err
		}

		// 邀请入群
		return s.inviteJoinGroup(getJoinGroupInviteRsp.InviteeIDS, getJoinGroupInviteRsp.InviterID,
			getJoinGroupInviteRsp.GroupID)
	}); err != nil {
		return nil, err
	}
	return &ConfirmJoinGroupInviteRsp{}, nil
}

// 发送入群邀请通知群管理员和群主
func (s *Service) sendJoinGroupInviteToLeaderAndManager(req *InviteJoinGroupReq) error {
	// 创建入群邀请
	joinGroupInvite := model.JoinGroupInvite{
		GroupID:    req.GroupID,
		InviterID:  req.InviterID,
		InviteeIDS: jsons.MarshalToString(req.InviteeIDS),
		Reason:     req.Reason,
		Status:     string(InviteStatusWaitConfirm),
	}
	if err := s.db.Create(&joinGroupInvite).Error; err != nil {
		return err
	}

	// 获取群管理员和群主编号
	var leaderAndManagerIDS []uint64
	if err := s.db.Model(model.GroupMember{}).Where("group_id = ? and (role = ? or role = ?)",
		req.GroupID, GroupMemberRoleLeader, req.GroupID, GroupMemberRoleManager).
		Select("member_id").Find(&leaderAndManagerIDS).Error; err != nil {
		return err
	}

	// 获取邀请者信息
	getUserInfoRsp, err := s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: req.InviterID})
	if err != nil {
		return err
	}
	userInfo := getUserInfoRsp.UserInfo

	// 给群管理员和群主发送确认请求
	_, err = s.senderService.SendTipMsg(&sender.SendTipMsgReq{
		UserIDS: leaderAndManagerIDS,
		TipMsg: &msg.TipMsg{
			JoinGroupInviteConfirmTip: &msg.JoinGroupInviteConfirmTip{
				Inviter: &msg.ClickableText{
					Link: strconv.Itoa(int(req.InviterID)),
					Text: userInfo.NickName,
				},
				JoinGroupInviteID: joinGroupInvite.ID,
			},
		},
		Receiver: &msg.Receiver{
			Type:       msg.ReceiverTypeGroup,
			ReceiverID: req.GroupID,
		},
	})
	return err
}

// 邀请入群
func (s *Service) inviteJoinGroup(inviteeIDS []uint64, inviterID, groupID uint64) error {
	textTip, err := s.assembleInviteJoinGroupNickNameTextTip(inviteeIDS, inviterID)
	if err != nil {
		return err
	}
	return s.joinGroup(inviteeIDS, groupID, textTip)
}

// 加入群
func (s *Service) joinGroup(userIDS []uint64, groupID uint64, textTip *msg.NickNameTextTip) error {
	// 创建群成员
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		var joinCount int
		for _, userID := range userIDS {
			groupMember := model.GroupMember{
				GroupID:        groupID,
				MemberID:       userID,
				Role:           uint8(GroupMemberRoleMember),
				IsShowNickName: true,
				JoinTime:       uint64(time.Now().Unix()),
			}
			err := tx.Create(&groupMember).Error
			if err != nil && !mysql.ErrorIs(err, mysql.DuplicateEntryNumber) {
				return err
			}
			if !mysql.ErrorIs(err, mysql.DuplicateEntryNumber) {
				joinCount++
			}
		}
		if err := s.db.Raw("update group set members = members + ? where id = ?",
			joinCount, groupID).Error; err != nil {
			return err
		}
		return nil
	}); err != nil {
		return err
	}

	// 获取群成员编号
	memberIDS, err := s.getAllGroupMemberIDS(groupID)
	if err != nil {
		return err
	}

	// 发送新的群事件消息
	if _, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
		UserIDS: memberIDS,
		EventMsg: &msg.EventMsg{
			GroupInfoChange: &msg.GroupInfoChangeEventMsg{
				GroupID: groupID,
			},
		},
	}); err != nil {
		return err
	}

	// 发送加入群聊TipMsg
	_, err = s.senderService.SendTipMsg(&sender.SendTipMsgReq{
		UserIDS: memberIDS,
		TipMsg: &msg.TipMsg{
			NickNameTextTip: textTip,
		},
		Receiver: &msg.Receiver{
			Type:       msg.ReceiverTypeGroup,
			ReceiverID: groupID,
		},
	})
	return nil
}

// 装配扫码入群昵称文本提示
func (s *Service) assembleScanCodeJoinGroupNickNameTextTip(userID, inviterID uint64) (*msg.NickNameTextTip, error) {
	// 获取扫码者用户信息
	getUserInfoRsp, err := s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: userID})
	if err != nil {
		return nil, err
	}
	userInfo := getUserInfoRsp.UserInfo

	// 获取邀请者用户信息
	getUserInfoRsp, err = s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: inviterID})
	if err != nil {
		return nil, err
	}
	inviterUserInfo := getUserInfoRsp.UserInfo

	// 装配成昵称提示
	clickableTexts := make([]*msg.ClickableText, 4)
	clickableTexts[0] = &msg.ClickableText{
		Link: strconv.Itoa(int(userID)),
		Text: userInfo.NickName,
	}
	clickableTexts[1] = &msg.ClickableText{Text: "通过扫描"}
	clickableTexts[0] = &msg.ClickableText{
		Link: strconv.Itoa(int(inviterID)),
		Text: inviterUserInfo.NickName,
	}
	clickableTexts[1] = &msg.ClickableText{Text: "分享的二维码加入群聊"}
	return &msg.NickNameTextTip{ClickableTexts: clickableTexts}, nil
}

// 装配邀请进群昵称文本提示
func (s *Service) assembleInviteJoinGroupNickNameTextTip(inviteeIDS []uint64, inviterID uint64) (*msg.NickNameTextTip, error) {
	// 获取被邀请者用户信息
	getUserInfosRsp, err := s.userService.GetUserInfos(&user.GetUserInfosReq{UserIDS: inviteeIDS})
	if err != nil {
		return nil, err
	}
	inviteeUserInfos := getUserInfosRsp.UserInfos
	// 某个邀请者不存在是有问题的
	if len(inviteeUserInfos) != len(inviteeIDS) {
		return nil, common.ErrCodeInvalidParameter
	}

	// 获取邀请者用户信息
	getUserInfoRsp, err := s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: inviterID})
	if err != nil {
		return nil, err
	}
	inviterUserInfo := getUserInfoRsp.UserInfo

	// 装配成昵称提示
	clickableTexts := make([]*msg.ClickableText, 0, 3+len(inviteeUserInfos))
	clickableTexts = append(clickableTexts, &msg.ClickableText{
		Link: strconv.Itoa(int(inviterUserInfo.UserID)),
		Text: inviterUserInfo.NickName,
	})
	clickableTexts = append(clickableTexts, &msg.ClickableText{Text: "邀请"})
	for _, inviteeUserInfo := range inviteeUserInfos {
		clickableTexts = append(clickableTexts, &msg.ClickableText{
			Link: strconv.Itoa(int(inviteeUserInfo.UserID)),
			Text: inviteeUserInfo.NickName,
		})
	}
	clickableTexts = append(clickableTexts, &msg.ClickableText{Text: "加入了群聊"})
	return &msg.NickNameTextTip{ClickableTexts: clickableTexts}, nil
}
