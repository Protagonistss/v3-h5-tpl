import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  // H5 真机调试面板,通过环境变量开关(.env.development 中配置)
  if (import.meta.env.VITE_ENABLE_VCONSOLE === 'true') {
    const { default: VConsole } = await import('vconsole')
    new VConsole()
  }

  app.mount('#app')
}

bootstrap()
