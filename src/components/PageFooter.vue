<template>
  <footer class="page-footer">
    <ul class="page-footer__links-list">
      <li>
        <ExternalLink
          :href="selectedLocale === 'en' ? 'https://forms.gle/8Vy2Ssx42zhjvQJd9' : 'https://forms.gle/1sy4MzqqgHewsDUb9'"
          class="send-error-link"
        >
          <IconBug />
          {{ $t('components.pageFooter.foundAnError') }}
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://t.me/heroes3tools?direct">
          <IconFeedback />
          {{ $t('components.pageFooter.feedback') }}
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://github.com/rudnovd/heroes3tools/blob/master/LICENSE.md">
          <IconLicense />
          {{ $t('components.pageFooter.license') }}
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://github.com/rudnovd/heroes3tools">
          <IconGithub />
          {{ $t('components.pageFooter.sourceCode') }}
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://github.com/rudnovd/heroes3tools/releases/latest">
          <IconDesktopWindows />
          {{ $t('components.pageFooter.downloadOfflineVersion') }}
        </ExternalLink>
      </li>
      <li>
        <ExternalLink :href="hotaChangelogLink">
          {{ $t('components.pageFooter.hotaVersion') }}: 1.8.1
        </ExternalLink>
      </li>
      <li>
        <ExternalLink v-if="VITE_APP_VERSION" href="https://github.com/rudnovd/heroes3tools/blob/master/CHANGELOG.md">
          {{ appVersion }}
        </ExternalLink>
      </li>
    </ul>
    <div>
      <label for="language">{{ $t('components.pageFooter.language') }}:</label>
      <select id="language" :value="selectedLocale" name="select-locale" @change="changeLocale">
        <option v-for="availableLocale in locales" :key="availableLocale.name" :value="availableLocale.name">
          {{ availableLocale.value }}
        </option>
      </select>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Locale } from 'vue-i18n'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconBug from '~icons/mdi/bug'
import IconDesktopWindows from '~icons/mdi/desktop-windows'
import IconFeedback from '~icons/mdi/feedback'
import IconGithub from '~icons/mdi/github'
import IconLicense from '~icons/mdi/license'
import { setLocale } from '@/i18n'
import { useStore } from '@/store'
import { selectedLocale } from '@/utilities'
import ExternalLink from './ExternalLink.vue'

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

const { t } = useI18n()
const locales: ReadonlyArray<{ name: Locale, value: string }> = [
  { name: 'en', value: 'English' },
  { name: 'ru', value: 'Русский' },
]
const store = useStore()
async function changeLocale(event: Event) {
  const locale = (event.target as HTMLInputElement).value as Locale
  selectedLocale.value = locale
  setLocale(locale)
  store.loadData(locale)
}
const { VITE_APP_VERSION } = import.meta.env
const appVersion = computed(() => `${t('components.pageFooter.appVersion')}: ${VITE_APP_VERSION}`)
const hotaChangelogLink = `https://download.h3hota.com/upd/changelogs/${selectedLocale.value === 'ru' ? 'rus' : 'eng'}.txt`
</script>

<style>
.page-footer {
  --border: v-bind(border);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  min-width: 300px;
  padding: 4px 8px;
  font-size: 0.875rem;
  color: var(--color-link);
  border-top: var(--border);
  transition: border-top 0.2s linear;
  .page-footer__links-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    a,
    button {
      display: flex;
      gap: 2px;
      align-items: center;
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  select {
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}
</style>
