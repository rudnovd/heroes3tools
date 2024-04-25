import { createI18n } from 'vue-i18n'
import { selectedLocale } from './utilities'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, INITIAL_LOCATION_LOCALE, type AvailableLocale } from './constants'

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
  if (AVAILABLE_LOCALES.some((language) => language === browserLanguage)) {
    return browserLanguage as AvailableLocale
  } else {
    return DEFAULT_LOCALE
  }
}

export function getAppLocale(): AvailableLocale {
  if (INITIAL_LOCATION_LOCALE !== DEFAULT_LOCALE) return INITIAL_LOCATION_LOCALE
  else if (selectedLocale.value) return selectedLocale.value
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
