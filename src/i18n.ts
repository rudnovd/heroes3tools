import { createI18n } from 'vue-i18n'
import { selectedLocale } from './utilities'

export type AvailableLocale = 'en' | 'ru'
export const DEFAULT_LOCALE: AvailableLocale = 'en'
export const AVAILABLE_LOCALES: Readonly<Array<AvailableLocale>> = ['en', 'ru']

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  availableLocales: AVAILABLE_LOCALES,
})

export async function loadLocaleMessages(locale: string) {
  return await import(`./locales/${locale}.json`)
}

export function getBrowserLanguage(): AvailableLocale {
  if (!navigator.language) return DEFAULT_LOCALE

  // get first language code (e.g. get 'en' from en-US)
  const browserLanguage = navigator.language.trim().split(/-|_/)[0]
  if (AVAILABLE_LOCALES.some((language) => language === browserLanguage)) {
    return browserLanguage as AvailableLocale
  } else {
    return DEFAULT_LOCALE
  }
}

export async function setLocale(locale: AvailableLocale) {
  selectedLocale.value = locale
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages.default)
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

export default i18n
