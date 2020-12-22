import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  availableLocales: ['en', 'ru'],
})

export function setI18nLanguage(locale: string): void {
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

export async function loadLocaleMessages(locale: string): Promise<void> {
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
}

export default i18n
