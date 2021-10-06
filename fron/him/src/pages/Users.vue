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
      this.$router.push({
        path: "/message",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style></style>
