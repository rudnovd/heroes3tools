<template>
  <transition name="modal">
    <div v-if="show" :class="{ show }" class="dialog" role="dialog">
      <div v-click-outside name="modal" class="modal" :class="`modal-${size}`" @clickoutside="$emit('close')">
        <div class="modal-content">
          <div class="header">
            <slot name="header"></slot>
            <CloseButton @click="$emit('close')" />
          </div>

          <slot name="content" class="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import clickOutside from '@/directives/clickOutside'
import CloseButton from '@/components/buttons/CloseButton.vue'

export default defineComponent({
  name: 'BaseModal',
  components: {
    CloseButton,
  },
  directives: {
    clickOutside,
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: 'large',
      validator(modalSize: string) {
        return ['small', 'medium', 'large', 'maximum'].indexOf(modalSize) !== -1
      },
    },
  },
  emits: ['close'],
})
</script>

<style lang="scss" scoped>
.dialog {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  left: 0;
  outline: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;

  &.show {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 0.3rem;
  margin: 2rem auto 2rem auto;
  min-height: 150px;
  min-width: 320px;
  outline: 0;
  width: 90%;

  &.modal-small {
    max-width: map-get($grid-breakpoints, 'small');
  }

  &.modal-medium {
    max-width: map-get($grid-breakpoints, 'medium');
  }

  &.modal-large {
    max-width: map-get($grid-breakpoints, 'large');
  }

  &.modal-maximum {
    max-width: map-get($grid-breakpoints, 'maximum');
  }
}

.modal-content {
  background-clip: padding-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  pointer-events: auto;
  position: relative;
  user-select: none;
  width: 100%;
}

.header {
  display: flex;
  margin-bottom: 10px;

  .close-button {
    margin-left: auto;
  }
}

.modal-enter-active,
.modal-leave-active {
  // transition: opacity 0.2s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
