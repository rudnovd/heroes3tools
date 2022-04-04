<template>
  <div v-if="route.path === '/damage' && route.query.from && showAnnounce" class="announce-header">
    <div class="announce-text">
      <i18n-t keypath="common.newCalculatorAnnounce.announce.text" tag="span">
        <template #whatsNew>
          <router-link to="#whats-new">{{ t('common.newCalculatorAnnounce.announce.whatsNew') }}</router-link>
        </template>
        <template #here>
          <a href="https://old.heroes3.tools">{{ t('common.newCalculatorAnnounce.announce.here') }}</a>
        </template>
      </i18n-t>
    </div>
    <CloseButton @click="showAnnounce = false" />
  </div>

  <router-link v-if="!route.meta.hideBackButton" class="return-home" to="/">
    <img src="@/assets/icons/arrow_back.svg" alt="back" width="16" height="16" />
    {{ t('common.homePage') }}
  </router-link>
  <router-view />

  <BaseNotification v-if="needRefresh" :show="needRefresh" :buttons="notificationsButtons">
    {{ t('common.newContentIsAvailable') }}.
  </BaseNotification>

  <BaseDialog
    v-if="route.hash === '#whats-new'"
    :show="route.hash === '#whats-new'"
    @close="router.replace(route.path)"
  >
    <template #content>
      <div class="whats-new-modal-content">
        <div class="content-step">
          <template v-if="whatsNewStep === 1">
            <span>
              <strong>{{ t('common.newCalculatorAnnounce.modal.steps.1.title') }}</strong>
              {{ t('common.newCalculatorAnnounce.modal.steps.1.text') }}
            </span>
            <img
              src="/images/windows/damage-calculator-whats-new/1-damage-calculator-tabs.webp"
              alt="damage-calculator-tabs"
              :width="720"
            />
          </template>

          <template v-if="whatsNewStep === 2">
            <span>
              <strong>{{ t('common.newCalculatorAnnounce.modal.steps.2.title') }}</strong>
              {{ t('common.newCalculatorAnnounce.modal.steps.2.text') }}
            </span>
            <img
              src="/images/windows/damage-calculator-whats-new/2-install-app.webp"
              :height="252"
              :width="389"
              alt="install-app"
            />
          </template>

          <template v-if="whatsNewStep === 3">
            <p>
              <strong>{{ t('common.newCalculatorAnnounce.modal.steps.3.title') }}</strong>
              {{ t('common.newCalculatorAnnounce.modal.steps.3.text') }}
            </p>
            <p>
              <i18n-t keypath="common.newCalculatorAnnounce.modal.steps.3.oldVersionText" tag="span">
                <template #here>
                  <a href="https://old.heroes3.tools">{{ t('common.newCalculatorAnnounce.announce.here') }}</a>
                </template>
              </i18n-t>
            </p>

            <p>
              <BaseButton width="250px" @click="router.replace(route.path)">
                {{ t('common.newCalculatorAnnounce.modal.steps.3.startCalculating') }}
              </BaseButton>
            </p>
          </template>
        </div>

        <div class="modal-buttons">
          <BaseButton v-if="whatsNewStep > 1" color="defender" @click="whatsNewStep--">
            {{ t('common.newCalculatorAnnounce.modal.previous') }}
          </BaseButton>
          <BaseButton v-if="whatsNewStep < 3" @click="whatsNewStep++">
            {{ t('common.newCalculatorAnnounce.modal.next') }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { selectedLanguage, setLanguage } from '@/i18n'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    BaseNotification: defineAsyncComponent(() => import('@/components/base/BaseNotification.vue')),
    CloseButton: defineAsyncComponent(() => import('@/components/buttons/CloseButton.vue')),
    BaseDialog: defineAsyncComponent(() => import('@/components/base/BaseDialog.vue')),
    BaseButton: defineAsyncComponent(() => import('@/components/base/BaseButton.vue')),
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { t } = useI18n()

    const showAnnounce = ref(true)
    const whatsNewStep = ref(1)

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
      router,
      route,

      needRefresh,
      notificationsButtons,
      showAnnounce,
      whatsNewStep,
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

.announce-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: $color-attacker;

  .announce-text {
    display: flex;
    justify-content: center;
  }

  & > button {
    width: 12px;
    height: 12px;
  }
}

.whats-new-modal-content {
  .content-step {
    display: grid;
    gap: 16px;
    margin-bottom: 16px;
  }
  .modal-buttons {
    display: grid;
    grid-auto-columns: 100px;
    grid-auto-flow: column;
    gap: 8px;
    justify-content: center;
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
