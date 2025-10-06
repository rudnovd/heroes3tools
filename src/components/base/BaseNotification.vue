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

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-end;
  margin-bottom: 28px;
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
  min-width: 100px;
  min-height: 50px;
  padding: 1rem;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: 1.5;
  pointer-events: all;
  background: url('/images/windows/base-bg.webp');
  border-radius: 4px;
  box-shadow:
    0 0 0 2px rgb(0, 0, 0),
    0 0 0 3px rgb(124, 111, 64),
    0 0 0 4px rgb(255, 251, 139),
    0 0 0 5px rgb(138, 121, 74),
    0 0 0 6px rgb(114, 90, 44),
    0 0 0 7px rgb(33, 27, 23);
}

.notification-slot {
  color: rgb(255, 255, 255);
}

.notification-buttons {
  display: flex;
  gap: 1rem;
}

.notification-button {
  padding: 0.25rem 0.5rem;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  background: url('/images/windows/base-dark-bg.webp');
  border: 1px solid rgb(0, 0, 0);
  border-radius: 4px;
  transition: border-color 0.25s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: transform 1s ease;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateY(150px);
}
</style>
