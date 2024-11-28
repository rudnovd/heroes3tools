import { createI18n } from 'vue-i18n'
import { AVAILABLE_LOCALES, type AvailableLocale, DEFAULT_LOCALE, INITIAL_LOCATION_LOCALE } from './constants'
import { selectedLocale } from './utilities'

const i18n = createI18n({
  legacy: false,
  locale: getAppLocale(),
  availableLocales: AVAILABLE_LOCALES,
})

export async function loadLocaleMessages(locale: string) {
  return await import(`./locales/${locale}.json`)
}

export function getBrowserLanguage(): AvailableLocale {
  // get first language code (e.g. get 'en' from en-US)
  const browserLanguage = navigator.language.trim().split(/-|_/)[0]
  if (AVAILABLE_LOCALES.includes(browserLanguage as AvailableLocale)) {
    return browserLanguage as AvailableLocale
  }
  else {
    return DEFAULT_LOCALE
  }
}

export function getAppLocale(): AvailableLocale {
  if (INITIAL_LOCATION_LOCALE !== DEFAULT_LOCALE)
    return INITIAL_LOCATION_LOCALE
  else if (selectedLocale.value)
    return selectedLocale.value
  else return getBrowserLanguage()
}

export async function setLocale(locale: AvailableLocale) {
  selectedLocale.value = locale
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages.default)
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

export default i18n
