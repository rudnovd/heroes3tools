<template>
  <router-link v-if="route.path !== '/'" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" width="16" height="16" />
    Home page
  </router-link>
  <router-view />
</template>

<script lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from './store'
const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegistered(registration) {
    if (import.meta.env.DEV && registration) {
      setInterval(async () => {
        /* eslint-disable no-console */
        console.log('Checking for sw update')
        await registration.update()
      }, 20000 /* 20s for testing purposes */)
    } else if (import.meta.env.PROD && registration) {
      /* eslint-disable no-console */
      console.log('Service worker registered')
    }
  },
})

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const route = useRoute()

    watch(needRefresh, () => {
      updateServiceWorker()
      /* eslint-disable no-console */
      console.log('Service work updated')
    })

    store.initData()

    return {
      route,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>

<style lang="scss" scoped>
.return-home {
  padding-left: 5px;
  font-size: 0.8rem;
  opacity: 0.3;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: rgb(0, 0, 0);
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }

  &::before {
    background: url('@/assets/icons/arrow_back.svg');
    width: 2rem;
    height: 2rem;
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
