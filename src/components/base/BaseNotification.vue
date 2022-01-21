<template>
  <div v-if="show" class="notification-container">
    <transition name="notification">
      <div v-if="showNotification" class="notification">
        <div><slot></slot></div>
        <div v-if="buttons" class="notification-buttons">
          <button
            v-for="(button, index) in buttons"
            :key="`button-${index}`"
            class="notification-button"
            :style="{ color: button.textColor }"
            @click="onClick(button)"
          >
            {{ button.text }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'

interface BaseNotificationButtonProp {
  text: string
  textColor?: string
  onClick?: () => void
}

export default defineComponent({
  name: 'BaseNotification',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    color: {
      type: String,
      default: 'rgb(33, 186, 69)',
    },
    // eslint-disable-next-line vue/no-unused-properties
    textColor: {
      type: String,
      default: 'rgb(255, 255, 255)',
    },
    buttons: {
      type: Array as () => Array<BaseNotificationButtonProp>,
      default: () => [],
      validator: function (value: Array<BaseNotificationButtonProp>) {
        value.map((button) => {
          if (!button.textColor) button.textColor = 'rgb(255, 255, 255)'
        })
        return true
      } as never,
    },
  },
  emits: ['close'],
  setup(_, context) {
    const showNotification = ref(false)
    nextTick(() => (showNotification.value = true))

    const onClick = (button: BaseNotificationButtonProp) => {
      showNotification.value = false
      if (button.onClick) button.onClick()
      context.emit('close')
    }

    return {
      showNotification,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.notification-container {
  line-height: 1.5;
  left: 0;
  margin-bottom: 10px;
  right: 0;
  z-index: 2000;
  bottom: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-end;
  position: fixed;
  pointer-events: none;
}

.notification {
  line-height: 1.5;
  box-sizing: inherit;
  left: 0;
  margin-bottom: 10px;
  right: 0;
  z-index: 2000;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 0.5rem;
  margin-right: 10px;
  padding: 1rem;
  border-radius: 4px;
  background-color: v-bind(color);
  color: v-bind(textColor);
  min-height: 50px;
  min-width: 100px;
  pointer-events: all;
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
