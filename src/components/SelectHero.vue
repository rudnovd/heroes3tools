<template>
  <CustomSelect
    :value="value"
    :options="heroes"
    :preload-options-count="20"
    use-virtual-scoll
    placeholder="Select Hero"
    @select="$emit('select', $event)"
    @clear="$emit('clear')"
  >
    <template #selected="{ selected }">
      <ObjectPortrait
        :folder="`/images/heroes/portraits/small`"
        :file="{ name: selected.id, alt: selected.name }"
        :width="46"
        :height="30"
      />
      {{ selected.name }}
    </template>

    <template #option="{ option }">
      <ObjectPortrait
        :folder="`/images/heroes/portraits/small`"
        :file="{ name: option.id, alt: option.name }"
        :width="46"
        :height="30"
        :lazy-loading="false"
      />
      {{ option.name }}
    </template>
  </CustomSelect>
</template>

<script lang="ts">
import CustomSelect from '@/components/CustomSelect.vue'
import type { Hero, HeroInstance } from '@/models/Hero'
import { defineAsyncComponent, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SelectHero',
  components: {
    CustomSelect,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
  },
  props: {
    heroes: {
      type: Array as PropType<Array<Hero>>,
      required: true,
    },
    value: {
      type: null as unknown as PropType<Hero | HeroInstance | null>,
      required: true,
    },
  },
  emits: ['select', 'clear'],
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

