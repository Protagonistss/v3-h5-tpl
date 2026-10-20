<script setup lang="ts">
// Vant 主题定制入口,如需修改主题色,在 themeVars 中配置 CSS 变量即可
// 参考: https://vant-ui.github.io/vant/#/zh-CN/config-provider
const themeVars = {}
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </van-config-provider>
</template>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100vh;
  background-color: $bg-color;
}
</style>
