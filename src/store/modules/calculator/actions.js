export default {
  getUnitsImages ({ commit }) {
    commit('GET_UNITS_IMAGES')
  },
  getHeroes ({ commit }) {
    commit('GET_HEROES')
  },

  setHero ({ commit }, { side, hero }) {
    if (side === 'attacker') {
      commit('CLEAR_ATTACKER_HERO')
      commit('SET_ATTACKER_HERO', hero)
    } else if (side === 'defender') {
      commit('CLEAR_DEFENDER_HERO')
      commit('SET_DEFENDER_HERO', hero)
    }
  },

  setHeroLevel ({ commit }, { side, level }) {
    if (side === 'attacker') commit('SET_ATTACKER_HERO_LEVEL', level)
    else if (side === 'defender') commit('SET_DEFENDER_HERO_LEVEL', level)
  },
  setHeroAttack ({ commit }, { side, attack }) {
    if (side === 'attacker') commit('SET_ATTACKER_HERO_ATTACK', attack)
    else if (side === 'defender') commit('SET_DEFENDER_HERO_ATTACK', attack)
  },
  setHeroDefense ({ commit }, { side, defense }) {
    if (side === 'attacker') commit('SET_ATTACKER_HERO_DEFENSE', defense)
    else if (side === 'defender') commit('SET_DEFENDER_HERO_DEFENSE', defense)
  },

  setHeroSkill ({ commit }, { side, skill, level }) {
    if (side === 'attacker') commit('SET_ATTACKER_HERO_SKILL', { skill, level })
    else if (side === 'defender') commit('SET_DEFENDER_HERO_SKILL', { skill, level })
  },

  setAttackerUnit ({ commit }, { unit }) {
    commit('SET_ATTACKER_UNIT', unit)
  },
  setDefenderUnit ({ commit }, { unit }) {
    commit('SET_DEFENDER_UNIT', unit)
  },

  swapHeroes ({ commit }) {
    commit('SWAP_HEROES')
  }
}
