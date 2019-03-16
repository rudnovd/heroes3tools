import Vue from 'vue'

import Vuex from 'vuex'

import calculator from './modules/calculator'

import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    calculator,
    user
  },
  strict: true
})
