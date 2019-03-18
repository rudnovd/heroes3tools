import Vue from 'vue'

import App from '@/App.vue'

import store from '@/store'

import i18n from './i18n'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import '@/components/globals'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
