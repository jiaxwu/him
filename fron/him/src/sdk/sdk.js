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

// 让int64正常
var $protobuf = require("protobufjs/minimal");
$protobuf.util.Long = require("long");
$protobuf.configure();

const heartbeatInterval = 55 * 1000; // seconds
const sendTimeout = 5 * 1000; // 10 seconds

const Flag = common.Flag;

const Status = common.Status;

const LoginReq = protocol.LoginReq;
const LoginResp = protocol.LoginResp;
const MessageReq = protocol.MessageReq;
const MessageResp = protocol.MessageResp;
const MessagePush = protocol.MessagePush;
const MessageIndexResp = protocol.MessageIndexResp;
const MessageContentResp = protocol.MessageContentResp;
const ErrorResp = protocol.ErrorResp;
const KickoutNotify = protocol.KickoutNotify;
const MessageAckReq = protocol.MessageAckReq;
const MessageIndexReq = protocol.MessageIndexReq;
const MessageIndex = protocol.MessageIndex;
const MessageContentReq = protocol.MessageContentReq;
const MessageContent = protocol.MessageContent;

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
  Closed: "Closed", // 断开连接
  Kickout: "Kickout", // 被踢
};

// 异步转同步的响应
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

// 异步转同步的请求
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

// 处理离线消息的类
export class OfflineMessages {
  cli; // KIMClient
  usermessages = new Map(); // <string, Message[]>

  /**
   * @param {KIMClient} cli
   * @param {MessageIndex[]} indexes
   */
  constructor(cli, indexes) {
    this.cli = cli;
    // 通常离线消息的读取是从下向上，因此这里提前倒序下
    for (let index = indexes.length - 1; index >= 0; index--) {
      const idx = indexes[index];
      let message = new Message(idx.messageId, idx.sendTime);
      if (idx.direction == 1) {
        message.sender = cli.userId;
        message.receiver = idx.userB;
      } else {
        message.sender = idx.userB;
        message.receiver = cli.userId;
      }

      if (!this.usermessages.has(idx.userB)) {
        this.usermessages.set(idx.userB, new Array()); // <Message>
      }
      this.usermessages.get(idx.userB)?.push(message);
    }
  }

  /**
   * 获取离线消息用户列表
   * @return {Array<String>}
   */
  listUsers() {
    let arr = new Array(); // <string>
    this.usermessages.forEach((_, key) => {
      arr.push(key);
    });
    return arr;
  }

  /**
   * 获取某个用户的消息
   * @param {Long} userId
   * @param {Number} page
   * @returns {Promise<Message[]>}
   */
  async loadUser(userId, page) {
    let messages = this.usermessages.get(userId);
    if (!messages) {
      return new Array(); // <Message>
    }
    let msgs = await this.lazyLoad(messages, page);
    return msgs;
  }

  /**
   * 获取指定用户的离线消息数量
   * @param {Long} userId 用户
   * @return {number}
   */
  getUserMessagesCount(userId) {
    let messages = this.usermessages.get(userId);
    if (!messages) {
      return 0;
    }
    return messages.length;
  }

  /**
   * 懒加载消息内容
   * @param {Array<Message>} messages
   * @param {Number} page
   * @returns {Promise<Array<Message>>}
   */
  async lazyLoad(messages, page) {
    let i = (page - 1) * pageCount;
    let msgs = messages.slice(i, i + pageCount);
    if (!msgs || msgs.length == 0) {
      return new Array(); // <Message>
    }
    if (msgs[0].body) {
      return msgs;
    }
    // 从服务器加载数据
    let { status, contents } = await this.loadcontent(
      msgs.map((idx) => idx.messageId)
    );
    if (status != Status.Success) {
      return msgs;
    }

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

  /**
   * 从服务器加载消息内容
   * @param {Long[]} messageIds
   * @returns {Promise<{ status: Number, contents: MessageContent[] }>}
   */
  async loadcontent(messageIds) {
    let req = MessageContentReq.encode({ messageIds });
    let pkt = LogicPkt.build(Command.OfflineContent, req.finish());
    let resp = await this.cli.request(pkt);
    if (resp.status != Status.Success) {
      return {
        status: resp.status,
        contents: new Array(), // <MessageContent>
      };
    }
    let respbody = MessageContentResp.decode(resp.payload);
    console.log(
      "sdk:OfflineMessages:loadcontent:加载到的消息内容是:",
      respbody
    );
    return { status: resp.status, contents: respbody.contents };
  }
}

// 消息对象
export class Message {
  messageId; // 消息id
  type; // 消息类型
  body; // 消息体 string
  sender; // 发送者
  extra; // 额外信息 String
  receiver; // 接收者
  sendTime; // 发送时间
  arrivalTime; // 到达时间

  /**
   * @param {Long} messageId
   * @param {Long} sendTime
   */
  constructor(messageId, sendTime) {
    this.messageId = messageId;
    this.sendTime = sendTime;
    this.arrivalTime = Date.now();
  }
}

// 内容，用于发送消息
export class Content {
  type;
  body;
  extra;
  dest;

  /**
   * @param {Long} dest
   * @param {String} body
   * @param {MessageType} type
   * @param {String} extra
   */
  constructor(dest, body, type = MessageType.Text, extra) {
    this.dest = dest;
    this.type = type;
    this.body = body;
    this.extra = extra;
  }
}

export class KIMClient {
  wsurl; // ws连接url
  req; // LoginBody
  state = State.INIT;
  channelId; // 连接的通道id
  userId; // 用户id
  conn; // w3cwebsocket
  lastRead; // number
  lastMessage; // Message
  unack = 0; // number
  // 事件监听器列表，监听KIMEvent事件
  listeners = new Map(); // new Map<string, (e: KIMEvent) => void>()
  messageCallback; // (m: Message) => void
  offmessageCallback; // (m: OfflineMessages) => void

  closeCallback; // () => void
  // 全双工请求队列
  sendq = new Map(); // <number, Request>

  talkMessageMap = new Map(); // <userId, (Message) => void>

  // 构造一个客户端
  constructor(url, req) {
    this.wsurl = url;
    this.req = req;
    this.lastRead = Date.now();
    this.messageCallback = (m) => {
      console.log(
        `sdk:client:messageCallback:登录中收到: ${m.sender} -- ${m.body}`
      );
    };
    this.offmessageCallback = (m) => {
      console.log(`sdk:client:offmessageCallback:登录中收到: ${m}`);
    };
  }

  // 注册事件监听器
  // events: string[], callback: (e: KIMEvent) => void
  register(events, callback) {
    events.forEach((event) => {
      this.listeners.set(event, callback);
    });
  }

  /**
   * 推送一个消息到指定的用户回调
   * @param {Long} userId
   * @param {(Message) => void>} callback
   */
  onTalkMessagePush(userId, callback) {
    this.talkMessageMap.set(userId.toString(), callback);
  }

  // 接收到消息的回调
  // cb: (m: Message) => void
  onmessage(cb) {
    this.messageCallback = cb;
  }

  // 加载离线消息时的回调
  // cb: (m: OfflineMessages) => void
  onofflinemessage(cb) {
    this.offmessageCallback = cb;
  }

  // 1、登录
  // return Promise<{ success: boolean, err?: Error }>
  // 表示登录是否成功，错误信息
  async login() {
    // step 1 检查登录状态，如果已经连接，就不要重复连接了
    if (this.state == State.CONNECTED) {
      return {
        success: false,
        err: new Error("已经完成连接了"),
      };
    }

    // step 2 开始连接
    this.state = State.CONNECTING;
    let { success, err, channelId, userId, conn } = await doLogin(
      this.wsurl,
      this.req
    );
    if (!success) {
      this.state = State.INIT;
      return { success, err };
    }

    // step 3 覆盖onmessage回调
    conn.onmessage = (evt) => {
      try {
        // 重置lastRead
        this.lastRead = Date.now();
        let buf = Buffer.from(evt.data);
        let magic = buf.readInt32BE(0);
        if (magic == MagicBasicPktInt) {
          console.log(
            `sdk:client:login:onmessage:收到心跳Pong:${buf.join(",")}`
          );
          return;
        }
        let pkt = LogicPkt.from(buf);
        this.packetHandler(pkt);
      } catch (error) {
        console.log("sdk:client:login:onmessage:捕获异常", evt.data, error);
      }
    };

    // step 4 覆盖onerror回调
    conn.onerror = (error) => {
      console.log("sdk:client:login:onerror:异常事件", error);
      this.errorHandler(error);
    };

    // step5 覆盖onclose回调
    conn.onclose = (e) => {
      console.log("sdk:client:login:onclose:关闭事件");
      if (this.state == State.CLOSEING) {
        this.onclose("logout");
        return;
      }
      this.errorHandler(new Error(e.reason));
    };

    // step 5 设置连接相关参数
    this.conn = conn;
    this.channelId = channelId;
    this.userId = userId;

    // step 6 加载离线消息
    await this.loadOfflineMessage();

    // step 7 设置为已经连接
    this.state = State.CONNECTED;

    // step 8 设置心跳
    this.heartbeatLoop();

    // step 9 设置读
    this.readDeadlineLoop();

    // step 10 设置已读回调
    this.messageAckLoop();

    // step 11 成功
    return { success, err };
  }

  // 2、退出登录
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
   * 给用户fans发送一条消息
   * @param {Content} req 请求的消息内容
   * @param {Number} retry 重试次数
   * @returns {Promise<{ status: Number, resp: MessageResp, err?: ErrorResp }> | {Status}}
   */
  async talkToCommunity(req, retry = 3) {
    return this.talk(Command.CommunityPush, MessageReq.fromObject(req), retry);
  }

  /**
   * 给用户dest发送一条消息
   * @param {Content} req 请求的消息内容
   * @param {Number} retry 重试次数
   * @returns {Promise<{ status: Number, resp: MessageResp, err?: ErrorResp }> | {Status}}
   */
  async talkToUser(req, retry = 3) {
    return this.talk(Command.ChatUserTalk, MessageReq.fromObject(req), retry);
  }

  /** 发送聊天消息
   * @param {String} command 命令
   * @param {MessageReq} req 请求的消息内容
   * @param {Number} retry 重试次数
   * @return {Promise<{ status: Number, resp?: MessageResp, err?: ErrorResp }> | {Status}}
   */
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
      // 消息重发
      if (resp.status >= 300 && resp.status < 400) {
        console.log("sdk:client:talk:重发消息");
        await sleep(2);
        continue;
      }
      let err = ErrorResp.decode(resp.payload);
      return { status: resp.status, err: err };
    }
    return {
      status: KIMStatus.SendFailed,
      err: new Error("超过最大重试次数"),
    };
  }

  /**
   * 发送一个LogicPkt请求
   * 这里会把异步转换成同步
   * @param {LogicPkt} data
   * @returns {Promise<Response>}
   */
  async request(data) {
    return new Promise((resolve, _) => {
      let seq = data.sequence;

      // 这里是超时回调
      // 会把请求从队列里面剔除，然后触发响应
      // 这里是一个超时响应
      let tr = setTimeout(() => {
        this.sendq.delete(seq);
        resolve(new Response(KIMStatus.RequestTimeout));
      }, sendTimeout);

      // 同步等待服务器响应
      // pkt: LogicPkt
      let callback = (pkt) => {
        clearTimeout(tr);
        this.sendq.delete(seq);
        resolve(new Response(pkt.status, pkt.dest, pkt.payload));
      };
      //   console.log(`sdk:client:request:请求:序列=${seq}:命令=${data.command}`);

      // 把请求加到队列里面
      this.sendq.set(seq, new Request(data, callback));

      // 真正的发送请求
      if (!this.send(data.bytes())) {
        resolve(new Response(KIMStatus.SendFailed));
      }
    });
  }

  /**
   * 触发剔除事件
   * @param {KIMEvent} event
   */
  fireEvent(event) {
    let listener = this.listeners.get(event);
    if (listener) {
      listener(event);
    }
  }

  /**
   * 收到消息的处理器
   * @param {LogicPkt} pkt
   * @returns
   */
  async packetHandler(pkt) {
    if (pkt.status >= 400) {
      console.log(
        `sdk:client:packetHandler:收到一个状态是400以上的包:需要重新登录:`,
        pkt
      );
      this.conn?.close();
      return;
    }

    if (pkt.flag == Flag.Response) {
      let req = this.sendq.get(pkt.sequence);
      if (req) {
        req.callback(pkt);
      } else {
        console.error(
          `sdk:client:packetHandler:收到一个不在回调队列里的包:`,
          pkt
        );
      }
      return;
    }

    switch (pkt.command) {
      case Command.ChatUserTalk:
      case Command.CommunityPush:
        let push = MessagePush.decode(pkt.payload);
        let message = new Message(push.messageId, push.sendTime);
        Object.assign(message, push);
        message.receiver = this.userId;
        if (!(await Store.exist(message.messageId))) {
          // 确保状态处于CONNECTED，才能执行消息ACK
          if (this.state == State.CONNECTED) {
            this.lastMessage = message;
            this.unack++;
            try {
              let cb = this.talkMessageMap.get(message.sender.toString());
              cb(message);
              this.messageCallback(message);
            } catch (error) {
              console.log("sdk:client:packetHandler:出现异常", error);
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

  /**
   * 2、心跳
   */
  heartbeatLoop() {
    console.log("sdk:client:heartbeatLoop:心跳开始");
    let start = Date.now();
    let loop = () => {
      if (this.state != State.CONNECTED) {
        console.log("sdk:client:heartbeatLoop:心跳退出");
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

  /**
   * 3、读超时循环
   */
  readDeadlineLoop() {
    console.log("sdk:client:readDeadlineLoop:读超时循环开始");
    let loop = () => {
      if (this.state != State.CONNECTED) {
        console.log("sdk:client:readDeadlineLoop:读超时循环退出");
        return;
      }
      if (Date.now() - this.lastRead > 3 * heartbeatInterval) {
        // 如果超时就调用errorHandler处理
        this.errorHandler(new Error("读超时"));
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }

  /**
   * 消息Ack循环
   */
  messageAckLoop() {
    let start = Date.now();
    const delay = 500; //ms
    let loop = async () => {
      if (this.state != State.CONNECTED) {
        console.log("sdk:client:messageAckLoop:消息Ack循环开始");
        return;
      }
      let msg = this.lastMessage; // 先缓存最后一条消息
      if (!!msg && Date.now() - start > 3000) {
        let overflow = this.unack > 10;
        this.unack = 0; // 在ack前重置unack
        this.lastMessage = undefined; // 重置最后一条消息

        let diff = Date.now() - msg.arrivalTime;
        if (!overflow && diff < delay) {
          await sleep(delay - diff, TimeUnit.Millisecond);
        }
        let req = MessageAckReq.encode({ messageId: msg.messageId });
        let pkt = LogicPkt.build(Command.ChatTalkAck, req.finish());
        start = Date.now();
        let resp = await this.request(pkt);
        // 修改本地存储中最后一条ACK消息记录
        if (resp.status == Status.Success) {
          await Store.setAck(msg.messageId);
        }
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }

  /**
   * 加载离线消息
   */
  async loadOfflineMessage() {
    console.log("sdk:client:loadOfflineMessage:加载离线消息开始");
    // 1. 加载消息索引
    // messageId: Long = Long.ZERO
    // return : Promise<{ status: number, indexes?: MessageIndex[] }>
    let loadIndex = async (messageId = Long.ZERO) => {
      //   console.log(
      //     `sdk:client:loadOfflineMessage:加载离线消息的起始索引是：`,
      //     new Long(messageId.low, messageId.high, messageId.unsigned).toString()
      //   );
      let req = MessageIndexReq.encode({ messageId });
      let pkt = LogicPkt.build(Command.OfflineIndex, req.finish());
      let resp = await this.request(pkt);
      if (resp.status != Status.Success) {
        let err = ErrorResp.decode(pkt.payload);
        console.log(`sdk:client:loadOfflineMessage:加载出错:`, err);
        return { status: resp.status };
      }
      let respbody = MessageIndexResp.decode(resp.payload);
      //   console.log(`sdk:client:loadOfflineMessage:加载到的数据是:`, respbody);
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
      `sdk:client:loadOfflineMessage:最终加载到的索引是: ${offmessages.map(
        (msg) => msg.messageId.toString()
      )}`
    );
    let om = new OfflineMessages(this, offmessages);
    this.offmessageCallback(om);
  }

  /**
   * 表示连接中止
   * @param {String} reason
   * @returns
   */
  onclose(reason) {
    if (this.state == State.CLOSED) {
      return;
    }
    this.state = State.CLOSED;

    console.log("sdk:client:onclose:连接中断了:原因是: " + reason);
    this.conn = undefined;
    this.channelId = "";
    this.userId = 0;
    // 通知上层应用
    this.fireEvent(KIMEvent.Closed);
    if (this.closeCallback) {
      this.closeCallback();
    }
  }

  /**
   * 4. 自动重连
   * @param {Error} error
   * @returns
   */
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
        console.log("sdk:client:errorHandler:尝试重新登录");
        let { success, err } = await this.login();
        if (success) {
          this.fireEvent(KIMEvent.Reconnected);
          return;
        }
        console.log("sdk:client:errorHandler:重新登录失败:原因:", err);
      } catch (error) {
        console.warn("sdk:client:errorHandler:重新登录失败:原因:", error);
      }
    }
    this.onclose("重新连接超时");
  }

  /**
   *  底层的发送请求方法
   * @param {Buffer | Uint8Array} data
   * @returns {Boolean}
   */
  send(data) {
    try {
      if (this.conn == null) {
        return false;
      }
      // 这里是最底层的向一个websocket连接发送消息的操作
      this.conn.send(data);
    } catch (error) {
      this.errorHandler(new Error("写超时"));
      return false;
    }
    return true;
  }
}

// 消息存储器
class MsgStorage {
  constructor() {
    localforage.config({
      name: "kim",
      storeName: "kim",
    });
  }

  /**
   * 消息的key
   * @param {Long} id
   * @returns {String}
   */
  keymsg(id) {
    return `msg_${id.toString()}`;
  }

  /**
   * 最后读取的消息的id的key
   * @returns {String}
   */
  keylast() {
    return `last_id`;
  }

  /**
   * 用户对应消息的key
   * @param {Long} userId
   */
  keyUserMsgIdx(userId) {
    return `user_msg_idx_${userId.toString()}`;
  }

  /**
   * 记录一条消息
   * @param {Message} msg
   * @returns {Promise<Boolean>}
   */
  async insert(msg) {
    await localforage.setItem(this.keymsg(msg.messageId), msg);
    return true;
  }

  /**
   * 插入用户消息索引
   * 用于获取和某个用户聊天的全部消息
   * @param {Long} userId
   * @param {msgIdx} msgIdx
   */
  //   async insertUserMessageIndex(userId, msgIdx) {
  //     let smgIdx = await localforage.getItem(userId.toString());
  //     console.log(smgIdx);
  //   }

  /**
   * 检查消息是否已经保存
   * @param {Long} id
   * @returns Promise<Boolean>
   */
  async exist(id) {
    try {
      let val = await localforage.getItem(this.keymsg(id));
      return !!val;
    } catch (err) {
      console.log("sdk:MsgStorage:exist:出错:", err);
    }
    return false;
  }

  /**
   * 获取一条消息
   * @param {Long} id
   * @returns {Promise<Message | null>}
   */
  async get(id) {
    try {
      let message = await localforage.getItem(this.keymsg(id));
      return message;
    } catch (err) {
      console.log("sdk:MsgStorage:get:出错:", err);
    }
    return null;
  }

  /**
   * 设置消息回调下标
   * @param {Long} id
   * @returns {Promise<Boolean>}
   */
  async setAck(id) {
    await localforage.setItem(this.keylast(), id);
    return true;
  }

  /**
   * 最后收到的消息的id
   * @returns {Promise<Long>}
   */
  async lastId() {
    let id = await localforage.getItem(this.keylast());
    return id || Long.ZERO;
  }
}

export let Store = new MsgStorage();
