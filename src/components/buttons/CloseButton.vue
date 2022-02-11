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
.cross-first-line,
.cross-second-line {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
}

.cross-first-line {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translate(0%, -50%) rotate(45deg);
}

.cross-second-line {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  transform: translate(-50%, 0%) rotate(45deg);
}
.close-button {
  position: relative;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;

  &:hover .cross-first-line,
  &:hover .cross-second-line {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:active .cross-first-line,
  &:active .cross-second-line {
    transition: transform 0.3s;
    transform: rotate(55deg);
  }
}
</style>
