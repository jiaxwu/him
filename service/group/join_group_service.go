package group

import (
	"github.com/jiaxwu/him/service/group/model"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"github.com/jiaxwu/him/service/user"
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
	if err := s.joinGroup(req.UserID, groupQRCode.GroupID, textTip); err != nil {
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

// 加入群
func (s *Service) joinGroup(userID, groupID uint64, textTip *msg.NickNameTextTip) error {
	// 创建群成员
	groupMember := model.GroupMember{
		GroupID:        groupID,
		MemberID:       userID,
		Role:           uint8(GroupMemberRoleMember),
		IsShowNickName: true,
		JoinTime:       uint64(time.Now().Unix()),
	}
	if err := s.db.Create(&groupMember).Error; err != nil {
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

// 装配加入群昵称文本提示
func (s *Service) assembleScanCodeJoinGroupNickNameTextTip(userID, inviterID uint64) (*msg.NickNameTextTip, error) {
	// 查询用户信息
	getUserInfosRsp, err := s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: userID})
	if err != nil {
		return nil, err
	}
	userInfo := getUserInfosRsp.UserInfo
	getUserInfosRsp, err = s.userService.GetUserInfo(&user.GetUserInfoReq{UserID: inviterID})
	if err != nil {
		return nil, err
	}
	inviterInfo := getUserInfosRsp.UserInfo

	// 装配成昵称提示
	clickableTexts := make([]*msg.ClickableText, 4)
	clickableTexts[0] = &msg.ClickableText{
		Link: strconv.Itoa(int(userID)),
		Text: userInfo.NickName,
	}
	clickableTexts[1] = &msg.ClickableText{
		Text: "通过扫描",
	}
	clickableTexts[0] = &msg.ClickableText{
		Link: strconv.Itoa(int(inviterID)),
		Text: inviterInfo.NickName,
	}
	clickableTexts[1] = &msg.ClickableText{
		Text: "分享的二维码加入群聊",
	}
	return &msg.NickNameTextTip{ClickableTexts: clickableTexts}, nil
}
