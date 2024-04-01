<template>
  <div v-if="show" class="notification-container">
    <transition name="notification">
      <div v-if="showNotification" class="notification">
        <div class="notification-slot"><slot></slot></div>
        <div v-if="buttons.length" class="notification-buttons">
          <button
            v-for="(button, index) in buttons"
            :key="`button-${index}`"
            class="notification-button"
            :style="{ color: button.textColor, background: button.background }"
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
  textColor?: string
  background?: string
  onClick?: () => void
}

withDefaults(
  defineProps<{
    show: boolean
    color?: string
    textColor?: string
    buttons?: Array<BaseNotificationButtonProp>
  }>(),
  {
    color: 'rgb(33, 186, 69)',
    textColor: 'rgb(255, 255, 255)',
    buttons: () => [],
  },
)
const emit = defineEmits<{ close: [] }>()

const showNotification = ref(false)
nextTick(() => (showNotification.value = true))

const onClick = (button: BaseNotificationButtonProp) => {
  showNotification.value = false
  if (button.onClick) button.onClick()
  emit('close')
}
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-end;
  margin-bottom: 10px;
  line-height: 1.5;
  pointer-events: none;
}

.notification {
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  box-sizing: inherit;
  display: flex;
  flex-direction: column;
  grid-gap: 0.5rem;
  align-items: center;
  min-width: 100px;
  min-height: 50px;
  padding: 1rem;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: 1.5;
  pointer-events: all;
  background-color: v-bind(color);
  border-radius: 4px;
}

.notification-slot {
  color: v-bind(textColor);
}

.notification-buttons {
  display: flex;
  grid-gap: 1rem;
}

.notification-button {
  padding: 0.5rem 0.5rem;
  transition: background-color 0.25s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: transform 1s ease;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateY(100px);
}
</style>
