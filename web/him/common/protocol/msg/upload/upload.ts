/* eslint-disable */
import { messageTypeRegistry } from "../../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "message";

/** 上传类型 */
export enum UploadType {
  /** UploadTypeUnknown - 未知 */
  UploadTypeUnknown = 0,
  /** UploadTypeImage - 图片 */
  UploadTypeImage = 1,
  /** UploadTypeVoice - 语音 */
  UploadTypeVoice = 2,
  /** UploadTypeVideo - 视频 */
  UploadTypeVideo = 3,
  /** UploadTypeFile - 文件 */
  UploadTypeFile = 4,
  UNRECOGNIZED = -1,
}

export function uploadTypeFromJSON(object: any): UploadType {
  switch (object) {
    case 0:
    case "UploadTypeUnknown":
      return UploadType.UploadTypeUnknown;
    case 1:
    case "UploadTypeImage":
      return UploadType.UploadTypeImage;
    case 2:
    case "UploadTypeVoice":
      return UploadType.UploadTypeVoice;
    case 3:
    case "UploadTypeVideo":
      return UploadType.UploadTypeVideo;
    case 4:
    case "UploadTypeFile":
      return UploadType.UploadTypeFile;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UploadType.UNRECOGNIZED;
  }
}

export function uploadTypeToJSON(object: UploadType): string {
  switch (object) {
    case UploadType.UploadTypeUnknown:
      return "UploadTypeUnknown";
    case UploadType.UploadTypeImage:
      return "UploadTypeImage";
    case UploadType.UploadTypeVoice:
      return "UploadTypeVoice";
    case UploadType.UploadTypeVideo:
      return "UploadTypeVideo";
    case UploadType.UploadTypeFile:
      return "UploadTypeFile";
    default:
      return "UNKNOWN";
  }
}

/** 上传请求（通过字节流） */
export interface UploadReq {
  $type: "message.UploadReq";
  /** 上传类型 */
  Type: UploadType;
}

/** 上传响应 */
export interface UploadRsp {
  $type: "message.UploadRsp";
  /** 内容，比如Image */
  Content: Uint8Array;
}

/**
 * @存储模型
 * 使用对象存储服务存储
 */
export interface ObjectStore {
  $type: "message.ObjectStore";
  /** HTTP头设置ContentType这样可以直接打开 */
  ContentType: string;
  /** URL用于访问 */
  URL: string;
  /** 对象 */
  Content: Uint8Array;
}

const baseUploadReq: object = { $type: "message.UploadReq", Type: 0 };

export const UploadReq = {
  $type: "message.UploadReq" as const,

  encode(
    message: UploadReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Type !== 0) {
      writer.uint32(8).int32(message.Type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUploadReq } as UploadReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadReq {
    const message = { ...baseUploadReq } as UploadReq;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? uploadTypeFromJSON(object.Type)
        : 0;
    return message;
  },

  toJSON(message: UploadReq): unknown {
    const obj: any = {};
    message.Type !== undefined && (obj.Type = uploadTypeToJSON(message.Type));
    return obj;
  },

  fromPartial(object: DeepPartial<UploadReq>): UploadReq {
    const message = { ...baseUploadReq } as UploadReq;
    message.Type = object.Type ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UploadReq.$type, UploadReq);

const baseUploadRsp: object = { $type: "message.UploadRsp" };

export const UploadRsp = {
  $type: "message.UploadRsp" as const,

  encode(
    message: UploadRsp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Content.length !== 0) {
      writer.uint32(10).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadRsp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUploadRsp } as UploadRsp;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Content = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadRsp {
    const message = { ...baseUploadRsp } as UploadRsp;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: UploadRsp): unknown {
    const obj: any = {};
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<UploadRsp>): UploadRsp {
    const message = { ...baseUploadRsp } as UploadRsp;
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(UploadRsp.$type, UploadRsp);

const baseObjectStore: object = {
  $type: "message.ObjectStore",
  ContentType: "",
  URL: "",
};

export const ObjectStore = {
  $type: "message.ObjectStore" as const,

  encode(
    message: ObjectStore,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ContentType !== "") {
      writer.uint32(10).string(message.ContentType);
    }
    if (message.URL !== "") {
      writer.uint32(18).string(message.URL);
    }
    if (message.Content.length !== 0) {
      writer.uint32(26).bytes(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectStore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseObjectStore } as ObjectStore;
    message.Content = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContentType = reader.string();
          break;
        case 2:
          message.URL = reader.string();
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

  fromJSON(object: any): ObjectStore {
    const message = { ...baseObjectStore } as ObjectStore;
    message.ContentType =
      object.ContentType !== undefined && object.ContentType !== null
        ? String(object.ContentType)
        : "";
    message.URL =
      object.URL !== undefined && object.URL !== null ? String(object.URL) : "";
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? bytesFromBase64(object.Content)
        : new Uint8Array();
    return message;
  },

  toJSON(message: ObjectStore): unknown {
    const obj: any = {};
    message.ContentType !== undefined &&
      (obj.ContentType = message.ContentType);
    message.URL !== undefined && (obj.URL = message.URL);
    message.Content !== undefined &&
      (obj.Content = base64FromBytes(
        message.Content !== undefined ? message.Content : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ObjectStore>): ObjectStore {
    const message = { ...baseObjectStore } as ObjectStore;
    message.ContentType = object.ContentType ?? "";
    message.URL = object.URL ?? "";
    message.Content = object.Content ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(ObjectStore.$type, ObjectStore);

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
