export default {
  attackerHeroSelected: state => {
    try {
      if (state.attacker.hero.id !== null) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
    }
  },
  defenderHeroSelected: state => {
    if (state.defender.hero.id !== null) {
      return true
    } else {
      return false
    }
  },
  attackerUnitSelected: state => {
    if (state.attacker.unit.id !== null) {
      return true
    } else {
      return false
    }
  },
  defenderUnitSelected: state => {
    if (state.defender.unit.id !== null) {
      return true
    } else {
      return false
    }
  },

  getUnitsList: state => {
    let unitsList = {
      castle: [],
      rampart: [],
      tower: [],
      inferno: [],
      necropolis: [],
      dungeon: [],
      stronghold: [],
      fortress: [],
      conflux: [],
      cove: [],
      neutral: []
    }

    // Castle
    for (let i = 0; i < 14; i++) {
      unitsList.castle.push(state.units[i])
    }

    // Rampart
    for (let i = 14; i < 28; i++) {
      unitsList.rampart.push(state.units[i])
    }

    // Tower
    for (let i = 28; i < 42; i++) {
      unitsList.tower.push(state.units[i])
    }

    // Necropolis
    for (let i = 42; i < 56; i++) {
      unitsList.necropolis.push(state.units[i])
    }

    // Dungeon
    for (let i = 56; i < 70; i++) {
      unitsList.dungeon.push(state.units[i])
    }

    // Inferno
    for (let i = 70; i < 84; i++) {
      unitsList.inferno.push(state.units[i])
    }

    // Stronghold
    for (let i = 84; i < 98; i++) {
      unitsList.stronghold.push(state.units[i])
    }

    // Fortress
    for (let i = 98; i < 112; i++) {
      unitsList.fortress.push(state.units[i])
    }

    // Conflux
    for (let i = 112; i < 126; i++) {
      unitsList.conflux.push(state.units[i])
    }

    // Cove
    for (let i = 141; i < 156; i++) {
      unitsList.cove.push(state.units[i])
    }

    // Neutral
    for (let i = 126; i < 141; i++) {
      unitsList.neutral.push(state.units[i])
    }

    // Neutral
    for (let i = 156; i < 161; i++) {
      unitsList.neutral.push(state.units[i])
    }

    return unitsList
  },

  getCalculatorStatus: state => {
    return state.calculate
  }
}
