<template>
  <div>
    <button @click="send">发消息</button>
  </div>
</template>

<script>
import common from "./proto/common_pb";
import protocol from "./proto/protocol_pb";
export default {
  data() {
    return {
      path: "ws://127.0.0.1:8080/ws",
      conn: "",
    };
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.conn = new WebSocket(this.path);
        // 监听socket连接
        this.conn.onopen = () => {
          if (this.conn.readyState == WebSocket.OPEN) {
            // | 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
            const MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65]);
            let header = new common.Header();
            header.setCommand("login.signin");
            let headerBytes = header.serializeBinary();
            var hlen = headerBytes.length;
            let req = new protocol.LoginReq();
            req.setToken("96f0c8a3-a6b0-bafd-8acd-2568cee6a5c7");
            var reqBytes = req.serializeBinary();
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

            console.log(buf);
            // let pbreq = LoginReq.encode(LoginReq.fromJSON(req)).finish();
            // let loginpkt = LogicPkt.build(Command.SignIn, "", pbreq);
            // let buf = loginpkt.bytes();
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
    getMessage: function(msg) {
      console.log(msg.data);
    },
    send: function() {
      // | 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
      const MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65]);
      let header = new common.Header();
      header.setCommand("chat.user.talk");
      let headerBytes = header.serializeBinary();
      var hlen = headerBytes.length;
      let req = new protocol.MessageReq();
      req.setType(1);
      req.setBody("xxxxxxxxxxhahah");
      req.setDest(2);
      var reqBytes = req.serializeBinary();
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

      console.log(buf);
      // let pbreq = LoginReq.encode(LoginReq.fromJSON(req)).finish();
      // let loginpkt = LogicPkt.build(Command.SignIn, "", pbreq);
      // let buf = loginpkt.bytes();
      this.conn.send(buf);
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
