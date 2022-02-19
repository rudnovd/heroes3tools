<template>
  <CustomSelect :value="value" :options="terrains" dropdown-position="top" @select="$emit('select', $event)">
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
  </CustomSelect>
</template>

<script lang="ts">
import CustomSelect from '@/components/CustomSelect.vue'
import type { Terrain } from '@/models/Terrain'
import { defineAsyncComponent, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SelectTerrain',
  components: {
    CustomSelect,
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
