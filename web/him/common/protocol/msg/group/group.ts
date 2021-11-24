/* eslint-disable */
import { messageTypeRegistry } from "../../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "message";

/** 群成员角色 */
export enum GroupMemberRole {
  /** GroupMemberRoleUnKnown - 未知 */
  GroupMemberRoleUnKnown = 0,
  /** GroupMemberRoleMember - 成员 */
  GroupMemberRoleMember = 1,
  /** GroupMemberRoleManager - 管理员 */
  GroupMemberRoleManager = 2,
  /** GroupMemberRoleLeader - 群主 */
  GroupMemberRoleLeader = 3,
  UNRECOGNIZED = -1,
}

export function groupMemberRoleFromJSON(object: any): GroupMemberRole {
  switch (object) {
    case 0:
    case "GroupMemberRoleUnKnown":
      return GroupMemberRole.GroupMemberRoleUnKnown;
    case 1:
    case "GroupMemberRoleMember":
      return GroupMemberRole.GroupMemberRoleMember;
    case 2:
    case "GroupMemberRoleManager":
      return GroupMemberRole.GroupMemberRoleManager;
    case 3:
    case "GroupMemberRoleLeader":
      return GroupMemberRole.GroupMemberRoleLeader;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GroupMemberRole.UNRECOGNIZED;
  }
}

export function groupMemberRoleToJSON(object: GroupMemberRole): string {
  switch (object) {
    case GroupMemberRole.GroupMemberRoleUnKnown:
      return "GroupMemberRoleUnKnown";
    case GroupMemberRole.GroupMemberRoleMember:
      return "GroupMemberRoleMember";
    case GroupMemberRole.GroupMemberRoleManager:
      return "GroupMemberRoleManager";
    case GroupMemberRole.GroupMemberRoleLeader:
      return "GroupMemberRoleLeader";
    default:
      return "UNKNOWN";
  }
}

/** 群成员范围 */
export enum GroupMemberRange {
  /** GroupMemberRangeAll - 全部 */
  GroupMemberRangeAll = 0,
  /** GroupMemberRangeMember - 成员 */
  GroupMemberRangeMember = 1,
  /** GroupMemberRangeManager - 管理员 */
  GroupMemberRangeManager = 2,
  /** GroupMemberRangeLeader - 群主 */
  GroupMemberRangeLeader = 3,
  UNRECOGNIZED = -1,
}

export function groupMemberRangeFromJSON(object: any): GroupMemberRange {
  switch (object) {
    case 0:
    case "GroupMemberRangeAll":
      return GroupMemberRange.GroupMemberRangeAll;
    case 1:
    case "GroupMemberRangeMember":
      return GroupMemberRange.GroupMemberRangeMember;
    case 2:
    case "GroupMemberRangeManager":
      return GroupMemberRange.GroupMemberRangeManager;
    case 3:
    case "GroupMemberRangeLeader":
      return GroupMemberRange.GroupMemberRangeLeader;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GroupMemberRange.UNRECOGNIZED;
  }
}

export function groupMemberRangeToJSON(object: GroupMemberRange): string {
  switch (object) {
    case GroupMemberRange.GroupMemberRangeAll:
      return "GroupMemberRangeAll";
    case GroupMemberRange.GroupMemberRangeMember:
      return "GroupMemberRangeMember";
    case GroupMemberRange.GroupMemberRangeManager:
      return "GroupMemberRangeManager";
    case GroupMemberRange.GroupMemberRangeLeader:
      return "GroupMemberRangeLeader";
    default:
      return "UNKNOWN";
  }
}

/** 入群事件类型 */
export enum JoinGroupEventType {
  /** JoinGroupEventTypeUnknown - 未知 */
  JoinGroupEventTypeUnknown = 0,
  /** JoinGroupEventTypeApplication - 申请 */
  JoinGroupEventTypeApplication = 1,
  /** JoinGroupEventTypeInvite - 邀请 */
  JoinGroupEventTypeInvite = 2,
  UNRECOGNIZED = -1,
}

export function joinGroupEventTypeFromJSON(object: any): JoinGroupEventType {
  switch (object) {
    case 0:
    case "JoinGroupEventTypeUnknown":
      return JoinGroupEventType.JoinGroupEventTypeUnknown;
    case 1:
    case "JoinGroupEventTypeApplication":
      return JoinGroupEventType.JoinGroupEventTypeApplication;
    case 2:
    case "JoinGroupEventTypeInvite":
      return JoinGroupEventType.JoinGroupEventTypeInvite;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinGroupEventType.UNRECOGNIZED;
  }
}

export function joinGroupEventTypeToJSON(object: JoinGroupEventType): string {
  switch (object) {
    case JoinGroupEventType.JoinGroupEventTypeUnknown:
      return "JoinGroupEventTypeUnknown";
    case JoinGroupEventType.JoinGroupEventTypeApplication:
      return "JoinGroupEventTypeApplication";
    case JoinGroupEventType.JoinGroupEventTypeInvite:
      return "JoinGroupEventTypeInvite";
    default:
      return "UNKNOWN";
  }
}

/** 入群申请状态 */
export enum JoinGroupApplicationStatus {
  /** JoinGroupApplicationStatusUnknown - 未知 */
  JoinGroupApplicationStatusUnknown = 0,
  /** JoinGroupApplicationStatusWaitConfirm - 等待确认 */
  JoinGroupApplicationStatusWaitConfirm = 1,
  /** JoinGroupApplicationStatusReject - 拒绝 */
  JoinGroupApplicationStatusReject = 2,
  /** JoinGroupApplicationStatusAccept - 接受 */
  JoinGroupApplicationStatusAccept = 3,
  /** JoinGroupApplicationStatusExpire - 过期 */
  JoinGroupApplicationStatusExpire = 4,
  UNRECOGNIZED = -1,
}

export function joinGroupApplicationStatusFromJSON(
  object: any
): JoinGroupApplicationStatus {
  switch (object) {
    case 0:
    case "JoinGroupApplicationStatusUnknown":
      return JoinGroupApplicationStatus.JoinGroupApplicationStatusUnknown;
    case 1:
    case "JoinGroupApplicationStatusWaitConfirm":
      return JoinGroupApplicationStatus.JoinGroupApplicationStatusWaitConfirm;
    case 2:
    case "JoinGroupApplicationStatusReject":
      return JoinGroupApplicationStatus.JoinGroupApplicationStatusReject;
    case 3:
    case "JoinGroupApplicationStatusAccept":
      return JoinGroupApplicationStatus.JoinGroupApplicationStatusAccept;
    case 4:
    case "JoinGroupApplicationStatusExpire":
      return JoinGroupApplicationStatus.JoinGroupApplicationStatusExpire;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinGroupApplicationStatus.UNRECOGNIZED;
  }
}

export function joinGroupApplicationStatusToJSON(
  object: JoinGroupApplicationStatus
): string {
  switch (object) {
    case JoinGroupApplicationStatus.JoinGroupApplicationStatusUnknown:
      return "JoinGroupApplicationStatusUnknown";
    case JoinGroupApplicationStatus.JoinGroupApplicationStatusWaitConfirm:
      return "JoinGroupApplicationStatusWaitConfirm";
    case JoinGroupApplicationStatus.JoinGroupApplicationStatusReject:
      return "JoinGroupApplicationStatusReject";
    case JoinGroupApplicationStatus.JoinGroupApplicationStatusAccept:
      return "JoinGroupApplicationStatusAccept";
    case JoinGroupApplicationStatus.JoinGroupApplicationStatusExpire:
      return "JoinGroupApplicationStatusExpire";
    default:
      return "UNKNOWN";
  }
}

/** 入群邀请状态 */
export enum JoinGroupInviteStatus {
  /** JoinGroupInviteStatusUnknown - 未知 */
  JoinGroupInviteStatusUnknown = 0,
  /** JoinGroupInviteStatusWaitManagerConfirm - 等待管理员确认 */
  JoinGroupInviteStatusWaitManagerConfirm = 1,
  /** JoinGroupInviteStatusWaitInviteeConfirm - 等待被邀请人确认 */
  JoinGroupInviteStatusWaitInviteeConfirm = 2,
  /** JoinGroupInviteStatusInviteeAccept - 被邀请人接受 */
  JoinGroupInviteStatusInviteeAccept = 3,
  /** JoinGroupInviteStatusManagerReject - 管理员拒绝 */
  JoinGroupInviteStatusManagerReject = 4,
  /** JoinGroupInviteStatusInviteeReject - 被邀请人拒绝 */
  JoinGroupInviteStatusInviteeReject = 5,
  /** JoinGroupInviteStatusExpire - 过期 */
  JoinGroupInviteStatusExpire = 6,
  UNRECOGNIZED = -1,
}

export function joinGroupInviteStatusFromJSON(
  object: any
): JoinGroupInviteStatus {
  switch (object) {
    case 0:
    case "JoinGroupInviteStatusUnknown":
      return JoinGroupInviteStatus.JoinGroupInviteStatusUnknown;
    case 1:
    case "JoinGroupInviteStatusWaitManagerConfirm":
      return JoinGroupInviteStatus.JoinGroupInviteStatusWaitManagerConfirm;
    case 2:
    case "JoinGroupInviteStatusWaitInviteeConfirm":
      return JoinGroupInviteStatus.JoinGroupInviteStatusWaitInviteeConfirm;
    case 3:
    case "JoinGroupInviteStatusInviteeAccept":
      return JoinGroupInviteStatus.JoinGroupInviteStatusInviteeAccept;
    case 4:
    case "JoinGroupInviteStatusManagerReject":
      return JoinGroupInviteStatus.JoinGroupInviteStatusManagerReject;
    case 5:
    case "JoinGroupInviteStatusInviteeReject":
      return JoinGroupInviteStatus.JoinGroupInviteStatusInviteeReject;
    case 6:
    case "JoinGroupInviteStatusExpire":
      return JoinGroupInviteStatus.JoinGroupInviteStatusExpire;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JoinGroupInviteStatus.UNRECOGNIZED;
  }
}

export function joinGroupInviteStatusToJSON(
  object: JoinGroupInviteStatus
): string {
  switch (object) {
    case JoinGroupInviteStatus.JoinGroupInviteStatusUnknown:
      return "JoinGroupInviteStatusUnknown";
    case JoinGroupInviteStatus.JoinGroupInviteStatusWaitManagerConfirm:
      return "JoinGroupInviteStatusWaitManagerConfirm";
    case JoinGroupInviteStatus.JoinGroupInviteStatusWaitInviteeConfirm:
      return "JoinGroupInviteStatusWaitInviteeConfirm";
    case JoinGroupInviteStatus.JoinGroupInviteStatusInviteeAccept:
      return "JoinGroupInviteStatusInviteeAccept";
    case JoinGroupInviteStatus.JoinGroupInviteStatusManagerReject:
      return "JoinGroupInviteStatusManagerReject";
    case JoinGroupInviteStatus.JoinGroupInviteStatusInviteeReject:
      return "JoinGroupInviteStatusInviteeReject";
    case JoinGroupInviteStatus.JoinGroupInviteStatusExpire:
      return "JoinGroupInviteStatusExpire";
    default:
      return "UNKNOWN";
  }
}

/** 群信息 */
export interface GroupInfo {
  $type: "message.GroupInfo";
  /** 群编号 */
  GroupID: Long;
  /** 群名 */
  Name: string;
  /** 图标 */
  Icon: string;
  /** 成员数 */
  Members: number;
  /** 群公告 */
  Notice: string;
}

/** 更新群名请求 */
export interface UpdateGroupNameReq {
  $type: "message.UpdateGroupNameReq";
  /** 群编号 */
  GroupID: Long;
  /** 群名 */
  Name: string;
}

/** 更新群名响应 */
export interface UpdateGroupNameRsp {
  $type: "message.UpdateGroupNameRsp";
}

/** 更新群图标请求 */
export interface UpdateGroupIconReq {
  $type: "message.UpdateGroupIconReq";
  /** 群编号 */
  GroupID: Long;
  /** 图标 */
  Icon: string;
}

/** 更新群图标响应 */
export interface UpdateGroupIconRsp {
  $type: "message.UpdateGroupIconRsp";
}

/** 更新群公告请求 */
export interface UpdateGroupNoticeReq {
  $type: "message.UpdateGroupNoticeReq";
  /** 群编号 */
  GroupID: Long;
  /** 操作者编号 */
  OperatorID: Long;
  /** 群公告 */
  Notice: string;
}

/** 更新群公告响应 */
export interface UpdateGroupNoticeRsp {
  $type: "message.UpdateGroupNoticeRsp";
}

/** 获取群信息请求 */
export interface GetGroupInfoReq {
  $type: "message.GetGroupInfoReq";
  /** 群编号 */
  GroupID: Long;
}

/** 获取群信息响应 */
export interface GetGroupInfoRsp {
  $type: "message.GetGroupInfoRsp";
  /** 群信息 */
  GroupInfo: GroupInfo | undefined;
}

/** 创建群请求 */
export interface CreateGroupReq {
  $type: "message.CreateGroupReq";
  /** 群名 */
  Name: string;
  /** 图标 */
  Icon: string;
  /** 初始成员编号列表 */
  MemberIDS: Long[];
}

/** 创建群响应 */
export interface CreateGroupRsp {
  $type: "message.CreateGroupRsp";
  /** 群编号 */
  GroupID: Long;
}

/** 踢出群成员请求 */
export interface KickGroupMemberReq {
  $type: "message.KickGroupMemberReq";
  /** 群编号 */
  GroupID: Long;
  /** 操作者编号 */
  OperatorID: Long;
  /** 群成员编号列表 */
  GroupMemberIDS: Long[];
}

/** 踢出群成员响应 */
export interface KickGroupMemberRsp {
  $type: "message.KickGroupMemberRsp";
}

/** 转让群主请求 */
export interface TransferGroupLeaderReq {
  $type: "message.TransferGroupLeaderReq";
  /** 群编号 */
  GroupID: Long;
  /** 新群主编号 */
  NewLeaderID: Long;
}

/** 转让群主响应 */
export interface TransferGroupLeaderRsp {
  $type: "message.TransferGroupLeaderRsp";
}

/** 退群请求 */
export interface QuitGroupReq {
  $type: "message.QuitGroupReq";
  /** 群编号 */
  GroupID: Long;
  /** 成员编号 */
  MemberID: Long;
}

/** 退群响应 */
export interface QuitGroupRsp {
  $type: "message.QuitGroupRsp";
}

/** 群成员信息 */
export interface GroupMemberInfo {
  $type: "message.GroupMemberInfo";
  /** 群编号 */
  GroupID: Long;
  /** 成员编号 */
  MemberID: Long;
  /** 角色 */
  Role: GroupMemberRole;
  /** 群昵称 */
  GroupNickName: string;
  /** 是否免打扰 */
  IsDisturb: boolean;
  /** 是否置顶 */
  IsTop: boolean;
  /** 是显示群成员昵称 */
  IsShowNickName: boolean;
  /** 入群时间 */
  JoinTime: Long;
}

/** 获取群成员信息请求 */
export interface GetGroupMemberInfosReq {
  $type: "message.GetGroupMemberInfosReq";
  /** 群编号 */
  GroupID: Long;
  /** 范围 */
  Range: GroupMemberRange;
}

/** 获取群成员信息响应 */
export interface GetGroupMemberInfosRsp {
  $type: "message.GetGroupMemberInfosRsp";
  /** 群成员信息列表 */
  GroupMemberInfos: GroupMemberInfo[];
}

/** 入群申请请求（用于扫码入群） */
export interface JoinGroupApplicationReq {
  $type: "message.JoinGroupApplicationReq";
  /** 群编号 */
  GroupID: Long;
  /** 入群用户编号 */
  JoinGroupUserID: Long;
  /** 入群用户消息 */
  JoinGroupUserMsg: string;
}

/** 入群申请响应 */
export interface JoinGroupApplicationRsp {
  $type: "message.JoinGroupApplicationRsp";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
}

/** 入群事件 */
export interface JoinGroupEvent {
  $type: "message.JoinGroupEvent";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
  /** 群编号 */
  GroupID: Long;
  /** 入群用户编号 */
  JoinGroupUserID: Long;
  /** 邀请者编号 */
  InviterID: Long;
  /** 入群事件类型 */
  Type: JoinGroupEventType;
  /** 入群用户消息 */
  JoinGroupUserMsg: string;
  /** 管理员消息 */
  ManagerMsg: string;
  /** 入群申请状态 */
  ApplicationStatus: JoinGroupApplicationStatus;
  /** 入群邀请状态 */
  InviteStatus: JoinGroupInviteStatus;
  /** 创建时间 */
  CreatedAt: Long;
  /** 更新时间 */
  UpdatedAt: Long;
}

/** 更新入群事件入群用户消息请求 */
export interface UpdateJoinGroupEventJoinGroupUserMsgReq {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgReq";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
  /** 入群用户消息 */
  JoinGroupUserMsg: string;
}

/** 更新入群事件入群用户消息响应 */
export interface UpdateJoinGroupEventJoinGroupUserMsgRsp {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgRsp";
}

/** 更新入群事件管理员消息请求 */
export interface UpdateJoinGroupEventManagerMsgReq {
  $type: "message.UpdateJoinGroupEventManagerMsgReq";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
  /** 管理员消息 */
  ManagerMsg: string;
}

/** 更新入群事件管理员消息响应 */
export interface UpdateJoinGroupEventManagerMsgRsp {
  $type: "message.UpdateJoinGroupEventManagerMsgRsp";
}

/** 获取入群事件请求 */
export interface GetJoinGroupEventsReq {
  $type: "message.GetJoinGroupEventsReq";
  /** 群编号 */
  GroupID: Long;
  /** 最后一个入群事件编号，分页 */
  LastJoinGroupEventID: Long;
  /** 获取多少个 */
  Size: number;
}

/** 获取入群事件响应 */
export interface GetJoinGroupEventsRsp {
  $type: "message.GetJoinGroupEventsRsp";
  /** 入群事件列表 */
  JoinGroupEvents: JoinGroupEvent[];
}

/** 邀请入群请求 */
export interface InviteJoinGroupReq {
  $type: "message.InviteJoinGroupReq";
  /** 群编号 */
  GroupID: Long;
  /** 邀请者编号 */
  InviterID: Long;
  /** 被邀请人编号列表 */
  InviteeIDS: Long[];
}

/** 邀请入群响应 */
export interface InviteJoinGroupRsp {
  $type: "message.InviteJoinGroupRsp";
}

/** 接受入群申请请求 */
export interface AcceptJoinGroupApplicationReq {
  $type: "message.AcceptJoinGroupApplicationReq";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
}

/** 接受入群申请响应 */
export interface AcceptJoinGroupApplicationRsp {
  $type: "message.AcceptJoinGroupApplicationRsp";
}

/** 拒绝入群申请请求 */
export interface RejectJoinGroupApplicationReq {
  $type: "message.RejectJoinGroupApplicationReq";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
}

/** 拒绝入群申请响应 */
export interface RejectJoinGroupApplicationRsp {
  $type: "message.RejectJoinGroupApplicationRsp";
}

/**
 * @存储模型
 * 群
 */
export interface GroupStore {
  $type: "message.GroupStore";
  /** 群编号 */
  GroupID: Long;
  /** 群名 */
  Name: string;
  /** 图标 */
  Icon: string;
  /** 成员数 */
  Members: number;
  /** 群公告 */
  Notice: string;
  /** 是否接受入群申请（默认不需要申请直接入群） */
  IsJoinApplication: boolean;
  /** 是否邀请入群需要管理员或群主确认（默认不需要确认直接入群） */
  IsInviteJoinGroupNeedConfirm: boolean;
  /** 建立时间 */
  CreatedAt: Long;
  /** 修改时间 */
  UpdatedAt: Long;
}

/**
 * @存储模型
 * 入群事件
 * 这里在检索的时候根据JoinGroupUserID查询自己的所有申请和邀请
 * 根据GroupID查询群的所有申请和邀请
 * 还可以根据事件类型区分申请和邀请
 */
export interface JoinGroupEventStore {
  $type: "message.JoinGroupEventStore";
  /** 入群事件 */
  JoinGroupEvent: JoinGroupEvent | undefined;
}

/**
 * @存储模型
 * 群成员
 */
export interface GroupMemberStore {
  $type: "message.GroupMemberStore";
  /** 群编号 */
  GroupID: Long;
  /** 成员编号 */
  MemberID: Long;
  /** 角色 */
  Role: GroupMemberRole;
  /** 群昵称 */
  GroupNickName: string;
  /** 是否免打扰 */
  IsDisturb: boolean;
  /** 是否置顶 */
  IsTop: boolean;
  /** 是显示群成员昵称 */
  IsShowNickName: boolean;
  /** 入群时间 */
  JoinTime: Long;
  /** 修改时间 */
  UpdatedAt: Long;
}

const baseGroupInfo: object = {
  $type: "message.GroupInfo",
  GroupID: Long.UZERO,
  Name: "",
  Icon: "",
  Members: 0,
  Notice: "",
};

export const GroupInfo = {
  $type: "message.GroupInfo" as const,

  encode(
    message: GroupInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Icon !== "") {
      writer.uint32(26).string(message.Icon);
    }
    if (message.Members !== 0) {
      writer.uint32(32).uint32(message.Members);
    }
    if (message.Notice !== "") {
      writer.uint32(42).string(message.Notice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupInfo } as GroupInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Icon = reader.string();
          break;
        case 4:
          message.Members = reader.uint32();
          break;
        case 5:
          message.Notice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.Name =
      object.Name !== undefined && object.Name !== null
        ? String(object.Name)
        : "";
    message.Icon =
      object.Icon !== undefined && object.Icon !== null
        ? String(object.Icon)
        : "";
    message.Members =
      object.Members !== undefined && object.Members !== null
        ? Number(object.Members)
        : 0;
    message.Notice =
      object.Notice !== undefined && object.Notice !== null
        ? String(object.Notice)
        : "";
    return message;
  },

  toJSON(message: GroupInfo): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.Name !== undefined && (obj.Name = message.Name);
    message.Icon !== undefined && (obj.Icon = message.Icon);
    message.Members !== undefined && (obj.Members = message.Members);
    message.Notice !== undefined && (obj.Notice = message.Notice);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupInfo>): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    message.Name = object.Name ?? "";
    message.Icon = object.Icon ?? "";
    message.Members = object.Members ?? 0;
    message.Notice = object.Notice ?? "";
    return message;
  },
};

messageTypeRegistry.set(GroupInfo.$type, GroupInfo);

const baseUpdateGroupNameReq: object = {
  $type: "message.UpdateGroupNameReq",
  GroupID: Long.UZERO,
  Name: "",
};

export const UpdateGroupNameReq = {
  $type: "message.UpdateGroupNameReq" as const,

  encode(
    message: UpdateGroupNameReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupNameReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupNameReq } as UpdateGroupNameReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.Name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupNameReq {
    const message = { ...baseUpdateGroupNameReq } as UpdateGroupNameReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.Name =
      object.Name !== undefined && object.Name !== null
        ? String(object.Name)
        : "";
    return message;
  },

  toJSON(message: UpdateGroupNameReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.Name !== undefined && (obj.Name = message.Name);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateGroupNameReq>): UpdateGroupNameReq {
    const message = { ...baseUpdateGroupNameReq } as UpdateGroupNameReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    message.Name = object.Name ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupNameReq.$type, UpdateGroupNameReq);

const baseUpdateGroupNameRsp: object = { $type: "message.UpdateGroupNameRsp" };

export const UpdateGroupNameRsp = {
  $type: "message.UpdateGroupNameRsp" as const,

  encode(
    _: UpdateGroupNameRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupNameRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupNameRsp } as UpdateGroupNameRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateGroupNameRsp {
    const message = { ...baseUpdateGroupNameRsp } as UpdateGroupNameRsp;
    return message;
  },

  toJSON(_: UpdateGroupNameRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<UpdateGroupNameRsp>): UpdateGroupNameRsp {
    const message = { ...baseUpdateGroupNameRsp } as UpdateGroupNameRsp;
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupNameRsp.$type, UpdateGroupNameRsp);

const baseUpdateGroupIconReq: object = {
  $type: "message.UpdateGroupIconReq",
  GroupID: Long.UZERO,
  Icon: "",
};

export const UpdateGroupIconReq = {
  $type: "message.UpdateGroupIconReq" as const,

  encode(
    message: UpdateGroupIconReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (message.Icon !== "") {
      writer.uint32(18).string(message.Icon);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupIconReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupIconReq } as UpdateGroupIconReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.Icon = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupIconReq {
    const message = { ...baseUpdateGroupIconReq } as UpdateGroupIconReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.Icon =
      object.Icon !== undefined && object.Icon !== null
        ? String(object.Icon)
        : "";
    return message;
  },

  toJSON(message: UpdateGroupIconReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.Icon !== undefined && (obj.Icon = message.Icon);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateGroupIconReq>): UpdateGroupIconReq {
    const message = { ...baseUpdateGroupIconReq } as UpdateGroupIconReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    message.Icon = object.Icon ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupIconReq.$type, UpdateGroupIconReq);

const baseUpdateGroupIconRsp: object = { $type: "message.UpdateGroupIconRsp" };

export const UpdateGroupIconRsp = {
  $type: "message.UpdateGroupIconRsp" as const,

  encode(
    _: UpdateGroupIconRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupIconRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupIconRsp } as UpdateGroupIconRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateGroupIconRsp {
    const message = { ...baseUpdateGroupIconRsp } as UpdateGroupIconRsp;
    return message;
  },

  toJSON(_: UpdateGroupIconRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<UpdateGroupIconRsp>): UpdateGroupIconRsp {
    const message = { ...baseUpdateGroupIconRsp } as UpdateGroupIconRsp;
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupIconRsp.$type, UpdateGroupIconRsp);

const baseUpdateGroupNoticeReq: object = {
  $type: "message.UpdateGroupNoticeReq",
  GroupID: Long.UZERO,
  OperatorID: Long.UZERO,
  Notice: "",
};

export const UpdateGroupNoticeReq = {
  $type: "message.UpdateGroupNoticeReq" as const,

  encode(
    message: UpdateGroupNoticeReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.OperatorID.isZero()) {
      writer.uint32(16).uint64(message.OperatorID);
    }
    if (message.Notice !== "") {
      writer.uint32(26).string(message.Notice);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateGroupNoticeReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupNoticeReq } as UpdateGroupNoticeReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.OperatorID = reader.uint64() as Long;
          break;
        case 3:
          message.Notice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupNoticeReq {
    const message = { ...baseUpdateGroupNoticeReq } as UpdateGroupNoticeReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.OperatorID =
      object.OperatorID !== undefined && object.OperatorID !== null
        ? Long.fromString(object.OperatorID)
        : Long.UZERO;
    message.Notice =
      object.Notice !== undefined && object.Notice !== null
        ? String(object.Notice)
        : "";
    return message;
  },

  toJSON(message: UpdateGroupNoticeReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.OperatorID !== undefined &&
      (obj.OperatorID = (message.OperatorID || Long.UZERO).toString());
    message.Notice !== undefined && (obj.Notice = message.Notice);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateGroupNoticeReq>): UpdateGroupNoticeReq {
    const message = { ...baseUpdateGroupNoticeReq } as UpdateGroupNoticeReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.OperatorID !== undefined && object.OperatorID !== null) {
      message.OperatorID = object.OperatorID as Long;
    } else {
      message.OperatorID = Long.UZERO;
    }
    message.Notice = object.Notice ?? "";
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupNoticeReq.$type, UpdateGroupNoticeReq);

const baseUpdateGroupNoticeRsp: object = {
  $type: "message.UpdateGroupNoticeRsp",
};

export const UpdateGroupNoticeRsp = {
  $type: "message.UpdateGroupNoticeRsp" as const,

  encode(
    _: UpdateGroupNoticeRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateGroupNoticeRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateGroupNoticeRsp } as UpdateGroupNoticeRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateGroupNoticeRsp {
    const message = { ...baseUpdateGroupNoticeRsp } as UpdateGroupNoticeRsp;
    return message;
  },

  toJSON(_: UpdateGroupNoticeRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<UpdateGroupNoticeRsp>): UpdateGroupNoticeRsp {
    const message = { ...baseUpdateGroupNoticeRsp } as UpdateGroupNoticeRsp;
    return message;
  },
};

messageTypeRegistry.set(UpdateGroupNoticeRsp.$type, UpdateGroupNoticeRsp);

const baseGetGroupInfoReq: object = {
  $type: "message.GetGroupInfoReq",
  GroupID: Long.UZERO,
};

export const GetGroupInfoReq = {
  $type: "message.GetGroupInfoReq" as const,

  encode(
    message: GetGroupInfoReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGroupInfoReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetGroupInfoReq } as GetGroupInfoReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupInfoReq {
    const message = { ...baseGetGroupInfoReq } as GetGroupInfoReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GetGroupInfoReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetGroupInfoReq>): GetGroupInfoReq {
    const message = { ...baseGetGroupInfoReq } as GetGroupInfoReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GetGroupInfoReq.$type, GetGroupInfoReq);

const baseGetGroupInfoRsp: object = { $type: "message.GetGroupInfoRsp" };

export const GetGroupInfoRsp = {
  $type: "message.GetGroupInfoRsp" as const,

  encode(
    message: GetGroupInfoRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.GroupInfo !== undefined) {
      GroupInfo.encode(message.GroupInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGroupInfoRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetGroupInfoRsp } as GetGroupInfoRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupInfo = GroupInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupInfoRsp {
    const message = { ...baseGetGroupInfoRsp } as GetGroupInfoRsp;
    message.GroupInfo =
      object.GroupInfo !== undefined && object.GroupInfo !== null
        ? GroupInfo.fromJSON(object.GroupInfo)
        : undefined;
    return message;
  },

  toJSON(message: GetGroupInfoRsp): unknown {
    const obj: any = {};
    message.GroupInfo !== undefined &&
      (obj.GroupInfo = message.GroupInfo
        ? GroupInfo.toJSON(message.GroupInfo)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetGroupInfoRsp>): GetGroupInfoRsp {
    const message = { ...baseGetGroupInfoRsp } as GetGroupInfoRsp;
    message.GroupInfo =
      object.GroupInfo !== undefined && object.GroupInfo !== null
        ? GroupInfo.fromPartial(object.GroupInfo)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetGroupInfoRsp.$type, GetGroupInfoRsp);

const baseCreateGroupReq: object = {
  $type: "message.CreateGroupReq",
  Name: "",
  Icon: "",
  MemberIDS: Long.UZERO,
};

export const CreateGroupReq = {
  $type: "message.CreateGroupReq" as const,

  encode(
    message: CreateGroupReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Name !== "") {
      writer.uint32(10).string(message.Name);
    }
    if (message.Icon !== "") {
      writer.uint32(18).string(message.Icon);
    }
    writer.uint32(26).fork();
    for (const v of message.MemberIDS) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateGroupReq } as CreateGroupReq;
    message.MemberIDS = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Name = reader.string();
          break;
        case 2:
          message.Icon = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.MemberIDS.push(reader.uint64() as Long);
            }
          } else {
            message.MemberIDS.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateGroupReq {
    const message = { ...baseCreateGroupReq } as CreateGroupReq;
    message.Name =
      object.Name !== undefined && object.Name !== null
        ? String(object.Name)
        : "";
    message.Icon =
      object.Icon !== undefined && object.Icon !== null
        ? String(object.Icon)
        : "";
    message.MemberIDS = (object.MemberIDS ?? []).map((e: any) =>
      Long.fromString(e)
    );
    return message;
  },

  toJSON(message: CreateGroupReq): unknown {
    const obj: any = {};
    message.Name !== undefined && (obj.Name = message.Name);
    message.Icon !== undefined && (obj.Icon = message.Icon);
    if (message.MemberIDS) {
      obj.MemberIDS = message.MemberIDS.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.MemberIDS = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CreateGroupReq>): CreateGroupReq {
    const message = { ...baseCreateGroupReq } as CreateGroupReq;
    message.Name = object.Name ?? "";
    message.Icon = object.Icon ?? "";
    message.MemberIDS = (object.MemberIDS ?? []).map((e) => e);
    return message;
  },
};

messageTypeRegistry.set(CreateGroupReq.$type, CreateGroupReq);

const baseCreateGroupRsp: object = {
  $type: "message.CreateGroupRsp",
  GroupID: Long.UZERO,
};

export const CreateGroupRsp = {
  $type: "message.CreateGroupRsp" as const,

  encode(
    message: CreateGroupRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateGroupRsp } as CreateGroupRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateGroupRsp {
    const message = { ...baseCreateGroupRsp } as CreateGroupRsp;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: CreateGroupRsp): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<CreateGroupRsp>): CreateGroupRsp {
    const message = { ...baseCreateGroupRsp } as CreateGroupRsp;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(CreateGroupRsp.$type, CreateGroupRsp);

const baseKickGroupMemberReq: object = {
  $type: "message.KickGroupMemberReq",
  GroupID: Long.UZERO,
  OperatorID: Long.UZERO,
  GroupMemberIDS: Long.UZERO,
};

export const KickGroupMemberReq = {
  $type: "message.KickGroupMemberReq" as const,

  encode(
    message: KickGroupMemberReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.OperatorID.isZero()) {
      writer.uint32(16).uint64(message.OperatorID);
    }
    writer.uint32(26).fork();
    for (const v of message.GroupMemberIDS) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KickGroupMemberReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKickGroupMemberReq } as KickGroupMemberReq;
    message.GroupMemberIDS = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.OperatorID = reader.uint64() as Long;
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.GroupMemberIDS.push(reader.uint64() as Long);
            }
          } else {
            message.GroupMemberIDS.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KickGroupMemberReq {
    const message = { ...baseKickGroupMemberReq } as KickGroupMemberReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.OperatorID =
      object.OperatorID !== undefined && object.OperatorID !== null
        ? Long.fromString(object.OperatorID)
        : Long.UZERO;
    message.GroupMemberIDS = (object.GroupMemberIDS ?? []).map((e: any) =>
      Long.fromString(e)
    );
    return message;
  },

  toJSON(message: KickGroupMemberReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.OperatorID !== undefined &&
      (obj.OperatorID = (message.OperatorID || Long.UZERO).toString());
    if (message.GroupMemberIDS) {
      obj.GroupMemberIDS = message.GroupMemberIDS.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.GroupMemberIDS = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<KickGroupMemberReq>): KickGroupMemberReq {
    const message = { ...baseKickGroupMemberReq } as KickGroupMemberReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.OperatorID !== undefined && object.OperatorID !== null) {
      message.OperatorID = object.OperatorID as Long;
    } else {
      message.OperatorID = Long.UZERO;
    }
    message.GroupMemberIDS = (object.GroupMemberIDS ?? []).map((e) => e);
    return message;
  },
};

messageTypeRegistry.set(KickGroupMemberReq.$type, KickGroupMemberReq);

const baseKickGroupMemberRsp: object = { $type: "message.KickGroupMemberRsp" };

export const KickGroupMemberRsp = {
  $type: "message.KickGroupMemberRsp" as const,

  encode(
    _: KickGroupMemberRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KickGroupMemberRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKickGroupMemberRsp } as KickGroupMemberRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): KickGroupMemberRsp {
    const message = { ...baseKickGroupMemberRsp } as KickGroupMemberRsp;
    return message;
  },

  toJSON(_: KickGroupMemberRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<KickGroupMemberRsp>): KickGroupMemberRsp {
    const message = { ...baseKickGroupMemberRsp } as KickGroupMemberRsp;
    return message;
  },
};

messageTypeRegistry.set(KickGroupMemberRsp.$type, KickGroupMemberRsp);

const baseTransferGroupLeaderReq: object = {
  $type: "message.TransferGroupLeaderReq",
  GroupID: Long.UZERO,
  NewLeaderID: Long.UZERO,
};

export const TransferGroupLeaderReq = {
  $type: "message.TransferGroupLeaderReq" as const,

  encode(
    message: TransferGroupLeaderReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.NewLeaderID.isZero()) {
      writer.uint32(16).uint64(message.NewLeaderID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TransferGroupLeaderReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTransferGroupLeaderReq } as TransferGroupLeaderReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.NewLeaderID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransferGroupLeaderReq {
    const message = { ...baseTransferGroupLeaderReq } as TransferGroupLeaderReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.NewLeaderID =
      object.NewLeaderID !== undefined && object.NewLeaderID !== null
        ? Long.fromString(object.NewLeaderID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: TransferGroupLeaderReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.NewLeaderID !== undefined &&
      (obj.NewLeaderID = (message.NewLeaderID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<TransferGroupLeaderReq>
  ): TransferGroupLeaderReq {
    const message = { ...baseTransferGroupLeaderReq } as TransferGroupLeaderReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.NewLeaderID !== undefined && object.NewLeaderID !== null) {
      message.NewLeaderID = object.NewLeaderID as Long;
    } else {
      message.NewLeaderID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(TransferGroupLeaderReq.$type, TransferGroupLeaderReq);

const baseTransferGroupLeaderRsp: object = {
  $type: "message.TransferGroupLeaderRsp",
};

export const TransferGroupLeaderRsp = {
  $type: "message.TransferGroupLeaderRsp" as const,

  encode(
    _: TransferGroupLeaderRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TransferGroupLeaderRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTransferGroupLeaderRsp } as TransferGroupLeaderRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): TransferGroupLeaderRsp {
    const message = { ...baseTransferGroupLeaderRsp } as TransferGroupLeaderRsp;
    return message;
  },

  toJSON(_: TransferGroupLeaderRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<TransferGroupLeaderRsp>): TransferGroupLeaderRsp {
    const message = { ...baseTransferGroupLeaderRsp } as TransferGroupLeaderRsp;
    return message;
  },
};

messageTypeRegistry.set(TransferGroupLeaderRsp.$type, TransferGroupLeaderRsp);

const baseQuitGroupReq: object = {
  $type: "message.QuitGroupReq",
  GroupID: Long.UZERO,
  MemberID: Long.UZERO,
};

export const QuitGroupReq = {
  $type: "message.QuitGroupReq" as const,

  encode(
    message: QuitGroupReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.MemberID.isZero()) {
      writer.uint32(16).uint64(message.MemberID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuitGroupReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuitGroupReq } as QuitGroupReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.MemberID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuitGroupReq {
    const message = { ...baseQuitGroupReq } as QuitGroupReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.MemberID =
      object.MemberID !== undefined && object.MemberID !== null
        ? Long.fromString(object.MemberID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: QuitGroupReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.MemberID !== undefined &&
      (obj.MemberID = (message.MemberID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QuitGroupReq>): QuitGroupReq {
    const message = { ...baseQuitGroupReq } as QuitGroupReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.MemberID !== undefined && object.MemberID !== null) {
      message.MemberID = object.MemberID as Long;
    } else {
      message.MemberID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(QuitGroupReq.$type, QuitGroupReq);

const baseQuitGroupRsp: object = { $type: "message.QuitGroupRsp" };

export const QuitGroupRsp = {
  $type: "message.QuitGroupRsp" as const,

  encode(
    _: QuitGroupRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuitGroupRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuitGroupRsp } as QuitGroupRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QuitGroupRsp {
    const message = { ...baseQuitGroupRsp } as QuitGroupRsp;
    return message;
  },

  toJSON(_: QuitGroupRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QuitGroupRsp>): QuitGroupRsp {
    const message = { ...baseQuitGroupRsp } as QuitGroupRsp;
    return message;
  },
};

messageTypeRegistry.set(QuitGroupRsp.$type, QuitGroupRsp);

const baseGroupMemberInfo: object = {
  $type: "message.GroupMemberInfo",
  GroupID: Long.UZERO,
  MemberID: Long.UZERO,
  Role: 0,
  GroupNickName: "",
  IsDisturb: false,
  IsTop: false,
  IsShowNickName: false,
  JoinTime: Long.UZERO,
};

export const GroupMemberInfo = {
  $type: "message.GroupMemberInfo" as const,

  encode(
    message: GroupMemberInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.MemberID.isZero()) {
      writer.uint32(16).uint64(message.MemberID);
    }
    if (message.Role !== 0) {
      writer.uint32(24).int32(message.Role);
    }
    if (message.GroupNickName !== "") {
      writer.uint32(34).string(message.GroupNickName);
    }
    if (message.IsDisturb === true) {
      writer.uint32(40).bool(message.IsDisturb);
    }
    if (message.IsTop === true) {
      writer.uint32(48).bool(message.IsTop);
    }
    if (message.IsShowNickName === true) {
      writer.uint32(56).bool(message.IsShowNickName);
    }
    if (!message.JoinTime.isZero()) {
      writer.uint32(64).uint64(message.JoinTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupMemberInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupMemberInfo } as GroupMemberInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.MemberID = reader.uint64() as Long;
          break;
        case 3:
          message.Role = reader.int32() as any;
          break;
        case 4:
          message.GroupNickName = reader.string();
          break;
        case 5:
          message.IsDisturb = reader.bool();
          break;
        case 6:
          message.IsTop = reader.bool();
          break;
        case 7:
          message.IsShowNickName = reader.bool();
          break;
        case 8:
          message.JoinTime = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupMemberInfo {
    const message = { ...baseGroupMemberInfo } as GroupMemberInfo;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.MemberID =
      object.MemberID !== undefined && object.MemberID !== null
        ? Long.fromString(object.MemberID)
        : Long.UZERO;
    message.Role =
      object.Role !== undefined && object.Role !== null
        ? groupMemberRoleFromJSON(object.Role)
        : 0;
    message.GroupNickName =
      object.GroupNickName !== undefined && object.GroupNickName !== null
        ? String(object.GroupNickName)
        : "";
    message.IsDisturb =
      object.IsDisturb !== undefined && object.IsDisturb !== null
        ? Boolean(object.IsDisturb)
        : false;
    message.IsTop =
      object.IsTop !== undefined && object.IsTop !== null
        ? Boolean(object.IsTop)
        : false;
    message.IsShowNickName =
      object.IsShowNickName !== undefined && object.IsShowNickName !== null
        ? Boolean(object.IsShowNickName)
        : false;
    message.JoinTime =
      object.JoinTime !== undefined && object.JoinTime !== null
        ? Long.fromString(object.JoinTime)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GroupMemberInfo): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.MemberID !== undefined &&
      (obj.MemberID = (message.MemberID || Long.UZERO).toString());
    message.Role !== undefined &&
      (obj.Role = groupMemberRoleToJSON(message.Role));
    message.GroupNickName !== undefined &&
      (obj.GroupNickName = message.GroupNickName);
    message.IsDisturb !== undefined && (obj.IsDisturb = message.IsDisturb);
    message.IsTop !== undefined && (obj.IsTop = message.IsTop);
    message.IsShowNickName !== undefined &&
      (obj.IsShowNickName = message.IsShowNickName);
    message.JoinTime !== undefined &&
      (obj.JoinTime = (message.JoinTime || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GroupMemberInfo>): GroupMemberInfo {
    const message = { ...baseGroupMemberInfo } as GroupMemberInfo;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.MemberID !== undefined && object.MemberID !== null) {
      message.MemberID = object.MemberID as Long;
    } else {
      message.MemberID = Long.UZERO;
    }
    message.Role = object.Role ?? 0;
    message.GroupNickName = object.GroupNickName ?? "";
    message.IsDisturb = object.IsDisturb ?? false;
    message.IsTop = object.IsTop ?? false;
    message.IsShowNickName = object.IsShowNickName ?? false;
    if (object.JoinTime !== undefined && object.JoinTime !== null) {
      message.JoinTime = object.JoinTime as Long;
    } else {
      message.JoinTime = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GroupMemberInfo.$type, GroupMemberInfo);

const baseGetGroupMemberInfosReq: object = {
  $type: "message.GetGroupMemberInfosReq",
  GroupID: Long.UZERO,
  Range: 0,
};

export const GetGroupMemberInfosReq = {
  $type: "message.GetGroupMemberInfosReq" as const,

  encode(
    message: GetGroupMemberInfosReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (message.Range !== 0) {
      writer.uint32(16).int32(message.Range);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetGroupMemberInfosReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetGroupMemberInfosReq } as GetGroupMemberInfosReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.Range = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupMemberInfosReq {
    const message = { ...baseGetGroupMemberInfosReq } as GetGroupMemberInfosReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.Range =
      object.Range !== undefined && object.Range !== null
        ? groupMemberRangeFromJSON(object.Range)
        : 0;
    return message;
  },

  toJSON(message: GetGroupMemberInfosReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.Range !== undefined &&
      (obj.Range = groupMemberRangeToJSON(message.Range));
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetGroupMemberInfosReq>
  ): GetGroupMemberInfosReq {
    const message = { ...baseGetGroupMemberInfosReq } as GetGroupMemberInfosReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    message.Range = object.Range ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetGroupMemberInfosReq.$type, GetGroupMemberInfosReq);

const baseGetGroupMemberInfosRsp: object = {
  $type: "message.GetGroupMemberInfosRsp",
};

export const GetGroupMemberInfosRsp = {
  $type: "message.GetGroupMemberInfosRsp" as const,

  encode(
    message: GetGroupMemberInfosRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.GroupMemberInfos) {
      GroupMemberInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetGroupMemberInfosRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetGroupMemberInfosRsp } as GetGroupMemberInfosRsp;
    message.GroupMemberInfos = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupMemberInfos.push(
            GroupMemberInfo.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupMemberInfosRsp {
    const message = { ...baseGetGroupMemberInfosRsp } as GetGroupMemberInfosRsp;
    message.GroupMemberInfos = (object.GroupMemberInfos ?? []).map((e: any) =>
      GroupMemberInfo.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetGroupMemberInfosRsp): unknown {
    const obj: any = {};
    if (message.GroupMemberInfos) {
      obj.GroupMemberInfos = message.GroupMemberInfos.map((e) =>
        e ? GroupMemberInfo.toJSON(e) : undefined
      );
    } else {
      obj.GroupMemberInfos = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetGroupMemberInfosRsp>
  ): GetGroupMemberInfosRsp {
    const message = { ...baseGetGroupMemberInfosRsp } as GetGroupMemberInfosRsp;
    message.GroupMemberInfos = (object.GroupMemberInfos ?? []).map((e) =>
      GroupMemberInfo.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(GetGroupMemberInfosRsp.$type, GetGroupMemberInfosRsp);

const baseJoinGroupApplicationReq: object = {
  $type: "message.JoinGroupApplicationReq",
  GroupID: Long.UZERO,
  JoinGroupUserID: Long.UZERO,
  JoinGroupUserMsg: "",
};

export const JoinGroupApplicationReq = {
  $type: "message.JoinGroupApplicationReq" as const,

  encode(
    message: JoinGroupApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.JoinGroupUserID.isZero()) {
      writer.uint32(16).uint64(message.JoinGroupUserID);
    }
    if (message.JoinGroupUserMsg !== "") {
      writer.uint32(26).string(message.JoinGroupUserMsg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinGroupApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseJoinGroupApplicationReq,
    } as JoinGroupApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.JoinGroupUserID = reader.uint64() as Long;
          break;
        case 3:
          message.JoinGroupUserMsg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGroupApplicationReq {
    const message = {
      ...baseJoinGroupApplicationReq,
    } as JoinGroupApplicationReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.JoinGroupUserID =
      object.JoinGroupUserID !== undefined && object.JoinGroupUserID !== null
        ? Long.fromString(object.JoinGroupUserID)
        : Long.UZERO;
    message.JoinGroupUserMsg =
      object.JoinGroupUserMsg !== undefined && object.JoinGroupUserMsg !== null
        ? String(object.JoinGroupUserMsg)
        : "";
    return message;
  },

  toJSON(message: JoinGroupApplicationReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.JoinGroupUserID !== undefined &&
      (obj.JoinGroupUserID = (
        message.JoinGroupUserID || Long.UZERO
      ).toString());
    message.JoinGroupUserMsg !== undefined &&
      (obj.JoinGroupUserMsg = message.JoinGroupUserMsg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<JoinGroupApplicationReq>
  ): JoinGroupApplicationReq {
    const message = {
      ...baseJoinGroupApplicationReq,
    } as JoinGroupApplicationReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (
      object.JoinGroupUserID !== undefined &&
      object.JoinGroupUserID !== null
    ) {
      message.JoinGroupUserID = object.JoinGroupUserID as Long;
    } else {
      message.JoinGroupUserID = Long.UZERO;
    }
    message.JoinGroupUserMsg = object.JoinGroupUserMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinGroupApplicationReq.$type, JoinGroupApplicationReq);

const baseJoinGroupApplicationRsp: object = {
  $type: "message.JoinGroupApplicationRsp",
  JoinGroupEventID: Long.UZERO,
};

export const JoinGroupApplicationRsp = {
  $type: "message.JoinGroupApplicationRsp" as const,

  encode(
    message: JoinGroupApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JoinGroupApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseJoinGroupApplicationRsp,
    } as JoinGroupApplicationRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGroupApplicationRsp {
    const message = {
      ...baseJoinGroupApplicationRsp,
    } as JoinGroupApplicationRsp;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: JoinGroupApplicationRsp): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<JoinGroupApplicationRsp>
  ): JoinGroupApplicationRsp {
    const message = {
      ...baseJoinGroupApplicationRsp,
    } as JoinGroupApplicationRsp;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(JoinGroupApplicationRsp.$type, JoinGroupApplicationRsp);

const baseJoinGroupEvent: object = {
  $type: "message.JoinGroupEvent",
  JoinGroupEventID: Long.UZERO,
  GroupID: Long.UZERO,
  JoinGroupUserID: Long.UZERO,
  InviterID: Long.UZERO,
  Type: 0,
  JoinGroupUserMsg: "",
  ManagerMsg: "",
  ApplicationStatus: 0,
  InviteStatus: 0,
  CreatedAt: Long.UZERO,
  UpdatedAt: Long.UZERO,
};

export const JoinGroupEvent = {
  $type: "message.JoinGroupEvent" as const,

  encode(
    message: JoinGroupEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    if (!message.GroupID.isZero()) {
      writer.uint32(16).uint64(message.GroupID);
    }
    if (!message.JoinGroupUserID.isZero()) {
      writer.uint32(24).uint64(message.JoinGroupUserID);
    }
    if (!message.InviterID.isZero()) {
      writer.uint32(32).uint64(message.InviterID);
    }
    if (message.Type !== 0) {
      writer.uint32(40).int32(message.Type);
    }
    if (message.JoinGroupUserMsg !== "") {
      writer.uint32(50).string(message.JoinGroupUserMsg);
    }
    if (message.ManagerMsg !== "") {
      writer.uint32(58).string(message.ManagerMsg);
    }
    if (message.ApplicationStatus !== 0) {
      writer.uint32(64).int32(message.ApplicationStatus);
    }
    if (message.InviteStatus !== 0) {
      writer.uint32(72).int32(message.InviteStatus);
    }
    if (!message.CreatedAt.isZero()) {
      writer.uint32(80).uint64(message.CreatedAt);
    }
    if (!message.UpdatedAt.isZero()) {
      writer.uint32(88).uint64(message.UpdatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinGroupEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinGroupEvent } as JoinGroupEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        case 2:
          message.GroupID = reader.uint64() as Long;
          break;
        case 3:
          message.JoinGroupUserID = reader.uint64() as Long;
          break;
        case 4:
          message.InviterID = reader.uint64() as Long;
          break;
        case 5:
          message.Type = reader.int32() as any;
          break;
        case 6:
          message.JoinGroupUserMsg = reader.string();
          break;
        case 7:
          message.ManagerMsg = reader.string();
          break;
        case 8:
          message.ApplicationStatus = reader.int32() as any;
          break;
        case 9:
          message.InviteStatus = reader.int32() as any;
          break;
        case 10:
          message.CreatedAt = reader.uint64() as Long;
          break;
        case 11:
          message.UpdatedAt = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGroupEvent {
    const message = { ...baseJoinGroupEvent } as JoinGroupEvent;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.JoinGroupUserID =
      object.JoinGroupUserID !== undefined && object.JoinGroupUserID !== null
        ? Long.fromString(object.JoinGroupUserID)
        : Long.UZERO;
    message.InviterID =
      object.InviterID !== undefined && object.InviterID !== null
        ? Long.fromString(object.InviterID)
        : Long.UZERO;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? joinGroupEventTypeFromJSON(object.Type)
        : 0;
    message.JoinGroupUserMsg =
      object.JoinGroupUserMsg !== undefined && object.JoinGroupUserMsg !== null
        ? String(object.JoinGroupUserMsg)
        : "";
    message.ManagerMsg =
      object.ManagerMsg !== undefined && object.ManagerMsg !== null
        ? String(object.ManagerMsg)
        : "";
    message.ApplicationStatus =
      object.ApplicationStatus !== undefined &&
      object.ApplicationStatus !== null
        ? joinGroupApplicationStatusFromJSON(object.ApplicationStatus)
        : 0;
    message.InviteStatus =
      object.InviteStatus !== undefined && object.InviteStatus !== null
        ? joinGroupInviteStatusFromJSON(object.InviteStatus)
        : 0;
    message.CreatedAt =
      object.CreatedAt !== undefined && object.CreatedAt !== null
        ? Long.fromString(object.CreatedAt)
        : Long.UZERO;
    message.UpdatedAt =
      object.UpdatedAt !== undefined && object.UpdatedAt !== null
        ? Long.fromString(object.UpdatedAt)
        : Long.UZERO;
    return message;
  },

  toJSON(message: JoinGroupEvent): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.JoinGroupUserID !== undefined &&
      (obj.JoinGroupUserID = (
        message.JoinGroupUserID || Long.UZERO
      ).toString());
    message.InviterID !== undefined &&
      (obj.InviterID = (message.InviterID || Long.UZERO).toString());
    message.Type !== undefined &&
      (obj.Type = joinGroupEventTypeToJSON(message.Type));
    message.JoinGroupUserMsg !== undefined &&
      (obj.JoinGroupUserMsg = message.JoinGroupUserMsg);
    message.ManagerMsg !== undefined && (obj.ManagerMsg = message.ManagerMsg);
    message.ApplicationStatus !== undefined &&
      (obj.ApplicationStatus = joinGroupApplicationStatusToJSON(
        message.ApplicationStatus
      ));
    message.InviteStatus !== undefined &&
      (obj.InviteStatus = joinGroupInviteStatusToJSON(message.InviteStatus));
    message.CreatedAt !== undefined &&
      (obj.CreatedAt = (message.CreatedAt || Long.UZERO).toString());
    message.UpdatedAt !== undefined &&
      (obj.UpdatedAt = (message.UpdatedAt || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<JoinGroupEvent>): JoinGroupEvent {
    const message = { ...baseJoinGroupEvent } as JoinGroupEvent;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (
      object.JoinGroupUserID !== undefined &&
      object.JoinGroupUserID !== null
    ) {
      message.JoinGroupUserID = object.JoinGroupUserID as Long;
    } else {
      message.JoinGroupUserID = Long.UZERO;
    }
    if (object.InviterID !== undefined && object.InviterID !== null) {
      message.InviterID = object.InviterID as Long;
    } else {
      message.InviterID = Long.UZERO;
    }
    message.Type = object.Type ?? 0;
    message.JoinGroupUserMsg = object.JoinGroupUserMsg ?? "";
    message.ManagerMsg = object.ManagerMsg ?? "";
    message.ApplicationStatus = object.ApplicationStatus ?? 0;
    message.InviteStatus = object.InviteStatus ?? 0;
    if (object.CreatedAt !== undefined && object.CreatedAt !== null) {
      message.CreatedAt = object.CreatedAt as Long;
    } else {
      message.CreatedAt = Long.UZERO;
    }
    if (object.UpdatedAt !== undefined && object.UpdatedAt !== null) {
      message.UpdatedAt = object.UpdatedAt as Long;
    } else {
      message.UpdatedAt = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(JoinGroupEvent.$type, JoinGroupEvent);

const baseUpdateJoinGroupEventJoinGroupUserMsgReq: object = {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgReq",
  JoinGroupEventID: Long.UZERO,
  JoinGroupUserMsg: "",
};

export const UpdateJoinGroupEventJoinGroupUserMsgReq = {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgReq" as const,

  encode(
    message: UpdateJoinGroupEventJoinGroupUserMsgReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    if (message.JoinGroupUserMsg !== "") {
      writer.uint32(18).string(message.JoinGroupUserMsg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateJoinGroupEventJoinGroupUserMsgReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgReq,
    } as UpdateJoinGroupEventJoinGroupUserMsgReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        case 2:
          message.JoinGroupUserMsg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateJoinGroupEventJoinGroupUserMsgReq {
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgReq,
    } as UpdateJoinGroupEventJoinGroupUserMsgReq;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    message.JoinGroupUserMsg =
      object.JoinGroupUserMsg !== undefined && object.JoinGroupUserMsg !== null
        ? String(object.JoinGroupUserMsg)
        : "";
    return message;
  },

  toJSON(message: UpdateJoinGroupEventJoinGroupUserMsgReq): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    message.JoinGroupUserMsg !== undefined &&
      (obj.JoinGroupUserMsg = message.JoinGroupUserMsg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateJoinGroupEventJoinGroupUserMsgReq>
  ): UpdateJoinGroupEventJoinGroupUserMsgReq {
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgReq,
    } as UpdateJoinGroupEventJoinGroupUserMsgReq;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    message.JoinGroupUserMsg = object.JoinGroupUserMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  UpdateJoinGroupEventJoinGroupUserMsgReq.$type,
  UpdateJoinGroupEventJoinGroupUserMsgReq
);

const baseUpdateJoinGroupEventJoinGroupUserMsgRsp: object = {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgRsp",
};

export const UpdateJoinGroupEventJoinGroupUserMsgRsp = {
  $type: "message.UpdateJoinGroupEventJoinGroupUserMsgRsp" as const,

  encode(
    _: UpdateJoinGroupEventJoinGroupUserMsgRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateJoinGroupEventJoinGroupUserMsgRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgRsp,
    } as UpdateJoinGroupEventJoinGroupUserMsgRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateJoinGroupEventJoinGroupUserMsgRsp {
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgRsp,
    } as UpdateJoinGroupEventJoinGroupUserMsgRsp;
    return message;
  },

  toJSON(_: UpdateJoinGroupEventJoinGroupUserMsgRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<UpdateJoinGroupEventJoinGroupUserMsgRsp>
  ): UpdateJoinGroupEventJoinGroupUserMsgRsp {
    const message = {
      ...baseUpdateJoinGroupEventJoinGroupUserMsgRsp,
    } as UpdateJoinGroupEventJoinGroupUserMsgRsp;
    return message;
  },
};

messageTypeRegistry.set(
  UpdateJoinGroupEventJoinGroupUserMsgRsp.$type,
  UpdateJoinGroupEventJoinGroupUserMsgRsp
);

const baseUpdateJoinGroupEventManagerMsgReq: object = {
  $type: "message.UpdateJoinGroupEventManagerMsgReq",
  JoinGroupEventID: Long.UZERO,
  ManagerMsg: "",
};

export const UpdateJoinGroupEventManagerMsgReq = {
  $type: "message.UpdateJoinGroupEventManagerMsgReq" as const,

  encode(
    message: UpdateJoinGroupEventManagerMsgReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    if (message.ManagerMsg !== "") {
      writer.uint32(18).string(message.ManagerMsg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateJoinGroupEventManagerMsgReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgReq,
    } as UpdateJoinGroupEventManagerMsgReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        case 2:
          message.ManagerMsg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateJoinGroupEventManagerMsgReq {
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgReq,
    } as UpdateJoinGroupEventManagerMsgReq;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    message.ManagerMsg =
      object.ManagerMsg !== undefined && object.ManagerMsg !== null
        ? String(object.ManagerMsg)
        : "";
    return message;
  },

  toJSON(message: UpdateJoinGroupEventManagerMsgReq): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    message.ManagerMsg !== undefined && (obj.ManagerMsg = message.ManagerMsg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateJoinGroupEventManagerMsgReq>
  ): UpdateJoinGroupEventManagerMsgReq {
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgReq,
    } as UpdateJoinGroupEventManagerMsgReq;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    message.ManagerMsg = object.ManagerMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  UpdateJoinGroupEventManagerMsgReq.$type,
  UpdateJoinGroupEventManagerMsgReq
);

const baseUpdateJoinGroupEventManagerMsgRsp: object = {
  $type: "message.UpdateJoinGroupEventManagerMsgRsp",
};

export const UpdateJoinGroupEventManagerMsgRsp = {
  $type: "message.UpdateJoinGroupEventManagerMsgRsp" as const,

  encode(
    _: UpdateJoinGroupEventManagerMsgRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateJoinGroupEventManagerMsgRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgRsp,
    } as UpdateJoinGroupEventManagerMsgRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateJoinGroupEventManagerMsgRsp {
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgRsp,
    } as UpdateJoinGroupEventManagerMsgRsp;
    return message;
  },

  toJSON(_: UpdateJoinGroupEventManagerMsgRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<UpdateJoinGroupEventManagerMsgRsp>
  ): UpdateJoinGroupEventManagerMsgRsp {
    const message = {
      ...baseUpdateJoinGroupEventManagerMsgRsp,
    } as UpdateJoinGroupEventManagerMsgRsp;
    return message;
  },
};

messageTypeRegistry.set(
  UpdateJoinGroupEventManagerMsgRsp.$type,
  UpdateJoinGroupEventManagerMsgRsp
);

const baseGetJoinGroupEventsReq: object = {
  $type: "message.GetJoinGroupEventsReq",
  GroupID: Long.UZERO,
  LastJoinGroupEventID: Long.UZERO,
  Size: 0,
};

export const GetJoinGroupEventsReq = {
  $type: "message.GetJoinGroupEventsReq" as const,

  encode(
    message: GetJoinGroupEventsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.LastJoinGroupEventID.isZero()) {
      writer.uint32(16).uint64(message.LastJoinGroupEventID);
    }
    if (message.Size !== 0) {
      writer.uint32(24).uint32(message.Size);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetJoinGroupEventsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetJoinGroupEventsReq } as GetJoinGroupEventsReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.LastJoinGroupEventID = reader.uint64() as Long;
          break;
        case 3:
          message.Size = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJoinGroupEventsReq {
    const message = { ...baseGetJoinGroupEventsReq } as GetJoinGroupEventsReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.LastJoinGroupEventID =
      object.LastJoinGroupEventID !== undefined &&
      object.LastJoinGroupEventID !== null
        ? Long.fromString(object.LastJoinGroupEventID)
        : Long.UZERO;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: GetJoinGroupEventsReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.LastJoinGroupEventID !== undefined &&
      (obj.LastJoinGroupEventID = (
        message.LastJoinGroupEventID || Long.UZERO
      ).toString());
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetJoinGroupEventsReq>
  ): GetJoinGroupEventsReq {
    const message = { ...baseGetJoinGroupEventsReq } as GetJoinGroupEventsReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (
      object.LastJoinGroupEventID !== undefined &&
      object.LastJoinGroupEventID !== null
    ) {
      message.LastJoinGroupEventID = object.LastJoinGroupEventID as Long;
    } else {
      message.LastJoinGroupEventID = Long.UZERO;
    }
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(GetJoinGroupEventsReq.$type, GetJoinGroupEventsReq);

const baseGetJoinGroupEventsRsp: object = {
  $type: "message.GetJoinGroupEventsRsp",
};

export const GetJoinGroupEventsRsp = {
  $type: "message.GetJoinGroupEventsRsp" as const,

  encode(
    message: GetJoinGroupEventsRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.JoinGroupEvents) {
      JoinGroupEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetJoinGroupEventsRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetJoinGroupEventsRsp } as GetJoinGroupEventsRsp;
    message.JoinGroupEvents = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEvents.push(
            JoinGroupEvent.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJoinGroupEventsRsp {
    const message = { ...baseGetJoinGroupEventsRsp } as GetJoinGroupEventsRsp;
    message.JoinGroupEvents = (object.JoinGroupEvents ?? []).map((e: any) =>
      JoinGroupEvent.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetJoinGroupEventsRsp): unknown {
    const obj: any = {};
    if (message.JoinGroupEvents) {
      obj.JoinGroupEvents = message.JoinGroupEvents.map((e) =>
        e ? JoinGroupEvent.toJSON(e) : undefined
      );
    } else {
      obj.JoinGroupEvents = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetJoinGroupEventsRsp>
  ): GetJoinGroupEventsRsp {
    const message = { ...baseGetJoinGroupEventsRsp } as GetJoinGroupEventsRsp;
    message.JoinGroupEvents = (object.JoinGroupEvents ?? []).map((e) =>
      JoinGroupEvent.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(GetJoinGroupEventsRsp.$type, GetJoinGroupEventsRsp);

const baseInviteJoinGroupReq: object = {
  $type: "message.InviteJoinGroupReq",
  GroupID: Long.UZERO,
  InviterID: Long.UZERO,
  InviteeIDS: Long.UZERO,
};

export const InviteJoinGroupReq = {
  $type: "message.InviteJoinGroupReq" as const,

  encode(
    message: InviteJoinGroupReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.InviterID.isZero()) {
      writer.uint32(16).uint64(message.InviterID);
    }
    writer.uint32(26).fork();
    for (const v of message.InviteeIDS) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteJoinGroupReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInviteJoinGroupReq } as InviteJoinGroupReq;
    message.InviteeIDS = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.InviterID = reader.uint64() as Long;
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.InviteeIDS.push(reader.uint64() as Long);
            }
          } else {
            message.InviteeIDS.push(reader.uint64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InviteJoinGroupReq {
    const message = { ...baseInviteJoinGroupReq } as InviteJoinGroupReq;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.InviterID =
      object.InviterID !== undefined && object.InviterID !== null
        ? Long.fromString(object.InviterID)
        : Long.UZERO;
    message.InviteeIDS = (object.InviteeIDS ?? []).map((e: any) =>
      Long.fromString(e)
    );
    return message;
  },

  toJSON(message: InviteJoinGroupReq): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.InviterID !== undefined &&
      (obj.InviterID = (message.InviterID || Long.UZERO).toString());
    if (message.InviteeIDS) {
      obj.InviteeIDS = message.InviteeIDS.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.InviteeIDS = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<InviteJoinGroupReq>): InviteJoinGroupReq {
    const message = { ...baseInviteJoinGroupReq } as InviteJoinGroupReq;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.InviterID !== undefined && object.InviterID !== null) {
      message.InviterID = object.InviterID as Long;
    } else {
      message.InviterID = Long.UZERO;
    }
    message.InviteeIDS = (object.InviteeIDS ?? []).map((e) => e);
    return message;
  },
};

messageTypeRegistry.set(InviteJoinGroupReq.$type, InviteJoinGroupReq);

const baseInviteJoinGroupRsp: object = { $type: "message.InviteJoinGroupRsp" };

export const InviteJoinGroupRsp = {
  $type: "message.InviteJoinGroupRsp" as const,

  encode(
    _: InviteJoinGroupRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteJoinGroupRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInviteJoinGroupRsp } as InviteJoinGroupRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): InviteJoinGroupRsp {
    const message = { ...baseInviteJoinGroupRsp } as InviteJoinGroupRsp;
    return message;
  },

  toJSON(_: InviteJoinGroupRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<InviteJoinGroupRsp>): InviteJoinGroupRsp {
    const message = { ...baseInviteJoinGroupRsp } as InviteJoinGroupRsp;
    return message;
  },
};

messageTypeRegistry.set(InviteJoinGroupRsp.$type, InviteJoinGroupRsp);

const baseAcceptJoinGroupApplicationReq: object = {
  $type: "message.AcceptJoinGroupApplicationReq",
  JoinGroupEventID: Long.UZERO,
};

export const AcceptJoinGroupApplicationReq = {
  $type: "message.AcceptJoinGroupApplicationReq" as const,

  encode(
    message: AcceptJoinGroupApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcceptJoinGroupApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAcceptJoinGroupApplicationReq,
    } as AcceptJoinGroupApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcceptJoinGroupApplicationReq {
    const message = {
      ...baseAcceptJoinGroupApplicationReq,
    } as AcceptJoinGroupApplicationReq;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: AcceptJoinGroupApplicationReq): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AcceptJoinGroupApplicationReq>
  ): AcceptJoinGroupApplicationReq {
    const message = {
      ...baseAcceptJoinGroupApplicationReq,
    } as AcceptJoinGroupApplicationReq;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  AcceptJoinGroupApplicationReq.$type,
  AcceptJoinGroupApplicationReq
);

const baseAcceptJoinGroupApplicationRsp: object = {
  $type: "message.AcceptJoinGroupApplicationRsp",
};

export const AcceptJoinGroupApplicationRsp = {
  $type: "message.AcceptJoinGroupApplicationRsp" as const,

  encode(
    _: AcceptJoinGroupApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcceptJoinGroupApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAcceptJoinGroupApplicationRsp,
    } as AcceptJoinGroupApplicationRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): AcceptJoinGroupApplicationRsp {
    const message = {
      ...baseAcceptJoinGroupApplicationRsp,
    } as AcceptJoinGroupApplicationRsp;
    return message;
  },

  toJSON(_: AcceptJoinGroupApplicationRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<AcceptJoinGroupApplicationRsp>
  ): AcceptJoinGroupApplicationRsp {
    const message = {
      ...baseAcceptJoinGroupApplicationRsp,
    } as AcceptJoinGroupApplicationRsp;
    return message;
  },
};

messageTypeRegistry.set(
  AcceptJoinGroupApplicationRsp.$type,
  AcceptJoinGroupApplicationRsp
);

const baseRejectJoinGroupApplicationReq: object = {
  $type: "message.RejectJoinGroupApplicationReq",
  JoinGroupEventID: Long.UZERO,
};

export const RejectJoinGroupApplicationReq = {
  $type: "message.RejectJoinGroupApplicationReq" as const,

  encode(
    message: RejectJoinGroupApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.JoinGroupEventID.isZero()) {
      writer.uint32(8).uint64(message.JoinGroupEventID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RejectJoinGroupApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRejectJoinGroupApplicationReq,
    } as RejectJoinGroupApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEventID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RejectJoinGroupApplicationReq {
    const message = {
      ...baseRejectJoinGroupApplicationReq,
    } as RejectJoinGroupApplicationReq;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: RejectJoinGroupApplicationReq): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<RejectJoinGroupApplicationReq>
  ): RejectJoinGroupApplicationReq {
    const message = {
      ...baseRejectJoinGroupApplicationReq,
    } as RejectJoinGroupApplicationReq;
    if (
      object.JoinGroupEventID !== undefined &&
      object.JoinGroupEventID !== null
    ) {
      message.JoinGroupEventID = object.JoinGroupEventID as Long;
    } else {
      message.JoinGroupEventID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  RejectJoinGroupApplicationReq.$type,
  RejectJoinGroupApplicationReq
);

const baseRejectJoinGroupApplicationRsp: object = {
  $type: "message.RejectJoinGroupApplicationRsp",
};

export const RejectJoinGroupApplicationRsp = {
  $type: "message.RejectJoinGroupApplicationRsp" as const,

  encode(
    _: RejectJoinGroupApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RejectJoinGroupApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRejectJoinGroupApplicationRsp,
    } as RejectJoinGroupApplicationRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RejectJoinGroupApplicationRsp {
    const message = {
      ...baseRejectJoinGroupApplicationRsp,
    } as RejectJoinGroupApplicationRsp;
    return message;
  },

  toJSON(_: RejectJoinGroupApplicationRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<RejectJoinGroupApplicationRsp>
  ): RejectJoinGroupApplicationRsp {
    const message = {
      ...baseRejectJoinGroupApplicationRsp,
    } as RejectJoinGroupApplicationRsp;
    return message;
  },
};

messageTypeRegistry.set(
  RejectJoinGroupApplicationRsp.$type,
  RejectJoinGroupApplicationRsp
);

const baseGroupStore: object = {
  $type: "message.GroupStore",
  GroupID: Long.UZERO,
  Name: "",
  Icon: "",
  Members: 0,
  Notice: "",
  IsJoinApplication: false,
  IsInviteJoinGroupNeedConfirm: false,
  CreatedAt: Long.UZERO,
  UpdatedAt: Long.UZERO,
};

export const GroupStore = {
  $type: "message.GroupStore" as const,

  encode(
    message: GroupStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Icon !== "") {
      writer.uint32(26).string(message.Icon);
    }
    if (message.Members !== 0) {
      writer.uint32(32).uint32(message.Members);
    }
    if (message.Notice !== "") {
      writer.uint32(42).string(message.Notice);
    }
    if (message.IsJoinApplication === true) {
      writer.uint32(48).bool(message.IsJoinApplication);
    }
    if (message.IsInviteJoinGroupNeedConfirm === true) {
      writer.uint32(56).bool(message.IsInviteJoinGroupNeedConfirm);
    }
    if (!message.CreatedAt.isZero()) {
      writer.uint32(64).uint64(message.CreatedAt);
    }
    if (!message.UpdatedAt.isZero()) {
      writer.uint32(72).uint64(message.UpdatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupStore } as GroupStore;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Icon = reader.string();
          break;
        case 4:
          message.Members = reader.uint32();
          break;
        case 5:
          message.Notice = reader.string();
          break;
        case 6:
          message.IsJoinApplication = reader.bool();
          break;
        case 7:
          message.IsInviteJoinGroupNeedConfirm = reader.bool();
          break;
        case 8:
          message.CreatedAt = reader.uint64() as Long;
          break;
        case 9:
          message.UpdatedAt = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupStore {
    const message = { ...baseGroupStore } as GroupStore;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.Name =
      object.Name !== undefined && object.Name !== null
        ? String(object.Name)
        : "";
    message.Icon =
      object.Icon !== undefined && object.Icon !== null
        ? String(object.Icon)
        : "";
    message.Members =
      object.Members !== undefined && object.Members !== null
        ? Number(object.Members)
        : 0;
    message.Notice =
      object.Notice !== undefined && object.Notice !== null
        ? String(object.Notice)
        : "";
    message.IsJoinApplication =
      object.IsJoinApplication !== undefined &&
      object.IsJoinApplication !== null
        ? Boolean(object.IsJoinApplication)
        : false;
    message.IsInviteJoinGroupNeedConfirm =
      object.IsInviteJoinGroupNeedConfirm !== undefined &&
      object.IsInviteJoinGroupNeedConfirm !== null
        ? Boolean(object.IsInviteJoinGroupNeedConfirm)
        : false;
    message.CreatedAt =
      object.CreatedAt !== undefined && object.CreatedAt !== null
        ? Long.fromString(object.CreatedAt)
        : Long.UZERO;
    message.UpdatedAt =
      object.UpdatedAt !== undefined && object.UpdatedAt !== null
        ? Long.fromString(object.UpdatedAt)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GroupStore): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.Name !== undefined && (obj.Name = message.Name);
    message.Icon !== undefined && (obj.Icon = message.Icon);
    message.Members !== undefined && (obj.Members = message.Members);
    message.Notice !== undefined && (obj.Notice = message.Notice);
    message.IsJoinApplication !== undefined &&
      (obj.IsJoinApplication = message.IsJoinApplication);
    message.IsInviteJoinGroupNeedConfirm !== undefined &&
      (obj.IsInviteJoinGroupNeedConfirm = message.IsInviteJoinGroupNeedConfirm);
    message.CreatedAt !== undefined &&
      (obj.CreatedAt = (message.CreatedAt || Long.UZERO).toString());
    message.UpdatedAt !== undefined &&
      (obj.UpdatedAt = (message.UpdatedAt || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GroupStore>): GroupStore {
    const message = { ...baseGroupStore } as GroupStore;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    message.Name = object.Name ?? "";
    message.Icon = object.Icon ?? "";
    message.Members = object.Members ?? 0;
    message.Notice = object.Notice ?? "";
    message.IsJoinApplication = object.IsJoinApplication ?? false;
    message.IsInviteJoinGroupNeedConfirm =
      object.IsInviteJoinGroupNeedConfirm ?? false;
    if (object.CreatedAt !== undefined && object.CreatedAt !== null) {
      message.CreatedAt = object.CreatedAt as Long;
    } else {
      message.CreatedAt = Long.UZERO;
    }
    if (object.UpdatedAt !== undefined && object.UpdatedAt !== null) {
      message.UpdatedAt = object.UpdatedAt as Long;
    } else {
      message.UpdatedAt = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GroupStore.$type, GroupStore);

const baseJoinGroupEventStore: object = {
  $type: "message.JoinGroupEventStore",
};

export const JoinGroupEventStore = {
  $type: "message.JoinGroupEventStore" as const,

  encode(
    message: JoinGroupEventStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.JoinGroupEvent !== undefined) {
      JoinGroupEvent.encode(
        message.JoinGroupEvent,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinGroupEventStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinGroupEventStore } as JoinGroupEventStore;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.JoinGroupEvent = JoinGroupEvent.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGroupEventStore {
    const message = { ...baseJoinGroupEventStore } as JoinGroupEventStore;
    message.JoinGroupEvent =
      object.JoinGroupEvent !== undefined && object.JoinGroupEvent !== null
        ? JoinGroupEvent.fromJSON(object.JoinGroupEvent)
        : undefined;
    return message;
  },

  toJSON(message: JoinGroupEventStore): unknown {
    const obj: any = {};
    message.JoinGroupEvent !== undefined &&
      (obj.JoinGroupEvent = message.JoinGroupEvent
        ? JoinGroupEvent.toJSON(message.JoinGroupEvent)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<JoinGroupEventStore>): JoinGroupEventStore {
    const message = { ...baseJoinGroupEventStore } as JoinGroupEventStore;
    message.JoinGroupEvent =
      object.JoinGroupEvent !== undefined && object.JoinGroupEvent !== null
        ? JoinGroupEvent.fromPartial(object.JoinGroupEvent)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinGroupEventStore.$type, JoinGroupEventStore);

const baseGroupMemberStore: object = {
  $type: "message.GroupMemberStore",
  GroupID: Long.UZERO,
  MemberID: Long.UZERO,
  Role: 0,
  GroupNickName: "",
  IsDisturb: false,
  IsTop: false,
  IsShowNickName: false,
  JoinTime: Long.UZERO,
  UpdatedAt: Long.UZERO,
};

export const GroupMemberStore = {
  $type: "message.GroupMemberStore" as const,

  encode(
    message: GroupMemberStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    if (!message.MemberID.isZero()) {
      writer.uint32(16).uint64(message.MemberID);
    }
    if (message.Role !== 0) {
      writer.uint32(24).int32(message.Role);
    }
    if (message.GroupNickName !== "") {
      writer.uint32(34).string(message.GroupNickName);
    }
    if (message.IsDisturb === true) {
      writer.uint32(40).bool(message.IsDisturb);
    }
    if (message.IsTop === true) {
      writer.uint32(48).bool(message.IsTop);
    }
    if (message.IsShowNickName === true) {
      writer.uint32(56).bool(message.IsShowNickName);
    }
    if (!message.JoinTime.isZero()) {
      writer.uint32(64).uint64(message.JoinTime);
    }
    if (!message.UpdatedAt.isZero()) {
      writer.uint32(72).uint64(message.UpdatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupMemberStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupMemberStore } as GroupMemberStore;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GroupID = reader.uint64() as Long;
          break;
        case 2:
          message.MemberID = reader.uint64() as Long;
          break;
        case 3:
          message.Role = reader.int32() as any;
          break;
        case 4:
          message.GroupNickName = reader.string();
          break;
        case 5:
          message.IsDisturb = reader.bool();
          break;
        case 6:
          message.IsTop = reader.bool();
          break;
        case 7:
          message.IsShowNickName = reader.bool();
          break;
        case 8:
          message.JoinTime = reader.uint64() as Long;
          break;
        case 9:
          message.UpdatedAt = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupMemberStore {
    const message = { ...baseGroupMemberStore } as GroupMemberStore;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    message.MemberID =
      object.MemberID !== undefined && object.MemberID !== null
        ? Long.fromString(object.MemberID)
        : Long.UZERO;
    message.Role =
      object.Role !== undefined && object.Role !== null
        ? groupMemberRoleFromJSON(object.Role)
        : 0;
    message.GroupNickName =
      object.GroupNickName !== undefined && object.GroupNickName !== null
        ? String(object.GroupNickName)
        : "";
    message.IsDisturb =
      object.IsDisturb !== undefined && object.IsDisturb !== null
        ? Boolean(object.IsDisturb)
        : false;
    message.IsTop =
      object.IsTop !== undefined && object.IsTop !== null
        ? Boolean(object.IsTop)
        : false;
    message.IsShowNickName =
      object.IsShowNickName !== undefined && object.IsShowNickName !== null
        ? Boolean(object.IsShowNickName)
        : false;
    message.JoinTime =
      object.JoinTime !== undefined && object.JoinTime !== null
        ? Long.fromString(object.JoinTime)
        : Long.UZERO;
    message.UpdatedAt =
      object.UpdatedAt !== undefined && object.UpdatedAt !== null
        ? Long.fromString(object.UpdatedAt)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GroupMemberStore): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    message.MemberID !== undefined &&
      (obj.MemberID = (message.MemberID || Long.UZERO).toString());
    message.Role !== undefined &&
      (obj.Role = groupMemberRoleToJSON(message.Role));
    message.GroupNickName !== undefined &&
      (obj.GroupNickName = message.GroupNickName);
    message.IsDisturb !== undefined && (obj.IsDisturb = message.IsDisturb);
    message.IsTop !== undefined && (obj.IsTop = message.IsTop);
    message.IsShowNickName !== undefined &&
      (obj.IsShowNickName = message.IsShowNickName);
    message.JoinTime !== undefined &&
      (obj.JoinTime = (message.JoinTime || Long.UZERO).toString());
    message.UpdatedAt !== undefined &&
      (obj.UpdatedAt = (message.UpdatedAt || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GroupMemberStore>): GroupMemberStore {
    const message = { ...baseGroupMemberStore } as GroupMemberStore;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    if (object.MemberID !== undefined && object.MemberID !== null) {
      message.MemberID = object.MemberID as Long;
    } else {
      message.MemberID = Long.UZERO;
    }
    message.Role = object.Role ?? 0;
    message.GroupNickName = object.GroupNickName ?? "";
    message.IsDisturb = object.IsDisturb ?? false;
    message.IsTop = object.IsTop ?? false;
    message.IsShowNickName = object.IsShowNickName ?? false;
    if (object.JoinTime !== undefined && object.JoinTime !== null) {
      message.JoinTime = object.JoinTime as Long;
    } else {
      message.JoinTime = Long.UZERO;
    }
    if (object.UpdatedAt !== undefined && object.UpdatedAt !== null) {
      message.UpdatedAt = object.UpdatedAt as Long;
    } else {
      message.UpdatedAt = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GroupMemberStore.$type, GroupMemberStore);

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
  : T extends {}
  ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
