<template>
  <BaseSelect
    :value="value"
    :options="heroes"
    :preload-options-count="20"
    virtual-scroll
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

    <template #option="{ option: hero }">
      <ObjectPortrait
        :folder="`/images/heroes/portraits/small`"
        :file="{ name: hero.id, alt: hero.name }"
        :width="46"
        :height="30"
        :lazy-loading="false"
      />
      {{ hero.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { Hero, HeroInstance } from '@/models/Hero'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))

defineProps<{ heroes: Array<Hero>; value: Hero | HeroInstance | null }>()
defineEmits<{ select: [hero: Hero]; clear: [] }>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.selected-value {
  & picture {
    display: none;

    @include media-medium {
      display: flex;
    }
  }
}
</style>
