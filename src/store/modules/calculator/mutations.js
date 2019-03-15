import heroesJson from '@/assets/json/heroes.json'

export default {
  GET_UNITS_IMAGES (state) {
    for (let i = 0; i <= 160; i++) {
      state.images.units.push({ id: i, src: require(`@/assets/images/units/${i}.webp`) })
    }
  },
  GET_HEROES_IMAGES (state) {
    for (let i = 0; i <= 159; i++) {
      state.images.heroes.push({ id: i, src: require(`@/assets/images/heroes/${i}.webp`) })
    }
  },
  GET_HEROES (state) {
    state.heroes = heroesJson
  },

  SET_ATTACKER_HERO (state, hero) {
    state.attacker.hero.id = hero.id
    state.attacker.hero.name = hero.name

    state.attacker.hero.specialtySkill = ''
    state.attacker.hero.specialtyUnit = ''
    state.attacker.hero.specialtySpell = ''

    if (hero.specialtySkill) state.attacker.hero.specialtySkill = hero.specialtySkill
    if (hero.specialtyUnit) state.attacker.hero.specialtyUnit = hero.specialtyUnit
    if (hero.specialtySpell) state.attacker.hero.specialtySpell = hero.specialtySpell
  },
  SET_DEFENDER_HERO (state, hero) {
    state.defender.hero.id = hero.id
    state.defender.hero.name = hero.name

    state.defender.hero.specialtySkill = ''
    state.defender.hero.specialtyUnit = ''
    state.defender.hero.specialtySpell = ''

    if (hero.specialtySkill) state.defender.hero.specialtySkill = hero.specialtySkill
    if (hero.specialtyUnit) state.defender.hero.specialtyUnit = hero.specialtyUnit
    if (hero.specialtySpell) state.defender.hero.specialtySpell = hero.specialtySpell
  },

  SET_ATTACKER_HERO_LEVEL (state, level) {
    state.attacker.hero.level = level
  },
  SET_DEFENDER_HERO_LEVEL (state, level) {
    state.defender.hero.level = level
  },

  SET_ATTACKER_HERO_ATTACK (state, attack) {
    state.attacker.hero.attack = attack
  },
  SET_DEFENDER_HERO_ATTACK (state, attack) {
    state.defender.hero.attack = attack
  },

  SET_ATTACKER_HERO_DEFENSE (state, defense) {
    state.attacker.hero.defense = defense
  },
  SET_DEFENDER_HERO_DEFENSE (state, defense) {
    state.defender.hero.defense = defense
  },

  SET_ATTACKER_HERO_SKILL (state, { skill, level }) {
    state.attacker.hero[skill] = level
  },
  SET_DEFENDER_HERO_SKILL (state, { skill, level }) {
    state.defender.hero[skill] = level
  },

  SET_ATTACKER_UNIT_EFFECT (state, effect) {
    state.attacker.unit.effects.push(effect)
  },
  SET_DEFENDER_UNIT_EFFECT (state, effect) {
    state.defender.unit.effects.push(effect)
  },
  REMOVE_ATTACKER_UNIT_EFFECT (state, effect) {
    state.attacker.unit.effects.splice(state.attacker.unit.effects.indexOf(effect), 1)
  },
  REMOVE_DEFENDER_UNIT_EFFECT (state, effect) {
    state.defender.unit.effects.splice(state.defender.unit.effects.indexOf(effect), 1)
  },

  SET_ATTACKER_UNIT (state, unit) {
    state.attacker.unit.id = unit.id
    state.attacker.unit.name = unit.name
    state.attacker.unit.level = unit.level
    state.attacker.unit.nativeTerrain = unit.nativeTerrain

    if (unit.magicImmunity) state.attacker.unit.magicImmunity = unit.magicImmunity
    if (unit.spellsVulnerability) state.attacker.unit.spellsVulnerability = unit.spellsVulnerability
    if (unit.ranged) state.attacker.unit.ranged = unit.ranged
    if (unit.hits) state.attacker.unit.hits = unit.hits

    state.attacker.unit.stats = unit.stats
    state.attacker.unit.effects = []
  },
  SET_DEFENDER_UNIT (state, unit) {
    state.defender.unit.id = unit.id
    state.defender.unit.name = unit.name
    state.defender.unit.level = unit.level
    state.defender.unit.nativeTerrain = unit.nativeTerrain

    if (unit.magicImmunity) state.defender.unit.magicImmunity = unit.magicImmunity
    if (unit.spellsVulnerability) state.defender.unit.spellsVulnerability = unit.spellsVulnerability
    if (unit.ranged) state.defender.unit.ranged = unit.ranged
    if (unit.hits) state.defender.unit.hits = unit.hits

    state.defender.unit.stats = unit.stats
    state.defender.unit.effects = []
  },

  CLEAR_ATTACKER_HERO (state) {
    state.attacker.hero.id = null
    state.attacker.hero.name = null
    state.attacker.hero.specialtySkill = ''
    state.attacker.hero.specialtyUnit = ''
    state.attacker.hero.specialtySpell = ''
    state.attacker.hero.level = 1
    state.attacker.hero.attack = 0
    state.attacker.hero.defense = 0
    state.attacker.hero.archery = null
    state.attacker.hero.armorer = null
    state.attacker.hero.offense = null
    state.attacker.hero.artillery = null
    state.attacker.hero.air = null
    state.attacker.hero.fire = null
    state.attacker.hero.earth = null
    state.attacker.hero.water = null
  },
  CLEAR_DEFENDER_HERO (state) {
    state.defender.hero.id = null
    state.defender.hero.name = null
    state.defender.hero.specialtySkill = ''
    state.defender.hero.specialtyUnit = ''
    state.defender.hero.specialtySpell = ''
    state.defender.hero.level = 1
    state.defender.hero.attack = 0
    state.defender.hero.defense = 0
    state.defender.hero.archery = null
    state.defender.hero.armorer = null
    state.defender.hero.offense = null
    state.defender.hero.artillery = null
    state.defender.hero.air = null
    state.defender.hero.fire = null
    state.defender.hero.earth = null
    state.defender.hero.water = null
  },

  CALCULATE_START (state) {
    state.calculate = true
  },
  CALCULATE_END (state) {
    state.calculate = false
  },

  SET_ATTACKER_UNITS_COUNT (state, count) {
    state.attacker.unit.count = count
  },
  SET_DEFENDER_UNITS_COUNT (state, count) {
    state.defender.unit.count = count
  },

  SET_ATTACKER_UNIT_RESULT_DAMAGE (state, unit) {
    state.attacker.totalMinDamage = unit.totalMinDamage
    state.attacker.totalMaxDamage = unit.totalMaxDamage
    state.attacker.totalAverageDamage = unit.totalAverageDamage

    state.attacker.totalMinKills = unit.totalMinKills
    state.attacker.totalMaxKills = unit.totalMaxKills
    state.attacker.totalAverageKills = unit.totalAverageKills
  },
  SET_DEFENDER_UNIT_RESULT_DAMAGE (state, unit) {
    state.defender.totalMinDamage = unit.totalMinDamage
    state.defender.totalMaxDamage = unit.totalMaxDamage
    state.defender.totalAverageDamage = unit.totalAverageDamage

    state.defender.totalMinKills = unit.totalMinKills
    state.defender.totalMaxKills = unit.totalMaxKills
    state.defender.totalAverageKills = unit.totalAverageKills
  },

  SWAP_SIDES (state) {
    const tmp = state.attacker
    state.attacker = state.defender
    state.defender = tmp
  }
}
