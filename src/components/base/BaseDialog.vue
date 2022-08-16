<template>
  <teleport to="body">
    <transition name="transition-dialog">
      <div v-if="show" class="dialog-area" role="dialog">
        <div ref="baseDialogRef" class="base-dialog" :class="`base-dialog-${size}`">
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
  </teleport>
</template>

<script lang="ts">
import CloseButton from '@/components/buttons/CloseButton.vue'
import { onClickOutside } from '@vueuse/core'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

type BaseDialogSizesProp = 'small' | 'medium' | 'large' | 'maximum'

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
      type: String as PropType<BaseDialogSizesProp>,
      default: 'medium',
    },
  },
  emits: ['close'],
  setup(props, context) {
    const baseDialogRef = ref(null)

    onClickOutside(baseDialogRef, () => context.emit('close'))

    watch(
      () => props.show,
      (newShowState) => {
        if (newShowState) {
          const scrollbarWidth = window.innerWidth - document.body.clientWidth
          document.body.style.paddingRight = `${scrollbarWidth}px`
          document.body.classList.add('no-scroll')
        } else {
          setTimeout(() => {
            document.body.classList.remove('no-scroll')
            document.body.style.paddingRight = ''
          }, 200)
        }
      }
    )

    return {
      baseDialogRef,
    }
  },
})
</script>

<style lang="scss" scoped>
.dialog-area {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  outline: 0;
}

.base-dialog {
  position: relative;
  width: 90%;
  min-width: 320px;
  min-height: 150px;
  margin: 2rem auto 2rem auto;
  overflow: hidden;
  background-color: var(--color-bg-deep);
  border-radius: 0.3rem;
  outline: 0;

  &-small {
    max-width: map.get($grid-breakpoints, 'small');
  }

  &-medium {
    max-width: map.get($grid-breakpoints, 'medium');
  }

  &-large {
    max-width: map.get($grid-breakpoints, 'large');
  }

  &-maximum {
    max-width: map.get($grid-breakpoints, 'maximum');
  }
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  pointer-events: auto;
  user-select: none;
  background-clip: padding-box;
  border: 1px solid var(--color-border);

  border-radius: 8px;
}

.header {
  display: flex;
  margin-bottom: 10px;

  .close-button {
    margin-left: auto;
  }
}

.transition-dialog-enter-active,
.transition-dialog-leave-active {
  transition: opacity 0.25s ease-in-out;

  .base-dialog {
    transition: transform 0.25s ease-in-out;
  }
}

.transition-dialog-enter-from,
.transition-dialog-leave-to {
  opacity: 0;

  .base-dialog {
    transform: translateY(-32px);
  }
}
</style>
