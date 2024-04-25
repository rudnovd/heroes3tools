import type { UseHeadInput } from '@unhead/vue'
import { useDark, useLocalStorage } from '@vueuse/core'
import { type AvailableLocale } from './constants'

export const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
  onChanged: (isDark) => {
    document.querySelector('html')!.style.colorScheme = isDark ? 'dark' : 'light'
    document.querySelector('body')!.setAttribute('color-scheme', isDark ? 'dark' : 'light')
  },
})

export const selectedLocale = useLocalStorage<AvailableLocale | null>('locale', null, {
  listenToStorageChanges: false,
})

export const isNewVersionNotificationDisabled = useLocalStorage('isNewVersionNotificationDisabled', false)

const metaSharedProperties = [
  { name: 'creator', content: 'https://github.com/rudnovd' },
  { name: 'format-detection', content: 'telephone=no' },
  { property: 'og:site:name', content: 'Heroes 3 tools' },
  { property: 'og:type', content: 'website' },
] as const

export const metaEmptyProperties: UseHeadInput = {
  title: 'Heroes 3 tools',
  meta: [
    ...metaSharedProperties,
    { name: 'application-name', content: 'Heroes 3 tools' },
    {
      name: 'description',
      content:
        'Tools to make playing Heroes of Might and Magic III: Horn of The Abyss easier: damage calculator, magic calculator, creature library',
    },
    {
      property: 'og:description',
      content:
        'Tools to make playing Heroes of Might and Magic III: Horn of The Abyss easier: damage calculator, magic calculator, creature library',
    },
    { property: 'og:url', content: 'https://heroes3tools.netlify.app' },
    {
      property: 'og:image',
      content: 'https://github.com/rudnovd/heroes3tools/blob/master/docs/calculator-image.png?raw=true',
    },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:locale:alternate', content: 'ru_RU' },
    { property: 'og:title', content: 'Heroes 3 tools' },
    {
      name: 'twitter:description',
      content:
        'Tools to make playing Heroes of Might and Magic III: Horn of The Abyss easier: damage calculator, magic calculator, creature library',
    },
    {
      name: 'twitter:image',
      content: 'https://github.com/rudnovd/heroes3tools/blob/master/docs/calculator-image.png?raw=true',
    },
    { name: 'twitter:title', content: 'Heroes 3 tools' },
  ],
} as const

export function getHead({
  title,
  description,
  image,
  locale,
  url,
}: {
  title: string
  description: string
  image: string
  locale: string
  url: string
}): UseHeadInput {
  return {
    ...metaSharedProperties,
    title,
    titleTemplate: '%s | Heroes 3 tools',
    meta: [
      { name: 'application-name', content: title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: locale },
      { property: 'og:locale:alternate', content: locale === 'en_US' ? 'ru_RU' : 'en_US' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  }
}
