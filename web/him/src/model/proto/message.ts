/* eslint-disable */
import { messageTypeRegistry } from "../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "him";

/** 请求类型 */
export enum RequestType {
  /** RequestTypeUnknown - 未知 */
  RequestTypeUnknown = 0,
  /** RequestTypeSendMessage - 发送消息 */
  RequestTypeSendMessage = 1,
  UNRECOGNIZED = -1,
}

export function requestTypeFromJSON(object: any): RequestType {
  switch (object) {
    case 0:
    case "RequestTypeUnknown":
      return RequestType.RequestTypeUnknown;
    case 1:
    case "RequestTypeSendMessage":
      return RequestType.RequestTypeSendMessage;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RequestType.UNRECOGNIZED;
  }
}

export function requestTypeToJSON(object: RequestType): string {
  switch (object) {
    case RequestType.RequestTypeUnknown:
      return "RequestTypeUnknown";
    case RequestType.RequestTypeSendMessage:
      return "RequestTypeSendMessage";
    default:
      return "UNKNOWN";
  }
}

/** 请求版本 */
export enum RequestVersion {
  /** RequestVersionUnknown - 未知 */
  RequestVersionUnknown = 0,
  /** RequestVersionArcane - 第一个版本 */
  RequestVersionArcane = 1,
  UNRECOGNIZED = -1,
}

export function requestVersionFromJSON(object: any): RequestVersion {
  switch (object) {
    case 0:
    case "RequestVersionUnknown":
      return RequestVersion.RequestVersionUnknown;
    case 1:
    case "RequestVersionArcane":
      return RequestVersion.RequestVersionArcane;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RequestVersion.UNRECOGNIZED;
  }
}

export function requestVersionToJSON(object: RequestVersion): string {
  switch (object) {
    case RequestVersion.RequestVersionUnknown:
      return "RequestVersionUnknown";
    case RequestVersion.RequestVersionArcane:
      return "RequestVersionArcane";
    default:
      return "UNKNOWN";
  }
}

/** 消息类型 */
export enum MessageType {
  /** MessageTypeUnknown - 未知 */
  MessageTypeUnknown = 0,
  /** MessageTypeText - 文字 */
  MessageTypeText = 1,
  /** MessageTypeImage - 图片 */
  MessageTypeImage = 2,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "MessageTypeUnknown":
      return MessageType.MessageTypeUnknown;
    case 1:
    case "MessageTypeText":
      return MessageType.MessageTypeText;
    case 2:
    case "MessageTypeImage":
      return MessageType.MessageTypeImage;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.MessageTypeUnknown:
      return "MessageTypeUnknown";
    case MessageType.MessageTypeText:
      return "MessageTypeText";
    case MessageType.MessageTypeImage:
      return "MessageTypeImage";
    default:
      return "UNKNOWN";
  }
}

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

/** 请求 */
export interface Request {
  $type: "him.Request";
  /** 请求头 */
  Header: Header | undefined;
  /** 请求体 */
  Body: Uint8Array;
}

/** 请求头 */
export interface Header {
  $type: "him.Header";
  /** 请求的类型 */
  RequestType: RequestType;
  /** 请求的版本 */
  RequestVersion: RequestVersion;
  /** 请求唯一标识 */
  CorrelationID: Long;
}

/** 响应 */
export interface Response {
  $type: "him.Response";
  /** 请求唯一标识 */
  CorrelationID: Long;
  /** 错误码 */
  Code: string;
  /** 错误信息 */
  Msg: string;
  /** 响应体 */
  Body: Uint8Array;
}

/** 接收者 */
export interface Receiver {
  $type: "him.Receiver";
  /** 接收者类型 */
  Type: ReceiverType;
  /** 接收者编号 */
  ReceiverID: Long;
}

/** 发送消息 */
export interface SendMessageRequest {
  $type: "him.SendMessageRequest";
  /** 消息类型 */
  Type: MessageType;
  /** 接收者 */
  Receiver: Receiver | undefined;
  /** 消息内容 */
  Content: Uint8Array;
}

/** 发送消息响应 */
export interface SendMessageResponse {
  $type: "him.SendMessageResponse";
  /** 消息编号 */
  MessageID: Long;
  /** 发送时间 */
  sendTime: Long;
}

const baseRequest: object = { $type: "him.Request" };

export const Request = {
  $type: "him.Request" as const,

  encode(
    message: Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Header !== undefined) {
      Header.encode(message.Header, writer.uint32(10).fork()).ldelim();
    }
    if (message.Body.length !== 0) {
      writer.uint32(18).bytes(message.Body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequest } as Request;
    message.Body = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Header = Header.decode(reader, reader.uint32());
          break;
        case 2:
          message.Body = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    const message = { ...baseRequest } as Request;
    message.Header =
      object.Header !== undefined && object.Header !== null
        ? Header.fromJSON(object.Header)
        : undefined;
    message.Body =
      object.Body !== undefined && object.Body !== null
        ? bytesFromBase64(object.Body)
        : new Uint8Array();
    return message;
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.Header !== undefined &&
      (obj.Header = message.Header ? Header.toJSON(message.Header) : undefined);
    message.Body !== undefined &&
      (obj.Body = base64FromBytes(
        message.Body !== undefined ? message.Body : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Request>): Request {
    const message = { ...baseRequest } as Request;
    message.Header =
      object.Header !== undefined && object.Header !== null
        ? Header.fromPartial(object.Header)
        : undefined;
    message.Body = object.Body ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(Request.$type, Request);

const baseHeader: object = {
  $type: "him.Header",
  RequestType: 0,
  RequestVersion: 0,
  CorrelationID: Long.UZERO,
};

export const Header = {
  $type: "him.Header" as const,

  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.RequestType !== 0) {
      writer.uint32(8).int32(message.RequestType);
    }
    if (message.RequestVersion !== 0) {
      writer.uint32(16).int32(message.RequestVersion);
    }
    if (!message.CorrelationID.isZero()) {
      writer.uint32(24).uint64(message.CorrelationID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHeader } as Header;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RequestType = reader.int32() as any;
          break;
        case 2:
          message.RequestVersion = reader.int32() as any;
          break;
        case 3:
          message.CorrelationID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    const message = { ...baseHeader } as Header;
    message.RequestType =
      object.RequestType !== undefined && object.RequestType !== null
        ? requestTypeFromJSON(object.RequestType)
        : 0;
    message.RequestVersion =
      object.RequestVersion !== undefined && object.RequestVersion !== null
        ? requestVersionFromJSON(object.RequestVersion)
        : 0;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Long.fromString(object.CorrelationID)
        : Long.UZERO;
    return message;
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.RequestType !== undefined &&
      (obj.RequestType = requestTypeToJSON(message.RequestType));
    message.RequestVersion !== undefined &&
      (obj.RequestVersion = requestVersionToJSON(message.RequestVersion));
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = (message.CorrelationID || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = { ...baseHeader } as Header;
    message.RequestType = object.RequestType ?? 0;
    message.RequestVersion = object.RequestVersion ?? 0;
    if (object.CorrelationID !== undefined && object.CorrelationID !== null) {
      message.CorrelationID = object.CorrelationID as Long;
    } else {
      message.CorrelationID = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(Header.$type, Header);

const baseResponse: object = {
  $type: "him.Response",
  CorrelationID: Long.UZERO,
  Code: "",
  Msg: "",
};

export const Response = {
  $type: "him.Response" as const,

  encode(
    message: Response,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.CorrelationID.isZero()) {
      writer.uint32(8).uint64(message.CorrelationID);
    }
    if (message.Code !== "") {
      writer.uint32(18).string(message.Code);
    }
    if (message.Msg !== "") {
      writer.uint32(26).string(message.Msg);
    }
    if (message.Body.length !== 0) {
      writer.uint32(34).bytes(message.Body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse } as Response;
    message.Body = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.CorrelationID = reader.uint64() as Long;
          break;
        case 2:
          message.Code = reader.string();
          break;
        case 3:
          message.Msg = reader.string();
          break;
        case 4:
          message.Body = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    const message = { ...baseResponse } as Response;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Long.fromString(object.CorrelationID)
        : Long.UZERO;
    message.Code =
      object.Code !== undefined && object.Code !== null
        ? String(object.Code)
        : "";
    message.Msg =
      object.Msg !== undefined && object.Msg !== null ? String(object.Msg) : "";
    message.Body =
      object.Body !== undefined && object.Body !== null
        ? bytesFromBase64(object.Body)
        : new Uint8Array();
    return message;
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = (message.CorrelationID || Long.UZERO).toString());
    message.Code !== undefined && (obj.Code = message.Code);
    message.Msg !== undefined && (obj.Msg = message.Msg);
    message.Body !== undefined &&
      (obj.Body = base64FromBytes(
        message.Body !== undefined ? message.Body : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Response>): Response {
    const message = { ...baseResponse } as Response;
    if (object.CorrelationID !== undefined && object.CorrelationID !== null) {
      message.CorrelationID = object.CorrelationID as Long;
    } else {
      message.CorrelationID = Long.UZERO;
    }
    message.Code = object.Code ?? "";
    message.Msg = object.Msg ?? "";
    message.Body = object.Body ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(Response.$type, Response);

const baseReceiver: object = {
  $type: "him.Receiver",
  Type: 0,
  ReceiverID: Long.UZERO,
};

export const Receiver = {
  $type: "him.Receiver" as const,

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

const baseSendMessageRequest: object = {
  $type: "him.SendMessageRequest",
  Type: 0,
};

export const SendMessageRequest = {
  $type: "him.SendMessageRequest" as const,

  encode(
    message: SendMessageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    if (message.Receiver !== undefined) {
      Receiver.encode(message.Receiver, writer.uint32(18).fork()).ldelim();
    }
    if (message.Content.length !== 0) {
      writer.uint32(26).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSendMessageRequest } as SendMessageRequest;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        case 2:
          message.Receiver = Receiver.decode(reader, reader.uint32());
          break;
        case 3:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest {
    const message = { ...baseSendMessageRequest } as SendMessageRequest;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? messageTypeFromJSON(object.Type)
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

  toJSON(message: SendMessageRequest): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = messageTypeToJSON(message.Type));
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

  fromPartial(object: DeepPartial<SendMessageRequest>): SendMessageRequest {
    const message = { ...baseSendMessageRequest } as SendMessageRequest;
    message.Type = object.Type ?? 0;
    message.Receiver =
      object.Receiver !== undefined && object.Receiver !== null
        ? Receiver.fromPartial(object.Receiver)
        : undefined;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(SendMessageRequest.$type, SendMessageRequest);

const baseSendMessageResponse: object = {
  $type: "him.SendMessageResponse",
  MessageID: Long.UZERO,
  sendTime: Long.UZERO,
};

export const SendMessageResponse = {
  $type: "him.SendMessageResponse" as const,

  encode(
    message: SendMessageResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.MessageID.isZero()) {
      writer.uint32(8).uint64(message.MessageID);
    }
    if (!message.sendTime.isZero()) {
      writer.uint32(16).uint64(message.sendTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSendMessageResponse } as SendMessageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.MessageID = reader.uint64() as Long;
          break;
        case 2:
          message.sendTime = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageResponse {
    const message = { ...baseSendMessageResponse } as SendMessageResponse;
    message.MessageID =
      object.MessageID !== undefined && object.MessageID !== null
        ? Long.fromString(object.MessageID)
        : Long.UZERO;
    message.sendTime =
      object.sendTime !== undefined && object.sendTime !== null
        ? Long.fromString(object.sendTime)
        : Long.UZERO;
    return message;
  },

  toJSON(message: SendMessageResponse): unknown {
    const obj: any = {};
    message.MessageID !== undefined &&
      (obj.MessageID = (message.MessageID || Long.UZERO).toString());
    message.sendTime !== undefined &&
      (obj.sendTime = (message.sendTime || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<SendMessageResponse>): SendMessageResponse {
    const message = { ...baseSendMessageResponse } as SendMessageResponse;
    if (object.MessageID !== undefined && object.MessageID !== null) {
      message.MessageID = object.MessageID as Long;
    } else {
      message.MessageID = Long.UZERO;
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = object.sendTime as Long;
    } else {
      message.sendTime = Long.UZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(SendMessageResponse.$type, SendMessageResponse);

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
