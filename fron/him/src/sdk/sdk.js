/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { w3cwebsocket, IMessageEvent, ICloseEvent } from "websocket";
import { Buffer } from "buffer";
import {
  Command,
  LogicPkt,
  MagicBasicPktInt,
  MessageType,
  Ping,
} from "./packet";
import common from "./common";
import protocol from "./protocol";
import { doLogin, LoginBody } from "./login";
import Long from "long";
import localforage from "localforage";

const heartbeatInterval = 55 * 1000; // seconds
const sendTimeout = 5 * 1000; // 10 seconds

const Flag = {
  Request: common.lookupEnum("pkt.Flag").values.Request,
  Response: common.lookupEnum("pkt.Flag").values.Response,
  Push: common.lookupEnum("pkt.Flag").values.Push,
};

const Status = {
  Success: common.lookupEnum("pkt.Status").values.Success,
  NoDestination: common.lookupEnum("pkt.Status").values.NoDestination,
  InvalidPacketBody: common.lookupEnum("pkt.Status").values.InvalidPacketBody,
  InvalidCommand: common.lookupEnum("pkt.Status").values.InvalidCommand,
  Unauthorized: common.lookupEnum("pkt.Status").values.Unauthorized,
  SystemException: common.lookupEnum("pkt.Status").values.SystemException,
  NotImplemented: common.lookupEnum("pkt.Status").values.NotImplemented,
  SessionNotFound: common.lookupEnum("pkt.Status").values.SessionNotFound,
};

const LoginReq = protocol.lookupType("pkt.LoginReq");
const LoginResp = protocol.lookupType("pkt.LoginResp");
const MessageReq = protocol.lookupType("pkt.MessageReq");
const MessageResp = protocol.lookupType("pkt.MessageResp");
const MessagePush = protocol.lookupType("pkt.MessagePush");
const GroupCreateResp = protocol.lookupType("pkt.GroupCreateResp");
const GroupGetResp = protocol.lookupType("pkt.GroupGetResp");
const MessageIndexResp = protocol.lookupType("pkt.MessageIndexResp");
const MessageContentResp = protocol.lookupType("pkt.MessageContentResp");
const ErrorResp = protocol.lookupType("pkt.ErrorResp");
const KickoutNotify = protocol.lookupType("pkt.KickoutNotify");
const MessageAckReq = protocol.lookupType("pkt.MessageAckReq");
const MessageIndexReq = protocol.lookupType("pkt.MessageIndexReq");
const MessageIndex = protocol.lookupType("pkt.MessageIndex");
const MessageContentReq = protocol.lookupType("pkt.MessageContentReq");
const MessageContent = protocol.lookupType("pkt.MessageContent");
const GroupCreateReq = protocol.lookupType("pkt.GroupCreateReq");
const GroupJoinReq = protocol.lookupType("pkt.GroupJoinReq");
const GroupQuitReq = protocol.lookupType("pkt.GroupQuitReq");
const GroupGetReq = protocol.lookupType("pkt.GroupGetReq");

const TimeUnit = {
  Second: 1000,
  Millisecond: 1,
};

// second 多少时间
// Unit 时间单位
// return: Promise<void>
export let sleep = async (second, Unit = TimeUnit.Second) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, second * Unit);
  });
};

export const State = {
  INIT: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  RECONNECTING: 3,
  CLOSEING: 4,
  CLOSED: 5,
};

// 客户端自定义的状态码范围 [10, 100)
export const KIMStatus = {
  RequestTimeout: 10,
  SendFailed: 11,
};

export const KIMEvent = {
  Reconnecting: "Reconnecting", //重连中
  Reconnected: "Reconnected", //重连成功
  Closed: "Closed",
  Kickout: "Kickout", // 被踢
};

export class Response {
  status; // number
  dest; // string
  payload; // Uint8Array
  constructor(status, dest, payload = new Uint8Array()) {
    this.status = status;
    this.dest = dest;
    this.payload = payload;
  }
}

export class Request {
  sendTime; // number
  data; // LogicPkt
  callback; // (response: LogicPkt) => void
  constructor(data, callback) {
    this.sendTime = Date.now();
    this.data = data;
    this.callback = callback;
  }
}

const pageCount = 50;

export class OfflineMessages {
  cli; // KIMClient
  groupmessages = new Map(); // <string, Message[]>
  usermessages = new Map(); // <string, Message[]>

  // indexes : MessageIndex[]
  constructor(cli, indexes) {
    this.cli = cli;
    // 通常离线消息的读取是从下向上，因此这里提前倒序下
    for (let index = indexes.length - 1; index >= 0; index--) {
      const idx = indexes[index];
      let message = new Message(idx.messageId, idx.sendTime);
      if (idx.direction == 1) {
        message.sender = cli.account;
        message.receiver = idx.accountB;
      } else {
        message.sender = idx.accountB;
        message.receiver = cli.account;
      }

      if (idx.group) {
        if (!this.groupmessages.has(idx.group)) {
          this.groupmessages.set(idx.group, new Array()); // <Message>
        }
        this.groupmessages.get(idx.group)?.push(message);
      } else {
        if (!this.usermessages.has(idx.accountB)) {
          this.usermessages.set(idx.accountB, new Array()); // <Message>
        }
        this.usermessages.get(idx.accountB)?.push(message);
      }
    }
  }
  /**
   * 获取离线消息群列表
   * return : Array<string>
   */
  listGroups() {
    let arr = new Array(); // <string>
    this.groupmessages.forEach((_, key) => {
      arr.push(key);
    });
    return arr;
  }
  /**
   * 获取离线消息用户列表
   * return : Array<string>
   */
  listUsers() {
    let arr = new Array(); // <string>
    this.usermessages.forEach((_, key) => {
      arr.push(key);
    });
    return arr;
  }
  /**
   * lazy load group offline messages, the page count is 50
   * group: string
   * @param page page number, start from one
   * return : Promise<Message[]>
   */
  async loadGroup(group, page) {
    let messages = this.groupmessages.get(group);
    if (!messages) {
      return new Array(); // <Message>
    }
    let msgs = await this.lazyLoad(messages, page);
    return msgs;
  }
  // account: string, page: number
  // return Promise<Message[]>
  async loadUser(account, page) {
    let messages = this.usermessages.get(account);
    if (!messages) {
      return new Array(); // <Message>
    }
    let msgs = await this.lazyLoad(messages, page);
    return msgs;
  }
  /**
   * 获取指定群的离线消息数据
   * @param group string 群ID
   * return number
   */
  getGroupMessagesCount(group) {
    let messages = this.groupmessages.get(group);
    if (!messages) {
      return 0;
    }
    return messages.length;
  }
  /**
   * 获取指定用户的离线消息数量
   * @param account string 用户
   * @return number
   */
  getUserMessagesCount(account) {
    let messages = this.usermessages.get(account);
    if (!messages) {
      return 0;
    }
    return messages.length;
  }
  // messages: Array<Message>, page: number
  // return Promise<Array<Message>>
  async lazyLoad(messages, page) {
    let i = (page - 1) * pageCount;
    let msgs = messages.slice(i, i + pageCount);
    console.debug(msgs);
    if (!msgs || msgs.length == 0) {
      return new Array(); // <Message>
    }
    if (msgs[0].body) {
      return msgs;
    }
    //load from server
    let { status, contents } = await this.loadcontent(
      msgs.map((idx) => idx.messageId)
    );
    if (status != Status.Success) {
      return msgs;
    }
    console.debug(`load content ${contents.map((c) => c.body)}`);
    if (contents.length == msgs.length) {
      for (let index = 0; index < msgs.length; index++) {
        let msg = msgs[index];
        let original = messages[i + index];
        let content = contents[index];
        Object.assign(msg, content);
        Object.assign(original, content);
      }
    }
    return msgs;
  }
  // messageIds: Long[]
  // return Promise<{ status: number, contents: MessageContent[] }>
  async loadcontent(messageIds) {
    let req = MessageContentReq.encode({ messageIds });
    let pkt = LogicPkt.build(Command.OfflineContent, "", req.finish());
    let resp = await this.cli.request(pkt);
    if (resp.status != Status.Success) {
      let err = ErrorResp.decode(pkt.payload);
      console.error(err);
      return {
        status: resp.status,
        contents: new Array(), // <MessageContent>
      };
    }
    console.info(resp);
    let respbody = MessageContentResp.decode(resp.payload);
    return { status: resp.status, contents: respbody.contents };
  }
}

export class Message {
  messageId; // Long;
  type; // number;
  body; // string;
  extra; // string;
  sender; // string;
  receiver; // string;
  group; // string;
  sendTime; // Long;
  arrivalTime; // number;
  //messageId: Long, sendTime: Long
  constructor(messageId, sendTime) {
    this.messageId = messageId;
    this.sendTime = sendTime;
    this.arrivalTime = Date.now();
  }
}

export class Content {
  type; // number;
  body; // string;
  extra; // string;
  dest;

  // body: string, type: number = MessageType.Text, extra?: string
  constructor(dest, body, type = MessageType.Text, extra) {
    this.dest = dest;
    this.type = type;
    this.body = body;
    this.extra = extra;
  }
}

export class KIMClient {
  wsurl; // string
  req; // LoginBody
  state = State.INIT;
  channelId; // string
  account; // string
  conn; // w3cwebsocket
  lastRead; // number
  lastMessage; // Message
  unack = 0; // number
  listeners = new Map(); // new Map<string, (e: KIMEvent) => void>()
  messageCallback; // (m: Message) => void
  offmessageCallback; // (m: OfflineMessages) => void
  closeCallback; // () => void
  // 全双工请求队列
  sendq = new Map(); // <number, Request>
  //url: string, req: LoginBody
  constructor(url, req) {
    this.wsurl = url;
    this.req = req;
    this.lastRead = Date.now();
    this.channelId = "";
    this.account = "";
    this.messageCallback = (m) => {
      // m : Message
      console.warn(
        `throw a message from ${m.sender} -- ${m.body}\nPlease check you had register a onmessage callback method before login`
      );
    };
    this.offmessageCallback = (_m) => {
      // m: OfflineMessages
      console.warn(
        `throw OfflineMessages.\nPlease check you had register a onofflinemessage callback method before login`
      );
    };
  }
  // events: string[], callback: (e: KIMEvent) => void
  register(events, callback) {
    // 注册事件到Client中。
    events.forEach((event) => {
      this.listeners.set(event, callback);
    });
  }
  // cb: (m: Message) => void
  onmessage(cb) {
    this.messageCallback = cb;
  }
  // cb: (m: OfflineMessages) => void
  onofflinemessage(cb) {
    this.offmessageCallback = cb;
  }
  // 1、登录
  // return Promise<{ success: boolean, err?: Error }>
  async login() {
    if (this.state == State.CONNECTED) {
      return {
        success: false,
        err: new Error("client has already been connected"),
      };
    }
    this.state = State.CONNECTING;
    let { success, err, channelId, account, conn } = await doLogin(
      this.wsurl,
      this.req
    );
    if (!success) {
      this.state = State.INIT;
      return { success, err };
    }
    console.info("login - ", success);
    // overwrite onmessage
    // evt: IMessageEvent
    conn.onmessage = (evt) => {
      try {
        // 重置lastRead
        this.lastRead = Date.now();
        let buf = Buffer.from(evt.data);
        let magic = buf.readInt32BE(0);
        if (magic == MagicBasicPktInt) {
          //目前只有心跳包pong
          console.debug(`recv a basic packet - ${buf.join(",")}`);
          return;
        }
        let pkt = LogicPkt.from(buf);
        this.packetHandler(pkt);
      } catch (error) {
        console.error(evt.data, error);
      }
    };
    conn.onerror = (error) => {
      console.info("websocket error: ", error);
      this.errorHandler(error);
    };
    // e: ICloseEvent
    conn.onclose = (e) => {
      console.debug("event[onclose] fired");
      if (this.state == State.CLOSEING) {
        this.onclose("logout");
        return;
      }
      this.errorHandler(new Error(e.reason));
    };
    this.conn = conn;
    this.channelId = channelId || "";
    this.account = account || "";
    await this.loadOfflineMessage();
    // success
    this.state = State.CONNECTED;
    this.heartbeatLoop();
    this.readDeadlineLoop();
    this.messageAckLoop();
    return { success, err };
  }
  // return : Promise<void>
  logout() {
    return new Promise((resolve, _) => {
      if (this.state === State.CLOSEING) {
        return;
      }
      this.state = State.CLOSEING;
      if (!this.conn) {
        return;
      }
      let tr = setTimeout(() => {
        console.debug("oh no,logout is timeout~");
        this.onclose("logout");
        resolve();
      }, 1500);

      this.closeCallback = async () => {
        clearTimeout(tr);
        await sleep(1);
        resolve();
      };

      this.conn.close();
      console.info("Connection closing...");
    });
  }
  /**
   * 给用户dest发送一条消息
   * @param dest 用户账号
   * @param req 请求的消息内容
   * @returns status KIMStatus|Status
   */
  // dest: string, req: Content, retry: number = 3
  // return : Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }>
  async talkToUser(req, retry = 3) {
    return this.talk(
      Command.ChatUserTalk,
      MessageReq.fromObject(req),
      retry
    );
  }
  /**
   * 给群dest发送一条消息
   * @param dest 群ID
   * @param req 请求的消息内容
   * @returns status KIMStatus|Status
   */
  // dest: string, req: Content, retry: number = 3
  // return : Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }>
  async talkToGroup(dest, req, retry = 3) {
    return this.talk(
      Command.ChatGroupTalk,
      dest,
      MessageReq.fromObject(req),
      retry
    );
  }
  // req: {
  //     name: string;
  //     avatar?: string;
  //     introduction?: string;
  //     members: string[];
  // }
  // return : Promise<{ status: number, resp?: GroupCreateResp, err?: ErrorResp }>
  async createGroup(req) {
    let req2 = GroupCreateReq.fromObject(req);
    req2.owner = this.account;
    if (!req2.members.find((v) => v == this.account)) {
      req2.members.push(this.account);
    }
    let pbreq = GroupCreateReq.encode(req2).finish();
    let pkt = LogicPkt.build(Command.GroupCreate, "", pbreq);
    let resp = await this.request(pkt);
    if (resp.status != Status.Success) {
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return {
      status: Status.Success,
      resp: GroupCreateResp.decode(resp.payload),
    };
  }
  // req: GroupJoinReq
  // : Promise<{ status: number, err?: ErrorResp }>
  async joinGroup(req) {
    let pbreq = GroupJoinReq.encode(req).finish();
    let pkt = LogicPkt.build(Command.GroupJoin, "", pbreq);
    let resp = await this.request(pkt);
    if (resp.status != Status.Success) {
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return { status: Status.Success };
  }
  // req: GroupQuitReq
  // return : Promise<{ status: number, err?: ErrorResp }>
  async quitGroup(req) {
    let pbreq = GroupQuitReq.encode(req).finish();
    let pkt = LogicPkt.build(Command.GroupQuit, "", pbreq);
    let resp = await this.request(pkt);
    if (resp.status != Status.Success) {
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return { status: Status.Success };
  }
  // req: GroupGetReq
  // return : : Promise<{ status: number, resp?: GroupGetResp, err?: ErrorResp }>
  async GetGroup(req) {
    let pbreq = GroupGetReq.encode(req).finish();
    let pkt = LogicPkt.build(Command.GroupDetail, "", pbreq);
    let resp = await this.request(pkt);
    if (resp.status != Status.Success) {
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return { status: Status.Success, resp: GroupGetResp.decode(resp.payload) };
  }
  // command: string, dest: string, req: MessageReq, retry: number
  // return : Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }>
  async talk(command, req, retry) {
    let pbreq = MessageReq.encode(req).finish();
    for (let index = 0; index < retry + 1; index++) {
      let pkt = LogicPkt.build(command, pbreq);
      let resp = await this.request(pkt);
      if (resp.status == Status.Success) {
        return {
          status: Status.Success,
          resp: MessageResp.decode(resp.payload),
        };
      }
      if (resp.status >= 300 && resp.status < 400) {
        // 消息重发
        console.warn("retry to send message");
        await sleep(2);
        continue;
      }
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return {
      status: KIMStatus.SendFailed,
      err: new Error("over max retry times"),
    };
  }
  // data: LogicPkt
  // return  : Promise<Response>
  async request(data) {
    return new Promise((resolve, _) => {
      let seq = data.sequence;

      let tr = setTimeout(() => {
        // remove from sendq
        this.sendq.delete(seq);
        resolve(new Response(KIMStatus.RequestTimeout));
      }, sendTimeout);

      // asynchronous wait ack from server
      // pkt: LogicPkt
      let callback = (pkt) => {
        clearTimeout(tr);
        // remove from sendq
        this.sendq.delete(seq);
        resolve(new Response(pkt.status, pkt.dest, pkt.payload));
      };
      console.debug(`request seq:${seq} command:${data.command}`);

      this.sendq.set(seq, new Request(data, callback));
      if (!this.send(data.bytes())) {
        resolve(new Response(KIMStatus.SendFailed));
      }
    });
  }
  // event: KIMEvent
  fireEvent(event) {
    let listener = this.listeners.get(event);
    if (listener) {
      listener(event);
    }
  }
  // pkt: LogicPkt
  async packetHandler(pkt) {
    console.debug("received packet: ", pkt);
    if (pkt.status >= 400) {
      console.info(`need relogin due to status ${pkt.status}`);
      this.conn?.close();
      return;
    }
    if (pkt.flag == Flag.Response) {
      let req = this.sendq.get(pkt.sequence);
      if (req) {
        req.callback(pkt);
      } else {
        console.error(`req of ${pkt.sequence} no found in sendq`);
      }
      return;
    }
    switch (pkt.command) {
      case Command.ChatUserTalk:
      case Command.ChatGroupTalk:
        let push = MessagePush.decode(pkt.payload);
        let message = new Message(push.messageId, push.sendTime);
        Object.assign(message, push);
        message.receiver = this.account;
        if (pkt.command == Command.ChatGroupTalk) {
          message.group = pkt.dest;
        }
        if (!(await Store.exist(message.messageId))) {
          // 确保状态处于CONNECTED，才能执行消息ACK
          if (this.state == State.CONNECTED) {
            this.lastMessage = message;
            this.unack++;
            try {
              this.messageCallback(message);
            } catch (error) {
              console.error(error);
            }
          }
          // 消息保存到数据库中。
          await Store.insert(message);
        }
        break;
      case Command.SignIn:
        let ko = KickoutNotify.decode(pkt.payload);
        if (ko.channelId == this.channelId) {
          this.logout();
          this.fireEvent(KIMEvent.Kickout);
        }
        break;
    }
  }
  // 2、心跳
  heartbeatLoop() {
    console.debug("heartbeatLoop start");
    let start = Date.now();
    let loop = () => {
      if (this.state != State.CONNECTED) {
        console.debug("heartbeatLoop exited");
        return;
      }
      if (Date.now() - start >= heartbeatInterval) {
        console.debug(`>>> send ping ; state is ${this.state}`);
        start = Date.now();
        this.send(Ping);
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }
  // 3、读超时
  readDeadlineLoop() {
    console.debug("deadlineLoop start");
    let loop = () => {
      if (this.state != State.CONNECTED) {
        console.debug("deadlineLoop exited");
        return;
      }
      if (Date.now() - this.lastRead > 3 * heartbeatInterval) {
        // 如果超时就调用errorHandler处理
        this.errorHandler(new Error("read timeout"));
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }
  messageAckLoop() {
    let start = Date.now();
    const delay = 500; //ms
    let loop = async () => {
      if (this.state != State.CONNECTED) {
        console.debug("messageAckLoop exited");
        return;
      }
      let msg = this.lastMessage; // lock this message
      if (!!msg && Date.now() - start > 3000) {
        let overflow = this.unack > 10;
        this.unack = 0; // reset unack before ack
        this.lastMessage = undefined; //reset last message

        let diff = Date.now() - msg.arrivalTime;
        if (!overflow && diff < delay) {
          await sleep(delay - diff, TimeUnit.Millisecond);
        }
        let req = MessageAckReq.encode({ messageId: msg.messageId });
        let pkt = LogicPkt.build(Command.ChatTalkAck, "", req.finish());
        start = Date.now();
        this.send(pkt.bytes());
        // 修改本地存储中最后一条ACK消息记录
        await Store.setAck(msg.messageId);
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }
  async loadOfflineMessage() {
    console.log("loadOfflineMessage start");
    // 1. 加载消息索引
    // messageId: Long = Long.ZERO
    // return : Promise<{ status: number, indexes?: MessageIndex[] }>
    let loadIndex = async (messageId = Long.ZERO) => {
      let req = MessageIndexReq.encode({ messageId });
      let pkt = LogicPkt.build(Command.OfflineIndex, req.finish());
      let resp = await this.request(pkt);
      if (resp.status != Status.Success) {
        let err = ErrorResp.decode(pkt.payload);
        console.error(err);
        return { status: resp.status };
      }
      let respbody = MessageIndexResp.decode(resp.payload);
      return { status: resp.status, indexes: respbody.indexes };
    };
    let offmessages = new Array(); // <MessageIndex>
    let messageId = await Store.lastId();
    while (true) {
      let { status, indexes } = await loadIndex(messageId);
      if (status != Status.Success) {
        break;
      }
      if (!indexes || !indexes.length) {
        break;
      }
      messageId = indexes[indexes.length - 1].messageId;
      offmessages = offmessages.concat(indexes);
    }
    console.info(
      `load offline indexes - ${offmessages.map((msg) =>
        msg.messageId.toString()
      )}`
    );
    let om = new OfflineMessages(this, offmessages);
    this.offmessageCallback(om);
  }
  // 表示连接中止
  // reason: string
  onclose(reason) {
    if (this.state == State.CLOSED) {
      return;
    }
    this.state = State.CLOSED;

    console.info("connection closed due to " + reason);
    this.conn = undefined;
    this.channelId = "";
    this.account = "";
    // 通知上层应用
    this.fireEvent(KIMEvent.Closed);
    if (this.closeCallback) {
      this.closeCallback();
    }
  }
  // 4. 自动重连
  // error: Error
  async errorHandler(error) {
    // 如果是主动断开连接，就没有必要自动重连
    // 比如收到被踢，或者主动调用logout()方法
    if (this.state == State.CLOSED || this.state == State.CLOSEING) {
      return;
    }
    this.state = State.RECONNECTING;
    this.fireEvent(KIMEvent.Reconnecting);
    // 重连10次
    for (let index = 0; index < 10; index++) {
      await sleep(3);
      try {
        console.info("try to relogin");
        let { success, err } = await this.login();
        if (success) {
          this.fireEvent(KIMEvent.Reconnected);
          return;
        }
        console.info(err);
      } catch (error) {
        console.warn(error);
      }
    }
    this.onclose("reconnect timeout");
  }
  // data: Buffer | Uint8Array
  // return : boolean
  send(data) {
    try {
      if (this.conn == null) {
        return false;
      }
      this.conn.send(data);
    } catch (error) {
      // handle write error
      this.errorHandler(new Error("write timeout"));
      return false;
    }
    return true;
  }
}

class MsgStorage {
  constructor() {
    localforage.config({
      name: "kim",
      storeName: "kim",
    });
  }
  // id: Long
  // return : string
  keymsg(id) {
    return `msg_${id.toString()}`;
  }
  // return : string
  keylast() {
    return `last_id`;
  }
  // 记录一条消息
  // msg: Message
  // return : Promise<boolean>
  async insert(msg) {
    await localforage.setItem(this.keymsg(msg.messageId), msg);
    return true;
  }
  // 检查消息是否已经保存
  // id: Long
  // return : Promise<boolean>
  async exist(id) {
    try {
      let val = await localforage.getItem(this.keymsg(id));
      return !!val;
    } catch (err) {
      console.warn(err);
    }
    return false;
  }
  // id: Long
  // return : Promise<Message | null>
  async get(id) {
    try {
      let message = await localforage.getItem(this.keymsg(id));
      // <Message>
      return message;
    } catch (err) {
      console.warn(err);
    }
    return null;
  }
  // id: Long
  // return : Promise<boolean>
  async setAck(id) {
    await localforage.setItem(this.keylast(), id);
    return true;
  }
  // return : Promise<Long>
  async lastId() {
    let id = await localforage.getItem(this.keylast());
    // <Long>
    return id || Long.ZERO;
  }
}

export let Store = new MsgStorage();
