import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@/i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './constants'
import i18n from './i18n'
const BASE_PATH = i18n.global.locale.value !== DEFAULT_LOCALE ? i18n.global.locale.value : '/'

const router = createRouter({
  history: createWebHistory(BASE_PATH),
  routes: [
    {
      path: '/',
      children: [
        { path: '', component: () => import('@/views/HomePage.vue') },
        { path: 'damage', component: () => import('@/views/DamageCalculatorPage.vue') },
        { path: 'magic', component: () => import('@/views/MagicCalculatorPage.vue') },
        { path: 'creatures', component: () => import('@/views/CreaturesLibraryPage.vue') },
        { path: 'send-error', component: () => import('@/views/SendErrorPage.vue') },
        {
          path: `:locale(${AVAILABLE_LOCALES.join('|')})/:path(.*)`,
          redirect: (to) => to.path.replace(`/${to.params.locale}`, ''),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return resolve(savedPosition)
      } else if (to.hash) {
        return document.querySelector(to.hash) ? resolve({ el: to.hash }) : undefined
      } else {
        return resolve({ left: 0, top: 0 })
      }
    })
  },
})

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router
