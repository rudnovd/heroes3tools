<template>
  <BaseSelect
    :value="value"
    :options="terrains"
    :placeholder="t('components.selectTerrain.placeholder')"
    dropdown-position="top"
    @select="$emit('select', $event)"
  >
    <template #selected="{ selected }">
      <ObjectPortrait
        :folder="`/images/terrains`"
        :file="{ name: selected.id, alt: selected.name }"
        width="46px"
        height="30px"
      />
      {{ selected.name }}
    </template>

    <template #option="{ option }">
      <ObjectPortrait
        :folder="`/images/terrains`"
        :file="{ name: option.id, alt: option.name }"
        width="46px"
        height="30px"
      />
      {{ option.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { Terrain } from '@/models/Terrain'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))

defineProps<{ value: Terrain | null; terrains: Array<Terrain> }>()
defineEmits<{ select: [terrain: Terrain | null] }>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
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
</style>
