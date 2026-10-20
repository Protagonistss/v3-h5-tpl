/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 接口基础路径 */
  readonly VITE_API_BASE_URL: string
  /** 开发代理目标地址 */
  readonly VITE_PROXY_TARGET?: string
  /** 是否启用 vconsole 调试面板 */
  readonly VITE_ENABLE_VCONSOLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
