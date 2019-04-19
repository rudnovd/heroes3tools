import Vue from 'vue'

import App from '@/App.vue'

import store from '@/store'

import i18n from './i18n'

import BootstrapVue from 'bootstrap-vue'

import * as Sentry from '@sentry/browser'

import * as Integrations from '@sentry/integrations'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import '@/components/globals'

Vue.config.productionTip = true

Vue.use(BootstrapVue)

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

if (process.env.VUE_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true
      })
    ]
  })
}
