<template>
  <button
    class="pick-creature-button"
    :data-umami-event="`pick ${color} creature`"
    :class="`color-${color}`"
    @click="showSelectUnitModal = true"
  >
    <slot />
  </button>

  <SelectUnitModal :show="showSelectUnitModal" @close="showSelectUnitModal = false" @select="$emit('select', $event)" />
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

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:color';
@use '@/styles/variables';

.pick-creature-button {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 2rem;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    border-radius: 5px;
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &.color-attacker {
    &::before {
      transform-origin: center right;
    }

    &:hover::before {
      transform-origin: center left;
    }
  }

  &.color-defender {
    &::before {
      transform-origin: center left;
    }

    &:hover::before {
      transform-origin: center right;
    }
  }
}

@each $color, $color-value in variables.$calculator-colors {
  .color-#{$color} {
    color: map.get(variables.$calculator-colors-text, $color);
    background-color: $color-value;
    border: 1px solid $color-value;

    &::before {
      background-color: color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
      border: 1px solid color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
    }
  }
}
</style>
