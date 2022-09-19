<template>
  <teleport to="body">
    <transition name="transition-dialog">
      <dialog v-show="props.show" ref="dialogRef" :class="`size-${size}`">
        <section ref="dialogContentRef" class="dialog-content">
          <section class="dialog-header">
            <slot name="header"></slot>
            <CloseButton @click="$emit('close')" />
          </section>

          <slot name="content"></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import CloseButton from '@/components/buttons/CloseButton.vue'
import { onClickOutside } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    show: boolean
    size?: 'small' | 'medium' | 'large' | 'maximum'
  }>(),
  {
    size: 'large',
  }
)
const emit = defineEmits(['close'])

const dialogRef = ref<HTMLDialogElement>()
const dialogContentRef = ref<HTMLElement>()

watch(
  () => props.show,
  (show) => {
    if (show) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth
      document.body.style.setProperty('padding-right', `${scrollbarWidth}px`)
      document.body.classList.add('no-scroll')

      nextTick(() => dialogRef.value?.showModal())
    } else {
      setTimeout(() => {
        dialogRef.value?.close()
        document.body.classList.remove('no-scroll')
        document.body.style.removeProperty('padding-right')
      }, 200)
    }
  },
  { immediate: true }
)

onClickOutside(dialogContentRef, () => {
  emit('close')
})
</script>

<style lang="scss" scoped>
dialog {
  width: calc(100vw - 40px);
  border: 1px solid var(--color-border);

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  &.size-small {
    max-width: $breakpoint-small;
  }

  &.size-medium {
    max-width: $breakpoint-medium;
  }

  &.size-large {
    max-width: $breakpoint-large;
  }

  &.size-maximum {
    max-width: $breakpoint-maximum;
  }
}

.dialog-content {
  display: grid;
  gap: 10px;
}

.dialog-header {
  display: flex;

  .close-button {
    margin-left: auto;
  }
}

.transition-dialog-enter-active,
.transition-dialog-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.transition-dialog-enter-from,
.transition-dialog-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
