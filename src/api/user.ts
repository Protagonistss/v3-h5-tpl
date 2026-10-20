import type { UserInfo } from '@/stores/user'
import { request } from '@/utils/request'

/** 登录参数 */
export interface LoginParams {
  username: string
  password: string
}

/** 登录响应(按实际后端接口调整) */
export interface LoginResult {
  token: string
  userInfo: UserInfo
}

/** 用户登录 */
export function loginApi(data: LoginParams) {
  return request.post<LoginResult>('/auth/login', data)
}

/** 获取当前用户信息 */
export function getUserInfoApi() {
  return request.get<UserInfo>('/user/info')
}
