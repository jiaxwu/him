/* eslint-disable */
import { messageTypeRegistry } from "../../../../typeRegistry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "message";

/** 图片类型 */
export enum ImageType {
  /** ImageTypeUnknown - 未知 */
  ImageTypeUnknown = 0,
  /** ImageTypeJPG - JPG格式 */
  ImageTypeJPG = 1,
  /** ImageTypePNG - PNG格式 */
  ImageTypePNG = 2,
  UNRECOGNIZED = -1,
}

export function imageTypeFromJSON(object: any): ImageType {
  switch (object) {
    case 0:
    case "ImageTypeUnknown":
      return ImageType.ImageTypeUnknown;
    case 1:
    case "ImageTypeJPG":
      return ImageType.ImageTypeJPG;
    case 2:
    case "ImageTypePNG":
      return ImageType.ImageTypePNG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImageType.UNRECOGNIZED;
  }
}

export function imageTypeToJSON(object: ImageType): string {
  switch (object) {
    case ImageType.ImageTypeUnknown:
      return "ImageTypeUnknown";
    case ImageType.ImageTypeJPG:
      return "ImageTypeJPG";
    case ImageType.ImageTypePNG:
      return "ImageTypePNG";
    default:
      return "UNKNOWN";
  }
}

/** 语音类型 */
export enum VoiceType {
  /** VoiceTypeUnknown - 未知 */
  VoiceTypeUnknown = 0,
  /** VoiceTypeMP3 - MP3格式 */
  VoiceTypeMP3 = 1,
  UNRECOGNIZED = -1,
}

export function voiceTypeFromJSON(object: any): VoiceType {
  switch (object) {
    case 0:
    case "VoiceTypeUnknown":
      return VoiceType.VoiceTypeUnknown;
    case 1:
    case "VoiceTypeMP3":
      return VoiceType.VoiceTypeMP3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VoiceType.UNRECOGNIZED;
  }
}

export function voiceTypeToJSON(object: VoiceType): string {
  switch (object) {
    case VoiceType.VoiceTypeUnknown:
      return "VoiceTypeUnknown";
    case VoiceType.VoiceTypeMP3:
      return "VoiceTypeMP3";
    default:
      return "UNKNOWN";
  }
}

/** 视频类型 */
export enum VideoType {
  /** VideoTypeUnknown - 未知 */
  VideoTypeUnknown = 0,
  /** VideoTypeMP4 - MP4格式 */
  VideoTypeMP4 = 1,
  UNRECOGNIZED = -1,
}

export function videoTypeFromJSON(object: any): VideoType {
  switch (object) {
    case 0:
    case "VideoTypeUnknown":
      return VideoType.VideoTypeUnknown;
    case 1:
    case "VideoTypeMP4":
      return VideoType.VideoTypeMP4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VideoType.UNRECOGNIZED;
  }
}

export function videoTypeToJSON(object: VideoType): string {
  switch (object) {
    case VideoType.VideoTypeUnknown:
      return "VideoTypeUnknown";
    case VideoType.VideoTypeMP4:
      return "VideoTypeMP4";
    default:
      return "UNKNOWN";
  }
}

/** 提示类型 */
export enum TipType {
  /** TipTypeUnknown - 未知 */
  TipTypeUnknown = 0,
  /** TipTypeText - 文本类型提示 */
  TipTypeText = 1,
  /** TipTypeNickNameText - 昵称文本类型提示 */
  TipTypeNickNameText = 2,
  UNRECOGNIZED = -1,
}

export function tipTypeFromJSON(object: any): TipType {
  switch (object) {
    case 0:
    case "TipTypeUnknown":
      return TipType.TipTypeUnknown;
    case 1:
    case "TipTypeText":
      return TipType.TipTypeText;
    case 2:
    case "TipTypeNickNameText":
      return TipType.TipTypeNickNameText;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TipType.UNRECOGNIZED;
  }
}

export function tipTypeToJSON(object: TipType): string {
  switch (object) {
    case TipType.TipTypeUnknown:
      return "TipTypeUnknown";
    case TipType.TipTypeText:
      return "TipTypeText";
    case TipType.TipTypeNickNameText:
      return "TipTypeNickNameText";
    default:
      return "UNKNOWN";
  }
}

/** 文件类型 */
export enum FileType {
  /** FileTypeUnknown - 未知 */
  FileTypeUnknown = 0,
  /** FileTypePDF - PDF格式 */
  FileTypePDF = 1,
  UNRECOGNIZED = -1,
}

export function fileTypeFromJSON(object: any): FileType {
  switch (object) {
    case 0:
    case "FileTypeUnknown":
      return FileType.FileTypeUnknown;
    case 1:
    case "FileTypePDF":
      return FileType.FileTypePDF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FileType.UNRECOGNIZED;
  }
}

export function fileTypeToJSON(object: FileType): string {
  switch (object) {
    case FileType.FileTypeUnknown:
      return "FileTypeUnknown";
    case FileType.FileTypePDF:
      return "FileTypePDF";
    default:
      return "UNKNOWN";
  }
}

/** 图片 */
export interface Image {
  $type: "message.Image";
  /** 地址 */
  URL: string;
  /** 宽 */
  Width: number;
  /** 高 */
  Height: number;
  /** 图片类型 */
  Type: ImageType;
  /** 大小，单位B */
  Size: number;
}

/** 语音 */
export interface Voice {
  $type: "message.Voice";
  /** 地址 */
  URL: string;
  /** 时长，单位秒 */
  Duration: number;
  /** 语音类型 */
  Type: VoiceType;
  /** 大小，单位B */
  Size: number;
}

/** 视频 */
export interface Video {
  $type: "message.Video";
  /** 地址 */
  URL: string;
  /** 时长，单位秒 */
  Duration: number;
  /** 视频类型 */
  Type: VideoType;
  /** 大小，单位B */
  Size: number;
}

/** 文本提示 */
export interface TextTip {
  $type: "message.TextTip";
  /** 提示内容 */
  Content: string;
}

/** 昵称文本提示 */
export interface NickNameTextTip {
  $type: "message.NickNameTextTip";
  /** 格式字符串 */
  Format: string;
  /** 昵称文本 */
  NickNameTexts: NickNameText[];
}

/** 昵称文本 */
export interface NickNameText {
  $type: "message.NickNameText";
  /** 用户编号 */
  UserID: Long;
  /** 昵称 */
  NickName: string;
}

/** 文件 */
export interface File {
  $type: "message.File";
  /** 地址 */
  URL: string;
  /** 文件名 */
  Name: string;
  /** 文件类型 */
  Type: FileType;
  /** 大小，单位B */
  Size: number;
}

const baseImage: object = {
  $type: "message.Image",
  URL: "",
  Width: 0,
  Height: 0,
  Type: 0,
  Size: 0,
};

export const Image = {
  $type: "message.Image" as const,

  encode(message: Image, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.URL !== "") {
      writer.uint32(10).string(message.URL);
    }
    if (message.Width !== 0) {
      writer.uint32(16).uint32(message.Width);
    }
    if (message.Height !== 0) {
      writer.uint32(24).uint32(message.Height);
    }
    if (message.Type !== 0) {
      writer.uint32(32).int32(message.Type);
    }
    if (message.Size !== 0) {
      writer.uint32(40).uint32(message.Size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Image {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImage } as Image;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.URL = reader.string();
          break;
        case 2:
          message.Width = reader.uint32();
          break;
        case 3:
          message.Height = reader.uint32();
          break;
        case 4:
          message.Type = reader.int32() as any;
          break;
        case 5:
          message.Size = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Image {
    const message = { ...baseImage } as Image;
    message.URL =
      object.URL !== undefined && object.URL !== null ? String(object.URL) : "";
    message.Width =
      object.Width !== undefined && object.Width !== null
        ? Number(object.Width)
        : 0;
    message.Height =
      object.Height !== undefined && object.Height !== null
        ? Number(object.Height)
        : 0;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? imageTypeFromJSON(object.Type)
        : 0;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: Image): unknown {
    const obj: any = {};
    message.URL !== undefined && (obj.URL = message.URL);
    message.Width !== undefined && (obj.Width = message.Width);
    message.Height !== undefined && (obj.Height = message.Height);
    message.Type !== undefined && (obj.Type = imageTypeToJSON(message.Type));
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(object: DeepPartial<Image>): Image {
    const message = { ...baseImage } as Image;
    message.URL = object.URL ?? "";
    message.Width = object.Width ?? 0;
    message.Height = object.Height ?? 0;
    message.Type = object.Type ?? 0;
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Image.$type, Image);

const baseVoice: object = {
  $type: "message.Voice",
  URL: "",
  Duration: 0,
  Type: 0,
  Size: 0,
};

export const Voice = {
  $type: "message.Voice" as const,

  encode(message: Voice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.URL !== "") {
      writer.uint32(10).string(message.URL);
    }
    if (message.Duration !== 0) {
      writer.uint32(16).uint32(message.Duration);
    }
    if (message.Type !== 0) {
      writer.uint32(24).int32(message.Type);
    }
    if (message.Size !== 0) {
      writer.uint32(32).uint32(message.Size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Voice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVoice } as Voice;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.URL = reader.string();
          break;
        case 2:
          message.Duration = reader.uint32();
          break;
        case 3:
          message.Type = reader.int32() as any;
          break;
        case 4:
          message.Size = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Voice {
    const message = { ...baseVoice } as Voice;
    message.URL =
      object.URL !== undefined && object.URL !== null ? String(object.URL) : "";
    message.Duration =
      object.Duration !== undefined && object.Duration !== null
        ? Number(object.Duration)
        : 0;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? voiceTypeFromJSON(object.Type)
        : 0;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: Voice): unknown {
    const obj: any = {};
    message.URL !== undefined && (obj.URL = message.URL);
    message.Duration !== undefined && (obj.Duration = message.Duration);
    message.Type !== undefined && (obj.Type = voiceTypeToJSON(message.Type));
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(object: DeepPartial<Voice>): Voice {
    const message = { ...baseVoice } as Voice;
    message.URL = object.URL ?? "";
    message.Duration = object.Duration ?? 0;
    message.Type = object.Type ?? 0;
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Voice.$type, Voice);

const baseVideo: object = {
  $type: "message.Video",
  URL: "",
  Duration: 0,
  Type: 0,
  Size: 0,
};

export const Video = {
  $type: "message.Video" as const,

  encode(message: Video, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.URL !== "") {
      writer.uint32(10).string(message.URL);
    }
    if (message.Duration !== 0) {
      writer.uint32(16).uint32(message.Duration);
    }
    if (message.Type !== 0) {
      writer.uint32(24).int32(message.Type);
    }
    if (message.Size !== 0) {
      writer.uint32(32).uint32(message.Size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Video {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVideo } as Video;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.URL = reader.string();
          break;
        case 2:
          message.Duration = reader.uint32();
          break;
        case 3:
          message.Type = reader.int32() as any;
          break;
        case 4:
          message.Size = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Video {
    const message = { ...baseVideo } as Video;
    message.URL =
      object.URL !== undefined && object.URL !== null ? String(object.URL) : "";
    message.Duration =
      object.Duration !== undefined && object.Duration !== null
        ? Number(object.Duration)
        : 0;
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? videoTypeFromJSON(object.Type)
        : 0;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: Video): unknown {
    const obj: any = {};
    message.URL !== undefined && (obj.URL = message.URL);
    message.Duration !== undefined && (obj.Duration = message.Duration);
    message.Type !== undefined && (obj.Type = videoTypeToJSON(message.Type));
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(object: DeepPartial<Video>): Video {
    const message = { ...baseVideo } as Video;
    message.URL = object.URL ?? "";
    message.Duration = object.Duration ?? 0;
    message.Type = object.Type ?? 0;
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Video.$type, Video);

const baseTextTip: object = { $type: "message.TextTip", Content: "" };

export const TextTip = {
  $type: "message.TextTip" as const,

  encode(
    message: TextTip,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Content !== "") {
      writer.uint32(10).string(message.Content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextTip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTextTip } as TextTip;
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

  fromJSON(object: any): TextTip {
    const message = { ...baseTextTip } as TextTip;
    message.Content =
      object.Content !== undefined && object.Content !== null
        ? String(object.Content)
        : "";
    return message;
  },

  toJSON(message: TextTip): unknown {
    const obj: any = {};
    message.Content !== undefined && (obj.Content = message.Content);
    return obj;
  },

  fromPartial(object: DeepPartial<TextTip>): TextTip {
    const message = { ...baseTextTip } as TextTip;
    message.Content = object.Content ?? "";
    return message;
  },
};

messageTypeRegistry.set(TextTip.$type, TextTip);

const baseNickNameTextTip: object = {
  $type: "message.NickNameTextTip",
  Format: "",
};

export const NickNameTextTip = {
  $type: "message.NickNameTextTip" as const,

  encode(
    message: NickNameTextTip,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Format !== "") {
      writer.uint32(10).string(message.Format);
    }
    for (const v of message.NickNameTexts) {
      NickNameText.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NickNameTextTip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNickNameTextTip } as NickNameTextTip;
    message.NickNameTexts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Format = reader.string();
          break;
        case 2:
          message.NickNameTexts.push(
            NickNameText.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NickNameTextTip {
    const message = { ...baseNickNameTextTip } as NickNameTextTip;
    message.Format =
      object.Format !== undefined && object.Format !== null
        ? String(object.Format)
        : "";
    message.NickNameTexts = (object.NickNameTexts ?? []).map((e: any) =>
      NickNameText.fromJSON(e)
    );
    return message;
  },

  toJSON(message: NickNameTextTip): unknown {
    const obj: any = {};
    message.Format !== undefined && (obj.Format = message.Format);
    if (message.NickNameTexts) {
      obj.NickNameTexts = message.NickNameTexts.map((e) =>
        e ? NickNameText.toJSON(e) : undefined
      );
    } else {
      obj.NickNameTexts = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<NickNameTextTip>): NickNameTextTip {
    const message = { ...baseNickNameTextTip } as NickNameTextTip;
    message.Format = object.Format ?? "";
    message.NickNameTexts = (object.NickNameTexts ?? []).map((e) =>
      NickNameText.fromPartial(e)
    );
    return message;
  },
};

messageTypeRegistry.set(NickNameTextTip.$type, NickNameTextTip);

const baseNickNameText: object = {
  $type: "message.NickNameText",
  UserID: Long.UZERO,
  NickName: "",
};

export const NickNameText = {
  $type: "message.NickNameText" as const,

  encode(
    message: NickNameText,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.UserID.isZero()) {
      writer.uint32(8).uint64(message.UserID);
    }
    if (message.NickName !== "") {
      writer.uint32(18).string(message.NickName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NickNameText {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNickNameText } as NickNameText;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserID = reader.uint64() as Long;
          break;
        case 2:
          message.NickName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NickNameText {
    const message = { ...baseNickNameText } as NickNameText;
    message.UserID =
      object.UserID !== undefined && object.UserID !== null
        ? Long.fromString(object.UserID)
        : Long.UZERO;
    message.NickName =
      object.NickName !== undefined && object.NickName !== null
        ? String(object.NickName)
        : "";
    return message;
  },

  toJSON(message: NickNameText): unknown {
    const obj: any = {};
    message.UserID !== undefined &&
      (obj.UserID = (message.UserID || Long.UZERO).toString());
    message.NickName !== undefined && (obj.NickName = message.NickName);
    return obj;
  },

  fromPartial(object: DeepPartial<NickNameText>): NickNameText {
    const message = { ...baseNickNameText } as NickNameText;
    if (object.UserID !== undefined && object.UserID !== null) {
      message.UserID = object.UserID as Long;
    } else {
      message.UserID = Long.UZERO;
    }
    message.NickName = object.NickName ?? "";
    return message;
  },
};

messageTypeRegistry.set(NickNameText.$type, NickNameText);

const baseFile: object = {
  $type: "message.File",
  URL: "",
  Name: "",
  Type: 0,
  Size: 0,
};

export const File = {
  $type: "message.File" as const,

  encode(message: File, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.URL !== "") {
      writer.uint32(10).string(message.URL);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Type !== 0) {
      writer.uint32(24).int32(message.Type);
    }
    if (message.Size !== 0) {
      writer.uint32(32).uint32(message.Size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): File {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFile } as File;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.URL = reader.string();
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Type = reader.int32() as any;
          break;
        case 4:
          message.Size = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): File {
    const message = { ...baseFile } as File;
    message.URL =
      object.URL !== undefined && object.URL !== null ? String(object.URL) : "";
    message.Name =
      object.Name !== undefined && object.Name !== null
        ? String(object.Name)
        : "";
    message.Type =
      object.Type !== undefined && object.Type !== null
        ? fileTypeFromJSON(object.Type)
        : 0;
    message.Size =
      object.Size !== undefined && object.Size !== null
        ? Number(object.Size)
        : 0;
    return message;
  },

  toJSON(message: File): unknown {
    const obj: any = {};
    message.URL !== undefined && (obj.URL = message.URL);
    message.Name !== undefined && (obj.Name = message.Name);
    message.Type !== undefined && (obj.Type = fileTypeToJSON(message.Type));
    message.Size !== undefined && (obj.Size = message.Size);
    return obj;
  },

  fromPartial(object: DeepPartial<File>): File {
    const message = { ...baseFile } as File;
    message.URL = object.URL ?? "";
    message.Name = object.Name ?? "";
    message.Type = object.Type ?? 0;
    message.Size = object.Size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(File.$type, File);

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
