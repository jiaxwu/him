package group

import (
	"errors"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/service/group/model"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"gorm.io/gorm"
)

// GetGroupMemberInfo 获取群成员信息
func (s *Service) GetGroupMemberInfo(req *GetGroupMemberInfoReq) (*GetGroupMemberInfoRsp, error) {
	// 查询群成员信息
	var groupMember model.GroupMember
	err := s.db.Where("group_id = ? and member_id = ?", req.GroupID, req.MemberID).Take(&groupMember).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// 不是群成员
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterNotGroupMember
	}

	// 装配
	return &GetGroupMemberInfoRsp{
		GroupMemberInfo: s.assembleGroupMemberInfo(&groupMember),
	}, nil
}

// GetGroupMemberInfos 获取群成员信息
// todo 分页
func (s *Service) GetGroupMemberInfos(req *GetGroupMemberInfosReq) (*GetGroupMemberInfosRsp, error) {
	// 调整页码页大小
	if req.Page == 0 {
		req.Page = 1
	}
	if req.Size > 500 {
		req.Size = 500
	} else if req.Size == 0 {
		req.Size = 100
	}

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
		return nil, ErrCodeInvalidParameterNotGroupMember
	}

	// 获取群成员信息
	groupMembers := make([]*model.GroupMember, 0, groupInfo.Members)
	if err := s.db.Where("group_id = ?", req.GroupID).Find(&groupMembers).Error; err != nil {
		return nil, err
	}

	// 装配
	groupMemberInfos := make([]*GroupMemberInfo, 0, len(groupMembers))
	for _, groupMember := range groupMembers {
		groupMemberInfo := s.assembleGroupMemberInfo(groupMember)
		groupMemberInfo.IsTop = false
		groupMemberInfo.IsDisturb = false
		groupMemberInfo.IsShowNickName = false
		groupMemberInfos = append(groupMemberInfos, groupMemberInfo)
	}
	return &GetGroupMemberInfosRsp{
		GroupMemberInfos: groupMemberInfos,
	}, nil
}

// ChangeGroupMemberInfo 修改群成员信息
func (s *Service) ChangeGroupMemberInfo(req *ChangeGroupMemberInfoReq) (*ChangeGroupMemberInfoRsp, error) {
	// 判断是否是群成员
	if _, err := s.isGroupMember(req.UserID, req.GroupID); err != nil {
		return nil, err
	}

	// 修改的项
	var (
		column string
		value  any
	)
	if req.Action.GroupNickName != nil {
		groupNickName := *req.Action.GroupNickName
		if len(groupNickName) > 20 {
			return nil, common.ErrCodeInvalidParameter
		}
		column = "group_nick_name"
		value = groupNickName
	} else if req.Action.IsDisturb != nil {
		column = "is_disturb"
		value = *req.Action.IsDisturb
	} else if req.Action.IsTop != nil {
		column = "is_top"
		value = *req.Action.IsTop
	} else if req.Action.IsShowNickName != nil {
		column = "is_show_nick_name"
		value = *req.Action.IsShowNickName
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 修改
	if err := s.db.Model(model.GroupMember{}).Where("member_id = ? and group_id = ?", req.UserID, req.GroupID).
		Update(column, value).Error; err != nil {
		return nil, err
	}

	// 发送群成员信息修改事件消息
	if column == "group_nick_name" {
		if err := s.sendGroupMemberInfoChangeEventMsgToAllGroupMembers(req.GroupID); err != nil {
			return nil, err
		}
	} else {
		if err := s.sendGroupMemberInfoChangeEventMsg([]uint64{req.UserID}, req.GroupID); err != nil {
			return nil, err
		}
	}

	// 获取新的群成员信息
	getGroupMemberInfoRsp, err := s.GetGroupMemberInfo(&GetGroupMemberInfoReq{
		MemberID: req.UserID,
		GroupID:  req.GroupID,
	})
	if err != nil {
		return nil, err
	}
	groupMemberInfo := getGroupMemberInfoRsp.GroupMemberInfo
	return &ChangeGroupMemberInfoRsp{
		GroupMemberInfo: groupMemberInfo,
	}, nil
}

// 装配群成员信息
func (s *Service) assembleGroupMemberInfo(groupMember *model.GroupMember) *GroupMemberInfo {
	return &GroupMemberInfo{
		GroupID:        groupMember.GroupID,
		MemberID:       groupMember.MemberID,
		Role:           GroupMemberRole(groupMember.Role),
		GroupNickName:  groupMember.GroupNickName,
		IsDisturb:      groupMember.IsDisturb,
		IsTop:          groupMember.IsTop,
		IsShowNickName: groupMember.IsShowNickName,
		JoinTime:       groupMember.JoinTime,
	}
}

// 获取全部群成员编号
func (s *Service) getAllGroupMemberIDS(groupID uint64) ([]uint64, error) {
	var memberIDS []uint64
	if err := s.db.Model(model.GroupMember{}).Where("group_id = ?", groupID).
		Select("member_id").Find(&memberIDS).Error; err != nil {
		return nil, err
	}
	return memberIDS, nil
}

// 发送群成员信息改变事件消息给所有群成员
func (s *Service) sendGroupMemberInfoChangeEventMsgToAllGroupMembers(groupID uint64) error {
	memberIDS, err := s.getAllGroupMemberIDS(groupID)
	if err != nil {
		return err
	}
	return s.sendGroupMemberInfoChangeEventMsg(memberIDS, groupID)
}

// 发送群成员信息改变事件消息
func (s *Service) sendGroupMemberInfoChangeEventMsg(userIDS []uint64, groupID uint64) error {
	_, err := s.senderService.SendEventMsg(&sender.SendEventMsgReq{
		UserIDS: userIDS,
		EventMsg: &msg.EventMsg{
			GroupMemberInfoChange: &msg.GroupMemberInfoChangeEventMsg{
				GroupID: groupID,
			},
		},
	})
	return err
}

// 判断是否是群成员
func (s *Service) isGroupMember(userID, groupID uint64) (*GroupInfo, error) {
	// 获取群信息
	getGroupInfoRsp, err := s.GetGroupInfo(&GetGroupInfoReq{
		UserID:  userID,
		GroupID: groupID,
	})
	if err != nil {
		return nil, err
	}
	groupInfo := getGroupInfoRsp.GroupInfo

	// 判断用户是否属于该群的
	if groupInfo.GroupMemberInfo == nil {
		return nil, ErrCodeInvalidParameterNotGroupMember
	}
	return groupInfo, err
}
