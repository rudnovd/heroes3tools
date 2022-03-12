<template>
  <router-link v-if="!route.meta.hideBackButton" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" alt="back" width="16" height="16" />
    {{ t('common.homePage') }}
  </router-link>
  <router-view />

  <BaseNotification v-if="needRefresh" :show="needRefresh" :buttons="notificationsButtons">
    {{ t('common.newContentIsAvailable') }}.
  </BaseNotification>
</template>

<script lang="ts">
import { selectedLanguage, setLanguage } from '@/i18n'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    BaseNotification: defineAsyncComponent(() => import('@/components/base/BaseNotification.vue')),
  },
  setup() {
    const route = useRoute()
    const { t } = useI18n()

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

    // Get selected language from localstorage and change i18n language
    if (selectedLanguage.value !== 'en') setLanguage(selectedLanguage.value)

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

    return {
      t,
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
