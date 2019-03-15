export default {
  getUnitsImages: state => {
    return state.images.units
  },
  getHeroesImages: state => {
    return state.images.heroes
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
  },

  getAttackerUnit: state => {
    return state.attacker.unit
  },
  getDefenderUnit: state => {
    return state.defender.unit
  },

  getCalculationStatus: state => {
    return state.calculate
  }
}
