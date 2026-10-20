# v3-h5-tpl · Vue3 H5 基座模板

基于 **Vue 3 + TypeScript + Vite + Pinia + Vant 4** 的移动端 H5 项目基座,作为后续 H5 项目的统一工程模板。

## 技术栈

| 分类 | 方案                          | 说明                                  |
| ---- | ----------------------------- | ------------------------------------- |
| 框架 | Vue 3.5 + `<script setup>`    | 组合式 API                            |
| 语言 | TypeScript 5                  | `strict` 模式                         |
| 构建 | Vite 6                        | —                                     |
| 路由 | vue-router 4                  | hash 模式(免服务端配置)               |
| 状态 | Pinia                         | setup 写法 store                      |
| UI   | Vant 4                        | 按需自动注册(unplugin-vue-components) |
| 请求 | Axios                         | 统一拦截器封装,类型安全               |
| 适配 | postcss-px-to-viewport        | 375 设计稿 px → vw 自动转换           |
| 规范 | oxlint + oxfmt(@ithinku 预设) | Rust 工具链,亳秒级 lint/format        |
| 调试 | vConsole                      | 环境变量开关,仅开发环境加载           |

## 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务(默认 5173,局域网可通过 IP 访问)
pnpm build        # 类型检查 + 生产构建
pnpm preview      # 预览生产构建
pnpm lint         # oxlint 检查
pnpm lint:fix     # oxlint 检查并自动修复
pnpm format       # oxfmt 格式化(含 import 自动排序)
pnpm format:check # 仅检查格式(CI 用)
```

## 目录结构

```
├── .env.development        # 开发环境变量(代理地址、vconsole 开关)
├── .env.production         # 生产环境变量
├── index.html              # 移动端 viewport / meta 配置
├── vite.config.ts          # 构建配置(代理、px→vw、分包)
├── oxlint.config.ts        # oxlint 配置(extends @ithinku/oxlint-config)
├── oxfmt.config.ts         # oxfmt 格式化配置(extends @ithinku/oxfmt-config)
└── src/
    ├── main.ts             # 应用入口
    ├── App.vue             # 根组件(Vant 主题定制入口)
    ├── api/                # 接口定义层(按业务模块拆分)
    ├── components/         # 全局业务组件(自动按需注册)
    ├── constants/          # 常量(token key、成功码等)
    ├── router/             # 路由与守卫(鉴权、标题)
    ├── stores/             # Pinia store
    ├── styles/             # 全局样式(变量、混入、重置)
    ├── types/              # 全局类型声明
    ├── utils/              # 工具库(storage、request 封装)
    └── views/              # 页面(按模块分目录)
```

## 核心约定

### 1. 移动端适配

- 按 **375px 设计稿**直接书写 `px`,构建时自动转为 `vw`(与 Vant 官方设计稿一致,UI 库样式同样适用)
- 需要保留原始 `px` 的元素(如 1px 边框场景),类名添加 `.nvw` 前缀即可跳过转换
- 安全区:CSS 变量 `env(safe-area-inset-top/bottom)` 已在 `styles/variables.scss` 中声明

### 2. 网络请求

统一使用 `@/utils/request`,已内置:

- 请求拦截:自动注入 `Authorization: Bearer <token>`
- 响应拦截:业务码校验(成功码在 `constants/index.ts` 的 `SUCCESS_CODE` 配置)、错误统一 toast、401 自动登出并跳转登录页
- 返回值自动解包,泛式直接标注业务数据类型:

```ts
import { request } from '@/utils/request'

const info = await request.get<UserInfo>('/user/info', { id: 1 })
```

接口按模块定义在 `src/api/` 下,禁止在组件内直接裸调 axios。

### 3. 登录鉴权

- 路由 `meta.requiresAuth: true` 的页面需要登录,未登录自动跳转登录页并携带 `redirect` 回跳参数
- token 由 `stores/user.ts` 统一管理,持久化于 localStorage

### 4. 环境变量

仅 `VITE_` 前缀变量会暴露给客户端,新增变量需同步在 `src/types/env.d.ts` 中补充类型声明。

| 变量                   | 说明                       |
| ---------------------- | -------------------------- |
| `VITE_APP_TITLE`       | 应用标题                   |
| `VITE_API_BASE_URL`    | 接口基础路径               |
| `VITE_PROXY_TARGET`    | 开发代理目标(仅开发环境)   |
| `VITE_ENABLE_VCONSOLE` | 是否启用 vConsole 调试面板 |

### 5. 新增页面

1. `src/views/<模块>/index.vue` 创建页面
2. `src/router/index.ts` 注册路由,`meta` 中声明 `title` / `requiresAuth`
3. 标题、鉴权由全局守卫自动处理,无需手动设置

## 部署说明

- hash 路由可直接部署到任意静态服务器/nginx 目录,无需特殊配置
- 生产接口跨域由网关/nginx 反向代理解决,代理路径与 `VITE_API_BASE_URL` 保持一致
- 若需兼容低版本 webview(iOS < 11 等),安装 `@vitejs/plugin-legacy` 并按官方文档配置

## 可选扩展

- 表单校验增强:`@vant/use` 或 `vee-validate`
- 单元测试:`vitest` + `@vue/test-utils`
- Mock 数据:`vite-plugin-mock` 或 `msw`
- Git 提交规范:`husky` + `lint-staged` + `commitlint`
