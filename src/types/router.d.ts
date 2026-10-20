import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题,会自动设置到 document.title */
    title?: string
    /** 是否需要登录,未登录将跳转登录页 */
    requiresAuth?: boolean
  }
}
