<template>
  <div>
    <button @click="send">发消息</button>
    <button @click="DoSyncIndex">同步消息索引</button>
  </div>
</template>

<script>
import { LogicPkt, Command, MagicBasicPktInt } from "./sdk/packet";
import Long from "long";
import protocol from "./sdk/protocol";
import common from "./sdk/common";
import { doLogin, LoginBody } from "./sdk/login";
import { KIMClient, KIMEvent, Content, sleep } from "./sdk/sdk";

const Status = {
  Success: common.lookupEnum("pkt.Status").values.Success,
};

// npx pbjs -t json-module -w commonjs  --force-long -o src/sdk/protocol.js src/sdk/proto/protocol.proto
// npx pbjs -t json-module -w commonjs  --force-long -o src/sdk/common.js src/sdk/proto/common.proto
export default {
  data() {
    return {
      wsurl: "ws://127.0.0.1:8080/ws",
      conn: "",
      token: "2ccae7f1-115f-a130-bbd3-a9b4c8cf1213",
    };
  },
  mounted() {
    // 初始化
    this.init3();
  },
  methods: {
    async init3() {
      let req = new LoginBody(this.token);
      // 初始化
      let cli = new KIMClient(this.wsurl, req);
      // evt: KIMEvent
      let eventcallback = (evt) => {
        console.info(`event ${evt}`);
      };
      // m: Message
      let messagecallback = (m) => {
        console.info(m);
      };
      // om: OfflineMessages
      let offmessagecallback = (om) => {
        // 离线时的发送方用户列表
        let users = om.listUsers();
        if (users.length > 0) {
          console.info(`offline messages from users of ${users}`);
          // lazy load the first page messages from 'users[0]'
          let messages = om.loadUser(users[0], 1);
          console.info(messages);
        }
        // 离线的群列表
        let groups = om.listGroups();
        if (groups.length > 0) {
          console.info(`offline messages from groups of ${groups}`);
        }
      };
      // 2.注册事件
      let evts = [
        KIMEvent.Closed,
        KIMEvent.Reconnecting,
        KIMEvent.Reconnected,
        KIMEvent.Kickout,
      ];
      cli.register(evts, eventcallback);
      cli.onmessage(messagecallback);
      cli.onofflinemessage(offmessagecallback);
      // 3. 登录
      let { success, err } = await cli.login();
      if (!success) {
        console.error(err);
        return;
      }

      // 4. 发送消息
      let { status, resp, err2 } = await cli.talkToUser(
        new Content(2, "hello")
      );
      console.log(status)
      if (status != Status.Success) {
        console.error(err2);
        return;
      }
      console.info(`resp - ${resp?.messageId} ${resp?.sendTime.toString()}`);

      await sleep(10);

      // 5. 登出
      await cli.logout();
    },
    async init2() {
      let req = new LoginBody(this.token);
      let { success, err, channelId, account, conn } = await doLogin(
        this.wsurl,
        req
      );
      console.log(success);
      console.log(err);
      console.log(channelId);
      console.log(account);
      console.log(conn);
    },
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.conn = new WebSocket(this.wsurl);
        // 监听socket连接
        this.conn.onopen = () => {
          if (this.conn.readyState == WebSocket.OPEN) {
            // | 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
            const MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65]);
            let Header = common.lookup("pkt.Header");
            const reqData = {
              command: Command.SignIn,
              status: common.lookupEnum("pkt.Status").values.InvalidPacketBody,
            };
            let headerP = Header.create(reqData);
            let headerBytes = Header.encode(headerP).finish();
            var hlen = headerBytes.length;
            let LoginReq = protocol.lookupType("pkt.LoginReq");
            const loginReqData = {
              token: "2ccae7f1-115f-a130-bbd3-a9b4c8cf1213",
            };
            let loginReqP = LoginReq.create(loginReqData);
            let reqBytes = LoginReq.encode(loginReqP).finish();
            var plen = reqBytes.length;
            let buf = Buffer.alloc(4 + 4 + hlen + 4 + plen);
            let offset = 0;
            Buffer.from(MagicLogicPkt).copy(buf, offset, 0);
            offset += 4;
            // 4bytes Header Length
            offset = buf.writeInt32BE(hlen, offset);
            // header
            Buffer.from(headerBytes).copy(buf, offset, 0);
            offset += hlen;
            // 4bytes Payload Length
            offset = buf.writeInt32BE(plen, offset);
            // payload
            Buffer.from(reqBytes).copy(buf, offset, 0);
            this.conn.send(buf);

            this.heartbeatLoop();
          }
        };
        // 监听socket错误信息
        this.conn.onerror = this.error;
        // 监听socket消息
        this.conn.onmessage = this.getMessage;
      }
    },
    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    async getMessage(event) {
      try {
        // 重置lastRead
        let arrayBuffer = await event.data.arrayBuffer();
        let buf = Buffer.from(arrayBuffer);
        let magic = buf.readInt32BE(0);
        if (magic == MagicBasicPktInt) {
          //目前只有心跳包pong
          console.log(`recv a basic packet - ${buf.join(",")}`);
          return;
        }
        let pkt = LogicPkt.from(buf);
        console.log(pkt);
        // this.packetHandler(pkt)
      } catch (error) {
        console.log(event.data, error);
      }
    },
    send() {
      // let req = new protocol.MessageReq();
      // req.setType(1);
      // req.setBody("xxxxxxxxxxhahah");
      // req.setDest(2);
      // let reqBytes = req.serializeBinary();
      // let logicPkt = LogicPkt.build(Command.ChatUserTalk, reqBytes);
      // this.conn.send(logicPkt.bytes());
    },
    DoSyncIndex() {
      let messageReq = protocol.lookup("pkt.MessageIndexReq");
      const reqData = {
        messageId: Long.fromString("1444704021331742722"),
      };
      let messageReqP = messageReq.create(reqData);
      let bytes = messageReq.encode(messageReqP).finish();
      let logicPkt = LogicPkt.build(Command.OfflineIndex, bytes);
      this.conn.send(logicPkt.bytes());
    },
    close: function() {
      console.log("socket已经关闭");
    },
    // 2、心跳
    heartbeatLoop() {
      //   const heartbeatInterval = 55 * 1000 // seconds
      const Ping = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 1, 0, 0]);
      let loop = () => {
        this.conn.send(Ping);
        setTimeout(loop, 3000);
      };
      setTimeout(loop, 3000);
    },
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
};
</script>

<style></style>
