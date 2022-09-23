<template>
  <teleport :to="'.notification-container'">
    <transition name="notification">
      <div v-show="show" class="notification">
        <slot></slot>
        <section v-if="buttons.length || $slots.buttons" class="notification-buttons">
          <base-button v-for="button in buttons" :key="button" @click="onEmit(button)">
            {{ button }}
          </base-button>
          <slot name="buttons"></slot>
        </section>
        <close-button @click="onEmit('close')" />
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import CloseButton from '@/components/buttons/CloseButton.vue'
import { onMounted, onUnmounted, ref } from 'vue'

withDefaults(
  defineProps<{
    buttons?: Array<'close' | 'ok' | 'apply' | 'cancel'>
  }>(),
  {
    buttons: () => [],
  }
)
const emit = defineEmits(['close', 'ok', 'apply', 'cancel'])

const show = ref(false)

onMounted(() => {
  show.value = true
})

const isContainerExist = document.querySelector('.notification-container')
if (!isContainerExist) {
  const node = document.createElement('section')
  node.classList.add('notification-container')
  document.body.appendChild(node)
}

const onEmit = (event: 'close' | 'ok' | 'apply' | 'cancel') => {
  show.value = false
  setTimeout(() => {
    emit(event)
  }, 1000)
}

onUnmounted(() => {
  const container = document.querySelector('.notification-container')
  if (container && !container.childElementCount) {
    container.remove()
  }
})
</script>

<style lang="scss" scoped>
:global(.notification-container) {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $layer-notification-index;
  display: grid;
  grid-auto-columns: min-content;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem;
  line-height: 1.5;
  pointer-events: none;
}

.notification {
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
  min-width: 250px;
  min-height: 90px;
  padding: 1rem;
  line-height: 1.5;
  pointer-events: all;
  background-image: url('/backgrounds/base-window.webp');
  border-radius: 4px;
}

.notification-buttons {
  display: flex;
  gap: 1rem;

  :slotted(button),
  button {
    flex: 1 0 0;
    text-transform: uppercase;
  }
}

:deep(.close-button) {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  transform: translate(-0.5rem, 0.5rem);
}

.notification-enter-active {
  transition: transform 1s ease;
}

.notification-leave-active {
  transition: transform 0.5s ease;
}

.notification-enter-from {
  transform: translateY(100px);
}

.notification-leave-to {
  transform: translateX(calc(1rem + 100%));
}
</style>
