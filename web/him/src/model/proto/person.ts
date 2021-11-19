/* eslint-disable */
import { messageTypeRegistry } from "../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "him";

/** 请求 */
export interface Request {
  $type: "him.Request";
  Header: Header | undefined;
  Body: Any | undefined;
}

/** 请求头 */
export interface Header {
  $type: "him.Header";
  /** 标识是什么请求 */
  Key: number;
  /** 请求的版本 */
  Version: number;
  /** 请求唯一标识 */
  CorrelationID: number;
  Time: Date | undefined;
}

/** 请求头 */
export interface GetMessage {
  $type: "him.GetMessage";
  /** 标识是什么请求 */
  Key: number;
  /** 请求的版本 */
  Version: number;
  /** 请求唯一标识 */
  CorrelationID: number;
  Age: Long;
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
    if (message.Body !== undefined) {
      Any.encode(message.Body, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequest } as Request;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Header = Header.decode(reader, reader.uint32());
          break;
        case 2:
          message.Body = Any.decode(reader, reader.uint32());
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
        ? Any.fromJSON(object.Body)
        : undefined;
    return message;
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.Header !== undefined &&
      (obj.Header = message.Header ? Header.toJSON(message.Header) : undefined);
    message.Body !== undefined &&
      (obj.Body = message.Body ? Any.toJSON(message.Body) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Request>): Request {
    const message = { ...baseRequest } as Request;
    message.Header =
      object.Header !== undefined && object.Header !== null
        ? Header.fromPartial(object.Header)
        : undefined;
    message.Body =
      object.Body !== undefined && object.Body !== null
        ? Any.fromPartial(object.Body)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(Request.$type, Request);

const baseHeader: object = {
  $type: "him.Header",
  Key: 0,
  Version: 0,
  CorrelationID: 0,
};

export const Header = {
  $type: "him.Header" as const,

  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Key !== 0) {
      writer.uint32(8).int32(message.Key);
    }
    if (message.Version !== 0) {
      writer.uint32(16).int32(message.Version);
    }
    if (message.CorrelationID !== 0) {
      writer.uint32(24).int32(message.CorrelationID);
    }
    if (message.Time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.Time),
        writer.uint32(34).fork()
      ).ldelim();
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
          message.Key = reader.int32();
          break;
        case 2:
          message.Version = reader.int32();
          break;
        case 3:
          message.CorrelationID = reader.int32();
          break;
        case 4:
          message.Time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
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
    message.Key =
      object.Key !== undefined && object.Key !== null ? Number(object.Key) : 0;
    message.Version =
      object.Version !== undefined && object.Version !== null
        ? Number(object.Version)
        : 0;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Number(object.CorrelationID)
        : 0;
    message.Time =
      object.Time !== undefined && object.Time !== null
        ? fromJsonTimestamp(object.Time)
        : undefined;
    return message;
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.Key !== undefined && (obj.Key = message.Key);
    message.Version !== undefined && (obj.Version = message.Version);
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = message.CorrelationID);
    message.Time !== undefined && (obj.Time = message.Time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = { ...baseHeader } as Header;
    message.Key = object.Key ?? 0;
    message.Version = object.Version ?? 0;
    message.CorrelationID = object.CorrelationID ?? 0;
    message.Time = object.Time ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Header.$type, Header);

const baseGetMessage: object = {
  $type: "him.GetMessage",
  Key: 0,
  Version: 0,
  CorrelationID: 0,
  Age: Long.ZERO,
};

export const GetMessage = {
  $type: "him.GetMessage" as const,

  encode(
    message: GetMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Key !== 0) {
      writer.uint32(8).int32(message.Key);
    }
    if (message.Version !== 0) {
      writer.uint32(16).int32(message.Version);
    }
    if (message.CorrelationID !== 0) {
      writer.uint32(24).int32(message.CorrelationID);
    }
    if (!message.Age.isZero()) {
      writer.uint32(32).int64(message.Age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetMessage } as GetMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Key = reader.int32();
          break;
        case 2:
          message.Version = reader.int32();
          break;
        case 3:
          message.CorrelationID = reader.int32();
          break;
        case 4:
          message.Age = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetMessage {
    const message = { ...baseGetMessage } as GetMessage;
    message.Key =
      object.Key !== undefined && object.Key !== null ? Number(object.Key) : 0;
    message.Version =
      object.Version !== undefined && object.Version !== null
        ? Number(object.Version)
        : 0;
    message.CorrelationID =
      object.CorrelationID !== undefined && object.CorrelationID !== null
        ? Number(object.CorrelationID)
        : 0;
    message.Age =
      object.Age !== undefined && object.Age !== null
        ? Long.fromString(object.Age)
        : Long.ZERO;
    return message;
  },

  toJSON(message: GetMessage): unknown {
    const obj: any = {};
    message.Key !== undefined && (obj.Key = message.Key);
    message.Version !== undefined && (obj.Version = message.Version);
    message.CorrelationID !== undefined &&
      (obj.CorrelationID = message.CorrelationID);
    message.Age !== undefined &&
      (obj.Age = (message.Age || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetMessage>): GetMessage {
    const message = { ...baseGetMessage } as GetMessage;
    message.Key = object.Key ?? 0;
    message.Version = object.Version ?? 0;
    message.CorrelationID = object.CorrelationID ?? 0;
    if (object.Age !== undefined && object.Age !== null) {
      message.Age = object.Age as Long;
    } else {
      message.Age = Long.ZERO;
    }
    return message;
  },
};

messageTypeRegistry.set(GetMessage.$type, GetMessage);

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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: "google.protobuf.Timestamp", seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
