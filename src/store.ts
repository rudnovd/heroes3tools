import { createStore } from 'vuex'
import type { Battle } from './models/Battle'

export default createStore({
  state: {},
  actions: {
    rememberCalculators({ commit }, payload: { calculators: Array<Battle> }) {
      commit('REMEMBER_CALCULATORS', { calculators: payload.calculators })
    },
  },
  mutations: {},
  strict: import.meta.env.DEV,
})
