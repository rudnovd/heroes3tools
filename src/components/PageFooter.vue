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

    <slot></slot>
    <router-link to="send-error" class="send-error-link">
      {{ t('components.pageFooter.foundAnError') }}
    </router-link>
    <router-link to="#license">
      {{ t('components.pageFooter.licenseInformation') }}
    </router-link>
    <a href="https://github.com/rudnovd/heroes3tools" target="_blank" rel="noopener">
      🌟{{ t('components.pageFooter.sourceCode') }}
    </a>
    <span>{{ t('components.pageFooter.hotaVersion') }}: 1.7.0</span>
    <component :is="needRefresh ? 'button' : 'span'" :class="{ needRefresh }" @click="activateNewVersionNotification">
      <template v-if="needRefresh">❗</template>
      {{ t('components.pageFooter.appVersion') }}: {{ appVersion }}
    </component>

    <div class="theme-switch" title="Toggle dark mode">
      <input id="mode-input" type="checkbox" :value="isDark" @change="isDark = !isDark" />
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
        <slot name="aboutModal"></slot>
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
import { type AvailableLocale } from '@/i18n'
import { isDark, isNewVersionNotificationDisabled, selectedLocale } from '@/utilities'
import { ref } from 'vue'
import { defineAsyncComponent, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
const BaseDialog = defineAsyncComponent(() => import('@/components/base/BaseDialog.vue'))

withDefaults(
  defineProps<{
    about?: { hide?: boolean; text?: string | null }
    border?: string
  }>(),
  {
    about: () => ({ hide: false, text: null }),
    border: '1px solid var(--color-border)',
  },
)

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

const locales: ReadonlyArray<{ name: AvailableLocale; value: string }> = [
  { name: 'en', value: 'English' },
  { name: 'ru', value: 'Русский' },
]

async function updatePage(event: Event) {
  const locale = (event.target as HTMLInputElement).value as AvailableLocale
  selectedLocale.value = locale
  router.go(0)
}

const appVersion = import.meta.env.__APP_VERSION__
</script>

<style lang="scss">
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
    text-align: right;
  }

  @include media-large {
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
