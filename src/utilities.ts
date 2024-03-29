import i18n, { getBrowserLanguage, loadLocaleMessages } from '@/i18n'
import { useDark, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

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

export const useLocale = () => {
  const selectedLocale = useLocalStorage('locale', getBrowserLanguage())
  const locale = computed({
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
