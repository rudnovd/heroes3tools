<template>
  <BaseSelect
    :value="value"
    :options="heroes"
    :placeholder="t('components.selectHero.placeholder')"
    @select="$emit('select', $event)"
    @clear="$emit('clear')"
  >
    <template #selected="{ selected }: { selected: Hero }">
      <img
        :src="`/heroes/portraits/small/${selected.key}.webp`"
        :title="selected.name"
        :alt="selected.name"
        class="hero-image"
      />
      {{ selected.name }}
    </template>

    <template #option="{ option }: { option: Hero }">
      <img
        :src="`/heroes/portraits/small/${option.key}.webp`"
        :alt="option.name"
        :title="option.name"
        class="hero-image"
      />
      {{ option.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { HeroInstance } from '@/modules/hero'
import type { Hero } from '@/types'
import { useI18n } from 'vue-i18n'

defineProps<{
  heroes: Array<Hero>
  value: Hero | HeroInstance | null
}>()

defineEmits(['select', 'clear'])

const { t } = useI18n()
</script>
