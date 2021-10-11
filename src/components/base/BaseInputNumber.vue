<template>
  <input :value="currentValue" class="input-number" type="number" :min="min" :max="max" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'

export default defineComponent({
  name: 'BaseInputNumber',
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
    value: {
      type: Number,
      default: 1,
      required: true,
    },
    debounce: {
      type: Number,
      default: 0,
    },
  },
  emits: ['input'],
  setup(props, context) {
    const currentValue = ref(props.value)
    const previousValue = ref(0)
    const debouncedValue = useDebounce(currentValue, props.debounce)

    const onInput = (event: Event) => {
      if (!event.target) return

      const target = event.target as HTMLInputElement

      let targetValue = parseInt(target.value)
      if (targetValue < props.min || targetValue > props.max) {
        currentValue.value = previousValue.value
        targetValue = previousValue.value
      } else {
        currentValue.value = targetValue
        previousValue.value = currentValue.value
      }
    }

    watch(debouncedValue, () => context.emit('input', debouncedValue.value))

    return {
      currentValue,
      onInput,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-number {
  border: 1px solid rgb(206, 212, 218);
  border-radius: 0.2rem;
  font-size: inherit;
  font-family: inherit;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
