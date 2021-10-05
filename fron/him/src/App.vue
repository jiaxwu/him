<template>
  <div>
    <!-- <button @click="send">发消息</button>
    <button @click="DoSyncIndex">同步消息索引</button> -->
  </div>
</template>

<script>
// import { LogicPkt, Command, MagicBasicPktInt } from "./sdk/packet";
// import Long from "long";
// import protocol from "./sdk/protocol";
import common from "./sdk/common";
import { LoginBody } from "./sdk/login";
import { KIMClient, KIMEvent, Content, sleep } from "./sdk/sdk";

const Status = common.Status

// npx pbjs -t json-module -w commonjs  --force-long -o src/sdk/protocol.js src/sdk/proto/protocol.proto
// npx pbjs -t json-module -w commonjs  --force-long -o src/sdk/common.js src/sdk/proto/common.proto


// npx pbjs -t static-module -w commonjs -o src/sdk/protocol.js src/sdk/proto/protocol.proto --force-long
// $protobuf.util.Long = require("long");
// npx pbjs -t static-module -w commonjs -o src/sdk/common.js src/sdk/proto/common.proto --force-long
// $common.util.Long = require("long");
export default {
  data() {
    return {
      wsurl: "ws://127.0.0.1:8080/ws",
      conn: "",
      token: "2befea76-f30e-6618-9430-cedf26c77561",
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
      let offmessagecallback = async (om) => {
        // 离线时的发送方用户列表
        let users = om.listUsers();
        if (users.length > 0) {
          console.info(`App:offmessagecallback:离线用户列表有: ${users}`);
          // 懒加载 users[0] 的第一页数据
          let messages = await om.loadUser(users[0], 1);
          console.info(`App:offmessagecallback:第一个用户的第一页消息是:`, messages);
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
      if (status != Status.Success) {
        console.error(err2);
        return;
      }
      console.info(`resp - ${resp?.messageId} ${resp?.sendTime.toString()}`);

      await sleep(10);

      // // 5. 登出
      // await cli.logout();
    },
    // async getMessage(event) {
    //   try {
    //     // 重置lastRead
    //     let arrayBuffer = await event.data.arrayBuffer();
    //     let buf = Buffer.from(arrayBuffer);
    //     let magic = buf.readInt32BE(0);
    //     if (magic == MagicBasicPktInt) {
    //       //目前只有心跳包pong
    //       console.log(`recv a basic packet - ${buf.join(",")}`);
    //       return;
    //     }
    //     let pkt = LogicPkt.from(buf);
    //     console.log(pkt);
    //     // this.packetHandler(pkt)
    //   } catch (error) {
    //     console.log(event.data, error);
    //   }
    // },
    send() {
      // let req = new protocol.MessageReq();
      // req.setType(1);
      // req.setBody("xxxxxxxxxxhahah");
      // req.setDest(2);
      // let reqBytes = req.serializeBinary();
      // let logicPkt = LogicPkt.build(Command.ChatUserTalk, reqBytes);
      // this.conn.send(logicPkt.bytes());
    },
    // DoSyncIndex() {
    //   let messageReq = protocol.lookup("pkt.MessageIndexReq");
    //   const reqData = {
    //     messageId: Long.fromString("1444704021331742722"),
    //   };
    //   let messageReqP = messageReq.create(reqData);
    //   let bytes = messageReq.encode(messageReqP).finish();
    //   let logicPkt = LogicPkt.build(Command.OfflineIndex, bytes);
    //   this.conn.send(logicPkt.bytes());
    // },
    // close: function() {
    //   console.log("socket已经关闭");
    // },
    // // 2、心跳
    // heartbeatLoop() {
    //   //   const heartbeatInterval = 55 * 1000 // seconds
    //   const Ping = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 1, 0, 0]);
    //   let loop = () => {
    //     this.conn.send(Ping);
    //     setTimeout(loop, 3000);
    //   };
    //   setTimeout(loop, 3000);
    // },
  },
  // destroyed() {
  //   // 销毁监听
  //   this.socket.onclose = this.close;
  // },
};
</script>

<style></style>
