/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "person";

export interface Person {
  name: string;
  age: Long;
}

const basePerson: object = { name: "", age: Long.UZERO };

export const Person = {
  encode(
    message: Person,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (!message.age.isZero()) {
      writer.uint32(16).uint64(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePerson } as Person;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Person {
    const message = { ...basePerson } as Person;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.age =
      object.age !== undefined && object.age !== null
        ? Long.fromString(object.age)
        : Long.UZERO;
    return message;
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined &&
      (obj.age = (message.age || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Person>): Person {
    const message = { ...basePerson } as Person;
    message.name = object.name ?? "";
    if (object.age !== undefined && object.age !== null) {
      message.age = object.age as Long;
    } else {
      message.age = Long.UZERO;
    }
    return message;
  },
};

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
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
