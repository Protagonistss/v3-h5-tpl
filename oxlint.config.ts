import ithinku from '@ithinku/oxlint-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [ithinku],
  // Vue 项目追加 vue 插件(@ithinku 基础配置面向通用 TS 项目)
  plugins: ['oxc', 'typescript', 'unicorn', 'vue']
})
