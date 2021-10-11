import i18n from '@/i18n'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/DamageCalculatorPage.vue'),
      meta: {
        title: i18n.global.t('pages.damageCalculator'),
      },
    },
    // {
    //   path: '/',
    //   component: () => import('@/views/HomePage.vue'),
    //   meta: {
    //     title: i18n.global.t('pages.home'),
    //   },
    // },
    // {
    //   path: '/damage',
    //   component: () => import('@/views/DamageCalculatorPage.vue'),
    //   meta: {
    //     title: i18n.global.t('pages.damageCalculator'),
    //   },
    // },
    // {
    //   path: '/creatures',
    //   component: () => import('@/views/CreaturesLibraryPage.vue'),
    //   meta: {
    //     title: i18n.global.t('pages.creaturesLibrary'),
    //     disabled: true,
    //   },
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/ErrorPage.vue'),
      meta: {
        title: i18n.global.t('pages.pageNotFound'),
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) return resolve(savedPosition)
      else if (to.hash) return resolve({ el: to.hash })
      else return resolve({ left: 0, top: 0 })
    })
  },
})

router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href

router.beforeEach((to, from, next) => {
  if (to.meta.disabled) next({ path: '/' })

  next()
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title as string
})

export default router
