<script setup lang="ts">
import { ref } from 'vue'
import { showSuccessToast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { getUserInfoApi } from '@/api/user'
import { useUserStore } from '@/stores/user'
import HdcButton from '@/components/HdcButton.vue'
import HdcInput from '@/components/HdcInput.vue'

const router = useRouter()
const userStore = useUserStore()

const demoInput = ref('')

/** 演示 API 调用:成功返回数据,失败由拦截器统一 toast */
async function handleFetch() {
  try {
    const info = await getUserInfoApi()
    showSuccessToast(`获取成功: ${info.nickname}`)
  } catch {
    // 错误提示已由 request 拦截器统一处理,此处可做页面级兜底逻辑
  }
}

function handleLogout() {
  userStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="page home">
    <van-nav-bar :title="`H5 基座 · ${userStore.userInfo?.nickname ?? '未登录'}`" />

    <van-cell-group inset title="Vant 组件(按需自动注册)">
      <van-cell title="Toast" value="点击体验" is-link @click="showToast('Hello H5!')" />
      <van-cell title="API 请求" value="演示统一拦截" is-link @click="handleFetch" />
    </van-cell-group>

    <van-cell-group inset title="本地组件(src/components)">
      <div class="home__block">
        <HdcButton type="primary" @click="showToast('自定义按钮')">自定义按钮</HdcButton>
        <HdcButton type="default" @click="showToast('自定义按钮')">默认按钮</HdcButton>
        <HdcInput v-model="demoInput" clearable placeholder="自定义输入框" class="home__input" />
      </div>
    </van-cell-group>

    <div class="home__footer">
      <van-button type="primary" block size="large" @click="handleLogout">退出登录</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-bottom: 24px;

  &__block {
    padding: 16px;
  }

  &__input {
    margin-top: 12px;
  }

  &__footer {
    padding: 24px 16px;
  }
}
</style>
