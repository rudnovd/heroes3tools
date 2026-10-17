<template>
  <div class="spell-card" :class="{ 'selected-spell': selected }">
    <button class="spell-button" @click="$emit('click', spell)">
      <img :src="`/images/spells/${spell.id}.webp`" :alt="spell.name">
      <span class="spell-name">{{ spell.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Spell } from '@/models/Spell'

withDefaults(defineProps<{ spell: Spell, selected?: boolean }>(), {
  selected: false,
})
defineEmits<{ click: [spell: Spell] }>()
</script>

<style>
.spell-card {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 8rem;
  background: url('/images/windows/book-bg.webp');
  background-position: center;
  border: 0.125rem solid transparent;
  border-radius: 0.25rem;
  transition: border 0.1s linear;
  &.selected-spell {
    border-color: var(--color-text);
  }
  .spell-button {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 4.375rem 1fr;
    place-items: center center;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgb(241 220 123);
    text-shadow: 0 0 0.1875rem #000;
  }
}
</style>
