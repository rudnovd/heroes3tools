import type { ReactiveHead } from '@unhead/vue'
import type { Locale } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import { AVAILABLE_LOCALES, getAppLocale } from './i18n'

export const selectedLocale = useLocalStorage<Locale | null>('locale', getAppLocale(), {
  listenToStorageChanges: false,
})
export const isNewVersionNotificationDisabled = useLocalStorage('isNewVersionNotificationDisabled', false)

export interface HeadData {
  title: string
  description: string
  image: string
  url: string
}
export function getHead({ title, description, image, url }: HeadData): ReactiveHead {
  const appLocale = getAppLocale()
  return {
    title,
    titleTemplate: title === 'Heroes 3 tools' ? '%s' : '%s | Heroes 3 tools',
    link: [
      { rel: 'canonical', href: url },
    ],
    meta: [
      { property: 'og:title', content: title },
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: title },
      { property: 'og:image:type', content: 'webp' },
      { property: 'og:image:width', content: '1280' },
      { property: 'og:image:height', content: '640' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: appLocale },
      ...AVAILABLE_LOCALES
        .filter(locale => locale !== appLocale)
        .map(locale => ({ property: 'og:locale:alternate', content: locale })),
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  }
}
