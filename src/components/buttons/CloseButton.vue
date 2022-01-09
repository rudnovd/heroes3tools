<template>
  <button class="close-button" aria-label="close button" @click="$emit('click')">
    <span class="cross-first-line" />
    <span class="cross-second-line" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CloseButton',
  emits: ['click'],
})
</script>

<style lang="scss" scoped>
.close-button {
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  height: 2rem;
  position: relative;
  width: 2rem;

  &:hover .cross-first-line,
  &:hover .cross-second-line {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:active .cross-first-line,
  &:active .cross-second-line {
    transform: rotate(55deg);
    transition: transform 0.3s;
  }
}

.cross-first-line,
.cross-second-line {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
}

.cross-first-line {
  height: 1px;
  left: 0;
  top: 50%;
  transform: translate(0%, -50%) rotate(45deg);
  width: 100%;
}

.cross-second-line {
  height: 100%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%) rotate(45deg);
  width: 1px;
}
</style>
