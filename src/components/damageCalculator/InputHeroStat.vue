<template>
  <div class="input-stat">
    <label :for="`${stat}-hero-stat-input-${id}`" class="stat-name">
      {{ t(`data.${stat}`) }}
    </label>
    <BaseInputNumber
      :id="`${stat}-hero-stat-input-${id}`"
      :min="0"
      :max="99"
      :value="value"
      :debounce="50"
      @input="emit('input', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'

defineProps<{
  stat: 'attack' | 'defense' | 'power' | 'knowledge' | string
  value: number
}>()
const emit = defineEmits<{ input: [number: number] }>()

const { t } = useI18n()
const id = useId()
</script>

<style lang="scss" scoped>
.stat-name {
  display: block;
  margin-bottom: 10px;
}

.stat-input {
  min-width: 3.75rem;
}
</style>
