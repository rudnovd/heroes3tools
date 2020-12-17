<template>
  <input class="input-number" type="number" :min="min" :max="max" :value="value" @input="onInput" @paste="onInput" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseInputNumber',
  props: {
    min: {
      type: Number,
      default: 0,
      required: false,
    },
    max: {
      type: Number,
      default: 99,
      required: false,
    },
    value: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  emits: ['input'],
  setup(props, context) {
    const previousValue = ref(0)

    const onInput = (event: any) => {
      if (!event.target) return

      if (event.target.value < props.min || event.target.value > props.max) {
        event.target.value = previousValue.value
      } else {
        event.target.value = parseInt(event.target.value)
        previousValue.value = event.target.value
      }
      context.emit('input', parseInt(event.target.value))
    }

    return {
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
