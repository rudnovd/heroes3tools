<template>
  <BaseSelect
    class="select-hero"
    :value="value"
    :options="heroes"
    :preload-options-count="20"
    virtual-scroll
    :placeholder="$t('components.selectHero.placeholder')"
    @select="$emit('select', $event)"
    @clear="$emit('clear')"
  >
    <template #selected="{ selected }">
      <img
        :src="`/images/heroes/portraits/small/${selected.id}.webp`"
        :alt="selected.name"
        width="46px"
        height="30px"
      >
      {{ selected.name }}
    </template>

    <template #option="{ option: hero }">
      <img
        :src="`/images/heroes/portraits/small/${hero.id}.webp`"
        :alt="hero.name"
        width="46px"
        height="30px"
      >
      {{ hero.name }}
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import type { Hero, HeroInstance } from '@/models/Hero'
import BaseSelect from '@/components/base/BaseSelect.vue'

defineProps<{ heroes: Array<Hero>, value: Hero | HeroInstance | null }>()
defineEmits<{ select: [hero: Hero], clear: [] }>()
</script>

<style>
.select-hero {
  .selected-value {
    & picture {
      display: none;
      @media screen and (width >= 768px) {
        display: flex;
      }
    }
  }
}
</style>
