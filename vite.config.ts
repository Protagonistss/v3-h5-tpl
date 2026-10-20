import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      // Vant 组件及 src/components 下组件按需自动注册(生成 components.d.ts)
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        resolvers: [VantResolver()],
        dts: 'src/types/components.d.ts'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 每个样式文件自动注入变量与混入,业务代码中可直接使用 $xx / @include xx
          additionalData: (source: string, id: string) =>
            id.includes('src/styles/') ? source : `@use "@/styles/variables.scss" as *;\n${source}`
        }
      },
      postcss: {
        plugins: [
          // 移动端适配:设计稿 375px,编写时直接写 px,构建时自动转 vw
          // 需要保留原始 px 的元素,可在类名上加 .nvw 前缀(如 .nvw-xxx)
          pxToViewport({
            viewportWidth: 375,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['.nvw'],
            minPixelValue: 1,
            mediaQuery: false
          }) as never
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        // 开发环境接口代理,目标地址在 .env.development 的 VITE_PROXY_TARGET 中配置
        [env.VITE_API_BASE_URL || '/api']: {
          target: env.VITE_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist',
      target: 'es2015',
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            vant: ['vant']
          }
        }
      }
    }
  }
})
