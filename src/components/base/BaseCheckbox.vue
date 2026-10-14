<template>
  <div class="base-checkbox" :class="[{ 'check-disabled': disabled }, `color-${color}`]">
    <input
      :id="`${id}-${label}-checkbox`"
      v-model="model"
      :name="`${id}-${label}-checkbox`"
      type="checkbox"
      class="base-checkbox__input"
      :checked="model"
      :disabled
      @change="$emit('change', !model)"
    >
    <label class="base-checkbox__label" :for="`${id}-${label}-checkbox`">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label: string
  disabled?: boolean
  color?: string
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  color: 'default',
})
defineEmits<{ change: [value: boolean] }>()
const model = defineModel<boolean>({ required: true })
const id = useId()
</script>

<style>
.base-checkbox {
  .base-checkbox__label {
    user-select: none;
  }
  &.color-attacker {
    .base-checkbox__input {
      accent-color: var(--color-attacker);
    }
  }
  &.color-defender {
    .base-checkbox__input {
      accent-color: var(--color-defender);
    }
  }
}
</style>
