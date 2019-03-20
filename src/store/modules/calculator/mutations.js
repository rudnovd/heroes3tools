import heroesJson from '@/assets/json/heroes.json'

import unitsJson from '@/assets/json/units.json'

import terrainsJson from '@/assets/json/terrains.json'

import unitsHatesJson from '@/assets/json/unitsHates.json'

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
  GET_UNITS_HATES (state) {
    state.hates = unitsHatesJson
  },
  GET_TERRAINS (state) {
    state.terrains = terrainsJson
  },
  GET_HEROES (state) {
    state.heroes = heroesJson
  },
  GET_UNITS (state) {
    state.units = unitsJson
  },

  SET_ATTACKER_HERO (state, hero) {
    state.attacker.hero.id = hero.id
    state.attacker.hero.name = hero.name

    if (hero.specialtySkill) {
      state.attacker.hero.specialtySkill = hero.specialtySkill
    } else {
      state.attacker.hero.specialtySkill = ''
    }

    if (hero.specialtyUnit) {
      state.attacker.hero.specialtyUnit = hero.specialtyUnit
    } else {
      state.attacker.hero.specialtyUnit = ''
    }

    if (hero.specialtySpell) {
      state.attacker.hero.specialtySpell = hero.specialtySpell
    } else {
      state.attacker.hero.specialtySpell = ''
    }
  },
  SET_DEFENDER_HERO (state, hero) {
    state.defender.hero.id = hero.id
    state.defender.hero.name = hero.name

    if (hero.specialtySkill) {
      state.defender.hero.specialtySkill = hero.specialtySkill
    } else {
      state.defender.hero.specialtySkill = ''
    }

    if (hero.specialtyUnit) {
      state.defender.hero.specialtyUnit = hero.specialtyUnit
    } else {
      state.defender.hero.specialtyUnit = ''
    }
    if (hero.specialtySpell) {
      state.defender.hero.specialtySpell = hero.specialtySpell
    } else {
      state.defender.hero.specialtySpell = ''
    }
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

  SET_ATTACKER_UNIT_EFFECT (state, effects) {
    state.attacker.unit.effects = effects
  },
  SET_DEFENDER_UNIT_EFFECT (state, effects) {
    state.defender.unit.effects = effects
  },

  SET_ATTACKER_UNIT (state, unit) {
    state.attacker.unit.id = unit.id

    state.attacker.unit.name_en = unit.name_en
    state.attacker.unit.name_ru = unit.name_ru
    state.attacker.unit.level = unit.level
    state.attacker.unit.nativeTerrain = unit.nativeTerrain
    state.attacker.unit.stats = unit.stats

    if (unit.magicImmunity) {
      state.attacker.unit.magicImmunity = unit.magicImmunity
    } else {
      state.attacker.unit.magicImmunity = ''
    }

    if (unit.spellsVulnerability) {
      state.attacker.unit.spellsVulnerability = unit.spellsVulnerability
    } else {
      state.attacker.unit.spellsVulnerability = ''
    }

    if (unit.ranged) {
      state.attacker.unit.ranged = unit.ranged
    } else {
      state.attacker.unit.ranged = ''
    }

    if (unit.hits) {
      state.attacker.unit.hits = unit.hits
    } else {
      state.attacker.unit.hits = 0
    }
  },
  SET_DEFENDER_UNIT (state, unit) {
    state.defender.unit.id = unit.id
    state.defender.unit.name_en = unit.name_en
    state.defender.unit.name_ru = unit.name_ru
    state.defender.unit.level = unit.level
    state.defender.unit.nativeTerrain = unit.nativeTerrain
    state.defender.unit.stats = unit.stats

    if (unit.magicImmunity) {
      state.defender.unit.magicImmunity = unit.magicImmunity
    } else {
      state.defender.unit.magicImmunity = null
    }

    if (unit.spellsVulnerability) {
      state.defender.unit.spellsVulnerability = unit.spellsVulnerability
    } else {
      state.defender.unit.spellsVulnerability = ''
    }

    if (unit.ranged) {
      state.defender.unit.ranged = unit.ranged
    } else {
      state.defender.unit.ranged = ''
    }

    if (unit.hits) {
      state.defender.unit.hits = unit.hits
    } else {
      state.defender.unit.hits = ''
    }
  },

  SET_TERRAIN (state, terrain) {
    state.terrain = terrain
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
