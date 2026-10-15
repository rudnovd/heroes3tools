<template>
  <div v-if="show" class="notification-container">
    <transition name="notification">
      <div v-if="showNotification" class="notification">
        <div class="notification-slot">
          <slot />
        </div>
        <div v-if="buttons.length" class="notification-buttons">
          <button
            v-for="(button, index) in buttons"
            v-bind="button.attrs"
            :key="`button-${index}`"
            class="notification-button"
            @click="onClick(button)"
          >
            {{ button.text }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface BaseNotificationButtonProp {
  text: string
  attrs?: Record<string, string>
  onClick?: () => void
}

withDefaults(
  defineProps<{
    show: boolean
    buttons?: Array<BaseNotificationButtonProp>
  }>(),
  {
    buttons: () => [],
  },
)
const emit = defineEmits<{ close: [] }>()

const showNotification = ref(false)
nextTick(() => {
  showNotification.value = true
})

function onClick(button: BaseNotificationButtonProp) {
  showNotification.value = false
  if (button.onClick)
    button.onClick()
  emit('close')
}
</script>

<style>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  margin-bottom: 1.75rem;
  line-height: 1.5;
  pointer-events: none;
}
.notification {
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-sizing: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  min-width: 6.25rem;
  min-height: 3.125rem;
  padding: 1rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  line-height: 1.5;
  pointer-events: all;
  background: url('/images/windows/base-bg.webp');
  border-radius: 0.25rem;
  box-shadow:
    0 0 0 0.125rem rgb(0 0 0),
    0 0 0 0.1875rem rgb(124 111 64),
    0 0 0 0.25rem rgb(255 251 139),
    0 0 0 0.3125rem rgb(138 121 74),
    0 0 0 0.375rem rgb(114 90 44),
    0 0 0 0.4375rem rgb(33 27 23);
}
.notification-slot {
  color: rgb(255 255 255);
}
.notification-buttons {
  display: flex;
  gap: 1rem;
}
.notification-button {
  padding: 0.25rem 0.5rem;
  color: rgb(255 255 255);
  text-transform: lowercase;
  background: url('/images/windows/base-dark-bg.webp');
  border: 1px solid rgb(0 0 0);
  border-radius: 0.25rem;
  transition: border-color 0.25s;
  &:hover {
    border-color: rgb(255 255 255 / 50%);
  }
}
.notification-enter-active,
.notification-leave-active {
  transition: transform 1s ease;
}
.notification-enter-from,
.notification-leave-to {
  transform: translateY(9.375rem);
}
</style>
