/* eslint-disable */
import { messageTypeRegistry } from "../../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  Gender,
  genderFromJSON,
  genderToJSON,
} from "../../../../common/protocol/constant/constant";

export const protobufPackage = "message";

/** 添加好友申请状态 */
export enum AddFriendApplicationStatus {
  /** AddFriendApplicationStatusUnknown - 未知 */
  AddFriendApplicationStatusUnknown = 0,
  /** AddFriendApplicationStatusWaitConfirm - 等待确认 */
  AddFriendApplicationStatusWaitConfirm = 1,
  /** AddFriendApplicationStatusReject - 拒绝 */
  AddFriendApplicationStatusReject = 2,
  /** AddFriendApplicationStatusAccept - 接受 */
  AddFriendApplicationStatusAccept = 3,
  /** AddFriendApplicationStatusExpire - 过期 */
  AddFriendApplicationStatusExpire = 4,
  UNRECOGNIZED = -1,
}

export function addFriendApplicationStatusFromJSON(
  object: any
): AddFriendApplicationStatus {
  switch (object) {
    case 0:
    case "AddFriendApplicationStatusUnknown":
      return AddFriendApplicationStatus.AddFriendApplicationStatusUnknown;
    case 1:
    case "AddFriendApplicationStatusWaitConfirm":
      return AddFriendApplicationStatus.AddFriendApplicationStatusWaitConfirm;
    case 2:
    case "AddFriendApplicationStatusReject":
      return AddFriendApplicationStatus.AddFriendApplicationStatusReject;
    case 3:
    case "AddFriendApplicationStatusAccept":
      return AddFriendApplicationStatus.AddFriendApplicationStatusAccept;
    case 4:
    case "AddFriendApplicationStatusExpire":
      return AddFriendApplicationStatus.AddFriendApplicationStatusExpire;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AddFriendApplicationStatus.UNRECOGNIZED;
  }
}

export function addFriendApplicationStatusToJSON(
  object: AddFriendApplicationStatus
): string {
  switch (object) {
    case AddFriendApplicationStatus.AddFriendApplicationStatusUnknown:
      return "AddFriendApplicationStatusUnknown";
    case AddFriendApplicationStatus.AddFriendApplicationStatusWaitConfirm:
      return "AddFriendApplicationStatusWaitConfirm";
    case AddFriendApplicationStatus.AddFriendApplicationStatusReject:
      return "AddFriendApplicationStatusReject";
    case AddFriendApplicationStatus.AddFriendApplicationStatusAccept:
      return "AddFriendApplicationStatusAccept";
    case AddFriendApplicationStatus.AddFriendApplicationStatusExpire:
      return "AddFriendApplicationStatusExpire";
    default:
      return "UNKNOWN";
  }
}

/** 获取好友请求 */
export interface GetFriendReq {
  $type: "message.GetFriendReq";
  /** 用户名 */
  Username: string;
}

/** 获取好友响应 */
export interface GetFriendRsp {
  $type: "message.GetFriendRsp";
  /** 好友信息 */
  FriendInfo: FriendInfo | undefined;
}

/** 获取好友信息请求 */
export interface GetFriendInfosReq {
  $type: "message.GetFriendInfosReq";
  /** 用户编号 */
  UserID: Long;
}

/** 好友信息 */
export interface FriendInfo {
  $type: "message.FriendInfo";
  /** 好友编号 */
  FriendID: Long;
  /** 昵称 */
  NickName: string;
  /** 用户名 */
  Username: string;
  /** 描述 */
  Description: string;
  /** 备注 */
  Remark: string;
  /** 头像 */
  Avatar: string;
  /** 性别 */
  Gender: Gender;
  /** 是否免打扰 */
  IsDisturb: boolean;
  /** 是否黑名单 */
  IsBlacklist: boolean;
  /** 是否置顶 */
  IsTop: boolean;
}

/** 获取好友信息响应 */
export interface GetFriendInfosRsp {
  $type: "message.GetFriendInfosRsp";
  /** 好友信息列表 */
  FriendInfos: FriendInfo[];
}

/** 获取好友信息请求 */
export interface GetFriendInfoReq {
  $type: "message.GetFriendInfoReq";
  /** 用户编号 */
  UserID: Long;
  /** 好友编号 */
  FriendID: Long;
}

/** 获取好友信息响应 */
export interface GetFriendInfoRsp {
  $type: "message.GetFriendInfoRsp";
  /** 好友信息 */
  FriendInfo: FriendInfo | undefined;
}

/** 好友免打扰请求 */
export interface FriendDisturbReq {
  $type: "message.FriendDisturbReq";
  /** 好友编号 */
  FriendID: Long;
  /** 是否免打扰 */
  IsDisturb: boolean;
}

/** 好友免打扰响应 */
export interface FriendDisturbRsp {
  $type: "message.FriendDisturbRsp";
}

/** 好友黑名单请求 */
export interface FriendBlacklistReq {
  $type: "message.FriendBlacklistReq";
  /** 好友编号 */
  FriendID: Long;
  /** 是否黑名单 */
  IsBlacklist: boolean;
}

/** 好友黑名单响应 */
export interface FriendBlacklistRsp {
  $type: "message.FriendBlacklistRsp";
}

/** 删除好友请求 */
export interface DeleteFriendReq {
  $type: "message.DeleteFriendReq";
  /** 用户编号 */
  UserID: Long;
  /** 好友编号 */
  FriendID: Long;
}

/** 删除好友响应 */
export interface DeleteFriendRsp {
  $type: "message.DeleteFriendRsp";
}

/** 获取所有好友请求 */
export interface GetAllFriendsReq {
  $type: "message.GetAllFriendsReq";
  /** 用户编号 */
  UserID: Long;
}

/** 获取所有好友响应 */
export interface GetAllFriendsRsp {
  $type: "message.GetAllFriendsRsp";
  /** 好友信息列表 */
  FriendInfos: FriendInfo[];
}

/** 获取添加好友申请请求 */
export interface GetAddFriendApplicationsReq {
  $type: "message.GetAddFriendApplicationsReq";
  /** 用户编号 */
  UserID: Long;
  /** 最后一个添加好友请求的编号（因为是反过来排序的） */
  LastAddFriendApplicationID: Long;
  /** 多少条 */
  Size: number;
}

/** 添加好友申请 */
export interface AddFriendApplication {
  $type: "message.AddFriendApplication";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
  /** 申请者用户编号 */
  ApplicantID: Long;
  /** 好友编号 */
  FriendID: Long;
  /** 申请消息 */
  ApplicationMsg: string;
  /** 好友回复 */
  FriendReply: string;
  /** 申请状态 */
  Status: AddFriendApplicationStatus;
  /** 申请时间 */
  ApplicationTime: Long;
}

/** 获取添加好友申请响应 */
export interface GetAddFriendApplicationsRsp {
  $type: "message.GetAddFriendApplicationsRsp";
  /** 添加好友申请 */
  AddFriendApplications: AddFriendApplication[];
}

/** 添加好友申请请求 */
export interface AddFriendApplicationReq {
  $type: "message.AddFriendApplicationReq";
  /** 申请人编号 */
  ApplicantID: Long;
  /** 好友编号 */
  FriendID: Long;
  /** 申请消息 */
  ApplicationMsg: string;
}

/** 添加好友申请响应 */
export interface AddFriendApplicationRsp {
  $type: "message.AddFriendApplicationRsp";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
}

/** 更新添加好友申请申请消息请求 */
export interface UpdateAddFriendApplicationApplicationMsgReq {
  $type: "message.UpdateAddFriendApplicationApplicationMsgReq";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
  /** 申请消息 */
  ApplicationMsg: string;
}

/** 更新添加好友申请申请消息响应 */
export interface UpdateAddFriendApplicationApplicationMsgRsp {
  $type: "message.UpdateAddFriendApplicationApplicationMsgRsp";
}

/** 更新添加好友申请好友回复请求 */
export interface UpdateAddFriendApplicationFriendReplyReq {
  $type: "message.UpdateAddFriendApplicationFriendReplyReq";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
  /** 好友回复 */
  FriendReply: string;
}

/** 更新添加好友申请好友回复响应 */
export interface UpdateAddFriendApplicationFriendReplyRsp {
  $type: "message.UpdateAddFriendApplicationFriendReplyRsp";
}

/** 接受添加好友请求 */
export interface AcceptAddFriendApplicationReq {
  $type: "message.AcceptAddFriendApplicationReq";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
}

/** 接受添加好友响应 */
export interface AcceptAddFriendApplicationRsp {
  $type: "message.AcceptAddFriendApplicationRsp";
}

/** 拒绝添加好友请求 */
export interface RejectAddFriendApplicationReq {
  $type: "message.RejectAddFriendApplicationReq";
  /** 添加好友申请编号 */
  AddFriendApplicationID: Long;
}

/** 拒绝添加好友响应 */
export interface RejectAddFriendApplicationRsp {
  $type: "message.RejectAddFriendApplicationRsp";
}

/**
 * @存储模型
 * 添加好友申请
 * 这里在检索的时候根据ApplicantID和FriendID查询自己的所有申请
 * 根据AddFriendApplicationID逆序排序
 */
export interface AddFriendApplicationStore {
  $type: "message.AddFriendApplicationStore";
  /** 申请 */
  AddFriendApplication: AddFriendApplication | undefined;
}

/**
 * @存储模型
 * 好友
 */
export interface FriendStore {
  $type: "message.FriendStore";
  /** 用户编号 */
  UserID: Long;
  /** 好友编号 */
  FriendID: Long;
  /** 用户名 */
  Username: string;
  /** 描述 */
  Description: string;
  /** 是否忽略对方的消息 */
  IsIgnoreMsg: boolean;
  /** 是否黑名单 */
  IsBlacklist: boolean;
  /** 是否置顶 */
  IsTop: boolean;
  /** 建立时间 */
  CreatedAt: Long;
  /** 修改时间 */
  UpdatedAt: Long;
}

const baseGetFriendReq: object = {
  $type: "message.GetFriendReq",
  Username: "",
};

export const GetFriendReq = {
  $type: "message.GetFriendReq" as const,

  encode(
    message: GetFriendReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Username !== "") {
      writer.uint32(10).string(message.Username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendReq } as GetFriendReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendReq {
    const message = { ...baseGetFriendReq } as GetFriendReq;
    message.Username =
      object.Username !== undefined && object.Username !== null
        ? String(object.Username)
        : "";
    return message;
  },

  toJSON(message: GetFriendReq): unknown {
    const obj: any = {};
    message.Username !== undefined && (obj.Username = message.Username);
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendReq>): GetFriendReq {
    const message = { ...baseGetFriendReq } as GetFriendReq;
    message.Username = object.Username ?? "";
    return message;
  },
};

messageTypeRegistry.set(GetFriendReq.$type, GetFriendReq);

const baseGetFriendRsp: object = { $type: "message.GetFriendRsp" };

export const GetFriendRsp = {
  $type: "message.GetFriendRsp" as const,

  encode(
    message: GetFriendRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.FriendInfo !== undefined) {
      FriendInfo.encode(message.FriendInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendRsp } as GetFriendRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendInfo = FriendInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendRsp {
    const message = { ...baseGetFriendRsp } as GetFriendRsp;
    message.FriendInfo =
      object.FriendInfo !== undefined && object.FriendInfo !== null
        ? FriendInfo.fromJSON(object.FriendInfo)
        : undefined;
    return message;
  },

  toJSON(message: GetFriendRsp): unknown {
    const obj: any = {};
    message.FriendInfo !== undefined &&
      (obj.FriendInfo = message.FriendInfo
        ? FriendInfo.toJSON(message.FriendInfo)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendRsp>): GetFriendRsp {
    const message = { ...baseGetFriendRsp } as GetFriendRsp;
    message.FriendInfo =
      object.FriendInfo !== undefined && object.FriendInfo !== null
        ? FriendInfo.fromPartial(object.FriendInfo)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetFriendRsp.$type, GetFriendRsp);

const baseGetFriendInfosReq: object = {
  $type: "message.GetFriendInfosReq",
  UserID: Long.UZERO,
};

export const GetFriendInfosReq = {
  $type: "message.GetFriendInfosReq" as const,

  encode(
    message: GetFriendInfosReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendInfosReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendInfosReq } as GetFriendInfosReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendInfosReq {
    const message = { ...baseGetFriendInfosReq } as GetFriendInfosReq;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GetFriendInfosReq): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendInfosReq>): GetFriendInfosReq {
    const message = { ...baseGetFriendInfosReq } as GetFriendInfosReq;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GetFriendInfosReq.$type, GetFriendInfosReq);

const baseFriendInfo: object = {
  $type: "message.FriendInfo",
  FriendID: Long.UZERO,
  NickName: "",
  Username: "",
  Description: "",
  Remark: "",
  Avatar: "",
  Gender: 0,
  IsDisturb: false,
  IsBlacklist: false,
  IsTop: false,
};

export const FriendInfo = {
  $type: "message.FriendInfo" as const,

  encode(
    message: FriendInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    if (message.NickName !== "") {
      writer.uint32(18).string(message.NickName);
    }
    if (message.Username !== "") {
      writer.uint32(26).string(message.Username);
    }
    if (message.Description !== "") {
      writer.uint32(34).string(message.Description);
    }
    if (message.Remark !== "") {
      writer.uint32(42).string(message.Remark);
    }
    if (message.Avatar !== "") {
      writer.uint32(50).string(message.Avatar);
    }
    if (message.Gender !== 0) {
      writer.uint32(56).int32(message.Gender);
    }
    if (message.IsDisturb === true) {
      writer.uint32(64).bool(message.IsDisturb);
    }
    if (message.IsBlacklist === true) {
      writer.uint32(72).bool(message.IsBlacklist);
    }
    if (message.IsTop === true) {
      writer.uint32(80).bool(message.IsTop);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendInfo } as FriendInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        case 2:
          message.NickName = reader.string();
          break;
        case 3:
          message.Username = reader.string();
          break;
        case 4:
          message.Description = reader.string();
          break;
        case 5:
          message.Remark = reader.string();
          break;
        case 6:
          message.Avatar = reader.string();
          break;
        case 7:
          message.Gender = reader.int32() as any;
          break;
        case 8:
          message.IsDisturb = reader.bool();
          break;
        case 9:
          message.IsBlacklist = reader.bool();
          break;
        case 10:
          message.IsTop = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendInfo {
    const message = { ...baseFriendInfo } as FriendInfo;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.NickName =
      object.NickName !== undefined && object.NickName !== null
        ? String(object.NickName)
        : "";
    message.Username =
      object.Username !== undefined && object.Username !== null
        ? String(object.Username)
        : "";
    message.Description =
      object.Description !== undefined && object.Description !== null
        ? String(object.Description)
        : "";
    message.Remark =
      object.Remark !== undefined && object.Remark !== null
        ? String(object.Remark)
        : "";
    message.Avatar =
      object.Avatar !== undefined && object.Avatar !== null
        ? String(object.Avatar)
        : "";
    message.Gender =
      object.Gender !== undefined && object.Gender !== null
        ? genderFromJSON(object.Gender)
        : 0;
    message.IsDisturb =
      object.IsDisturb !== undefined && object.IsDisturb !== null
        ? Boolean(object.IsDisturb)
        : false;
    message.IsBlacklist =
      object.IsBlacklist !== undefined && object.IsBlacklist !== null
        ? Boolean(object.IsBlacklist)
        : false;
    message.IsTop =
      object.IsTop !== undefined && object.IsTop !== null
        ? Boolean(object.IsTop)
        : false;
    return message;
  },

  toJSON(message: FriendInfo): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.NickName !== undefined && (obj.NickName = message.NickName);
    message.Username !== undefined && (obj.Username = message.Username);
    message.Description !== undefined &&
      (obj.Description = message.Description);
    message.Remark !== undefined && (obj.Remark = message.Remark);
    message.Avatar !== undefined && (obj.Avatar = message.Avatar);
    message.Gender !== undefined && (obj.Gender = genderToJSON(message.Gender));
    message.IsDisturb !== undefined && (obj.IsDisturb = message.IsDisturb);
    message.IsBlacklist !== undefined &&
      (obj.IsBlacklist = message.IsBlacklist);
    message.IsTop !== undefined && (obj.IsTop = message.IsTop);
    return obj;
  },

  fromPartial(object: DeepPartial<FriendInfo>): FriendInfo {
    const message = { ...baseFriendInfo } as FriendInfo;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.NickName = object.NickName ?? "";
    message.Username = object.Username ?? "";
    message.Description = object.Description ?? "";
    message.Remark = object.Remark ?? "";
    message.Avatar = object.Avatar ?? "";
    message.Gender = object.Gender ?? 0;
    message.IsDisturb = object.IsDisturb ?? false;
    message.IsBlacklist = object.IsBlacklist ?? false;
    message.IsTop = object.IsTop ?? false;
    return message;
  },
};

messageTypeRegistry.set(FriendInfo.$type, FriendInfo);

const baseGetFriendInfosRsp: object = { $type: "message.GetFriendInfosRsp" };

export const GetFriendInfosRsp = {
  $type: "message.GetFriendInfosRsp" as const,

  encode(
    message: GetFriendInfosRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.FriendInfos) {
      FriendInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendInfosRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendInfosRsp } as GetFriendInfosRsp;
    message.FriendInfos = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendInfos.push(FriendInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendInfosRsp {
    const message = { ...baseGetFriendInfosRsp } as GetFriendInfosRsp;
    message.FriendInfos = (object.FriendInfos ?? []).map((e: any) =>
      FriendInfo.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetFriendInfosRsp): unknown {
    const obj: any = {};
    if (message.FriendInfos) {
      obj.FriendInfos = message.FriendInfos.map((e) =>
        e ? FriendInfo.toJSON(e) : undefined
      );
    } else {
      obj.FriendInfos = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendInfosRsp>): GetFriendInfosRsp {
    const message = { ...baseGetFriendInfosRsp } as GetFriendInfosRsp;
    message.FriendInfos = (object.FriendInfos ?? []).map((e) =>
      FriendInfo.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(GetFriendInfosRsp.$type, GetFriendInfosRsp);

const baseGetFriendInfoReq: object = {
  $type: "message.GetFriendInfoReq",
  UserID: Long.UZERO,
  FriendID: Long.UZERO,
};

export const GetFriendInfoReq = {
  $type: "message.GetFriendInfoReq" as const,

  encode(
    message: GetFriendInfoReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (!message.FriendID.isZero()) {
      writer.uint32(16).uint64(message.FriendID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendInfoReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendInfoReq } as GetFriendInfoReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.FriendID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendInfoReq {
    const message = { ...baseGetFriendInfoReq } as GetFriendInfoReq;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GetFriendInfoReq): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendInfoReq>): GetFriendInfoReq {
    const message = { ...baseGetFriendInfoReq } as GetFriendInfoReq;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GetFriendInfoReq.$type, GetFriendInfoReq);

const baseGetFriendInfoRsp: object = { $type: "message.GetFriendInfoRsp" };

export const GetFriendInfoRsp = {
  $type: "message.GetFriendInfoRsp" as const,

  encode(
    message: GetFriendInfoRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.FriendInfo !== undefined) {
      FriendInfo.encode(message.FriendInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFriendInfoRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFriendInfoRsp } as GetFriendInfoRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendInfo = FriendInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFriendInfoRsp {
    const message = { ...baseGetFriendInfoRsp } as GetFriendInfoRsp;
    message.FriendInfo =
      object.FriendInfo !== undefined && object.FriendInfo !== null
        ? FriendInfo.fromJSON(object.FriendInfo)
        : undefined;
    return message;
  },

  toJSON(message: GetFriendInfoRsp): unknown {
    const obj: any = {};
    message.FriendInfo !== undefined &&
      (obj.FriendInfo = message.FriendInfo
        ? FriendInfo.toJSON(message.FriendInfo)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetFriendInfoRsp>): GetFriendInfoRsp {
    const message = { ...baseGetFriendInfoRsp } as GetFriendInfoRsp;
    message.FriendInfo =
      object.FriendInfo !== undefined && object.FriendInfo !== null
        ? FriendInfo.fromPartial(object.FriendInfo)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetFriendInfoRsp.$type, GetFriendInfoRsp);

const baseFriendDisturbReq: object = {
  $type: "message.FriendDisturbReq",
  FriendID: Long.UZERO,
  IsDisturb: false,
};

export const FriendDisturbReq = {
  $type: "message.FriendDisturbReq" as const,

  encode(
    message: FriendDisturbReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    if (message.IsDisturb === true) {
      writer.uint32(16).bool(message.IsDisturb);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendDisturbReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendDisturbReq } as FriendDisturbReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        case 2:
          message.IsDisturb = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendDisturbReq {
    const message = { ...baseFriendDisturbReq } as FriendDisturbReq;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.IsDisturb =
      object.IsDisturb !== undefined && object.IsDisturb !== null
        ? Boolean(object.IsDisturb)
        : false;
    return message;
  },

  toJSON(message: FriendDisturbReq): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.IsDisturb !== undefined && (obj.IsDisturb = message.IsDisturb);
    return obj;
  },

  fromPartial(object: DeepPartial<FriendDisturbReq>): FriendDisturbReq {
    const message = { ...baseFriendDisturbReq } as FriendDisturbReq;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.IsDisturb = object.IsDisturb ?? false;
    return message;
  },
};

messageTypeRegistry.set(FriendDisturbReq.$type, FriendDisturbReq);

const baseFriendDisturbRsp: object = { $type: "message.FriendDisturbRsp" };

export const FriendDisturbRsp = {
  $type: "message.FriendDisturbRsp" as const,

  encode(
    _: FriendDisturbRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendDisturbRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendDisturbRsp } as FriendDisturbRsp;
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

  fromJSON(_: any): FriendDisturbRsp {
    const message = { ...baseFriendDisturbRsp } as FriendDisturbRsp;
    return message;
  },

  toJSON(_: FriendDisturbRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<FriendDisturbRsp>): FriendDisturbRsp {
    const message = { ...baseFriendDisturbRsp } as FriendDisturbRsp;
    return message;
  },
};

messageTypeRegistry.set(FriendDisturbRsp.$type, FriendDisturbRsp);

const baseFriendBlacklistReq: object = {
  $type: "message.FriendBlacklistReq",
  FriendID: Long.UZERO,
  IsBlacklist: false,
};

export const FriendBlacklistReq = {
  $type: "message.FriendBlacklistReq" as const,

  encode(
    message: FriendBlacklistReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    if (message.IsBlacklist === true) {
      writer.uint32(16).bool(message.IsBlacklist);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendBlacklistReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendBlacklistReq } as FriendBlacklistReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        case 2:
          message.IsBlacklist = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendBlacklistReq {
    const message = { ...baseFriendBlacklistReq } as FriendBlacklistReq;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.IsBlacklist =
      object.IsBlacklist !== undefined && object.IsBlacklist !== null
        ? Boolean(object.IsBlacklist)
        : false;
    return message;
  },

  toJSON(message: FriendBlacklistReq): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.IsBlacklist !== undefined &&
      (obj.IsBlacklist = message.IsBlacklist);
    return obj;
  },

  fromPartial(object: DeepPartial<FriendBlacklistReq>): FriendBlacklistReq {
    const message = { ...baseFriendBlacklistReq } as FriendBlacklistReq;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.IsBlacklist = object.IsBlacklist ?? false;
    return message;
  },
};

messageTypeRegistry.set(FriendBlacklistReq.$type, FriendBlacklistReq);

const baseFriendBlacklistRsp: object = { $type: "message.FriendBlacklistRsp" };

export const FriendBlacklistRsp = {
  $type: "message.FriendBlacklistRsp" as const,

  encode(
    _: FriendBlacklistRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendBlacklistRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendBlacklistRsp } as FriendBlacklistRsp;
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

  fromJSON(_: any): FriendBlacklistRsp {
    const message = { ...baseFriendBlacklistRsp } as FriendBlacklistRsp;
    return message;
  },

  toJSON(_: FriendBlacklistRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<FriendBlacklistRsp>): FriendBlacklistRsp {
    const message = { ...baseFriendBlacklistRsp } as FriendBlacklistRsp;
    return message;
  },
};

messageTypeRegistry.set(FriendBlacklistRsp.$type, FriendBlacklistRsp);

const baseDeleteFriendReq: object = {
  $type: "message.DeleteFriendReq",
  UserID: Long.UZERO,
  FriendID: Long.UZERO,
};

export const DeleteFriendReq = {
  $type: "message.DeleteFriendReq" as const,

  encode(
    message: DeleteFriendReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (!message.FriendID.isZero()) {
      writer.uint32(16).uint64(message.FriendID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFriendReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteFriendReq } as DeleteFriendReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.FriendID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteFriendReq {
    const message = { ...baseDeleteFriendReq } as DeleteFriendReq;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: DeleteFriendReq): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteFriendReq>): DeleteFriendReq {
    const message = { ...baseDeleteFriendReq } as DeleteFriendReq;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(DeleteFriendReq.$type, DeleteFriendReq);

const baseDeleteFriendRsp: object = { $type: "message.DeleteFriendRsp" };

export const DeleteFriendRsp = {
  $type: "message.DeleteFriendRsp" as const,

  encode(
    _: DeleteFriendRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFriendRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteFriendRsp } as DeleteFriendRsp;
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

  fromJSON(_: any): DeleteFriendRsp {
    const message = { ...baseDeleteFriendRsp } as DeleteFriendRsp;
    return message;
  },

  toJSON(_: DeleteFriendRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<DeleteFriendRsp>): DeleteFriendRsp {
    const message = { ...baseDeleteFriendRsp } as DeleteFriendRsp;
    return message;
  },
};

messageTypeRegistry.set(DeleteFriendRsp.$type, DeleteFriendRsp);

const baseGetAllFriendsReq: object = {
  $type: "message.GetAllFriendsReq",
  UserID: Long.UZERO,
};

export const GetAllFriendsReq = {
  $type: "message.GetAllFriendsReq" as const,

  encode(
    message: GetAllFriendsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllFriendsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAllFriendsReq } as GetAllFriendsReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAllFriendsReq {
    const message = { ...baseGetAllFriendsReq } as GetAllFriendsReq;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GetAllFriendsReq): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetAllFriendsReq>): GetAllFriendsReq {
    const message = { ...baseGetAllFriendsReq } as GetAllFriendsReq;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GetAllFriendsReq.$type, GetAllFriendsReq);

const baseGetAllFriendsRsp: object = { $type: "message.GetAllFriendsRsp" };

export const GetAllFriendsRsp = {
  $type: "message.GetAllFriendsRsp" as const,

  encode(
    message: GetAllFriendsRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.FriendInfos) {
      FriendInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllFriendsRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAllFriendsRsp } as GetAllFriendsRsp;
    message.FriendInfos = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendInfos.push(FriendInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAllFriendsRsp {
    const message = { ...baseGetAllFriendsRsp } as GetAllFriendsRsp;
    message.FriendInfos = (object.FriendInfos ?? []).map((e: any) =>
      FriendInfo.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetAllFriendsRsp): unknown {
    const obj: any = {};
    if (message.FriendInfos) {
      obj.FriendInfos = message.FriendInfos.map((e) =>
        e ? FriendInfo.toJSON(e) : undefined
      );
    } else {
      obj.FriendInfos = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetAllFriendsRsp>): GetAllFriendsRsp {
    const message = { ...baseGetAllFriendsRsp } as GetAllFriendsRsp;
    message.FriendInfos = (object.FriendInfos ?? []).map((e) =>
      FriendInfo.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(GetAllFriendsRsp.$type, GetAllFriendsRsp);

const baseGetAddFriendApplicationsReq: object = {
  $type: "message.GetAddFriendApplicationsReq",
  UserID: Long.UZERO,
  LastAddFriendApplicationID: Long.UZERO,
  Size: 0,
};

export const GetAddFriendApplicationsReq = {
  $type: "message.GetAddFriendApplicationsReq" as const,

  encode(
    message: GetAddFriendApplicationsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (!message.LastAddFriendApplicationID.isZero()) {
      writer.uint32(16).uint64(message.LastAddFriendApplicationID);
    }
    if (message.Size !== 0) {
      writer.uint32(24).uint32(message.Size);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAddFriendApplicationsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetAddFriendApplicationsReq,
    } as GetAddFriendApplicationsReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.LastAddFriendApplicationID = reader.uint64() as Long;
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

  fromJSON(object: any): GetAddFriendApplicationsReq {
    const message = {
      ...baseGetAddFriendApplicationsReq,
    } as GetAddFriendApplicationsReq;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.LastAddFriendApplicationID =
      object.LastAddFriendApplicationID !== undefined &&
      object.LastAddFriendApplicationID !== null
        ? Long.fromString(object.LastAddFriendApplicationID)
        : Long.UZERO;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: GetAddFriendApplicationsReq): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.LastAddFriendApplicationID !== undefined &&
      (obj.LastAddFriendApplicationID = (
        message.LastAddFriendApplicationID || Long.UZERO
      ).toString());
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetAddFriendApplicationsReq>
  ): GetAddFriendApplicationsReq {
    const message = {
      ...baseGetAddFriendApplicationsReq,
    } as GetAddFriendApplicationsReq;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    if (
      object.LastAddFriendApplicationID !== undefined &&
      object.LastAddFriendApplicationID !== null
    ) {
      message.LastAddFriendApplicationID =
        object.LastAddFriendApplicationID as Long;
    } else {
      message.LastAddFriendApplicationID = Long.UZERO;
    }
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(
  GetAddFriendApplicationsReq.$type,
  GetAddFriendApplicationsReq
);

const baseAddFriendApplication: object = {
  $type: "message.AddFriendApplication",
  AddFriendApplicationID: Long.UZERO,
  ApplicantID: Long.UZERO,
  FriendID: Long.UZERO,
  ApplicationMsg: "",
  FriendReply: "",
  Status: 0,
  ApplicationTime: Long.UZERO,
};

export const AddFriendApplication = {
  $type: "message.AddFriendApplication" as const,

  encode(
    message: AddFriendApplication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    if (!message.ApplicantID.isZero()) {
      writer.uint32(16).uint64(message.ApplicantID);
    }
    if (!message.FriendID.isZero()) {
      writer.uint32(24).uint64(message.FriendID);
    }
    if (message.ApplicationMsg !== "") {
      writer.uint32(34).string(message.ApplicationMsg);
    }
    if (message.FriendReply !== "") {
      writer.uint32(42).string(message.FriendReply);
    }
    if (message.Status !== 0) {
      writer.uint32(48).int32(message.Status);
    }
    if (!message.ApplicationTime.isZero()) {
      writer.uint32(56).uint64(message.ApplicationTime);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddFriendApplication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddFriendApplication } as AddFriendApplication;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        case 2:
          message.ApplicantID = reader.uint64() as Long;
          break;
        case 3:
          message.FriendID = reader.uint64() as Long;
          break;
        case 4:
          message.ApplicationMsg = reader.string();
          break;
        case 5:
          message.FriendReply = reader.string();
          break;
        case 6:
          message.Status = reader.int32() as any;
          break;
        case 7:
          message.ApplicationTime = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddFriendApplication {
    const message = { ...baseAddFriendApplication } as AddFriendApplication;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    message.ApplicantID =
      object.ApplicantID !== undefined && object.ApplicantID !== null
        ? Long.fromString(object.ApplicantID)
        : Long.UZERO;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.ApplicationMsg =
      object.ApplicationMsg !== undefined && object.ApplicationMsg !== null
        ? String(object.ApplicationMsg)
        : "";
    message.FriendReply =
      object.FriendReply !== undefined && object.FriendReply !== null
        ? String(object.FriendReply)
        : "";
    message.Status =
      object.Status !== undefined && object.Status !== null
        ? addFriendApplicationStatusFromJSON(object.Status)
        : 0;
    message.ApplicationTime =
      object.ApplicationTime !== undefined && object.ApplicationTime !== null
        ? Long.fromString(object.ApplicationTime)
        : Long.UZERO;
    return message;
  },

  toJSON(message: AddFriendApplication): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    message.ApplicantID !== undefined &&
      (obj.ApplicantID = (message.ApplicantID || Long.UZERO).toString());
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.ApplicationMsg !== undefined &&
      (obj.ApplicationMsg = message.ApplicationMsg);
    message.FriendReply !== undefined &&
      (obj.FriendReply = message.FriendReply);
    message.Status !== undefined &&
      (obj.Status = addFriendApplicationStatusToJSON(message.Status));
    message.ApplicationTime !== undefined &&
      (obj.ApplicationTime = (
        message.ApplicationTime || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<AddFriendApplication>): AddFriendApplication {
    const message = { ...baseAddFriendApplication } as AddFriendApplication;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    if (object.ApplicantID !== undefined && object.ApplicantID !== null) {
      message.ApplicantID = object.ApplicantID as Long;
    } else {
      message.ApplicantID = Long.UZERO;
    }
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.ApplicationMsg = object.ApplicationMsg ?? "";
    message.FriendReply = object.FriendReply ?? "";
    message.Status = object.Status ?? 0;
    if (
      object.ApplicationTime !== undefined &&
      object.ApplicationTime !== null
    ) {
      message.ApplicationTime = object.ApplicationTime as Long;
    } else {
      message.ApplicationTime = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(AddFriendApplication.$type, AddFriendApplication);

const baseGetAddFriendApplicationsRsp: object = {
  $type: "message.GetAddFriendApplicationsRsp",
};

export const GetAddFriendApplicationsRsp = {
  $type: "message.GetAddFriendApplicationsRsp" as const,

  encode(
    message: GetAddFriendApplicationsRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.AddFriendApplications) {
      AddFriendApplication.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAddFriendApplicationsRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetAddFriendApplicationsRsp,
    } as GetAddFriendApplicationsRsp;
    message.AddFriendApplications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplications.push(
            AddFriendApplication.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAddFriendApplicationsRsp {
    const message = {
      ...baseGetAddFriendApplicationsRsp,
    } as GetAddFriendApplicationsRsp;
    message.AddFriendApplications = (object.AddFriendApplications ?? []).map(
      (e: any) => AddFriendApplication.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GetAddFriendApplicationsRsp): unknown {
    const obj: any = {};
    if (message.AddFriendApplications) {
      obj.AddFriendApplications = message.AddFriendApplications.map((e) =>
        e ? AddFriendApplication.toJSON(e) : undefined
      );
    } else {
      obj.AddFriendApplications = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetAddFriendApplicationsRsp>
  ): GetAddFriendApplicationsRsp {
    const message = {
      ...baseGetAddFriendApplicationsRsp,
    } as GetAddFriendApplicationsRsp;
    message.AddFriendApplications = (object.AddFriendApplications ?? []).map(
      (e) => AddFriendApplication.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(
  GetAddFriendApplicationsRsp.$type,
  GetAddFriendApplicationsRsp
);

const baseAddFriendApplicationReq: object = {
  $type: "message.AddFriendApplicationReq",
  ApplicantID: Long.UZERO,
  FriendID: Long.UZERO,
  ApplicationMsg: "",
};

export const AddFriendApplicationReq = {
  $type: "message.AddFriendApplicationReq" as const,

  encode(
    message: AddFriendApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.ApplicantID.isZero()) {
      writer.uint32(8).uint64(message.ApplicantID);
    }
    if (!message.FriendID.isZero()) {
      writer.uint32(16).uint64(message.FriendID);
    }
    if (message.ApplicationMsg !== "") {
      writer.uint32(26).string(message.ApplicationMsg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddFriendApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAddFriendApplicationReq,
    } as AddFriendApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ApplicantID = reader.uint64() as Long;
          break;
        case 2:
          message.FriendID = reader.uint64() as Long;
          break;
        case 3:
          message.ApplicationMsg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddFriendApplicationReq {
    const message = {
      ...baseAddFriendApplicationReq,
    } as AddFriendApplicationReq;
    message.ApplicantID =
      object.ApplicantID !== undefined && object.ApplicantID !== null
        ? Long.fromString(object.ApplicantID)
        : Long.UZERO;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.ApplicationMsg =
      object.ApplicationMsg !== undefined && object.ApplicationMsg !== null
        ? String(object.ApplicationMsg)
        : "";
    return message;
  },

  toJSON(message: AddFriendApplicationReq): unknown {
    const obj: any = {};
    message.ApplicantID !== undefined &&
      (obj.ApplicantID = (message.ApplicantID || Long.UZERO).toString());
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.ApplicationMsg !== undefined &&
      (obj.ApplicationMsg = message.ApplicationMsg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AddFriendApplicationReq>
  ): AddFriendApplicationReq {
    const message = {
      ...baseAddFriendApplicationReq,
    } as AddFriendApplicationReq;
    if (object.ApplicantID !== undefined && object.ApplicantID !== null) {
      message.ApplicantID = object.ApplicantID as Long;
    } else {
      message.ApplicantID = Long.UZERO;
    }
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.ApplicationMsg = object.ApplicationMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(AddFriendApplicationReq.$type, AddFriendApplicationReq);

const baseAddFriendApplicationRsp: object = {
  $type: "message.AddFriendApplicationRsp",
  AddFriendApplicationID: Long.UZERO,
};

export const AddFriendApplicationRsp = {
  $type: "message.AddFriendApplicationRsp" as const,

  encode(
    message: AddFriendApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddFriendApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAddFriendApplicationRsp,
    } as AddFriendApplicationRsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddFriendApplicationRsp {
    const message = {
      ...baseAddFriendApplicationRsp,
    } as AddFriendApplicationRsp;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: AddFriendApplicationRsp): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AddFriendApplicationRsp>
  ): AddFriendApplicationRsp {
    const message = {
      ...baseAddFriendApplicationRsp,
    } as AddFriendApplicationRsp;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(AddFriendApplicationRsp.$type, AddFriendApplicationRsp);

const baseUpdateAddFriendApplicationApplicationMsgReq: object = {
  $type: "message.UpdateAddFriendApplicationApplicationMsgReq",
  AddFriendApplicationID: Long.UZERO,
  ApplicationMsg: "",
};

export const UpdateAddFriendApplicationApplicationMsgReq = {
  $type: "message.UpdateAddFriendApplicationApplicationMsgReq" as const,

  encode(
    message: UpdateAddFriendApplicationApplicationMsgReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    if (message.ApplicationMsg !== "") {
      writer.uint32(18).string(message.ApplicationMsg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateAddFriendApplicationApplicationMsgReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgReq,
    } as UpdateAddFriendApplicationApplicationMsgReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        case 2:
          message.ApplicationMsg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAddFriendApplicationApplicationMsgReq {
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgReq,
    } as UpdateAddFriendApplicationApplicationMsgReq;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    message.ApplicationMsg =
      object.ApplicationMsg !== undefined && object.ApplicationMsg !== null
        ? String(object.ApplicationMsg)
        : "";
    return message;
  },

  toJSON(message: UpdateAddFriendApplicationApplicationMsgReq): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    message.ApplicationMsg !== undefined &&
      (obj.ApplicationMsg = message.ApplicationMsg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateAddFriendApplicationApplicationMsgReq>
  ): UpdateAddFriendApplicationApplicationMsgReq {
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgReq,
    } as UpdateAddFriendApplicationApplicationMsgReq;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    message.ApplicationMsg = object.ApplicationMsg ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  UpdateAddFriendApplicationApplicationMsgReq.$type,
  UpdateAddFriendApplicationApplicationMsgReq
);

const baseUpdateAddFriendApplicationApplicationMsgRsp: object = {
  $type: "message.UpdateAddFriendApplicationApplicationMsgRsp",
};

export const UpdateAddFriendApplicationApplicationMsgRsp = {
  $type: "message.UpdateAddFriendApplicationApplicationMsgRsp" as const,

  encode(
    _: UpdateAddFriendApplicationApplicationMsgRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateAddFriendApplicationApplicationMsgRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgRsp,
    } as UpdateAddFriendApplicationApplicationMsgRsp;
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

  fromJSON(_: any): UpdateAddFriendApplicationApplicationMsgRsp {
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgRsp,
    } as UpdateAddFriendApplicationApplicationMsgRsp;
    return message;
  },

  toJSON(_: UpdateAddFriendApplicationApplicationMsgRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<UpdateAddFriendApplicationApplicationMsgRsp>
  ): UpdateAddFriendApplicationApplicationMsgRsp {
    const message = {
      ...baseUpdateAddFriendApplicationApplicationMsgRsp,
    } as UpdateAddFriendApplicationApplicationMsgRsp;
    return message;
  },
};

messageTypeRegistry.set(
  UpdateAddFriendApplicationApplicationMsgRsp.$type,
  UpdateAddFriendApplicationApplicationMsgRsp
);

const baseUpdateAddFriendApplicationFriendReplyReq: object = {
  $type: "message.UpdateAddFriendApplicationFriendReplyReq",
  AddFriendApplicationID: Long.UZERO,
  FriendReply: "",
};

export const UpdateAddFriendApplicationFriendReplyReq = {
  $type: "message.UpdateAddFriendApplicationFriendReplyReq" as const,

  encode(
    message: UpdateAddFriendApplicationFriendReplyReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    if (message.FriendReply !== "") {
      writer.uint32(18).string(message.FriendReply);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateAddFriendApplicationFriendReplyReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyReq,
    } as UpdateAddFriendApplicationFriendReplyReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        case 2:
          message.FriendReply = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAddFriendApplicationFriendReplyReq {
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyReq,
    } as UpdateAddFriendApplicationFriendReplyReq;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    message.FriendReply =
      object.FriendReply !== undefined && object.FriendReply !== null
        ? String(object.FriendReply)
        : "";
    return message;
  },

  toJSON(message: UpdateAddFriendApplicationFriendReplyReq): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    message.FriendReply !== undefined &&
      (obj.FriendReply = message.FriendReply);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateAddFriendApplicationFriendReplyReq>
  ): UpdateAddFriendApplicationFriendReplyReq {
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyReq,
    } as UpdateAddFriendApplicationFriendReplyReq;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    message.FriendReply = object.FriendReply ?? "";
    return message;
  },
};

messageTypeRegistry.set(
  UpdateAddFriendApplicationFriendReplyReq.$type,
  UpdateAddFriendApplicationFriendReplyReq
);

const baseUpdateAddFriendApplicationFriendReplyRsp: object = {
  $type: "message.UpdateAddFriendApplicationFriendReplyRsp",
};

export const UpdateAddFriendApplicationFriendReplyRsp = {
  $type: "message.UpdateAddFriendApplicationFriendReplyRsp" as const,

  encode(
    _: UpdateAddFriendApplicationFriendReplyRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateAddFriendApplicationFriendReplyRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyRsp,
    } as UpdateAddFriendApplicationFriendReplyRsp;
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

  fromJSON(_: any): UpdateAddFriendApplicationFriendReplyRsp {
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyRsp,
    } as UpdateAddFriendApplicationFriendReplyRsp;
    return message;
  },

  toJSON(_: UpdateAddFriendApplicationFriendReplyRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<UpdateAddFriendApplicationFriendReplyRsp>
  ): UpdateAddFriendApplicationFriendReplyRsp {
    const message = {
      ...baseUpdateAddFriendApplicationFriendReplyRsp,
    } as UpdateAddFriendApplicationFriendReplyRsp;
    return message;
  },
};

messageTypeRegistry.set(
  UpdateAddFriendApplicationFriendReplyRsp.$type,
  UpdateAddFriendApplicationFriendReplyRsp
);

const baseAcceptAddFriendApplicationReq: object = {
  $type: "message.AcceptAddFriendApplicationReq",
  AddFriendApplicationID: Long.UZERO,
};

export const AcceptAddFriendApplicationReq = {
  $type: "message.AcceptAddFriendApplicationReq" as const,

  encode(
    message: AcceptAddFriendApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcceptAddFriendApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAcceptAddFriendApplicationReq,
    } as AcceptAddFriendApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcceptAddFriendApplicationReq {
    const message = {
      ...baseAcceptAddFriendApplicationReq,
    } as AcceptAddFriendApplicationReq;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: AcceptAddFriendApplicationReq): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AcceptAddFriendApplicationReq>
  ): AcceptAddFriendApplicationReq {
    const message = {
      ...baseAcceptAddFriendApplicationReq,
    } as AcceptAddFriendApplicationReq;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  AcceptAddFriendApplicationReq.$type,
  AcceptAddFriendApplicationReq
);

const baseAcceptAddFriendApplicationRsp: object = {
  $type: "message.AcceptAddFriendApplicationRsp",
};

export const AcceptAddFriendApplicationRsp = {
  $type: "message.AcceptAddFriendApplicationRsp" as const,

  encode(
    _: AcceptAddFriendApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcceptAddFriendApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAcceptAddFriendApplicationRsp,
    } as AcceptAddFriendApplicationRsp;
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

  fromJSON(_: any): AcceptAddFriendApplicationRsp {
    const message = {
      ...baseAcceptAddFriendApplicationRsp,
    } as AcceptAddFriendApplicationRsp;
    return message;
  },

  toJSON(_: AcceptAddFriendApplicationRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<AcceptAddFriendApplicationRsp>
  ): AcceptAddFriendApplicationRsp {
    const message = {
      ...baseAcceptAddFriendApplicationRsp,
    } as AcceptAddFriendApplicationRsp;
    return message;
  },
};

messageTypeRegistry.set(
  AcceptAddFriendApplicationRsp.$type,
  AcceptAddFriendApplicationRsp
);

const baseRejectAddFriendApplicationReq: object = {
  $type: "message.RejectAddFriendApplicationReq",
  AddFriendApplicationID: Long.UZERO,
};

export const RejectAddFriendApplicationReq = {
  $type: "message.RejectAddFriendApplicationReq" as const,

  encode(
    message: RejectAddFriendApplicationReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.AddFriendApplicationID.isZero()) {
      writer.uint32(8).uint64(message.AddFriendApplicationID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RejectAddFriendApplicationReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRejectAddFriendApplicationReq,
    } as RejectAddFriendApplicationReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplicationID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RejectAddFriendApplicationReq {
    const message = {
      ...baseRejectAddFriendApplicationReq,
    } as RejectAddFriendApplicationReq;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: RejectAddFriendApplicationReq): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<RejectAddFriendApplicationReq>
  ): RejectAddFriendApplicationReq {
    const message = {
      ...baseRejectAddFriendApplicationReq,
    } as RejectAddFriendApplicationReq;
    if (
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
    ) {
      message.AddFriendApplicationID = object.AddFriendApplicationID as Long;
    } else {
      message.AddFriendApplicationID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  RejectAddFriendApplicationReq.$type,
  RejectAddFriendApplicationReq
);

const baseRejectAddFriendApplicationRsp: object = {
  $type: "message.RejectAddFriendApplicationRsp",
};

export const RejectAddFriendApplicationRsp = {
  $type: "message.RejectAddFriendApplicationRsp" as const,

  encode(
    _: RejectAddFriendApplicationRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RejectAddFriendApplicationRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRejectAddFriendApplicationRsp,
    } as RejectAddFriendApplicationRsp;
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

  fromJSON(_: any): RejectAddFriendApplicationRsp {
    const message = {
      ...baseRejectAddFriendApplicationRsp,
    } as RejectAddFriendApplicationRsp;
    return message;
  },

  toJSON(_: RejectAddFriendApplicationRsp): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<RejectAddFriendApplicationRsp>
  ): RejectAddFriendApplicationRsp {
    const message = {
      ...baseRejectAddFriendApplicationRsp,
    } as RejectAddFriendApplicationRsp;
    return message;
  },
};

messageTypeRegistry.set(
  RejectAddFriendApplicationRsp.$type,
  RejectAddFriendApplicationRsp
);

const baseAddFriendApplicationStore: object = {
  $type: "message.AddFriendApplicationStore",
};

export const AddFriendApplicationStore = {
  $type: "message.AddFriendApplicationStore" as const,

  encode(
    message: AddFriendApplicationStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.AddFriendApplication !== undefined) {
      AddFriendApplication.encode(
        message.AddFriendApplication,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddFriendApplicationStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAddFriendApplicationStore,
    } as AddFriendApplicationStore;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AddFriendApplication = AddFriendApplication.decode(
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

  fromJSON(object: any): AddFriendApplicationStore {
    const message = {
      ...baseAddFriendApplicationStore,
    } as AddFriendApplicationStore;
    message.AddFriendApplication =
      object.AddFriendApplication !== undefined &&
      object.AddFriendApplication !== null
        ? AddFriendApplication.fromJSON(object.AddFriendApplication)
        : undefined;
    return message;
  },

  toJSON(message: AddFriendApplicationStore): unknown {
    const obj: any = {};
    message.AddFriendApplication !== undefined &&
      (obj.AddFriendApplication = message.AddFriendApplication
        ? AddFriendApplication.toJSON(message.AddFriendApplication)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<AddFriendApplicationStore>
  ): AddFriendApplicationStore {
    const message = {
      ...baseAddFriendApplicationStore,
    } as AddFriendApplicationStore;
    message.AddFriendApplication =
      object.AddFriendApplication !== undefined &&
      object.AddFriendApplication !== null
        ? AddFriendApplication.fromPartial(object.AddFriendApplication)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(
  AddFriendApplicationStore.$type,
  AddFriendApplicationStore
);

const baseFriendStore: object = {
  $type: "message.FriendStore",
  UserID: Long.UZERO,
  FriendID: Long.UZERO,
  Username: "",
  Description: "",
  IsIgnoreMsg: false,
  IsBlacklist: false,
  IsTop: false,
  CreatedAt: Long.UZERO,
  UpdatedAt: Long.UZERO,
};

export const FriendStore = {
  $type: "message.FriendStore" as const,

  encode(
    message: FriendStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (!message.FriendID.isZero()) {
      writer.uint32(16).uint64(message.FriendID);
    }
    if (message.Username !== "") {
      writer.uint32(26).string(message.Username);
    }
    if (message.Description !== "") {
      writer.uint32(34).string(message.Description);
    }
    if (message.IsIgnoreMsg === true) {
      writer.uint32(40).bool(message.IsIgnoreMsg);
    }
    if (message.IsBlacklist === true) {
      writer.uint32(48).bool(message.IsBlacklist);
    }
    if (message.IsTop === true) {
      writer.uint32(56).bool(message.IsTop);
    }
    if (!message.CreatedAt.isZero()) {
      writer.uint32(64).uint64(message.CreatedAt);
    }
    if (!message.UpdatedAt.isZero()) {
      writer.uint32(72).uint64(message.UpdatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFriendStore } as FriendStore;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.FriendID = reader.uint64() as Long;
          break;
        case 3:
          message.Username = reader.string();
          break;
        case 4:
          message.Description = reader.string();
          break;
        case 5:
          message.IsIgnoreMsg = reader.bool();
          break;
        case 6:
          message.IsBlacklist = reader.bool();
          break;
        case 7:
          message.IsTop = reader.bool();
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

  fromJSON(object: any): FriendStore {
    const message = { ...baseFriendStore } as FriendStore;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    message.Username =
      object.Username !== undefined && object.Username !== null
        ? String(object.Username)
        : "";
    message.Description =
      object.Description !== undefined && object.Description !== null
        ? String(object.Description)
        : "";
    message.IsIgnoreMsg =
      object.IsIgnoreMsg !== undefined && object.IsIgnoreMsg !== null
        ? Boolean(object.IsIgnoreMsg)
        : false;
    message.IsBlacklist =
      object.IsBlacklist !== undefined && object.IsBlacklist !== null
        ? Boolean(object.IsBlacklist)
        : false;
    message.IsTop =
      object.IsTop !== undefined && object.IsTop !== null
        ? Boolean(object.IsTop)
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

  toJSON(message: FriendStore): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    message.Username !== undefined && (obj.Username = message.Username);
    message.Description !== undefined &&
      (obj.Description = message.Description);
    message.IsIgnoreMsg !== undefined &&
      (obj.IsIgnoreMsg = message.IsIgnoreMsg);
    message.IsBlacklist !== undefined &&
      (obj.IsBlacklist = message.IsBlacklist);
    message.IsTop !== undefined && (obj.IsTop = message.IsTop);
    message.CreatedAt !== undefined &&
      (obj.CreatedAt = (message.CreatedAt || Long.UZERO).toString());
    message.UpdatedAt !== undefined &&
      (obj.UpdatedAt = (message.UpdatedAt || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<FriendStore>): FriendStore {
    const message = { ...baseFriendStore } as FriendStore;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    message.Username = object.Username ?? "";
    message.Description = object.Description ?? "";
    message.IsIgnoreMsg = object.IsIgnoreMsg ?? false;
    message.IsBlacklist = object.IsBlacklist ?? false;
    message.IsTop = object.IsTop ?? false;
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

messageTypeRegistry.set(FriendStore.$type, FriendStore);

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
