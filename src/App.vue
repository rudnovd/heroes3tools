<template>
  <router-link v-if="route.path !== '/'" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" alt="back" width="16" height="16" />
    Home page
  </router-link>
  <router-view />

  <BaseNotification v-if="needRefresh" :show="needRefresh" :buttons="notificationsButtons">
    New content is available.
  </BaseNotification>
</template>

<script lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    BaseNotification: defineAsyncComponent(() => import('./components/base/BaseNotification.vue')),
  },
  setup() {
    const route = useRoute()

    const { updateServiceWorker, needRefresh } = useRegisterSW({
      immediate: false,
      onRegistered(registration) {
        if (registration) {
          /* eslint-disable no-console */
          console.log('Service worker registered')
        }
      },
      onRegisterError(error) {
        if (error) {
          /* eslint-disable no-console */
          console.log(`Service worker registartion error: ${error}`)
        }
      },
    })

    const notificationsButtons = [
      {
        text: 'Update app',
        onClick: () => {
          updateServiceWorker(true)
        },
        textColor: 'rgb(255, 255, 255)',
      },
      {
        text: 'Dismiss',
        textColor: 'rgb(255, 255, 255)',
      },
    ]
    return {
      route,

      needRefresh,
      notificationsButtons,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/main';
@import '@/styles/fonts';
</style>

<style lang="scss" scoped>
.return-home {
  display: inline-flex;
  align-items: center;
  padding-left: 5px;
  font-size: 0.8rem;
  color: rgb(0, 0, 0);
  text-decoration: none;
  opacity: 0.3;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }

  &::before {
    width: 2rem;
    height: 2rem;
    background: url('@/assets/icons/arrow_back.svg');
  }
}

.transition-router-enter-active,
.transition-router-leave-active {
  transition: opacity 0.5s ease;
}

.transition-router-enter-from,
.transition-router-leave-to {
  opacity: 0;
}
</style>
