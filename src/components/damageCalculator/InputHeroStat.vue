<template>
  <div class="input-stat">
    <label class="stat-name">
      {{ t(`data.${stat}`) }}
    </label>
    <BaseInputNumber :min="0" :max="99" :value="value" :debounce="50" @input="emit('input', $event)" />
  </div>
</template>

<script setup lang="ts">
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  stat: 'attack' | 'defense' | 'power' | 'knowledge' | string
  value: number
}>()
const emit = defineEmits<{ input: [number: number] }>()

const { t } = useI18n()
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
