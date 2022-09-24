import { createI18n } from 'vue-i18n'

export type AvailableLocale = 'en' | 'ru'
export const availableLocales: Readonly<Array<AvailableLocale>> = ['en', 'ru']

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
})

export async function loadLocaleMessages(locale: string) {
  return await import(`./locales/${locale}.json`)
}

export function getBrowserLanguage() {
  if (!navigator.language) return 'en'

  // get first language code (e.g. get 'en' from en-US)
  const navigatorLanguage = navigator.language.trim().split(/-|_/)[0] as AvailableLocale
  if (availableLocales.includes(navigatorLanguage)) {
    return navigatorLanguage
  } else {
    return 'en'
  }
}

export default i18n
