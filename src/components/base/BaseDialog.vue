<template>
  <transition name="transition-dialog">
    <teleport to="body">
      <div v-if="show" class="dialog-area" role="dialog">
        <div ref="baseDialog" class="base-dialog" :class="`base-dialog-${size}`">
          <div class="modal-content">
            <div class="header">
              <slot name="header"></slot>
              <CloseButton @click="$emit('close')" />
            </div>

            <slot name="content" class="content"></slot>
          </div>
        </div>
      </div>
    </teleport>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import CloseButton from '@/components/buttons/CloseButton.vue'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'BaseDialog',
  components: {
    CloseButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator(size: string) {
        return ['small', 'medium', 'large', 'extra-large', 'maximum'].includes(size)
      },
    },
  },
  emits: ['close'],
  setup(props, context) {
    const baseDialog = ref(null)

    onClickOutside(baseDialog, () => context.emit('close'))

    onMounted(() => {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.classList.add('no-scroll')
    })

    onUnmounted(() => {
      setTimeout(() => {
        document.body.classList.remove('no-scroll')
        document.body.style.paddingRight = ''
      }, 200)
    })

    return { baseDialog }
  },
})
</script>

<style lang="scss" scoped>
.dialog-area {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  outline: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  overflow-y: auto;
}

.base-dialog {
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 0.3rem;
  margin: 2rem auto 2rem auto;
  min-height: 150px;
  min-width: 320px;
  outline: 0;
  width: 90%;
  overflow: hidden;

  &-small {
    max-width: map-get($grid-breakpoints, 'small');
  }

  &-medium {
    max-width: map-get($grid-breakpoints, 'medium');
  }

  &-large {
    max-width: map-get($grid-breakpoints, 'large');
  }

  &-maximum {
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

.transition-dialog {
  &-enter-active {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  &-leave-active {
    transition: opacity 0.2s ease-in, transform 0.2s ease-in;
  }
  &-enter {
    opacity: 0;
    transform: translateY(-2vh);
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-50vh);
  }
}
</style>
