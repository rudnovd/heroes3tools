<template>
  <BaseSelect
    :value="value"
    :options="terrains"
    :placeholder="t('components.selectTerrain.placeholder')"
    dropdown-position="top"
    @select="$emit('select', $event)"
  >
    <template #selected="{ selected }: { selected: Terrain }">
      <img :src="`/images/terrains/${selected.key}`" :alt="selected.name" width="46px" height="30px" />
      {{ selected.name }}
    </template>

    <template #option="{ option }: { option: Terrain }">
      <img :src="`/images/terrains/${option.key}`" :alt="option.name" width="46px" height="30px" />
      {{ option.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import type { Terrain } from '@/types'
import { useI18n } from 'vue-i18n'
import BaseSelect from '../base/BaseSelect.vue'

defineProps<{
  value: Terrain | null
  terrains: Array<Terrain>
}>()
defineEmits(['select'])

const { t } = useI18n()
</script>
