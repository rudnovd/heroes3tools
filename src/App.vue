<template>
  <router-link v-if="route.path !== '/'" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" width="16" height="16" />
    Home page
  </router-link>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
useRegisterSW({
  immediate: true,
  onRegistered(r) {
    r &&
      setInterval(async () => {
        /* eslint-disable no-console */
        console.log('Checking for sw update')
        await r.update()
      }, 20000 /* 20s for testing purposes */)
  },
})

export default defineComponent({
  name: 'App',
  setup() {
    return {
      route: useRoute(),
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
