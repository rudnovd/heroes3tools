export default {
  getUnitsImages: state => {
    return state.images.units
  },
  getHeroes: state => {
    return state.heroes
  },

  getAttacker: state => {
    return state.attacker
  },
  getDefender: state => {
    return state.defender
  },

  getAttackerHero: state => {
    return state.attacker.hero
  },
  getDefenderHero: state => {
    return state.defender.hero
  }
}
