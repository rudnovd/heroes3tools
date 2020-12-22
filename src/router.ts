import i18n from '@/i18n'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: 'Home' */ '@/views/Home.vue'),
      meta: {
        title: i18n.global.t('pages.Home'),
      },
    },
    {
      path: '/damage',
      component: () => import(/* webpackChunkName: 'DamageCalculator' */ '@/views/DamageCalculator.vue'),
      meta: {
        title: i18n.global.t('pages.DamageCalculator'),
      },
    },
    {
      path: '/creatures',
      component: () => import(/* webpackChunkName: 'CreaturesLibrary' */ '@/views/CreaturesLibrary.vue'),
      meta: {
        title: i18n.global.t('pages.CreaturesLibrary'),
        disabled: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error.vue'),
      meta: {
        title: i18n.global.t('pages.Error'),
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
  if (to.meta.title) document.title = to.meta.title
})

export default router
