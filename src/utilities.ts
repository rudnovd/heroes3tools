import i18n, { getBrowserLanguage, loadLocaleMessages } from '@/i18n'
import { useDark, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
  onChanged: (isDark) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector('html')!.style.colorScheme = isDark ? 'dark' : 'light'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector('body')!.setAttribute('color-scheme', isDark ? 'dark' : 'light')
    const themeColor = document.querySelector('meta[name=theme-color]')
    if (themeColor) {
      themeColor.setAttribute('content', getComputedStyle(document.body).getPropertyValue('--color-bg'))
    }
  },
})

export const useLocale = () => {
  const selectedLocale = useLocalStorage<AvailableLocale>('locale', getBrowserLanguage())
  const locale = computed<AvailableLocale>({
    get() {
      return selectedLocale.value
    },
    async set(value) {
      selectedLocale.value = value
      const messages = await loadLocaleMessages(selectedLocale.value)
      i18n.global.setLocaleMessage(selectedLocale.value, messages.default)
      i18n.global.locale.value = selectedLocale.value
      document.querySelector('html')?.setAttribute('lang', selectedLocale.value)
    },
  })

  // load initial locale messages
  if (!Object.keys(i18n.global.getLocaleMessage(selectedLocale.value)).length) {
    locale.value = selectedLocale.value
  }

  return locale
}
