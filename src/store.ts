import { createStore } from 'vuex'
import { CalculatorInstance } from '@/models/Calculator'

export default createStore({
  state: {
    calculators: [] as Array<CalculatorInstance>,
    activeIndex: 0,
  },
  actions: {
    rememberCalculators({ commit }, payload: { calculators: Array<CalculatorInstance> }) {
      commit('REMEMBER_CALCULATORS', { calculators: payload.calculators })
    },
  },
  mutations: {
    REMEMBER_CALCULATORS(state, payload: { calculators: Array<CalculatorInstance> }) {
      state.calculators = payload.calculators
    },
  },
  strict: import.meta.env.DEV,
})
