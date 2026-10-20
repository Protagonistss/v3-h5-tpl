<div align="center">

# v3-h5-tpl

**开箱即用的 Vue3 移动端 H5 项目基座**

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2-FFD859?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-4-1989FA?logo=vant&logoColor=white)](https://vant-ui.github.io/vant/)
[![oxlint](https://img.shields.io/badge/lint-oxlint-57B3FA?logo=oxc&logoColor=white)](https://oxc.rs/)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-339933?logo=nodedotjs&logoColor=white)](./package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-999.svg)](#license)

一套沉淀了工程化最佳实践的 H5 基座模板:新项目无需从零配置,克隆即开发。

</div>

## ✨ 特性

- 📱 **移动端适配** — 375 设计稿直接写 `px`,PostCSS 自动转 `vw`,内置安全区/1px 边框方案
- 🔐 **完整鉴权闭环** — 路由守卫自动鉴权、token 持久化、401 自动登出、登录回跳
- 🌐 **类型安全请求层** — Axios 统一拦截器,泛式标注返回类型,业务码可配置
- ⚡ **Rust 工具链** — [oxlint](https://oxc.rs/) + oxfmt 毫秒级检查与格式化,规则沿用 [@ithinku](https://www.npmjs.com/org/ithinku) 预设
- 🧱 **更严的 TS** — 接入 `@ithinku/tsconfig` strict 预设(`noUncheckedIndexedAccess` 等全开)
- 🎨 **主题与样式体系** — SCSS 变量/Mixin 自动注入,Vant 主题一键定制
- 🐞 **真机调试** — vConsole 按环境变量开关,开发即开即用
- 📦 **生产就绪** — 分包策略、gzip 体积、静态部署零配置

## 🚀 快速开始

```bash
pnpm install   # 安装依赖(Node ≥ 18)
pnpm dev       # 启动开发服务 http://localhost:5173
```

<details>
<summary><b>全部命令</b></summary>

| 命令                           | 说明                                            |
| ------------------------------ | ----------------------------------------------- |
| `pnpm dev`                     | 启动开发服务(局域网可通过 IP 访问,便于真机联调) |
| `pnpm build`                   | 类型检查 + 生产构建                             |
| `pnpm preview`                 | 本地预览生产构建产物                            |
| `pnpm type-check`              | 仅运行类型检查                                  |
| `pnpm lint` / `lint:fix`       | oxlint 检查 / 检查并自动修复                    |
| `pnpm format` / `format:check` | oxfmt 格式化(含 import 排序)/ 仅检查(CI 用)     |

</details>

## 🧰 技术栈

| 分类 | 方案                       | 说明                                   |
| ---- | -------------------------- | -------------------------------------- |
| 框架 | Vue 3.5 + `<script setup>` | 组合式 API                             |
| 语言 | TypeScript 5(strict+)      | 沿用 `@ithinku/tsconfig` 预设          |
| 构建 | Vite 6                     | 代理、分包、px→vw 一站配置             |
| 路由 | vue-router 4               | hash 模式,免服务端配置                 |
| 状态 | Pinia                      | setup 写法,token 自动持久化            |
| UI   | Vant 4                     | `unplugin-vue-components` 按需自动注册 |
| 请求 | Axios                      | 统一拦截器封装,类型安全                |
| 适配 | postcss-px-to-viewport     | 375 设计稿 px → vw                     |
| 规范 | oxlint + oxfmt             | `@ithinku` 预设,毫秒级                 |
| 调试 | vConsole                   | 环境变量开关                           |

## 📁 目录结构

```
├── .env.development        # 开发环境变量(代理地址、vconsole 开关)
├── .env.production         # 生产环境变量
├── index.html              # 移动端 viewport / meta 配置
├── vite.config.ts          # 构建配置(代理、px→vw、分包)
├── oxlint.config.ts        # oxlint(extends @ithinku/oxlint-config + vue 插件)
├── oxfmt.config.ts         # oxfmt(extends @ithinku/oxfmt-config)
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

## 📖 核心约定

### 移动端适配

- 按 **375px 设计稿**直接书写 `px`,构建时自动转 `vw`(与 Vant 官方设计稿一致)
- 需要保留原始 `px` 的元素,类名加 `.nvw` 前缀跳过转换
- 安全区变量、高清 1px 边框、多行省略等 Mixin 见 `styles/mixins.scss`

### 网络请求

统一使用 `@/utils/request`:自动注入 `Authorization`、业务码校验(成功码在 `constants` 配置)、错误统一 toast、401 自动登出,返回值自动解包:

```ts
import { request } from '@/utils/request'

const info = await request.get<UserInfo>('/user/info', { id: 1 })
```

接口按模块定义在 `src/api/`,禁止在组件内裸调 axios。

### 登录鉴权

路由 `meta.requiresAuth: true` 即受保护:未登录自动跳登录页并携带 `redirect` 回跳参数;token 由 `stores/user.ts` 统一管理并持久化。

### 环境变量

仅 `VITE_` 前缀变量暴露给客户端,新增变量需在 `src/types/env.d.ts` 补充类型:

| 变量                   | 说明                     |
| ---------------------- | ------------------------ |
| `VITE_APP_TITLE`       | 应用标题                 |
| `VITE_API_BASE_URL`    | 接口基础路径             |
| `VITE_PROXY_TARGET`    | 开发代理目标(仅开发环境) |
| `VITE_ENABLE_VCONSOLE` | 是否启用 vConsole        |

### 新增页面

1. `src/views/<模块>/index.vue` 创建页面
2. `src/router/index.ts` 注册路由,`meta` 声明 `title` / `requiresAuth`
3. 标题与鉴权由全局守卫自动处理

## 📦 部署

- hash 路由可直接部署到任意静态服务器,无需 rewrite 配置
- 生产接口跨域由网关/nginx 反代解决,路径与 `VITE_API_BASE_URL` 一致
- 需兼容低版本 webview 时,加装 `@vitejs/plugin-legacy`

## 🔧 可选扩展

- 单元测试:`vitest` + `@vue/test-utils`
- Mock 数据:`vite-plugin-mock` / `msw`
- Git 提交规范:`husky` + `lint-staged` + `commitlint`

## 📄 License

[MIT](./LICENSE) © protagonisths

<div align="center">

**如果这个模板帮到了你,欢迎点一个 ⭐ Star**

</div>
