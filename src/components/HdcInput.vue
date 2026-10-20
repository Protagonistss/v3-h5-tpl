<script setup lang="ts">
/**
 * 自定义输入框示例组件。
 * 支持 v-model 双向绑定,展示基座中表单组件的推荐写法。
 */
interface Props {
  modelValue?: string
  placeholder?: string
  type?: string
  maxlength?: number
  disabled?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '请输入',
  type: 'text',
  maxlength: undefined,
  disabled: false,
  clearable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onClear() {
  if (props.disabled) return
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="hdc-input" :class="{ 'hdc-input--disabled': disabled }">
    <input
      class="hdc-input__inner"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="onInput"
    />
    <span v-if="clearable && modelValue && !disabled" class="hdc-input__clear" @click="onClear">
      ×
    </span>
  </div>
</template>

<style lang="scss" scoped>
.hdc-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &__inner {
    flex: 1;
    height: 44px;
    padding: 0 30px 0 12px;
    font-size: $font-size-md;
    color: $text-color;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: $border-radius-sm;

    &::placeholder {
      color: $text-color-secondary;
    }
  }

  &__clear {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 16px;
    color: #c8c9cc;
  }

  &--disabled .hdc-input__inner {
    color: #c8c9cc;
    background-color: #f7f8fa;
  }
}
</style>
