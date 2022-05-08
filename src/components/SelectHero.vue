<template>
  <BaseSelect
    :value="value"
    :options="heroes"
    :preload-options-count="20"
    use-virtual-scoll
    :placeholder="t('components.selectHero.placeholder')"
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
  </BaseSelect>
</template>

<script lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { Hero, HeroInstance } from '@/models/Hero'
import type { PropType } from 'vue'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SelectHero',
  components: {
    BaseSelect,
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
    display: none;

    @include media-medium {
      display: flex;
      margin-right: 0.5rem;
    }
  }
}

.option-item {
  & picture {
    display: flex;
    margin-right: 0.5rem;
  }
}
</style>
