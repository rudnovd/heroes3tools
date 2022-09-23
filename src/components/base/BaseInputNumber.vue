<template>
  <input
    :value="currentValue"
    class="input-number"
    placeholder="1"
    type="number"
    :min="min"
    :max="max"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, triggerRef, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    value: number
    debounce?: number
  }>(),
  {
    min: 1,
    max: 99,
    debounce: 0,
  }
)
const emit = defineEmits(['input'])

const currentValue = ref<number | null>(props.value)
const previousValue = ref(1)

const emitDebouncedValue = useDebounceFn(() => {
  emit('input', currentValue.value ?? 0)
}, props.debounce)

watch(
  () => props.value,
  (value) => {
    currentValue.value = value
    previousValue.value = value
  }
)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let inputValue = parseInt(target.value)

  if (!target.value) {
    currentValue.value = 0
    return emitDebouncedValue()
  } else if (isNaN(inputValue) || inputValue < props.min || inputValue > props.max) {
    inputValue = previousValue.value
  }

  if (inputValue === currentValue.value) {
    return triggerRef(currentValue)
  } else {
    previousValue.value = inputValue
    currentValue.value = inputValue
  }
  emitDebouncedValue()
}
</script>

<style lang="scss" scoped>
.input-number {
  width: 100%;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgb(255, 255, 255);
  background-image: url('/backgrounds/base-window.webp');
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
}
</style>
