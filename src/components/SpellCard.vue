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
  max-height: 128px;
  background: url('/images/windows/book-bg.webp');
  background-position: center;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: border 0.1s linear;
  &.selected-spell {
    border-color: var(--color-text);
  }
  .spell-button {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 70px 1fr;
    place-items: center center;
    width: 100%;
    height: 100%;
    padding: 8px;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgb(241 220 123);
    text-shadow: 0 0 3px #000;
  }
}
</style>
