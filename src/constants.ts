export type AvailableLocale = 'en' | 'ru'

export const DEFAULT_LOCALE: AvailableLocale = 'en'
export const AVAILABLE_LOCALES: Readonly<Array<AvailableLocale>> = ['en', 'ru']
export const INITIAL_LOCATION_LOCALE
  = AVAILABLE_LOCALES.find(locale => locale === location.pathname.split('/').at(1)) ?? 'en'
