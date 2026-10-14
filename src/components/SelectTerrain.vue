<template>
  <BaseSelect
    class="select-terrain"
    :value="value"
    :options="terrains"
    :placeholder="$t('components.selectTerrain.placeholder')"
    dropdown-position="top"
    @select="$emit('select', $event)"
  >
    <template #selected="{ selected }">
      <img
        :src="`/images/terrains/${selected.id}.webp`"
        :alt="selected.name"
        width="46px"
        height="30px"
      >
      {{ selected.name }}
    </template>

    <template #option="{ option: terrain }">
      <img
        :src="`/images/terrains/${terrain.id}.webp`"
        :alt="terrain.name"
        width="46px"
        height="30px"
      >
      {{ terrain.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import type { Terrain } from '@/models/Terrain'
import BaseSelect from '@/components/base/BaseSelect.vue'

defineProps<{ value: Terrain | null, terrains: Array<Terrain> }>()
defineEmits<{ select: [terrain: Terrain | null] }>()
</script>

<style>
.select-terrain {
  .selected-value {
    & picture {
      display: flex;
      margin-right: 0.5rem;
    }
  }
  .option-item {
    & picture {
      display: flex;
      margin-right: 0.5rem;
    }
  }
}
</style>
