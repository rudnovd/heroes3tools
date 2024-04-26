<template>
  <header>
    <router-link v-show="router.currentRoute.value.path !== '/'" class="return-home" to="/">
      <img src="@/assets/icons/arrow_back.svg" alt="back" width="16" height="16" />
      {{ t('common.homePage') }}
    </router-link>
  </header>

  <RouterView v-slot="{ Component }">
    <Transition name="router" mode="out-in">
      <KeepAlive :include="keepAliveComponents">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>

  <BaseNotification
    v-if="isNewVersionNotificationActive && !isNewVersionNotificationDisabled"
    show
    :buttons="notificationsButtons"
  >
    {{ t('common.newVersionAvailable') }}
  </BaseNotification>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed, defineAsyncComponent, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { isDark, isNewVersionNotificationDisabled, selectedLocale } from '@/utilities'
import { watch } from 'vue'
import { ref } from 'vue'
import { INITIAL_LOCATION_LOCALE } from './constants'
import { whenever } from '@vueuse/core'
const BaseNotification = defineAsyncComponent(() => import('@/components/base/BaseNotification.vue'))

const keepAliveComponents = ['DamageCalculatorPage', 'MagicCalculatorPage', 'CreaturesLibraryPage']

const router = useRouter()
const { t } = useI18n()
const store = useStore()
const { updateServiceWorker, needRefresh } = useRegisterSW({ immediate: false })
provide('needRefresh', needRefresh)

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => (isDark.value = matches))

const isNewVersionNotificationActive = ref(false)
provide('isNewVersionNotificationActive', isNewVersionNotificationActive)
whenever(needRefresh, () => (isNewVersionNotificationActive.value = true), { immediate: true, once: true })
const notificationsButtons = computed(() => [
  {
    text: t('common.dismiss'),
    textColor: 'rgb(255, 255, 255)',
    onClick: () => {
      isNewVersionNotificationDisabled.value = true
    },
  },
  {
    text: t('common.update'),
    onClick: () => {
      updateServiceWorker(true)
    },
    textColor: 'rgb(255, 255, 255)',
  },
])

// Collect initial data about game
const stop = watch(router.currentRoute, ({ path }) => {
  if (!store.isDataLoaded && ['/damage', '/magic', '/creatures'].includes(path)) {
    store.loadData(selectedLocale.value ?? INITIAL_LOCATION_LOCALE)
    stop()
  }
})
</script>

<style lang="scss">
@import '@/styles/main';
@import '@/styles/fonts';
</style>

<style lang="scss" scoped>
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

  &::before {
    width: 2rem;
    height: 2rem;
    background: url('@/assets/icons/arrow_back.svg');
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

@include dark-scheme {
  .return-home {
    img {
      filter: invert(1);
    }
  }
}
</style>
