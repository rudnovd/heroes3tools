<template>
  <router-link v-if="showBackButton" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" alt="back" width="16" height="16" />
    {{ t('common.homePage') }}
  </router-link>

  <RouterView v-slot="{ Component }">
    <Transition name="router" mode="out-in" @enter="onEnter" @after-leave="afterLeave">
      <KeepAlive :include="keepAliveComponents">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>

  <BaseNotification v-if="needRefresh" :show="needRefresh" :buttons="notificationsButtons">
    {{ t('common.newContentIsAvailable') }}.
  </BaseNotification>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { watchOnce } from '@vueuse/core'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { isDark, useLocale } from './utilities'

const getDataRoutes = ['/damage', '/magic', '/creatures']
const keepAliveComponents = ['DamageCalculatorPage', 'MagicCalculatorPage', 'CreaturesLibraryPage']

export default defineComponent({
  name: 'App',
  components: {
    BaseNotification: defineAsyncComponent(() => import('@/components/base/BaseNotification.vue')),
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { t } = useI18n()
    const store = useStore()
    const lang = useLocale()

    const showBackButton = ref(false)

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

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (query) => {
      isDark.value = query.matches
    })

    const notificationsButtons = computed(() => [
      {
        text: t('common.updateApp'),
        onClick: () => {
          updateServiceWorker(true)
        },
        textColor: 'rgb(255, 255, 255)',
      },
      {
        text: t('common.dismiss'),
        textColor: 'rgb(255, 255, 255)',
      },
    ])

    // Show back button on first visit app
    watchOnce(router.currentRoute, () => {
      if (Object.keys(route.meta).length && !route.meta.hideBackButton) showBackButton.value = true
    })

    // Collect data about game from files when visit one of getDataRoutes array pages
    watchOnce(
      () => route.path,
      (newPath) => {
        if (!store.isDataLoaded && getDataRoutes.includes(newPath)) store.loadData(lang.value)
      },
    )

    const onEnter = () => {
      if (Object.keys(route.meta).length && !route.meta.hideBackButton) showBackButton.value = true
      else if (showBackButton.value) showBackButton.value = false
    }

    const afterLeave = () => {
      if (showBackButton.value && route.meta.hideBackButton) showBackButton.value = false
    }

    return {
      t,

      showBackButton,
      needRefresh,
      notificationsButtons,
      keepAliveComponents,

      onEnter,
      afterLeave,
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
  color: var(--color-link);
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

.router-enter-active,
.router-leave-active {
  transition: opacity 0.5s ease;
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
