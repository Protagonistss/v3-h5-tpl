import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { USER_INFO_KEY, TOKEN_KEY } from '@/constants'
import { storage } from '@/utils/storage'

/** 用户信息结构(按实际接口字段调整) */
export interface UserInfo {
  id: number
  nickname: string
  avatar?: string
}

/**
 * 用户状态 store(setup 写法)。
 * 凭证与用户信息持久化到 localStorage,刷新后自动恢复。
 */
export const useUserStore = defineStore('user', () => {
  const token = ref<string>(storage.get<string>(TOKEN_KEY) ?? '')
  const userInfo = ref<UserInfo | null>(storage.get<UserInfo>(USER_INFO_KEY))

  const isLoggedIn = computed(() => Boolean(token.value))

  function setToken(value: string) {
    token.value = value
    storage.set(TOKEN_KEY, value)
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
    storage.set(USER_INFO_KEY, info)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    storage.remove(TOKEN_KEY)
    storage.remove(USER_INFO_KEY)
  }

  return { token, userInfo, isLoggedIn, setToken, setUserInfo, logout }
})
