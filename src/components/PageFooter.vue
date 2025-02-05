<template>
  <footer>
    <router-link v-if="!about.hide" to="#about">
      {{ about.text || t('components.pageFooter.about') }}
    </router-link>

    <select :value="selectedLocale" name="select-locale" @change="updatePage">
      <option v-for="availableLocale in locales" :key="availableLocale.name" :value="availableLocale.name">
        {{ availableLocale.value }}
      </option>
    </select>

    <slot />
    <router-link to="send-error" class="send-error-link">
      {{ t('components.pageFooter.foundAnError') }}
    </router-link>
    <router-link to="#license">
      {{ t('components.pageFooter.licenseInformation') }}
    </router-link>
    <a href="https://github.com/rudnovd/heroes3tools" target="_blank" rel="noopener">
      🌟{{ t('components.pageFooter.sourceCode') }}
    </a>
    <a href="https://t.me/heroes3toolsbot" class="telegram-link" target="_blank" rel="noopener">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
      Telegram version
    </a>
    <span>{{ t('components.pageFooter.hotaVersion') }}: 1.7.2</span>
    <component
      :is="needRefresh ? 'button' : 'span'"
      :class="{ 'need-refresh': needRefresh }"
      @click="activateNewVersionNotification"
    >
      <template v-if="needRefresh">
        ❗
      </template>
      {{ t('components.pageFooter.appVersion') }}: {{ appVersion }}
    </component>

    <div class="theme-switch" title="Toggle dark mode">
      <input id="mode-input" type="checkbox" :value="isDark" @change="isDark = !isDark">
      <label for="mode-input">
        <span v-if="isDark" role="img" aria-label="Dark mode">🌒</span>
        <span v-else role="img" aria-label="Light mode">☀️</span>
      </label>
    </div>
  </footer>

  <RouterView v-slot="{ route: { hash, path } }">
    <BaseDialog
      v-if="path === initialPath && hash === '#about'"
      show
      size="small"
      @close="router.replace({ path: route.path })"
    >
      <template #content>
        <slot name="aboutModal" />
      </template>
    </BaseDialog>
  </RouterView>

  <RouterView v-slot="{ route: { hash, path } }">
    <BaseDialog v-if="path === initialPath && hash === '#license'" show @close="router.replace({ path: route.path })">
      <template #content>
        <p>
          {{ t('components.pageFooter.license') }}
        </p>
      </template>
    </BaseDialog>
  </RouterView>
</template>

<script setup lang="ts">
import type { AvailableLocale } from '@/constants'
import { isDark, isNewVersionNotificationDisabled, selectedLocale } from '@/utilities'
import { defineAsyncComponent, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    about?: { hide?: boolean, text?: string | null }
    border?: string
  }>(),
  {
    about: () => ({ hide: false, text: null }),
    border: '1px solid var(--color-border)',
  },
)

const BaseDialog = defineAsyncComponent(() => import('@/components/base/BaseDialog.vue'))

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const initialPath = route.path
const needRefresh = inject('needRefresh', ref(false))
const isNewVersionNotificationActive = inject('isNewVersionNotificationActive', ref(false))
function activateNewVersionNotification() {
  if (needRefresh.value) {
    isNewVersionNotificationDisabled.value = false
    isNewVersionNotificationActive.value = true
  }
}

const locales: ReadonlyArray<{ name: AvailableLocale, value: string }> = [
  { name: 'en', value: 'English' },
  { name: 'ru', value: 'Русский' },
]

async function updatePage(event: Event) {
  const locale = (event.target as HTMLInputElement).value as AvailableLocale
  selectedLocale.value = locale
  location.replace(location.origin)
}

const appVersion = import.meta.env.__APP_VERSION__
</script>

<style lang="scss">
@use '@/styles/mixins';

footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  min-width: 300px;
  padding: 4px 8px;
  font-size: 0.875rem;
  color: var(--color-link);
  border-top: v-bind(border);
  transition: border-top 0.2s linear;

  & > * {
    flex: 0 0 calc(50% - 8px);
  }

  & > *:nth-child(even) {
    justify-content: flex-end;
    text-align: right;
  }

  @include mixins.media-large {
    gap: 16px;

    & > * {
      flex: unset;
      text-align: unset;
    }

    .send-error-link {
      margin-left: auto;
    }
  }

  a,
  button,
  span,
  select {
    color: inherit;
    text-align: left;
  }

  select {
    padding: 0;
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .telegram-link {
    display: inline-flex;
    gap: 2px;
    align-items: center;
  }

  .need-refresh {
    color: red;

    &:hover {
      text-decoration: underline;
    }
  }
}

.theme-switch {
  & > input[type='checkbox'] {
    display: none;
    appearance: none;
  }

  label {
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
