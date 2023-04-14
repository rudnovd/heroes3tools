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

<script lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { Terrain } from '@/models/Terrain'
import { defineAsyncComponent, defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SelectTerrain',
  components: {
    BaseSelect,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
  },
  props: {
    value: {
      type: null as unknown as PropType<Terrain | null>,
      required: true,
    },
    terrains: {
      type: Array as PropType<Array<Terrain>>,
      required: true,
    },
  },
  emits: ['select'],
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
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
