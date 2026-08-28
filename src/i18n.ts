import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export const DEFAULT_LOCALE: Locale = 'en'
export const AVAILABLE_LOCALES: ReadonlyArray<Locale> = ['en', 'ru']
export function getAppLocale(): Locale {
  const locale = localStorage.getItem('locale')
  if (locale) {
    return AVAILABLE_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  }
  const { language } = new Intl.Locale(navigator.language)
  return AVAILABLE_LOCALES.includes(language) ? language : DEFAULT_LOCALE
}
export const i18n = createI18n({
  legacy: false,
  locale: getAppLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  availableLocales: AVAILABLE_LOCALES,
  pluralRules: {
    ru: pluralizationRu,
  },
})

export async function loadLocaleMessages(locale: string) {
  return await import(`./locales/${locale}.json`)
}
export async function setLocale(locale: Locale) {
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages.default)
  i18n.global.locale.value = locale
  document.documentElement.setAttribute('lang', locale)
}
function pluralizationRu(count: number) {
  if (count % 10 === 1 && count % 100 !== 11)
    return 0
  else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20))
    return 1
  return 2
}
