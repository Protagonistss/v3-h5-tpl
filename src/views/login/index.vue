<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
// 接入真实后端后,引入 loginApi 替换 mockLogin:
// import { loginApi, type LoginParams } from '@/api/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const submitting = ref(false)

/** 登录成功后的回跳地址(由路由守卫携带) */
const redirect = (route.query['redirect'] as string) || '/'

async function onSubmit() {
  if (!username.value || !password.value) {
    showFailToast('请输入用户名和密码')
    return
  }

  submitting.value = true
  try {
    /**
     * 真实登录示例(接入后端后替换 mockLogin):
     * const { token, userInfo } = await loginApi({
     *   username: username.value,
     *   password: password.value
     * })
     */
    const { token, userInfo } = await mockLogin()
    userStore.setToken(token)
    userStore.setUserInfo(userInfo)
    showSuccessToast('登录成功')
    router.replace(redirect)
  } catch {
    // 错误提示已由 request 拦截器统一处理
  } finally {
    submitting.value = false
  }
}

/** 本地 mock,方便无后端时体验完整登录鉴权流程 */
async function mockLogin() {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return {
    token: `demo-token-${Date.now()}`,
    userInfo: { id: 1, nickname: 'H5 用户' }
  }
}
</script>

<template>
  <div class="page login">
    <div class="login__header">
      <h1 class="login__title">{{ $route.meta.title }}</h1>
      <p class="login__desc">H5 基座模板 · 演示登录鉴权流程</p>
    </div>

    <van-form class="login__form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div class="login__submit">
        <van-button type="primary" size="large" native-type="submit" :loading="submitting">
          登 录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  &__header {
    padding: 48px 24px 32px;
    text-align: center;
  }

  &__title {
    font-size: 24px;
    color: $text-color;
  }

  &__desc {
    margin-top: 8px;
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }

  &__submit {
    padding: 24px 16px 0;
  }
}
</style>
