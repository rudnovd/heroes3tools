<template>
  <input
    :value="currentValue"
    class="input-number"
    type="number"
    name="input-number"
    :min="min"
    :max="max"
    @input="onInput"
  >
</template>

<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    value?: number
    debounce?: number
  }>(),
  {
    min: 1,
    max: 99,
    value: 1,
    debounce: 0,
  },
)
const emit = defineEmits<{ input: [number: number] }>()

const currentValue = ref(props.value)
const previousValue = ref(0)
const debouncedValue = useDebounce(currentValue, props.debounce)

watch(
  () => props.value,
  newValue => (currentValue.value = newValue),
)

watch(debouncedValue, () => emit('input', debouncedValue.value))

function onInput(event: Event) {
  if (!event.target)
    return

  const target = event.target as HTMLInputElement

  let targetValue = Number.parseInt(target.value)
  if (targetValue < props.min || targetValue > props.max) {
    currentValue.value = previousValue.value
    targetValue = previousValue.value
  }
  else {
    currentValue.value = targetValue
    previousValue.value = currentValue.value
  }
}
</script>

<style lang="scss" scoped>
.input-number {
  width: 100%;
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
}
</style>
