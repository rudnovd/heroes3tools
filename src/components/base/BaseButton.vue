<template>
  <button class="base-button" :class="`color-${color}`" @click="emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { BattleSide } from '@/models/Battle'

withDefaults(
  defineProps<{
    color?: BattleSide
    width?: string
  }>(),
  {
    color: 'attacker',
    width: '100%',
  },
)
const emit = defineEmits<{ click: [] }>()
</script>

<style lang="scss" scoped>
.base-button {
  width: v-bind(width);
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  border-radius: 5px;
  transition:
    background-color 0.25s linear,
    border-color 0.25s linear;

  &:hover {
    cursor: pointer;
  }
}

@each $color, $color-value in $calculator-colors {
  .color-#{$color} {
    color: map.get($calculator-colors-text, $color);
    background-color: $color-value;
    border: 1px solid $color-value;

    &:hover {
      background-color: color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
      border-color: color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
    }
  }
}
</style>
