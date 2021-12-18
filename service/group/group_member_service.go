package group

import (
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/service/group/model"
	"github.com/jiaxwu/him/service/msg"
	"github.com/jiaxwu/him/service/msg/sender"
	"gorm.io/gorm"
)

// GetGroupMemberInfos 获取群成员信息
func (s *Service) GetGroupMemberInfos(req *GetGroupMemberInfosReq) (*GetGroupMemberInfosRsp, error) {
	// 判断是否是群成员
	groupInfo, err := s.isGroupMember(req.UserID, req.GroupID)
	if err != nil {
		return nil, err
	}

	// 构造查询条件
	var query *gorm.DB
	if req.Condition.All {
		query = s.db.Where("group_id = ?", req.GroupID)
	} else if req.Condition.MemberID != 0 {
		query = s.db.Where("group_id = ? and member_id = ?", req.Condition.MemberID, req.GroupID)
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 获取群成员信息
	groupMembers := make([]*model.GroupMember, 0, groupInfo.Members)
	if err := query.Find(&groupMembers).Error; err != nil {
		return nil, err
	}

	// 装配
	groupMemberInfos := make([]*GroupMemberInfo, 0, len(groupMembers))
	for _, groupMember := range groupMembers {
		groupMemberInfos = append(groupMemberInfos, &GroupMemberInfo{
			GroupID:        groupMember.GroupID,
			MemberID:       groupMember.MemberID,
			Role:           GroupMemberRole(groupMember.Role),
			GroupNickName:  groupMember.GroupNickName,
			IsDisturb:      groupMember.IsDisturb,
			IsTop:          groupMember.IsTop,
			IsShowNickName: groupMember.IsShowNickName,
			JoinTime:       groupMember.JoinTime,
		})
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
	getGroupMemberInfosRsp, err := s.GetGroupMemberInfos(&GetGroupMemberInfosReq{
		UserID:  req.UserID,
		GroupID: req.GroupID,
		Condition: GetGroupMemberInfosCondition{
			MemberID: req.UserID,
		},
	})
	if err != nil {
		return nil, err
	}
	groupMemberInfos := getGroupMemberInfosRsp.GroupMemberInfos
	if len(groupMemberInfos) == 0 {
		return nil, ErrCodeInvalidParameterGroupMemberNotExists
	}
	return &ChangeGroupMemberInfoRsp{
		GroupMemberInfo: groupMemberInfos[0],
	}, nil
}

// 发送群成员信息改变事件消息给所有群成员
func (s *Service) sendGroupMemberInfoChangeEventMsgToAllGroupMembers(groupID uint64) error {
	var memberIDS []uint64
	if err := s.db.Model(model.GroupMember{}).Where("group_id = ?", groupID).
		Select("member_id").Find(&memberIDS).Error; err != nil {
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
	// 判断用户是否属于该群的
	getGroupInfosRsp, err := s.GetGroupInfos(&GetGroupInfosReq{
		UserID: userID,
		Condition: GetGroupInfosCondition{
			GroupID: groupID,
		},
	})
	if err != nil {
		return nil, err
	}
	groupInfos := getGroupInfosRsp.GroupInfos
	if len(groupInfos) == 0 {
		return nil, ErrCodeInvalidParameterMustBeMember
	}
	return groupInfos[0], err
}
