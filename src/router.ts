import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, getAppLocale, setLocale } from './i18n'
import { useStore } from './store'
import { selectedLocale } from './utilities'

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    return new Promise((resolve) => {
      if (to.hash) {
        return document.querySelector(to.hash) ? resolve({ el: to.hash, behavior: 'smooth' }) : undefined
      }
      else if (savedPosition) {
        return resolve(savedPosition)
      }
      else {
        return resolve({ left: 0, top: 0 })
      }
    })
  },
})
router.beforeEach(async (to) => {
  if ('locale' in to.params && to.params.locale) {
    if (!AVAILABLE_LOCALES.includes(to.params.locale)) {
      return '/not-found'
    }
    if (getAppLocale() !== to.params.locale) {
      setLocale(to.params.locale)
      selectedLocale.value = to.params.locale
      useStore().loadData(to.params.locale)
    }
    if (to.params.locale === DEFAULT_LOCALE) {
      return to.path.replace(`/${to.params.locale}`, '')
    }
  }
})
if (import.meta.hot) {
  handleHotUpdate(router)
}
