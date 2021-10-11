<template>
  <button class="pick-creature-button" :class="`color-${color}`" @click="showSelectUnitModal = true">
    <slot />
  </button>

  <SelectUnitModal
    v-if="showSelectUnitModal"
    :show="showSelectUnitModal"
    @close="showSelectUnitModal = false"
    @select="$emit('select', $event)"
  />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: 'PickCreatureButton',
  components: {
    SelectUnitModal: defineAsyncComponent(() => import('@/components/damageCalculator/SelectUnitModal.vue')),
  },
  props: {
    color: {
      type: String as () => 'attacker' | 'defender',
      required: true,
    },
  },
  emits: ['click', 'select'],
  setup() {
    return {
      showSelectUnitModal: ref(false),
    }
  },
})
</script>

<style lang="scss" scoped>
.pick-creature-button {
  width: 100%;
  height: 2rem;
  border-radius: 5px;
  line-height: 1.5;
  z-index: 1;
  position: relative;
  font-size: 0.875rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &::before {
    border-radius: 5px;
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

@each $color, $color-value in $calculator-colors {
  .color-#{$color} {
    color: map.get($calculator-colors-text, $color);
    background-color: $color-value;
    border: 1px solid $color-value;

    &::before {
      background-color: color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
      border: 1px solid color.adjust($color-value, $red: -10, $green: -10, $blue: -10);
    }
  }
}
</style>
