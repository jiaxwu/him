<template>
  <div>
    <el-input v-model="username" placeholder="请输入用户名"></el-input>
    <el-input v-model="terminal" placeholder="请输入终端"></el-input>
    <el-button type="success" @click="login">登录</el-button>
    <div>token:{{ $store.state.token }}</div>
  </div>
</template>

<script>
import { LoginBody } from "../sdk/login";
import { KIMClient, KIMEvent } from "../sdk/sdk";

// npx pbjs -t static-module -w commonjs -o src/sdk/protocol.js src/sdk/proto/protocol.proto --force-long
// npx pbjs -t static-module -w commonjs -o src/sdk/common.js src/sdk/proto/common.proto --force-long

export default {
  data() {
    return {
      username: "",
      terminal: "pc",
    };
  },
  methods: {
    async login() {
      const response = await fetch(
        `http://localhost:8080/login?username=${this.username}&terminal=${this.terminal}`
      );
      const json = await response.json();
      if (!json.token) {
        return;
      }
      this.$store.commit("setToken", json.token);
      await this.loginIm();

      if (this.$store.state.imcli) {
        this.$router.push({ path: "/users" });
      }
    },
    async loginIm() {
      let req = new LoginBody(this.$store.state.token);

      // 初始化
      let cli = new KIMClient(this.$store.state.wsurl, req);

      // evt: KIMEvent
      let eventcallback = (evt) => {
        console.info(`event ${evt}`);
      };

      // m: Message
      let messagecallback = (m) => {
        console.log("App:messagecallback:收到消息回调:", m);
      };

      // om: OfflineMessages
      let offmessagecallback = async (om) => {
        // 离线时的发送方用户列表
        let users = om.listUsers();
        if (users.length > 0) {
          console.info(`App:offmessagecallback:离线用户列表有: ${users}`);
          // 懒加载 users[0] 的第一页数据
          let messages = await om.loadUser(users[0], 1);
          console.info(
            `App:offmessagecallback:第一个用户的第一页消息是:`,
            messages
          );
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
        console.error("App:loginIm:cli.login:登录失败", err);
        return;
      }

      this.$store.commit("setImcli", cli);
    },
  },
};
</script>

<style></style>
