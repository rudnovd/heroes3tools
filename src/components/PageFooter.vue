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
      {{ t('components.pageFooter.sourceCode') }}
    </a>

    <span>{{ t('components.pageFooter.appVersion') }}: {{ appVersion }}</span>

    <div class="theme-switch">
      <input id="mode-input" type="checkbox" :value="isDark" @change="isDark = !isDark" />
      <label for="mode-input">
        <span v-if="isDark" role="img" aria-label="Dark mode">🌒</span>
        <span v-else role="img" aria-label="Light mode">☀️</span>
      </label>
    </div>
  </footer>

  <RouterView v-slot="{ route: { hash, path } }">
    <BaseDialog v-if="path === staticCurrentRoute && hash === '#about'" show size="small" @close="router.back">
      <template #content>
        <slot name="aboutModal"></slot>
      </template>
    </BaseDialog>
  </RouterView>

  <RouterView v-slot="{ route: { hash, path } }">
    <BaseDialog v-if="path === staticCurrentRoute && hash === '#license'" show @close="router.back">
      <template #content>
        <p>{{ t('components.pageFooter.license.1') }}</p>
        <i18n-t keypath="components.pageFooter.license.2" tag="p">
          <template #url>
            <a href="https://github.com/rudnovd" target="_blank">https://github.com/rudnovd</a>
          </template>
        </i18n-t>
        <p>{{ t('components.pageFooter.license.3') }}</p>
        <p>{{ t('components.pageFooter.license.4') }}</p>
        <p>{{ t('components.pageFooter.license.5') }}</p>
      </template>
    </BaseDialog>
  </RouterView>
</template>

<script setup lang="ts">
import { type AvailableLocale } from '@/i18n'
import { isDark, selectedLocale } from '@/utilities'
import { isDark, useLocale } from '@/utilities'
import { defineAsyncComponent, watch } from 'vue'
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
const route = useRoute()
const router = useRouter()
const store = useStore()
const locale = useLocale()

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
