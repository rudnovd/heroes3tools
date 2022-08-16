import i18n from '@/i18n'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomePage.vue'),
      meta: {
        title: 'pages.home',
        hideBackButton: true,
      },
    },
    {
      path: '/damage',
      component: () => import('@/views/DamageCalculatorPage.vue'),
      meta: {
        title: 'pages.damageCalculator',
      },
    },
    {
      path: '/magic',
      component: () => import('@/views/MagicCalculatorPage.vue'),
      meta: {
        title: 'pages.magicCalculator',
      },
    },
    {
      path: '/creatures',
      component: () => import('@/views/CreaturesLibraryPage.vue'),
      meta: {
        title: 'pages.creaturesLibrary',
      },
    },
    {
      path: '/send-error',
      component: () => import('@/views/SendErrorPage.vue'),
      meta: {
        title: 'pages.sendError',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
      meta: {
        title: 'pages.pageNotFound',
        hideBackButton: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
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

router.beforeEach((to, from, next) => {
  if (to.meta.disabled) next({ path: '/' })

  next()
})

router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title as string)
})

export default router
