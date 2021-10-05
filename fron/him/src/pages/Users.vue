<template>
  <div>
    <div v-for="(user, i) in users" :key="i">
      <el-avatar :size="60" icon="el-icon-user-solid"></el-avatar>
      <div @click="toMessage(user.id)">
        {{ user.id }}
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   KIMClient,
//   KIMEvent,
//   //  Content,
//   //  sleep
// } from "../sdk/sdk";

// const Status = common.Status;

export default {
  data() {
    return {
      users: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
    };
  },
  methods: {
    toMessage(id) {
      console.log(id);
      this.$router.push({
        path: "/message",
        query: {
          id: id,
        },
      });
      // 4. 发送消息
      // let { status, resp, err2 } = await cli.talkToUser(
      //   new Content(2, "hello")
      // );
      // if (status != Status.Success) {
      //   console.error(err2);
      //   return;
      // }
      // console.info(`App:发送消息的响应是:`, resp);
    },
  },
};
</script>

<style></style>
