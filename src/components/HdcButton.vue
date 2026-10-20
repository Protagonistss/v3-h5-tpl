<script setup lang="ts">
/**
 * 自定义按钮示例组件。
 * 展示基座中本地组件的推荐写法:<script setup> + defineProps 泛型 + emits 类型声明。
 */
interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  size?: 'large' | 'normal' | 'small'
  block?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'normal',
  block: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function onClick(event: MouseEvent) {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <button
    class="hdc-button"
    :class="[`hdc-button--${type}`, `hdc-button--${size}`, { 'hdc-button--block': block }]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.hdc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius-sm;
  font-weight: 500;
  transition: opacity 0.2s;
  user-select: none;

  & + & {
    margin-left: 12px;
  }

  &--normal {
    height: 44px;
    padding: 0 15px;
    font-size: $font-size-md;
  }

  &--large {
    width: 100%;
    height: 50px;
    font-size: $font-size-lg;
  }

  &--small {
    height: 32px;
    padding: 0 8px;
    font-size: $font-size-sm;
  }

  &--primary {
    color: #fff;
    background-color: $primary-color;
  }

  &--success {
    color: #fff;
    background-color: $success-color;
  }

  &--warning {
    color: #fff;
    background-color: $warning-color;
  }

  &--danger {
    color: #fff;
    background-color: $danger-color;
  }

  &--default {
    color: $text-color;
    background-color: #fff;
    border: 1px solid $border-color;
  }

  &--block {
    display: flex;
    width: 100%;

    & + .hdc-button {
      margin-left: 0;
      margin-top: 12px;
    }
  }

  &:active {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
