import common from "./common";

export class Seq {
  static num = 0;
  static Next() {
    Seq.num++;
    Seq.num = Seq.num % 65536;
    return Seq.num;
  }
}

export const Command = {
  // 登录
  SignIn: "login.signin",
  SignOut: "login.signout",

  // chat
  ChatUserTalk: "chat.user.talk",
  ChatTalkAck: "chat.talk.ack",

  // 离线
  OfflineIndex: "chat.offline.index",
  OfflineContent: "chat.offline.content",

  // 社群
  CommunityPush: "chat.community.push"
};

const MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65]);
const MagicBasicPkt = new Uint8Array([0xc3, 0x15, 0xa7, 0x65]);

const Status = common.Status;

const Header = common.Header;

export const MagicLogicPktInt = Buffer.from(MagicLogicPkt).readInt32BE(0);
export const MagicBasicPktInt = Buffer.from(MagicBasicPkt).readInt32BE(0);

export const MessageType = {
  Text: 1, // 文本
  Image: 2, // 图片
  Voice: 3, // 语音
  Video: 4, // 视频
};

export const Ping = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 1, 0, 0]);
export const Pong = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 2, 0, 0]);

// LogicPkt 的封装
export class LogicPkt {
  command;
  sequence = 0;
  flag;
  status = Status.Success;
  payload;
  constructor() {
    this.payload = new Uint8Array();
  }
  // 返回 LogicPkt
  static build(command, payload = new Uint8Array()) {
    let message = new LogicPkt();
    message.command = command;
    message.sequence = Seq.Next();
    if (payload.length > 0) {
      message.payload = payload;
    }
    return message;
  }
  // buf 是Buffer类型
  // 返回 LogicPkt
  static from(buf) {
    let offset = 0;
    let magic = buf.readInt32BE(offset);
    let hlen = 0;
    // 判断前面四个字节是否为Magic
    if (magic == MagicLogicPktInt) {
      offset += 4;
    }
    hlen = buf.readInt32BE(offset);
    offset += 4;
    // 反序列化Header
    let header = Header.decode(buf.subarray(offset, offset + hlen));
    offset += hlen;
    let message = new LogicPkt();
    // 把header中的属性copy到message
    Object.assign(message, header);
    // 读取payload
    let plen = buf.readInt32BE(offset);
    offset += 4;
    message.payload = buf.subarray(offset, offset + plen);
    return message;
  }
  // 返回 Buffer
  bytes() {
    let headerReq = Header.fromObject(this);
    let headerArray = Header.encode(headerReq).finish();
    let hlen = headerArray.length;
    let plen = this.payload.length;
    //| 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
    let buf = Buffer.alloc(4 + 4 + hlen + 4 + plen);
    let offset = 0;
    Buffer.from(MagicLogicPkt).copy(buf, offset, 0);
    offset += 4;
    // 4bytes Header Length
    offset = buf.writeInt32BE(hlen, offset);
    // header
    Buffer.from(headerArray).copy(buf, offset, 0);
    offset += hlen;
    // 4bytes Payload Length
    offset = buf.writeInt32BE(plen, offset);
    // payload
    Buffer.from(this.payload).copy(buf, offset, 0);
    return buf;
  }
}

export let print = (arr) => {
  if (arr == null) {
    return;
  }
  console.info(`[${arr.join(",")}]`);
};
