import Vue from 'vue'

import App from '@/App.vue'

import store from '@/store'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.min.css'

import vSelect from 'vue-select'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('v-select', vSelect)

library.add(faQuestionCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
