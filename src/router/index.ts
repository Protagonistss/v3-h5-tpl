import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { TOKEN_KEY } from '@/constants'
import { storage } from '@/utils/storage'

/**
 * 路由采用 hash 模式,无需服务端配置即可部署到任意静态目录(适合 webview / 微信内嵌场景)。
 * 如需 history 模式,改为 createWebHistory() 并在部署服务器配置 try_files 回退到 index.html。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

/** 全局前置守卫:登录鉴权 */
router.beforeEach((to) => {
  const token = storage.get<string>(TOKEN_KEY)
  // 未登录访问需鉴权页面 → 跳转登录页并记录回跳地址
  if (to.meta.requiresAuth && !token) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  // 已登录访问登录页 → 直接进入首页
  if (to.name === 'Login' && token) {
    return { name: 'Home' }
  }
})

/** 全局后置钩子:同步页面标题 */
router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${appTitle}` : appTitle
})

export default router
