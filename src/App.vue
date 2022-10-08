<template>
  <TheHeader />

  <RouterView v-slot="{ Component }">
    <Transition name="scale" mode="out-in">
      <KeepAlive :include="keepAliveComponents">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>

  <TheFooter />
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { isDark, useLocale } from '@/utilities'
import { watchOnce } from '@vueuse/core'
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
const TheHeader = defineAsyncComponent(() => import('@/components/the/TheHeader.vue'))
const TheFooter = defineAsyncComponent(() => import('@/components/the/TheFooter.vue'))

const getDataRoutes = ['/damage', '/magic', '/library']
const keepAliveComponents = ['DamageCalculatorPage', 'MagicCalculatorPage', 'LibraryPage']

const route = useRoute()
const lang = useLocale()

const store = useStore()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (query) => {
  isDark.value = query.matches
})

// Collect data about game from files when visit one of getDataRoutes array pages
watchOnce(
  () => route.path,
  (newPath) => {
    if (getDataRoutes.includes(newPath)) {
      store.loadData(lang.value)
    }
  }
)
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
