<template>
  <div class="spell-card" :class="{ 'selected-spell': selected }">
    <button class="spell-button" @click="$emit('click', spell)">
      <ObjectPortrait
        :file="{ name: spell.id, alt: spell.name }"
        class="creature-img"
        folder="/images/spells"
        :height="imageSizes.height"
        :width="imageSizes.width"
      />
      <span class="spell-name">{{ spell.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Spell } from '@/models/Spell'
import ObjectPortrait from '@/components/ObjectPortrait.vue'

withDefaults(
  defineProps<{
    spell: Spell
    selected?: boolean
    imageSizes?: { height: string | 'auto', width: string | 'auto' }
  }>(),
  {
    selected: false,
    imageSizes: () => {
      return { height: 'auto', width: 'auto' }
    },
  },
)
defineEmits<{ click: [spell: Spell] }>()
</script>

<style lang="scss" scoped>
.spell-card {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 128px;
  background: url('/images/windows/book-bg.webp');
  background-position: center;
  border: 3px solid transparent;
  border-radius: 16px;
  transition: border 0.1s linear;

  &.selected-spell {
    border-color: rgba(var(--color-text), 0.7);
  }
}

.spell-button {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: 70px 1fr;
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 0.7rem;
  font-weight: bold;
  color: rgb(241, 220, 123);
  text-shadow: 0 0 3px #000;
}
</style>
