export default {
  getUnitsImages ({ commit }) {
    commit('GET_UNITS_IMAGES')
  },
  getHeroesImages ({ commit }) {
    commit('GET_HEROES_IMAGES')
  },
  getHeroes ({ commit }) {
    commit('GET_HEROES')
  },
  getUnits ({ commit }) {
    commit('GET_UNITS')
  },

  setHero ({ commit }, { side, hero }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_HERO', hero)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_HERO', hero)
    }

    commit('CALCULATE_START')
  },

  setHeroLevel ({ commit }, { side, level }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_HERO_LEVEL', level)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_HERO_LEVEL', level)
    }

    commit('CALCULATE_START')
  },
  setHeroAttack ({ commit }, { side, attack }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_HERO_ATTACK', attack)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_HERO_ATTACK', attack)
    }

    commit('CALCULATE_START')
  },
  setHeroDefense ({ commit }, { side, defense }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_HERO_DEFENSE', defense)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_HERO_DEFENSE', defense)
    }

    commit('CALCULATE_START')
  },

  setHeroSkill ({ commit }, { side, skill, level }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_HERO_SKILL', { skill, level })
    } else if (side === 'defender') {
      commit('SET_DEFENDER_HERO_SKILL', { skill, level })
    }

    commit('CALCULATE_START')
  },

  setUnitEffect ({ commit }, { side, effects }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_UNIT_EFFECT', effects)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_UNIT_EFFECT', effects)
    }

    commit('CALCULATE_START')
  },

  setUnit ({ commit }, { side, unit }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_UNIT', unit)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_UNIT', unit)
    }

    commit('CALCULATE_START')
  },

  setUnitsCount ({ commit }, { side, count }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_UNITS_COUNT', count)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_UNITS_COUNT', count)
    }

    commit('CALCULATE_START')
  },

  setResultDamage ({ commit }, { side, unit }) {
    if (side === 'attacker') {
      commit('SET_ATTACKER_UNIT_RESULT_DAMAGE', unit)
    } else if (side === 'defender') {
      commit('SET_DEFENDER_UNIT_RESULT_DAMAGE', unit)
    }
  },

  startCalculate ({ commit }) {
    commit('CALCULATE_START')
  },

  endCalculate ({ commit }) {
    commit('CALCULATE_END')
  },

  swapSides ({ commit }) {
    commit('SWAP_SIDES')
  }
}
