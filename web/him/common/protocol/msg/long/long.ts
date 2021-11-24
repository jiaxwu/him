/* eslint-disable */
import { messageTypeRegistry } from "../../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  Terminal,
  terminalFromJSON,
  terminalToJSON,
} from "../../../../common/protocol/constant/constant";
import {
  TipType,
  Image,
  Voice,
  Video,
  File,
  tipTypeFromJSON,
  tipTypeToJSON,
} from "../../../../common/protocol/msg/content/content";

export const protobufPackage = "message";

/** 接收者类型 */
export enum ReceiverType {
  /** ReceiverTypeUnknown - 未知 */
  ReceiverTypeUnknown = 0,
  /** ReceiverTypeUser - 用户 */
  ReceiverTypeUser = 1,
  /** ReceiverTypeGroup - 群 */
  ReceiverTypeGroup = 2,
  UNRECOGNIZED = -1,
}

export function receiverTypeFromJSON(object: any): ReceiverType {
  switch (object) {
    case 0:
    case "ReceiverTypeUnknown":
      return ReceiverType.ReceiverTypeUnknown;
    case 1:
    case "ReceiverTypeUser":
      return ReceiverType.ReceiverTypeUser;
    case 2:
    case "ReceiverTypeGroup":
      return ReceiverType.ReceiverTypeGroup;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ReceiverType.UNRECOGNIZED;
  }
}

export function receiverTypeToJSON(object: ReceiverType): string {
  switch (object) {
    case ReceiverType.ReceiverTypeUnknown:
      return "ReceiverTypeUnknown";
    case ReceiverType.ReceiverTypeUser:
      return "ReceiverTypeUser";
    case ReceiverType.ReceiverTypeGroup:
      return "ReceiverTypeGroup";
    default:
      return "UNKNOWN";
  }
}

/** 发送者类型 */
export enum SenderType {
  /** SenderTypeUnknown - 未知 */
  SenderTypeUnknown = 0,
  /** SenderTypeUser - 用户 */
  SenderTypeUser = 1,
  /** SenderTypeSys - 系统 */
  SenderTypeSys = 2,
  UNRECOGNIZED = -1,
}

export function senderTypeFromJSON(object: any): SenderType {
  switch (object) {
    case 0:
    case "SenderTypeUnknown":
      return SenderType.SenderTypeUnknown;
    case 1:
    case "SenderTypeUser":
      return SenderType.SenderTypeUser;
    case 2:
    case "SenderTypeSys":
      return SenderType.SenderTypeSys;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SenderType.UNRECOGNIZED;
  }
}

export function senderTypeToJSON(object: SenderType): string {
  switch (object) {
    case SenderType.SenderTypeUnknown:
      return "SenderTypeUnknown";
    case SenderType.SenderTypeUser:
      return "SenderTypeUser";
    case SenderType.SenderTypeSys:
      return "SenderTypeSys";
    default:
      return "UNKNOWN";
  }
}

/**
 * 消息类型，消息会持久化存储
 * 通过客户端信箱编号同步机制，保证消息可靠性，同时客户端需要保证消息被成功处理
 * 消息通过事件推送给客户端
 */
export enum MsgType {
  /** MsgTypeUnknown - 未知 */
  MsgTypeUnknown = 0,
  /** MsgTypeText - 文字 */
  MsgTypeText = 1,
  /** MsgTypeImage - 图片 */
  MsgTypeImage = 2,
  /** MsgTypeVoice - 语音 */
  MsgTypeVoice = 3,
  /** MsgTypeVideo - 视频 */
  MsgTypeVideo = 4,
  /** MsgTypeTip - 提示 */
  MsgTypeTip = 5,
  /** MsgTypeFile - 文件 */
  MsgTypeFile = 6,
  /** MsgTypeWithdraw - 撤回 */
  MsgTypeWithdraw = 7,
  /** MsgTypeEvent - 事件 */
  MsgTypeEvent = 8,
  UNRECOGNIZED = -1,
}

export function msgTypeFromJSON(object: any): MsgType {
  switch (object) {
    case 0:
    case "MsgTypeUnknown":
      return MsgType.MsgTypeUnknown;
    case 1:
    case "MsgTypeText":
      return MsgType.MsgTypeText;
    case 2:
    case "MsgTypeImage":
      return MsgType.MsgTypeImage;
    case 3:
    case "MsgTypeVoice":
      return MsgType.MsgTypeVoice;
    case 4:
    case "MsgTypeVideo":
      return MsgType.MsgTypeVideo;
    case 5:
    case "MsgTypeTip":
      return MsgType.MsgTypeTip;
    case 6:
    case "MsgTypeFile":
      return MsgType.MsgTypeFile;
    case 7:
    case "MsgTypeWithdraw":
      return MsgType.MsgTypeWithdraw;
    case 8:
    case "MsgTypeEvent":
      return MsgType.MsgTypeEvent;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MsgType.UNRECOGNIZED;
  }
}

export function msgTypeToJSON(object: MsgType): string {
  switch (object) {
    case MsgType.MsgTypeUnknown:
      return "MsgTypeUnknown";
    case MsgType.MsgTypeText:
      return "MsgTypeText";
    case MsgType.MsgTypeImage:
      return "MsgTypeImage";
    case MsgType.MsgTypeVoice:
      return "MsgTypeVoice";
    case MsgType.MsgTypeVideo:
      return "MsgTypeVideo";
    case MsgType.MsgTypeTip:
      return "MsgTypeTip";
    case MsgType.MsgTypeFile:
      return "MsgTypeFile";
    case MsgType.MsgTypeWithdraw:
      return "MsgTypeWithdraw";
    case MsgType.MsgTypeEvent:
      return "MsgTypeEvent";
    default:
      return "UNKNOWN";
  }
}

/** 事件消息类型 */
export enum EventMsgType {
  /** EventMsgTypeUnknown - 未知 */
  EventMsgTypeUnknown = 0,
  /** EventMsgTypeNewFriend - 新的好友（你已添加了xx，现在可以开始聊天了tip） */
  EventMsgTypeNewFriend = 1,
  /** EventMsgTypeFriendInfoChange - 好友信息改变 */
  EventMsgTypeFriendInfoChange = 2,
  /** EventMsgTypeDeleteFriend - 删除好友（对方删除了你tip） */
  EventMsgTypeDeleteFriend = 3,
  /** EventMsgTypeNewAddFriendApplication - 新的添加好友申请 */
  EventMsgTypeNewAddFriendApplication = 4,
  /** EventMsgTypeAddFriendApplicationStatusChange - 添加好友申请状态改变 */
  EventMsgTypeAddFriendApplicationStatusChange = 5,
  /** EventMsgTypeNewGroup - 新的群（xx邀请xx，xxx，xxx等加入了群聊tip，你通过扫描xx分享的二维码加入群聊tip，xx邀请你加入了群聊tip） */
  EventMsgTypeNewGroup = 100,
  /** EventMsgTypeGroupInfoChange - 群信息改变（头像、群名、群公告，xx修改群名为xx tip） */
  EventMsgTypeGroupInfoChange = 101,
  /**
   * EventMsgTypeGroupMemberInfoChange - 群成员信息更改（换群主，管理员变动，xx成为了新的群主tip，xx成为了新的管理员）
   * 群成员加入（加入，邀请加入，xx通过扫描xx分析的二维码进群tip，xx邀请xx，xx，xx加入了群聊tip）
   * 群成员退出（退出，被踢，xx退出了群聊tip，xx被踢出群聊tip）
   */
  EventMsgTypeGroupMemberInfoChange = 102,
  /** EventMsgTypeNewJoinGroupEvent - 新的入群事件 */
  EventMsgTypeNewJoinGroupEvent = 103,
  /** EventMsgTypeJoinGroupEventChange - 入群事件改变 */
  EventMsgTypeJoinGroupEventChange = 104,
  UNRECOGNIZED = -1,
}

export function eventMsgTypeFromJSON(object: any): EventMsgType {
  switch (object) {
    case 0:
    case "EventMsgTypeUnknown":
      return EventMsgType.EventMsgTypeUnknown;
    case 1:
    case "EventMsgTypeNewFriend":
      return EventMsgType.EventMsgTypeNewFriend;
    case 2:
    case "EventMsgTypeFriendInfoChange":
      return EventMsgType.EventMsgTypeFriendInfoChange;
    case 3:
    case "EventMsgTypeDeleteFriend":
      return EventMsgType.EventMsgTypeDeleteFriend;
    case 4:
    case "EventMsgTypeNewAddFriendApplication":
      return EventMsgType.EventMsgTypeNewAddFriendApplication;
    case 5:
    case "EventMsgTypeAddFriendApplicationStatusChange":
      return EventMsgType.EventMsgTypeAddFriendApplicationStatusChange;
    case 100:
    case "EventMsgTypeNewGroup":
      return EventMsgType.EventMsgTypeNewGroup;
    case 101:
    case "EventMsgTypeGroupInfoChange":
      return EventMsgType.EventMsgTypeGroupInfoChange;
    case 102:
    case "EventMsgTypeGroupMemberInfoChange":
      return EventMsgType.EventMsgTypeGroupMemberInfoChange;
    case 103:
    case "EventMsgTypeNewJoinGroupEvent":
      return EventMsgType.EventMsgTypeNewJoinGroupEvent;
    case 104:
    case "EventMsgTypeJoinGroupEventChange":
      return EventMsgType.EventMsgTypeJoinGroupEventChange;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EventMsgType.UNRECOGNIZED;
  }
}

export function eventMsgTypeToJSON(object: EventMsgType): string {
  switch (object) {
    case EventMsgType.EventMsgTypeUnknown:
      return "EventMsgTypeUnknown";
    case EventMsgType.EventMsgTypeNewFriend:
      return "EventMsgTypeNewFriend";
    case EventMsgType.EventMsgTypeFriendInfoChange:
      return "EventMsgTypeFriendInfoChange";
    case EventMsgType.EventMsgTypeDeleteFriend:
      return "EventMsgTypeDeleteFriend";
    case EventMsgType.EventMsgTypeNewAddFriendApplication:
      return "EventMsgTypeNewAddFriendApplication";
    case EventMsgType.EventMsgTypeAddFriendApplicationStatusChange:
      return "EventMsgTypeAddFriendApplicationStatusChange";
    case EventMsgType.EventMsgTypeNewGroup:
      return "EventMsgTypeNewGroup";
    case EventMsgType.EventMsgTypeGroupInfoChange:
      return "EventMsgTypeGroupInfoChange";
    case EventMsgType.EventMsgTypeGroupMemberInfoChange:
      return "EventMsgTypeGroupMemberInfoChange";
    case EventMsgType.EventMsgTypeNewJoinGroupEvent:
      return "EventMsgTypeNewJoinGroupEvent";
    case EventMsgType.EventMsgTypeJoinGroupEventChange:
      return "EventMsgTypeJoinGroupEventChange";
    default:
      return "UNKNOWN";
  }
}

/**
 * 事件类型
 * 会被发送到客户端，不会持久化，不可靠
 * 用于推送响应，消息或其他事件给客户端，同时客户端应该尽量保证消息被成功处理
 * 必须是客户端在线才会推送
 */
export enum EventType {
  /** EventTypeUnknown - 未知 */
  EventTypeUnknown = 0,
  /** EventTypeRsp - 响应，用户不一定收到，但是可以通过用户本地自行同步消息最终同步到消息 */
  EventTypeRsp = 1,
  /** EventTypeMsg - 消息，用户不一定收到，但是可以通过用户本地自行同步消息最终同步到消息 */
  EventTypeMsg = 2,
  UNRECOGNIZED = -1,
}

export function eventTypeFromJSON(object: any): EventType {
  switch (object) {
    case 0:
    case "EventTypeUnknown":
      return EventType.EventTypeUnknown;
    case 1:
    case "EventTypeRsp":
      return EventType.EventTypeRsp;
    case 2:
    case "EventTypeMsg":
      return EventType.EventTypeMsg;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EventType.UNRECOGNIZED;
  }
}

export function eventTypeToJSON(object: EventType): string {
  switch (object) {
    case EventType.EventTypeUnknown:
      return "EventTypeUnknown";
    case EventType.EventTypeRsp:
      return "EventTypeRsp";
    case EventType.EventTypeMsg:
      return "EventTypeMsg";
    default:
      return "UNKNOWN";
  }
}

/** 接收者 */
export interface Receiver {
  $type: "message.Receiver";
  /** 接收者类型 */
  Type: ReceiverType;
  /** 接收者编号 */
  ReceiverID: Long;
}

/** 发送者 */
export interface Sender {
  $type: "message.Sender";
  /** 发送者类型 */
  Type: SenderType;
  /** 发送者编号 */
  SenderID: Long;
  /** 发送者终端 */
  SenderTerminal: Terminal;
}

/** 消息 */
export interface Msg {
  $type: "message.Msg";
  /** 消息编号，全局唯一，根据到达服务器时间生成，可以用户消息排序（保证有序性） */
  MsgID: Long;
  /** 消息类型 */
  Type: MsgType;
  /** 发送者 */
  Sender: Long;
  /** 接收者 */
  Receiver: Receiver | undefined;
  /** 消息内容 */
  Content: Uint8Array;
  /** 发送时间，消息到达服务器时间 */
  SendTime: Long;
  /** 发送者终端 */
  SenderTerminal: Terminal;
  /**
   * 发送者的一个终端的一个请求的唯一标识
   * （避免消息重复，比如消息发送成功，但是用户没有收到响应（断网），
   * 再回来的时候同步消息，通过CorrelationID就可以把发送失败的消息设置为发送成功）
   * 唯一标识可以是 UUID_IncrementID
   */
  CorrelationID: string;
}

/** 文本消息 */
export interface TextMsg {
  $type: "message.TextMsg";
  /** 文本消息内容 */
  Content: string;
  /** 是否@所有人 */
  IsAtAll: boolean;
  /** 是否群公告 */
  IsNotice: boolean;
  /** 被@的用户 */
  AtUserIDS: string[];
  /** 被引用消息编号 */
  QuotedMsgID: Long;
}

/** 图片消息 */
export interface ImageMsg {
  $type: "message.ImageMsg";
  /** 缩略图 */
  Thumbnail: Image | undefined;
  /** 原图 */
  OriginalImage: Image | undefined;
}

/** 语音消息 */
export interface VoiceMsg {
  $type: "message.VoiceMsg";
  /** 语音 */
  Voice: Voice | undefined;
}

/** 视频消息 */
export interface VideoMsg {
  $type: "message.VideoMsg";
  /** 缩略图 */
  Thumbnail: Image | undefined;
  /** 视频 */
  Video: Video | undefined;
}

/** 提示消息 */
export interface TipMsg {
  $type: "message.TipMsg";
  /** 提示类型 */
  Type: TipType;
  /** 提示内容 */
  Content: Uint8Array;
}

/** 文件消息 */
export interface FileMsg {
  $type: "message.FileMsg";
  /** 文件 */
  File: File | undefined;
}

/** 撤回消息 */
export interface WithdrawMsg {
  $type: "message.WithdrawMsg";
  /** 被撤回消息的编号 */
  MsgID: Long;
}

/** 新的好友事件消息 */
export interface NewFriendEventMsg {
  $type: "message.NewFriendEventMsg";
  /** 用户编号 */
  FriendID: Long;
}

/** 好友信息改变事件消息 */
export interface FriendInfoChangeEventMsg {
  $type: "message.FriendInfoChangeEventMsg";
  /** 用户编号 */
  FriendID: Long;
}

/** 删除好友事件消息 */
export interface DeleteFriendEventMsg {
  $type: "message.DeleteFriendEventMsg";
  /** 用户编号 */
  FriendID: Long;
}

/** 新的添加好友申请事件消息 */
export interface NewAddFriendApplicationEventMsg {
  $type: "message.NewAddFriendApplicationEventMsg";
}

/** 添加好友申请状态改变事件消息 */
export interface AddFriendApplicationStatusChangeEventMsg {
  $type: "message.AddFriendApplicationStatusChangeEventMsg";
  /** 状态改变的添加好友申请编号 */
  AddFriendApplicationID: Long;
}

/** 新的群事件消息 */
export interface NewGroupEventMsg {
  $type: "message.NewGroupEventMsg";
  /** 群编号 */
  GroupID: Long;
}

/** 群信息改变事件消息 */
export interface GroupInfoChangeEventMsg {
  $type: "message.GroupInfoChangeEventMsg";
  /** 群编号 */
  GroupID: Long;
}

/** 群成员信息改变事件消息（直接拉群群成员信息列表和本地比较进行同步） */
export interface GroupMemberInfoChangeEventMsg {
  $type: "message.GroupMemberInfoChangeEventMsg";
  /** 群编号 */
  GroupID: Long;
}

/** 新的入群事件事件消息 */
export interface NewJoinGroupEventEventMsg {
  $type: "message.NewJoinGroupEventEventMsg";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
}

/** 入群事件改变事件消息 */
export interface JoinGroupEventChangeEventMsg {
  $type: "message.JoinGroupEventChangeEventMsg";
  /** 入群事件编号 */
  JoinGroupEventID: Long;
}

/**
 * 事件消息
 * 事件消息用于需要保证客户端能够收到的事件
 * 本质上是消息，但是一般不用于展示，只用于通知
 */
export interface EventMsg {
  $type: "message.EventMsg";
  /** 事件消息类型 */
  Type: EventMsgType;
  /** 事件消息内容 */
  Content: Uint8Array;
}

/** 请求 */
export interface Req {
  $type: "message.Req";
  /** 发送者 */
  Sender: Sender | undefined;
  /** 请求唯一标识 */
  CorrelationID: Long;
  /** 消息类型 */
  Type: MsgType;
  /** 接收者 */
  Receiver: Receiver | undefined;
  /** 消息内容 */
  Content: Uint8Array;
}

/** 文本消息请求内容 */
export interface TextReqContent {
  $type: "message.TextReqContent";
  /** 内容 */
  Content: string;
}

/**
 * 图片消息请求内容
 * 会先上传图片，拿到图片的信息，然后再把这些信息上传
 */
export interface ImageReqContent {
  $type: "message.ImageReqContent";
  /** 缩略图 */
  Thumbnail: Image | undefined;
  /** 原图 */
  OriginalImage: Image | undefined;
}

/** 语音消息请求内容 */
export interface VoiceReqContent {
  $type: "message.VoiceReqContent";
  /** 语音 */
  Voice: Voice | undefined;
}

/** 视频消息请求内容 */
export interface VideoReqContent {
  $type: "message.VideoReqContent";
  /** 缩略图 */
  Thumbnail: Image | undefined;
  /** 视频 */
  Video: Video | undefined;
}

/** 文件消息请求内容 */
export interface FileReqContent {
  $type: "message.FileReqContent";
  /** 文件 */
  File: File | undefined;
}

/** 回撤消息请求内容 */
export interface WithdrawReqContent {
  $type: "message.WithdrawReqContent";
  /** 被撤回消息的编号 */
  MsgID: Long;
}

/** 响应 */
export interface Rsp {
  $type: "message.Rsp";
  /** 请求唯一标识 */
  CorrelationID: Long;
  /** 信箱里消息编号 */
  MailBoxMsgID: Long;
  /** 消息编号，递增 */
  MsgID: Long;
}

/** 事件，事件用于给用户推送消息 */
export interface Event {
  $type: "message.Event";
  /** 事件类型 */
  Type: EventType;
  /** 事件内容 */
  Content: Uint8Array;
}

/**
 * @存储模型
 * 信箱消息
 * 每个消息都会转换成信箱消息进行存储
 */
export interface MailBoxMsg {
  $type: "message.MailBoxMsg";
  /** 信箱拥有者用户编号 */
  UserID: Long;
  /** 信箱里消息编号，每个人一个信箱，信箱里消息编号会递增（保证不丢失消息） */
  MailBoxMsgID: Long;
  /** 消息 */
  Msg: Msg | undefined;
}

const baseReceiver: object = {
  $type: "message.Receiver",
  Type: 0,
  ReceiverID: Long.UZERO,
};

export const Receiver = {
  $type: "message.Receiver" as const,

  encode(
    message: Receiver,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (!message.ReceiverID.isZero()) {
      writer.uint32(16).uint64(message.ReceiverID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Receiver {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReceiver } as Receiver;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.ReceiverID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Receiver {
    const message = { ...baseReceiver } as Receiver;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? receiverTypeFromJSON(object.Type)
        : 0;
    message.ReceiverID =
      object.ReceiverID !== undefined && object.ReceiverID !== null
        ? Long.fromString(object.ReceiverID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: Receiver): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = receiverTypeToJSON(message.Type));
    message.ReceiverID !== undefined &&
      (obj.ReceiverID = (message.ReceiverID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Receiver>): Receiver {
    const message = { ...baseReceiver } as Receiver;
    message.Type = object.Type ?? 0;
    if (object.ReceiverID !== undefined && object.ReceiverID !== null) {
      message.ReceiverID = object.ReceiverID as Long;
    } else {
      message.ReceiverID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(Receiver.$type, Receiver);

const baseSender: object = {
  $type: "message.Sender",
  Type: 0,
  SenderID: Long.UZERO,
  SenderTerminal: 0,
};

export const Sender = {
  $type: "message.Sender" as const,

  encode(
    message: Sender,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (!message.SenderID.isZero()) {
      writer.uint32(16).uint64(message.SenderID);
    }
    if (message.SenderTerminal !== 0) {
      writer.uint32(24).int32(message.SenderTerminal);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sender {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSender } as Sender;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.SenderID = reader.uint64() as Long;
          break;
        case 3:
          message.SenderTerminal = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sender {
    const message = { ...baseSender } as Sender;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? senderTypeFromJSON(object.Type)
        : 0;
    message.SenderID =
      object.SenderID !== undefined && object.SenderID !== null
        ? Long.fromString(object.SenderID)
        : Long.UZERO;
    message.SenderTerminal =
      object.SenderTerminal !== undefined && object.SenderTerminal !== null
        ? terminalFromJSON(object.SenderTerminal)
        : 0;
    return message;
  },

  toJSON(message: Sender): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = senderTypeToJSON(message.Type));
    message.SenderID !== undefined &&
      (obj.SenderID = (message.SenderID || Long.UZERO).toString());
    message.SenderTerminal !== undefined &&
      (obj.SenderTerminal = terminalToJSON(message.SenderTerminal));
    return obj;
  },

  fromPartial(object: DeepPartial<Sender>): Sender {
    const message = { ...baseSender } as Sender;
    message.Type = object.Type ?? 0;
    if (object.SenderID !== undefined && object.SenderID !== null) {
      message.SenderID = object.SenderID as Long;
    } else {
      message.SenderID = Long.UZERO;
    }
    message.SenderTerminal = object.SenderTerminal ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Sender.$type, Sender);

const baseMsg: object = {
  $type: "message.Msg",
  MsgID: Long.UZERO,
  Type: 0,
  Sender: Long.UZERO,
  SendTime: Long.UZERO,
  SenderTerminal: 0,
  CorrelationID: "",
};

export const Msg = {
  $type: "message.Msg" as const,

  encode(message: Msg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.MsgID.isZero()) {
      writer.uint32(8).uint64(message.MsgID);
    }
    if (message.Type !== 0) {
      writer.uint32(16).int32(message.Type);
    }
    if (!message.Sender.isZero()) {
      writer.uint32(24).uint64(message.Sender);
    }
    if (message.Receiver !== undefined) {
      Receiver.encode(message.Receiver, writer.uint32(34).fork()).ldelim();
    }
    if (message.Content.length !== 0) {
      writer.uint32(42).bytes(message.Content);
    }
    if (!message.SendTime.isZero()) {
      writer.uint32(48).uint64(message.SendTime);
    }
    if (message.SenderTerminal !== 0) {
      writer.uint32(56).int32(message.SenderTerminal);
    }
    if (message.CorrelationID !== "") {
      writer.uint32(66).string(message.CorrelationID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Msg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsg } as Msg;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.MsgID = reader.uint64() as Long;
          break;
        case 2:
          message.Type = reader.int32() as any;
          break;
        case 3:
          message.Sender = reader.uint64() as Long;
          break;
        case 4:
          message.Receiver = Receiver.decode(reader, reader.uint32());
          break;
        case 5:
          message.Content = reader.bytes();
          break;
        case 6:
          message.SendTime = reader.uint64() as Long;
          break;
        case 7:
          message.SenderTerminal = reader.int32() as any;
          break;
        case 8:
          message.CorrelationID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Msg {
    const message = { ...baseMsg } as Msg;
    message.MsgID =
      object.MsgID !== undefined && object.MsgID !== null
        ? Long.fromString(object.MsgID)
        : Long.UZERO;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? msgTypeFromJSON(object.Type)
        : 0;
    message.Sender =
      object.Sender !== undefined && object.Sender !== null
        ? Long.fromString(object.Sender)
        : Long.UZERO;
    message.Receiver =
      object.Receiver !== undefined && object.Receiver !== null
        ? Receiver.fromJSON(object.Receiver)
        : undefined;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    message.SendTime =
      object.SendTime !== undefined && object.SendTime !== null
        ? Long.fromString(object.SendTime)
        : Long.UZERO;
    message.SenderTerminal =
      object.SenderTerminal !== undefined && object.SenderTerminal !== null
        ? terminalFromJSON(object.SenderTerminal)
        : 0;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? String(object.CorrelationID)
        : "";
    return message;
  },

  toJSON(message: Msg): unknown {
    const obj: any = {};
    message.MsgID !== undefined &&
      (obj.MsgID = (message.MsgID || Long.UZERO).toString());
    message.Type !== undefined && (obj.Type = msgTypeToJSON(message.Type));
    message.Sender !== undefined &&
      (obj.Sender = (message.Sender || Long.UZERO).toString());
    message.Receiver !== undefined &&
      (obj.Receiver = message.Receiver
        ? Receiver.toJSON(message.Receiver)
        : undefined);
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    message.SendTime !== undefined &&
      (obj.SendTime = (message.SendTime || Long.UZERO).toString());
    message.SenderTerminal !== undefined &&
      (obj.SenderTerminal = terminalToJSON(message.SenderTerminal));
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = message.CorrelationID);
    return obj;
  },

  fromPartial(object: DeepPartial<Msg>): Msg {
    const message = { ...baseMsg } as Msg;
    if (object.MsgID !== undefined && object.MsgID !== null) {
      message.MsgID = object.MsgID as Long;
    } else {
      message.MsgID = Long.UZERO;
    }
    message.Type = object.Type ?? 0;
    if (object.Sender !== undefined && object.Sender !== null) {
      message.Sender = object.Sender as Long;
    } else {
      message.Sender = Long.UZERO;
    }
    message.Receiver =
      object.Receiver !== undefined && object.Receiver !== null
        ? Receiver.fromPartial(object.Receiver)
        : undefined;
    message.Content = object.Content ?? new Uint8Array();
    if (object.SendTime !== undefined && object.SendTime !== null) {
      message.SendTime = object.SendTime as Long;
    } else {
      message.SendTime = Long.UZERO;
    }
    message.SenderTerminal = object.SenderTerminal ?? 0;
    message.CorrelationID = object.CorrelationID ?? "";
    return message;
  },
};

messageTypeRegistry.set(Msg.$type, Msg);

const baseTextMsg: object = {
  $type: "message.TextMsg",
  Content: "",
  IsAtAll: false,
  IsNotice: false,
  AtUserIDS: "",
  QuotedMsgID: Long.UZERO,
};

export const TextMsg = {
  $type: "message.TextMsg" as const,

  encode(
    message: TextMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Content !== "") {
      writer.uint32(10).string(message.Content);
    }
    if (message.IsAtAll === true) {
      writer.uint32(16).bool(message.IsAtAll);
    }
    if (message.IsNotice === true) {
      writer.uint32(24).bool(message.IsNotice);
    }
    for (const v of message.AtUserIDS) {
      writer.uint32(34).string(v!);
    }
    if (!message.QuotedMsgID.isZero()) {
      writer.uint32(40).uint64(message.QuotedMsgID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTextMsg } as TextMsg;
    message.AtUserIDS = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Content = reader.string();
          break;
        case 2:
          message.IsAtAll = reader.bool();
          break;
        case 3:
          message.IsNotice = reader.bool();
          break;
        case 4:
          message.AtUserIDS.push(reader.string());
          break;
        case 5:
          message.QuotedMsgID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TextMsg {
    const message = { ...baseTextMsg } as TextMsg;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? String(object.Content)
        : "";
    message.IsAtAll =
      object.IsAtAll !== undefined && object.IsAtAll !== null
        ? Boolean(object.IsAtAll)
        : false;
    message.IsNotice =
      object.IsNotice !== undefined && object.IsNotice !== null
        ? Boolean(object.IsNotice)
        : false;
    message.AtUserIDS = (object.AtUserIDS ?? []).map((e: any) => String(e));
    message.QuotedMsgID =
      object.QuotedMsgID !== undefined && object.QuotedMsgID !== null
        ? Long.fromString(object.QuotedMsgID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: TextMsg): unknown {
    const obj: any = {};
    message.Content !== undefined && (obj.Content = message.Content);
    message.IsAtAll !== undefined && (obj.IsAtAll = message.IsAtAll);
    message.IsNotice !== undefined && (obj.IsNotice = message.IsNotice);
    if (message.AtUserIDS) {
      obj.AtUserIDS = message.AtUserIDS.map((e) => e);
    } else {
      obj.AtUserIDS = [];
    }
    message.QuotedMsgID !== undefined &&
      (obj.QuotedMsgID = (message.QuotedMsgID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<TextMsg>): TextMsg {
    const message = { ...baseTextMsg } as TextMsg;
    message.Content = object.Content ?? "";
    message.IsAtAll = object.IsAtAll ?? false;
    message.IsNotice = object.IsNotice ?? false;
    message.AtUserIDS = (object.AtUserIDS ?? []).map((e) => e);
    if (object.QuotedMsgID !== undefined && object.QuotedMsgID !== null) {
      message.QuotedMsgID = object.QuotedMsgID as Long;
    } else {
      message.QuotedMsgID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(TextMsg.$type, TextMsg);

const baseImageMsg: object = { $type: "message.ImageMsg" };

export const ImageMsg = {
  $type: "message.ImageMsg" as const,

  encode(
    message: ImageMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Thumbnail !== undefined) {
      Image.encode(message.Thumbnail, writer.uint32(10).fork()).ldelim();
    }
    if (message.OriginalImage !== undefined) {
      Image.encode(message.OriginalImage, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImageMsg } as ImageMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Thumbnail = Image.decode(reader, reader.uint32());
          break;
        case 2:
          message.OriginalImage = Image.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageMsg {
    const message = { ...baseImageMsg } as ImageMsg;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromJSON(object.Thumbnail)
        : undefined;
    message.OriginalImage =
      object.OriginalImage !== undefined && object.OriginalImage !== null
        ? Image.fromJSON(object.OriginalImage)
        : undefined;
    return message;
  },

  toJSON(message: ImageMsg): unknown {
    const obj: any = {};
    message.Thumbnail !== undefined &&
      (obj.Thumbnail = message.Thumbnail
        ? Image.toJSON(message.Thumbnail)
        : undefined);
    message.OriginalImage !== undefined &&
      (obj.OriginalImage = message.OriginalImage
        ? Image.toJSON(message.OriginalImage)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ImageMsg>): ImageMsg {
    const message = { ...baseImageMsg } as ImageMsg;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromPartial(object.Thumbnail)
        : undefined;
    message.OriginalImage =
      object.OriginalImage !== undefined && object.OriginalImage !== null
        ? Image.fromPartial(object.OriginalImage)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(ImageMsg.$type, ImageMsg);

const baseVoiceMsg: object = { $type: "message.VoiceMsg" };

export const VoiceMsg = {
  $type: "message.VoiceMsg" as const,

  encode(
    message: VoiceMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Voice !== undefined) {
      Voice.encode(message.Voice, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVoiceMsg } as VoiceMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Voice = Voice.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceMsg {
    const message = { ...baseVoiceMsg } as VoiceMsg;
    message.Voice =
      object.Voice !== undefined && object.Voice !== null
        ? Voice.fromJSON(object.Voice)
        : undefined;
    return message;
  },

  toJSON(message: VoiceMsg): unknown {
    const obj: any = {};
    message.Voice !== undefined &&
      (obj.Voice = message.Voice ? Voice.toJSON(message.Voice) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<VoiceMsg>): VoiceMsg {
    const message = { ...baseVoiceMsg } as VoiceMsg;
    message.Voice =
      object.Voice !== undefined && object.Voice !== null
        ? Voice.fromPartial(object.Voice)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(VoiceMsg.$type, VoiceMsg);

const baseVideoMsg: object = { $type: "message.VideoMsg" };

export const VideoMsg = {
  $type: "message.VideoMsg" as const,

  encode(
    message: VideoMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Thumbnail !== undefined) {
      Image.encode(message.Thumbnail, writer.uint32(10).fork()).ldelim();
    }
    if (message.Video !== undefined) {
      Video.encode(message.Video, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVideoMsg } as VideoMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Thumbnail = Image.decode(reader, reader.uint32());
          break;
        case 2:
          message.Video = Video.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoMsg {
    const message = { ...baseVideoMsg } as VideoMsg;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromJSON(object.Thumbnail)
        : undefined;
    message.Video =
      object.Video !== undefined && object.Video !== null
        ? Video.fromJSON(object.Video)
        : undefined;
    return message;
  },

  toJSON(message: VideoMsg): unknown {
    const obj: any = {};
    message.Thumbnail !== undefined &&
      (obj.Thumbnail = message.Thumbnail
        ? Image.toJSON(message.Thumbnail)
        : undefined);
    message.Video !== undefined &&
      (obj.Video = message.Video ? Video.toJSON(message.Video) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<VideoMsg>): VideoMsg {
    const message = { ...baseVideoMsg } as VideoMsg;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromPartial(object.Thumbnail)
        : undefined;
    message.Video =
      object.Video !== undefined && object.Video !== null
        ? Video.fromPartial(object.Video)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(VideoMsg.$type, VideoMsg);

const baseTipMsg: object = { $type: "message.TipMsg", Type: 0 };

export const TipMsg = {
  $type: "message.TipMsg" as const,

  encode(
    message: TipMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (message.Content.length !== 0) {
      writer.uint32(18).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TipMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTipMsg } as TipMsg;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TipMsg {
    const message = { ...baseTipMsg } as TipMsg;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? tipTypeFromJSON(object.Type)
        : 0;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: TipMsg): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = tipTypeToJSON(message.Type));
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<TipMsg>): TipMsg {
    const message = { ...baseTipMsg } as TipMsg;
    message.Type = object.Type ?? 0;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(TipMsg.$type, TipMsg);

const baseFileMsg: object = { $type: "message.FileMsg" };

export const FileMsg = {
  $type: "message.FileMsg" as const,

  encode(
    message: FileMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.File !== undefined) {
      File.encode(message.File, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileMsg } as FileMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.File = File.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileMsg {
    const message = { ...baseFileMsg } as FileMsg;
    message.File =
      object.File !== undefined && object.File !== null
        ? File.fromJSON(object.File)
        : undefined;
    return message;
  },

  toJSON(message: FileMsg): unknown {
    const obj: any = {};
    message.File !== undefined &&
      (obj.File = message.File ? File.toJSON(message.File) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<FileMsg>): FileMsg {
    const message = { ...baseFileMsg } as FileMsg;
    message.File =
      object.File !== undefined && object.File !== null
        ? File.fromPartial(object.File)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(FileMsg.$type, FileMsg);

const baseWithdrawMsg: object = {
  $type: "message.WithdrawMsg",
  MsgID: Long.UZERO,
};

export const WithdrawMsg = {
  $type: "message.WithdrawMsg" as const,

  encode(
    message: WithdrawMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.MsgID.isZero()) {
      writer.uint32(8).uint64(message.MsgID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWithdrawMsg } as WithdrawMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.MsgID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawMsg {
    const message = { ...baseWithdrawMsg } as WithdrawMsg;
    message.MsgID =
      object.MsgID !== undefined && object.MsgID !== null
        ? Long.fromString(object.MsgID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: WithdrawMsg): unknown {
    const obj: any = {};
    message.MsgID !== undefined &&
      (obj.MsgID = (message.MsgID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<WithdrawMsg>): WithdrawMsg {
    const message = { ...baseWithdrawMsg } as WithdrawMsg;
    if (object.MsgID !== undefined && object.MsgID !== null) {
      message.MsgID = object.MsgID as Long;
    } else {
      message.MsgID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(WithdrawMsg.$type, WithdrawMsg);

const baseNewFriendEventMsg: object = {
  $type: "message.NewFriendEventMsg",
  FriendID: Long.UZERO,
};

export const NewFriendEventMsg = {
  $type: "message.NewFriendEventMsg" as const,

  encode(
    message: NewFriendEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewFriendEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNewFriendEventMsg } as NewFriendEventMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NewFriendEventMsg {
    const message = { ...baseNewFriendEventMsg } as NewFriendEventMsg;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: NewFriendEventMsg): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<NewFriendEventMsg>): NewFriendEventMsg {
    const message = { ...baseNewFriendEventMsg } as NewFriendEventMsg;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(NewFriendEventMsg.$type, NewFriendEventMsg);

const baseFriendInfoChangeEventMsg: object = {
  $type: "message.FriendInfoChangeEventMsg",
  FriendID: Long.UZERO,
};

export const FriendInfoChangeEventMsg = {
  $type: "message.FriendInfoChangeEventMsg" as const,

  encode(
    message: FriendInfoChangeEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FriendInfoChangeEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseFriendInfoChangeEventMsg,
    } as FriendInfoChangeEventMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendInfoChangeEventMsg {
    const message = {
      ...baseFriendInfoChangeEventMsg,
    } as FriendInfoChangeEventMsg;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: FriendInfoChangeEventMsg): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<FriendInfoChangeEventMsg>
  ): FriendInfoChangeEventMsg {
    const message = {
      ...baseFriendInfoChangeEventMsg,
    } as FriendInfoChangeEventMsg;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  FriendInfoChangeEventMsg.$type,
  FriendInfoChangeEventMsg
);

const baseDeleteFriendEventMsg: object = {
  $type: "message.DeleteFriendEventMsg",
  FriendID: Long.UZERO,
};

export const DeleteFriendEventMsg = {
  $type: "message.DeleteFriendEventMsg" as const,

  encode(
    message: DeleteFriendEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.FriendID.isZero()) {
      writer.uint32(8).uint64(message.FriendID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteFriendEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteFriendEventMsg } as DeleteFriendEventMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.FriendID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteFriendEventMsg {
    const message = { ...baseDeleteFriendEventMsg } as DeleteFriendEventMsg;
    message.FriendID =
      object.FriendID !== undefined && object.FriendID !== null
        ? Long.fromString(object.FriendID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: DeleteFriendEventMsg): unknown {
    const obj: any = {};
    message.FriendID !== undefined &&
      (obj.FriendID = (message.FriendID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteFriendEventMsg>): DeleteFriendEventMsg {
    const message = { ...baseDeleteFriendEventMsg } as DeleteFriendEventMsg;
    if (object.FriendID !== undefined && object.FriendID !== null) {
      message.FriendID = object.FriendID as Long;
    } else {
      message.FriendID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(DeleteFriendEventMsg.$type, DeleteFriendEventMsg);

const baseNewAddFriendApplicationEventMsg: object = {
  $type: "message.NewAddFriendApplicationEventMsg",
};

export const NewAddFriendApplicationEventMsg = {
  $type: "message.NewAddFriendApplicationEventMsg" as const,

  encode(
    _: NewAddFriendApplicationEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NewAddFriendApplicationEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseNewAddFriendApplicationEventMsg,
    } as NewAddFriendApplicationEventMsg;
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

  fromJSON(_: any): NewAddFriendApplicationEventMsg {
    const message = {
      ...baseNewAddFriendApplicationEventMsg,
    } as NewAddFriendApplicationEventMsg;
    return message;
  },

  toJSON(_: NewAddFriendApplicationEventMsg): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<NewAddFriendApplicationEventMsg>
  ): NewAddFriendApplicationEventMsg {
    const message = {
      ...baseNewAddFriendApplicationEventMsg,
    } as NewAddFriendApplicationEventMsg;
    return message;
  },
};

messageTypeRegistry.set(
  NewAddFriendApplicationEventMsg.$type,
  NewAddFriendApplicationEventMsg
);

const baseAddFriendApplicationStatusChangeEventMsg: object = {
  $type: "message.AddFriendApplicationStatusChangeEventMsg",
  AddFriendApplicationID: Long.UZERO,
};

export const AddFriendApplicationStatusChangeEventMsg = {
  $type: "message.AddFriendApplicationStatusChangeEventMsg" as const,

  encode(
    message: AddFriendApplicationStatusChangeEventMsg,
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
  ): AddFriendApplicationStatusChangeEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseAddFriendApplicationStatusChangeEventMsg,
    } as AddFriendApplicationStatusChangeEventMsg;
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

  fromJSON(object: any): AddFriendApplicationStatusChangeEventMsg {
    const message = {
      ...baseAddFriendApplicationStatusChangeEventMsg,
    } as AddFriendApplicationStatusChangeEventMsg;
    message.AddFriendApplicationID =
      object.AddFriendApplicationID !== undefined &&
      object.AddFriendApplicationID !== null
        ? Long.fromString(object.AddFriendApplicationID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: AddFriendApplicationStatusChangeEventMsg): unknown {
    const obj: any = {};
    message.AddFriendApplicationID !== undefined &&
      (obj.AddFriendApplicationID = (
        message.AddFriendApplicationID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<AddFriendApplicationStatusChangeEventMsg>
  ): AddFriendApplicationStatusChangeEventMsg {
    const message = {
      ...baseAddFriendApplicationStatusChangeEventMsg,
    } as AddFriendApplicationStatusChangeEventMsg;
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
  AddFriendApplicationStatusChangeEventMsg.$type,
  AddFriendApplicationStatusChangeEventMsg
);

const baseNewGroupEventMsg: object = {
  $type: "message.NewGroupEventMsg",
  GroupID: Long.UZERO,
};

export const NewGroupEventMsg = {
  $type: "message.NewGroupEventMsg" as const,

  encode(
    message: NewGroupEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewGroupEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNewGroupEventMsg } as NewGroupEventMsg;
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

  fromJSON(object: any): NewGroupEventMsg {
    const message = { ...baseNewGroupEventMsg } as NewGroupEventMsg;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: NewGroupEventMsg): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<NewGroupEventMsg>): NewGroupEventMsg {
    const message = { ...baseNewGroupEventMsg } as NewGroupEventMsg;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(NewGroupEventMsg.$type, NewGroupEventMsg);

const baseGroupInfoChangeEventMsg: object = {
  $type: "message.GroupInfoChangeEventMsg",
  GroupID: Long.UZERO,
};

export const GroupInfoChangeEventMsg = {
  $type: "message.GroupInfoChangeEventMsg" as const,

  encode(
    message: GroupInfoChangeEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GroupInfoChangeEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGroupInfoChangeEventMsg,
    } as GroupInfoChangeEventMsg;
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

  fromJSON(object: any): GroupInfoChangeEventMsg {
    const message = {
      ...baseGroupInfoChangeEventMsg,
    } as GroupInfoChangeEventMsg;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GroupInfoChangeEventMsg): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<GroupInfoChangeEventMsg>
  ): GroupInfoChangeEventMsg {
    const message = {
      ...baseGroupInfoChangeEventMsg,
    } as GroupInfoChangeEventMsg;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GroupInfoChangeEventMsg.$type, GroupInfoChangeEventMsg);

const baseGroupMemberInfoChangeEventMsg: object = {
  $type: "message.GroupMemberInfoChangeEventMsg",
  GroupID: Long.UZERO,
};

export const GroupMemberInfoChangeEventMsg = {
  $type: "message.GroupMemberInfoChangeEventMsg" as const,

  encode(
    message: GroupMemberInfoChangeEventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.GroupID.isZero()) {
      writer.uint32(8).uint64(message.GroupID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GroupMemberInfoChangeEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGroupMemberInfoChangeEventMsg,
    } as GroupMemberInfoChangeEventMsg;
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

  fromJSON(object: any): GroupMemberInfoChangeEventMsg {
    const message = {
      ...baseGroupMemberInfoChangeEventMsg,
    } as GroupMemberInfoChangeEventMsg;
    message.GroupID =
      object.GroupID !== undefined && object.GroupID !== null
        ? Long.fromString(object.GroupID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: GroupMemberInfoChangeEventMsg): unknown {
    const obj: any = {};
    message.GroupID !== undefined &&
      (obj.GroupID = (message.GroupID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<GroupMemberInfoChangeEventMsg>
  ): GroupMemberInfoChangeEventMsg {
    const message = {
      ...baseGroupMemberInfoChangeEventMsg,
    } as GroupMemberInfoChangeEventMsg;
    if (object.GroupID !== undefined && object.GroupID !== null) {
      message.GroupID = object.GroupID as Long;
    } else {
      message.GroupID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(
  GroupMemberInfoChangeEventMsg.$type,
  GroupMemberInfoChangeEventMsg
);

const baseNewJoinGroupEventEventMsg: object = {
  $type: "message.NewJoinGroupEventEventMsg",
  JoinGroupEventID: Long.UZERO,
};

export const NewJoinGroupEventEventMsg = {
  $type: "message.NewJoinGroupEventEventMsg" as const,

  encode(
    message: NewJoinGroupEventEventMsg,
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
  ): NewJoinGroupEventEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseNewJoinGroupEventEventMsg,
    } as NewJoinGroupEventEventMsg;
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

  fromJSON(object: any): NewJoinGroupEventEventMsg {
    const message = {
      ...baseNewJoinGroupEventEventMsg,
    } as NewJoinGroupEventEventMsg;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: NewJoinGroupEventEventMsg): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<NewJoinGroupEventEventMsg>
  ): NewJoinGroupEventEventMsg {
    const message = {
      ...baseNewJoinGroupEventEventMsg,
    } as NewJoinGroupEventEventMsg;
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
  NewJoinGroupEventEventMsg.$type,
  NewJoinGroupEventEventMsg
);

const baseJoinGroupEventChangeEventMsg: object = {
  $type: "message.JoinGroupEventChangeEventMsg",
  JoinGroupEventID: Long.UZERO,
};

export const JoinGroupEventChangeEventMsg = {
  $type: "message.JoinGroupEventChangeEventMsg" as const,

  encode(
    message: JoinGroupEventChangeEventMsg,
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
  ): JoinGroupEventChangeEventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseJoinGroupEventChangeEventMsg,
    } as JoinGroupEventChangeEventMsg;
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

  fromJSON(object: any): JoinGroupEventChangeEventMsg {
    const message = {
      ...baseJoinGroupEventChangeEventMsg,
    } as JoinGroupEventChangeEventMsg;
    message.JoinGroupEventID =
      object.JoinGroupEventID !== undefined && object.JoinGroupEventID !== null
        ? Long.fromString(object.JoinGroupEventID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: JoinGroupEventChangeEventMsg): unknown {
    const obj: any = {};
    message.JoinGroupEventID !== undefined &&
      (obj.JoinGroupEventID = (
        message.JoinGroupEventID || Long.UZERO
      ).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<JoinGroupEventChangeEventMsg>
  ): JoinGroupEventChangeEventMsg {
    const message = {
      ...baseJoinGroupEventChangeEventMsg,
    } as JoinGroupEventChangeEventMsg;
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
  JoinGroupEventChangeEventMsg.$type,
  JoinGroupEventChangeEventMsg
);

const baseEventMsg: object = { $type: "message.EventMsg", Type: 0 };

export const EventMsg = {
  $type: "message.EventMsg" as const,

  encode(
    message: EventMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (message.Content.length !== 0) {
      writer.uint32(18).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventMsg } as EventMsg;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventMsg {
    const message = { ...baseEventMsg } as EventMsg;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? eventMsgTypeFromJSON(object.Type)
        : 0;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: EventMsg): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = eventMsgTypeToJSON(message.Type));
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<EventMsg>): EventMsg {
    const message = { ...baseEventMsg } as EventMsg;
    message.Type = object.Type ?? 0;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(EventMsg.$type, EventMsg);

const baseReq: object = {
  $type: "message.Req",
  CorrelationID: Long.UZERO,
  Type: 0,
};

export const Req = {
  $type: "message.Req" as const,

  encode(message: Req, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Sender !== undefined) {
      Sender.encode(message.Sender, writer.uint32(10).fork()).ldelim();
    }
    if (!message.CorrelationID.isZero()) {
      writer.uint32(16).uint64(message.CorrelationID);
    }
    if (message.Type !== 0) {
      writer.uint32(24).int32(message.Type);
    }
    if (message.Receiver !== undefined) {
      Receiver.encode(message.Receiver, writer.uint32(34).fork()).ldelim();
    }
    if (message.Content.length !== 0) {
      writer.uint32(42).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Req {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReq } as Req;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Sender = Sender.decode(reader, reader.uint32());
          break;
        case 2:
          message.CorrelationID = reader.uint64() as Long;
          break;
        case 3:
          message.Type = reader.int32() as any;
          break;
        case 4:
          message.Receiver = Receiver.decode(reader, reader.uint32());
          break;
        case 5:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Req {
    const message = { ...baseReq } as Req;
    message.Sender =
      object.Sender !== undefined && object.Sender !== null
        ? Sender.fromJSON(object.Sender)
        : undefined;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Long.fromString(object.CorrelationID)
        : Long.UZERO;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? msgTypeFromJSON(object.Type)
        : 0;
    message.Receiver =
      object.Receiver !== undefined && object.Receiver !== null
        ? Receiver.fromJSON(object.Receiver)
        : undefined;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: Req): unknown {
    const obj: any = {};
    message.Sender !== undefined &&
      (obj.Sender = message.Sender ? Sender.toJSON(message.Sender) : undefined);
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = (message.CorrelationID || Long.UZERO).toString());
    message.Type !== undefined && (obj.Type = msgTypeToJSON(message.Type));
    message.Receiver !== undefined &&
      (obj.Receiver = message.Receiver
        ? Receiver.toJSON(message.Receiver)
        : undefined);
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Req>): Req {
    const message = { ...baseReq } as Req;
    message.Sender =
      object.Sender !== undefined && object.Sender !== null
        ? Sender.fromPartial(object.Sender)
        : undefined;
    if (object.CorrelationID !== undefined && object.CorrelationID !== null) {
      message.CorrelationID = object.CorrelationID as Long;
    } else {
      message.CorrelationID = Long.UZERO;
    }
    message.Type = object.Type ?? 0;
    message.Receiver =
      object.Receiver !== undefined && object.Receiver !== null
        ? Receiver.fromPartial(object.Receiver)
        : undefined;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(Req.$type, Req);

const baseTextReqContent: object = {
  $type: "message.TextReqContent",
  Content: "",
};

export const TextReqContent = {
  $type: "message.TextReqContent" as const,

  encode(
    message: TextReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Content !== "") {
      writer.uint32(10).string(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTextReqContent } as TextReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TextReqContent {
    const message = { ...baseTextReqContent } as TextReqContent;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? String(object.Content)
        : "";
    return message;
  },

  toJSON(message: TextReqContent): unknown {
    const obj: any = {};
    message.Content !== undefined && (obj.Content = message.Content);
    return obj;
  },

  fromPartial(object: DeepPartial<TextReqContent>): TextReqContent {
    const message = { ...baseTextReqContent } as TextReqContent;
    message.Content = object.Content ?? "";
    return message;
  },
};

messageTypeRegistry.set(TextReqContent.$type, TextReqContent);

const baseImageReqContent: object = { $type: "message.ImageReqContent" };

export const ImageReqContent = {
  $type: "message.ImageReqContent" as const,

  encode(
    message: ImageReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Thumbnail !== undefined) {
      Image.encode(message.Thumbnail, writer.uint32(10).fork()).ldelim();
    }
    if (message.OriginalImage !== undefined) {
      Image.encode(message.OriginalImage, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImageReqContent } as ImageReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Thumbnail = Image.decode(reader, reader.uint32());
          break;
        case 2:
          message.OriginalImage = Image.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageReqContent {
    const message = { ...baseImageReqContent } as ImageReqContent;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromJSON(object.Thumbnail)
        : undefined;
    message.OriginalImage =
      object.OriginalImage !== undefined && object.OriginalImage !== null
        ? Image.fromJSON(object.OriginalImage)
        : undefined;
    return message;
  },

  toJSON(message: ImageReqContent): unknown {
    const obj: any = {};
    message.Thumbnail !== undefined &&
      (obj.Thumbnail = message.Thumbnail
        ? Image.toJSON(message.Thumbnail)
        : undefined);
    message.OriginalImage !== undefined &&
      (obj.OriginalImage = message.OriginalImage
        ? Image.toJSON(message.OriginalImage)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ImageReqContent>): ImageReqContent {
    const message = { ...baseImageReqContent } as ImageReqContent;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromPartial(object.Thumbnail)
        : undefined;
    message.OriginalImage =
      object.OriginalImage !== undefined && object.OriginalImage !== null
        ? Image.fromPartial(object.OriginalImage)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(ImageReqContent.$type, ImageReqContent);

const baseVoiceReqContent: object = { $type: "message.VoiceReqContent" };

export const VoiceReqContent = {
  $type: "message.VoiceReqContent" as const,

  encode(
    message: VoiceReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Voice !== undefined) {
      Voice.encode(message.Voice, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVoiceReqContent } as VoiceReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Voice = Voice.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceReqContent {
    const message = { ...baseVoiceReqContent } as VoiceReqContent;
    message.Voice =
      object.Voice !== undefined && object.Voice !== null
        ? Voice.fromJSON(object.Voice)
        : undefined;
    return message;
  },

  toJSON(message: VoiceReqContent): unknown {
    const obj: any = {};
    message.Voice !== undefined &&
      (obj.Voice = message.Voice ? Voice.toJSON(message.Voice) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<VoiceReqContent>): VoiceReqContent {
    const message = { ...baseVoiceReqContent } as VoiceReqContent;
    message.Voice =
      object.Voice !== undefined && object.Voice !== null
        ? Voice.fromPartial(object.Voice)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(VoiceReqContent.$type, VoiceReqContent);

const baseVideoReqContent: object = { $type: "message.VideoReqContent" };

export const VideoReqContent = {
  $type: "message.VideoReqContent" as const,

  encode(
    message: VideoReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Thumbnail !== undefined) {
      Image.encode(message.Thumbnail, writer.uint32(10).fork()).ldelim();
    }
    if (message.Video !== undefined) {
      Video.encode(message.Video, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVideoReqContent } as VideoReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Thumbnail = Image.decode(reader, reader.uint32());
          break;
        case 2:
          message.Video = Video.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VideoReqContent {
    const message = { ...baseVideoReqContent } as VideoReqContent;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromJSON(object.Thumbnail)
        : undefined;
    message.Video =
      object.Video !== undefined && object.Video !== null
        ? Video.fromJSON(object.Video)
        : undefined;
    return message;
  },

  toJSON(message: VideoReqContent): unknown {
    const obj: any = {};
    message.Thumbnail !== undefined &&
      (obj.Thumbnail = message.Thumbnail
        ? Image.toJSON(message.Thumbnail)
        : undefined);
    message.Video !== undefined &&
      (obj.Video = message.Video ? Video.toJSON(message.Video) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<VideoReqContent>): VideoReqContent {
    const message = { ...baseVideoReqContent } as VideoReqContent;
    message.Thumbnail =
      object.Thumbnail !== undefined && object.Thumbnail !== null
        ? Image.fromPartial(object.Thumbnail)
        : undefined;
    message.Video =
      object.Video !== undefined && object.Video !== null
        ? Video.fromPartial(object.Video)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(VideoReqContent.$type, VideoReqContent);

const baseFileReqContent: object = { $type: "message.FileReqContent" };

export const FileReqContent = {
  $type: "message.FileReqContent" as const,

  encode(
    message: FileReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.File !== undefined) {
      File.encode(message.File, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileReqContent } as FileReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.File = File.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileReqContent {
    const message = { ...baseFileReqContent } as FileReqContent;
    message.File =
      object.File !== undefined && object.File !== null
        ? File.fromJSON(object.File)
        : undefined;
    return message;
  },

  toJSON(message: FileReqContent): unknown {
    const obj: any = {};
    message.File !== undefined &&
      (obj.File = message.File ? File.toJSON(message.File) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<FileReqContent>): FileReqContent {
    const message = { ...baseFileReqContent } as FileReqContent;
    message.File =
      object.File !== undefined && object.File !== null
        ? File.fromPartial(object.File)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(FileReqContent.$type, FileReqContent);

const baseWithdrawReqContent: object = {
  $type: "message.WithdrawReqContent",
  MsgID: Long.UZERO,
};

export const WithdrawReqContent = {
  $type: "message.WithdrawReqContent" as const,

  encode(
    message: WithdrawReqContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.MsgID.isZero()) {
      writer.uint32(8).uint64(message.MsgID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawReqContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWithdrawReqContent } as WithdrawReqContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.MsgID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawReqContent {
    const message = { ...baseWithdrawReqContent } as WithdrawReqContent;
    message.MsgID =
      object.MsgID !== undefined && object.MsgID !== null
        ? Long.fromString(object.MsgID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: WithdrawReqContent): unknown {
    const obj: any = {};
    message.MsgID !== undefined &&
      (obj.MsgID = (message.MsgID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<WithdrawReqContent>): WithdrawReqContent {
    const message = { ...baseWithdrawReqContent } as WithdrawReqContent;
    if (object.MsgID !== undefined && object.MsgID !== null) {
      message.MsgID = object.MsgID as Long;
    } else {
      message.MsgID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(WithdrawReqContent.$type, WithdrawReqContent);

const baseRsp: object = {
  $type: "message.Rsp",
  CorrelationID: Long.UZERO,
  MailBoxMsgID: Long.UZERO,
  MsgID: Long.UZERO,
};

export const Rsp = {
  $type: "message.Rsp" as const,

  encode(message: Rsp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.CorrelationID.isZero()) {
      writer.uint32(8).uint64(message.CorrelationID);
    }
    if (!message.MailBoxMsgID.isZero()) {
      writer.uint32(16).uint64(message.MailBoxMsgID);
    }
    if (!message.MsgID.isZero()) {
      writer.uint32(24).uint64(message.MsgID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRsp } as Rsp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.CorrelationID = reader.uint64() as Long;
          break;
        case 2:
          message.MailBoxMsgID = reader.uint64() as Long;
          break;
        case 3:
          message.MsgID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Rsp {
    const message = { ...baseRsp } as Rsp;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Long.fromString(object.CorrelationID)
        : Long.UZERO;
    message.MailBoxMsgID =
      object.MailBoxMsgID !== undefined && object.MailBoxMsgID !== null
        ? Long.fromString(object.MailBoxMsgID)
        : Long.UZERO;
    message.MsgID =
      object.MsgID !== undefined && object.MsgID !== null
        ? Long.fromString(object.MsgID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: Rsp): unknown {
    const obj: any = {};
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = (message.CorrelationID || Long.UZERO).toString());
    message.MailBoxMsgID !== undefined &&
      (obj.MailBoxMsgID = (message.MailBoxMsgID || Long.UZERO).toString());
    message.MsgID !== undefined &&
      (obj.MsgID = (message.MsgID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Rsp>): Rsp {
    const message = { ...baseRsp } as Rsp;
    if (object.CorrelationID !== undefined && object.CorrelationID !== null) {
      message.CorrelationID = object.CorrelationID as Long;
    } else {
      message.CorrelationID = Long.UZERO;
    }
    if (object.MailBoxMsgID !== undefined && object.MailBoxMsgID !== null) {
      message.MailBoxMsgID = object.MailBoxMsgID as Long;
    } else {
      message.MailBoxMsgID = Long.UZERO;
    }
    if (object.MsgID !== undefined && object.MsgID !== null) {
      message.MsgID = object.MsgID as Long;
    } else {
      message.MsgID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(Rsp.$type, Rsp);

const baseEvent: object = { $type: "message.Event", Type: 0 };

export const Event = {
  $type: "message.Event" as const,

  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (message.Content.length !== 0) {
      writer.uint32(18).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? eventTypeFromJSON(object.Type)
        : 0;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = eventTypeToJSON(message.Type));
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Event>): Event {
    const message = { ...baseEvent } as Event;
    message.Type = object.Type ?? 0;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(Event.$type, Event);

const baseMailBoxMsg: object = {
  $type: "message.MailBoxMsg",
  UserID: Long.UZERO,
  MailBoxMsgID: Long.UZERO,
};

export const MailBoxMsg = {
  $type: "message.MailBoxMsg" as const,

  encode(
    message: MailBoxMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (!message.MailBoxMsgID.isZero()) {
      writer.uint32(16).uint64(message.MailBoxMsgID);
    }
    if (message.Msg !== undefined) {
      Msg.encode(message.Msg, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MailBoxMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMailBoxMsg } as MailBoxMsg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.MailBoxMsgID = reader.uint64() as Long;
          break;
        case 3:
          message.Msg = Msg.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MailBoxMsg {
    const message = { ...baseMailBoxMsg } as MailBoxMsg;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.MailBoxMsgID =
      object.MailBoxMsgID !== undefined && object.MailBoxMsgID !== null
        ? Long.fromString(object.MailBoxMsgID)
        : Long.UZERO;
    message.Msg =
      object.Msg !== undefined && object.Msg !== null
        ? Msg.fromJSON(object.Msg)
        : undefined;
    return message;
  },

  toJSON(message: MailBoxMsg): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.MailBoxMsgID !== undefined &&
      (obj.MailBoxMsgID = (message.MailBoxMsgID || Long.UZERO).toString());
    message.Msg !== undefined &&
      (obj.Msg = message.Msg ? Msg.toJSON(message.Msg) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MailBoxMsg>): MailBoxMsg {
    const message = { ...baseMailBoxMsg } as MailBoxMsg;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    if (object.MailBoxMsgID !== undefined && object.MailBoxMsgID !== null) {
      message.MailBoxMsgID = object.MailBoxMsgID as Long;
    } else {
      message.MailBoxMsgID = Long.UZERO;
    }
    message.Msg =
      object.Msg !== undefined && object.Msg !== null
        ? Msg.fromPartial(object.Msg)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(MailBoxMsg.$type, MailBoxMsg);

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

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
