<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'


const msg = ref('111')


</script>

<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<style scoped lang="scss">
</style>