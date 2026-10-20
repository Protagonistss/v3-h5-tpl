import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'

import { SUCCESS_CODE, TOKEN_KEY } from '@/constants'
import router from '@/router'
import { storage } from '@/utils/storage'

/** HTTP 状态码 → 用户提示文案 */
const HTTP_ERROR_MESSAGE: Record<number, string> = {
  400: '请求参数错误',
  401: '登录已过期,请重新登录',
  403: '没有权限访问',
  404: '请求的资源不存在',
  500: '服务器开小差了,请稍后重试',
  502: '服务器开小差了,请稍后重试',
  503: '服务暂不可用,请稍后重试'
}

/** 登出并跳转登录页(携带回跳地址) */
function forceLogout() {
  storage.remove(TOKEN_KEY)
  const current = router.currentRoute.value
  if (current.name !== 'Login') {
    router.push({ name: 'Login', query: { redirect: current.fullPath } })
  }
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
})

/** 请求拦截器:注入登录凭证 */
service.interceptors.request.use((config) => {
  const token = storage.get<string>(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** 响应拦截器:统一解包与错误处理 */
service.interceptors.response.use(
  (response) => {
    const result = response.data as ApiResponse
    // 业务失败:统一 toast 提示,由调用方通过 catch 处理后续逻辑
    if (result.code !== SUCCESS_CODE) {
      const message = result.message || '请求失败,请稍后重试'
      showFailToast(message)
      return Promise.reject(new Error(message))
    }
    // 业务成功:直接返回 data,调用方拿到的即业务数据
    return result.data as never
  },
  (error) => {
    let message = '网络异常,请检查网络后重试'
    if (error.response) {
      const { status } = error.response
      message = HTTP_ERROR_MESSAGE[status] || `请求失败(${status})`
      // 登录过期:清除凭证并跳转登录页
      if (status === 401) {
        showFailToast(message)
        forceLogout()
        return Promise.reject(error)
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时,请稍后重试'
    }
    showFailToast(message)
    return Promise.reject(error)
  }
)

/**
 * 类型安全的请求方法。
 * 泛型 T 为后端返回的 data 字段类型,例如:
 * ```ts
 * get<UserInfo>('/user/detail', { id: 1 })
 * ```
 */
export const request = {
  get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config }) as Promise<T>
  },

  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config) as Promise<T>
  },

  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config) as Promise<T>
  },

  patch<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.patch(url, data, config) as Promise<T>
  },

  delete<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config }) as Promise<T>
  },

  /** 文件下载(带凭证,适用于需要鉴权的导出接口) */
  download(url: string, params?: object): void {
    const token = storage.get<string>(TOKEN_KEY)
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : ''
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}${url}${query}&access_token=${token ?? ''}`
  }
}

export default request
