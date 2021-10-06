<template>
  <div>
    <el-input v-model="content" placeholder="请输入消息内容"></el-input>
    <el-button type="success" @click="sendMessage">发送</el-button>
    <el-button type="success" @click="sendToFans">发送给所有粉丝</el-button>
    <div v-for="(msg, i) in msgList" :key="i">
      {{ msg }}
    </div>
  </div>
</template>

<script>
import common from "../sdk/common";
import { Content } from "../sdk/sdk";
import Long from "long";

const Status = common.Status;

export default {
  data() {
    return {
      user: 0,
      content: "",
      imcli: null,
      msgList: [],
    };
  },
  mounted() {
    this.user = this.$route.query.id;
    this.imcli = this.$store.state.imcli;
    this.imcli.onTalkMessagePush(Long.fromInt(this.user), (msg) => {
      this.msgList.push({
        sender: msg.sender.toString(),
        content: msg.body,
        direction: 0,
        messageId: msg.messageId.toString(),
      });
    });
  },
  methods: {
    async sendMessage() {
      let content = this.content;
      let { status, resp, err } = await this.imcli.talkToUser(
        new Content(this.user, content)
      );
      if (status != Status.Success) {
        this.$message({
          message: "发送消息失败" + err,
          type: "warning",
        });
        return;
      }
      this.msgList.push({
        sender: "自己",
        content: content,
        direction: 1,
        messageId: resp.messageId.toString(),
      });
    },
    async sendToFans() {
      let content = this.content;
      let { status, resp, err } = await this.imcli.talkToCommunity(
        new Content(0, content)
      );
      if (status != Status.Success) {
        this.$message({
          message: "发送消息失败" + err,
          type: "warning",
        });
        return;
      }
      this.msgList.push({
        sender: "自己",
        content: content,
        direction: 1,
        messageId: resp.messageId.toString(),
      });
    },
  },
};
</script>

<style></style>
