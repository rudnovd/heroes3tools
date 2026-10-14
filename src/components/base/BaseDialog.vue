<template>
  <dialog
    v-bind="$attrs"
    ref="dialogElement"
    class="base-dialog"
    :class="[`size--${size}`]"
    @close="close"
    @cancel="cancel"
  >
    <header v-if="title && closable" class="base-dialog__header">
      <slot name="header">
        <h2 v-if="title">
          {{ title }}
        </h2>
      </slot>
      <button
        v-if="title && closable"
        type="button"
        class="base-dialog__close-button"
        @click="close"
      >
        <IconClose />
      </button>
    </header>
    <div class="base-dialog__content">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="base-dialog__footer">
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { nextTick, useTemplateRef, watch } from 'vue'
import IconClose from '~icons/mdi/close'

interface Props {
  title?: string
  closable?: boolean
  size?: 'small' | 'medium' | 'large'
}
defineOptions({ inheritAttrs: false })
withDefaults(defineProps<Props>(), { title: '', closable: true, size: 'medium' })
const model = defineModel<boolean>({ required: true })

const dialogRef = useTemplateRef('dialogElement')

function close() {
  model.value = false
}
function cancel() {
  model.value = false
}
watch(model, async (open) => {
  await nextTick()
  if (!dialogRef.value) {
    return
  }
  if (open && !dialogRef.value.open) {
    dialogRef.value.showModal()
  }
  if (!open && dialogRef.value.open) {
    dialogRef.value.close()
  }
}, { immediate: true })

onClickOutside(dialogRef, () => {
  model.value = false
})

watch(
  () => model,
  (isVisible) => {
    if (isVisible) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.classList.add('no-scroll')
    }
    else {
      setTimeout(() => {
        document.body.classList.remove('no-scroll')
        document.body.style.paddingRight = ''
      }, 200)
    }
  },
)
</script>

<style>
.base-dialog {
  width: 100%;
  min-width: 300px;
  padding: 0;
  outline: none;
  background: var(--color-bg-deep);
  border-color: var(--color-border);
  border-radius: 4px;
  &.size--small {
    max-width: calc(60% - 2em - 6px);
  }
  &.size--medium {
    max-width: calc(80% - 2em - 6px);
  }
  &.size--large {
    max-width: calc(100% - 2em - 6px);
  }
  &.fullscreen {
    max-width: 100%;
    max-height: 100%;
    margin: 0;
  }
  &::backdrop {
    background-color: oklch(from black l c h / 60%);
  }
  .base-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--color-text);
    h2 {
      margin: 0;
      font-size: 1.3em;
    }
  }
  .base-dialog__close-button {
    padding: 0;
    margin-left: auto;
    font-size: 1.2rem;
  }
  .base-dialog__content {
    padding-block: 1rem;
    padding-inline: 1rem;
  }
  .base-dialog__footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid var(--color-text);
  }
}
</style>
