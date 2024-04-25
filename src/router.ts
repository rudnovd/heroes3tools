import { createRouter, createWebHistory } from 'vue-router'
import { getHead } from './utilities'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './constants'
import i18n from './i18n'

const BASE_PATH = i18n.global.locale.value !== DEFAULT_LOCALE ? i18n.global.locale.value : '/'
const PAGES_WITH_HEADERS = ['home', 'damage-calculator', 'magic-calculator', 'creatures-library']

const router = createRouter({
  history: createWebHistory(BASE_PATH),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'home',
          props: true,
          component: () => import('@/views/HomePage.vue'),
        },
        {
          path: 'damage',
          name: 'damage-calculator',
          props: true,
          component: () => import('@/views/DamageCalculatorPage.vue'),
        },
        {
          path: 'magic',
          name: 'magic-calculator',
          props: true,
          component: () => import('@/views/MagicCalculatorPage.vue'),
        },
        {
          path: 'creatures',
          props: true,
          name: 'creatures-library',
          component: () => import('@/views/CreaturesLibraryPage.vue'),
        },
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
      if (to.hash) {
        return document.querySelector(to.hash) ? resolve({ el: to.hash, behavior: 'smooth' }) : undefined
      } else if (savedPosition) {
        return resolve(savedPosition)
      } else {
        return resolve({ left: 0, top: 0 })
      }
    })
  },
})

router.beforeEach(async (to, _from, next) => {
  const page = to.name?.toString()
  if (!page || !PAGES_WITH_HEADERS.includes(page)) return next()
  const json = await import(`./locales/head/pages/${page}/${i18n.global.locale.value}.json`)
  to.params.head = JSON.stringify(getHead(json.default))
  next()
})

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router
