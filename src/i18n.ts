import en from '@/locales/en.json'
import { useLocalStorage } from '@vueuse/core'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { useStore } from './store'

export const availableLocales = ['en', 'ru']
export const selectedLanguage = useLocalStorage('language', getBrowserLanguage())

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  availableLocales,
  messages: {
    en,
  },
})

export async function setLanguage(locale: string) {
  const store = useStore()
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale
  selectedLanguage.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
  store.loadData(locale)
}

export async function loadLocaleMessages(locale: string) {
  const messages = await import(`./locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

function getBrowserLanguage() {
  if (!navigator.language) return 'en'
  const navigatorLanguage = navigator.language.trim().split(/-|_/)[0]
  if (availableLocales.indexOf(navigatorLanguage) > -1) return navigatorLanguage
  else return 'en'
}

export default i18n
