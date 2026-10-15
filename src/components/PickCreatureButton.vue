<template>
  <button
    class="pick-creature-button"
    :class="`color-${color}`"
    @click="showSelectUnitModal = true"
  >
    <slot />
  </button>

  <SelectUnitModal v-model="showSelectUnitModal" @close="showSelectUnitModal = false" @select="$emit('select', $event)" />
</template>

<script setup lang="ts">
import type { BattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import { defineAsyncComponent, ref } from 'vue'

defineProps<{ color: BattleSide }>()
defineEmits<{ click: [], select: [creature: Creature] }>()

const SelectUnitModal = defineAsyncComponent(() => import('@/components/SelectUnitModal.vue'))
const showSelectUnitModal = ref(false)
</script>

<style>
.pick-creature-button {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 2rem;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  border-radius: 0.25rem;
  &:hover {
    cursor: pointer;
  }
  &::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    content: '';
    border-radius: 0.25rem;
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &.color-attacker {
    color: var(--color-attacker-text);
    background-color: var(--color-attacker);
    border: 1px solid var(--color-attacker);
    &::before {
      background-color: var(--color-attacker-hover);
      border: 1px solid var(--color-attacker-hover);
      transform-origin: center right;
    }
    &:hover::before {
      transform-origin: center left;
    }
  }
  &.color-defender {
    color: var(--color-defender-text);
    background-color: var(--color-defender);
    border: 1px solid var(--color-defender);
    &::before {
      background-color: var(--color-defender-hover);
      border: 1px solid var(--color-defender-hover);
      transform-origin: center left;
    }
    &:hover::before {
      transform-origin: center right;
    }
  }
}
</style>
