import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { DEFAULT_LOCALE, i18n } from './i18n'

const BASE_PATH = i18n.global.locale.value !== DEFAULT_LOCALE ? i18n.global.locale.value : '/'

export const router = createRouter({
  history: createWebHistory(BASE_PATH),
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

if (import.meta.hot) {
  handleHotUpdate(router)
}
