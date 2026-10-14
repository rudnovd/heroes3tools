<template>
  <header class="navigation-header">
    <nav>
      <router-link v-show="router.currentRoute.value.path !== '/'" class="return-home" to="/">
        <IconArrowLeft />
        {{ $t('common.homePage') }}
      </router-link>
    </nav>
  </header>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="router" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { selectedLocale } from '@/utilities'
import { getAppLocale } from './i18n'

const IconArrowLeft = defineAsyncComponent(() => import('~icons/mdi/arrow-left'))

const router = useRouter()
const store = useStore()
// Collect initial data about game
const stop = watch(router.currentRoute, ({ path }) => {
  const isPreloadRoute = path.includes('damage') || path.includes('magic') || path.includes('creatures')
  if (!store.isDataLoaded && isPreloadRoute) {
    store.loadData(selectedLocale.value ?? getAppLocale())
    stop()
  }
})
</script>

<style>
@import url('@/assets/styles/root.css');
@import url('@/assets/styles/fonts.css');
.navigation-header {
  header {
    height: 1.5rem;
    padding-left: 5px;
    margin-bottom: 0.5rem;
  }
  .return-home {
    display: inline-flex;
    align-items: center;
    font-size: 1rem;
    color: var(--color-link);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.15s;
    &:hover {
      opacity: 1;
    }
  }
}
.router-enter-active,
.router-leave-active {
  transition: opacity 0.25s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
}
.router-link-enter-from,
.router-link-leave-to {
  display: none;
}
</style>
