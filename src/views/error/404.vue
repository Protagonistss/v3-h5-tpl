<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page not-found">
    <van-empty image-size="120" description="页面不存在">
      <van-button type="primary" size="small" @click="router.replace({ name: 'Home' })">
        返回首页
      </van-button>
    </van-empty>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
