import heroesJson from '@/assets/json/heroes.json'

export default {
  GET_UNITS_IMAGES (state) {
    for (let i = 0; i <= 160; i++) {
      state.images.units.push({ id: i, src: require(`@/assets/images/${i}.gif`) })
    }
  },
  GET_HEROES (state) {
    state.heroes = heroesJson
  },

  SET_ATTACKER_HERO (state, hero) {
    state.attacker.hero.id = hero.id
    state.attacker.hero.name = hero.name

    if (hero.specialtySkill) state.attacker.hero.specialtySkill = hero.specialtySkill
    if (hero.specialtyUnit) state.attacker.hero.specialtyUnit = hero.specialtyUnit
    if (hero.specialtySpell) state.attacker.hero.specialtySpell = hero.specialtySpell
  },
  SET_DEFENDER_HERO (state, hero) {
    state.defender.hero.id = hero.id
    state.defender.hero.name = hero.name

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

  SET_ATTACKER_UNIT (state, unit) {
    state.attacker.unit.id = unit.id
    state.attacker.unit.name = unit.name
    state.attacker.unit.level = unit.level
    state.attacker.unit.count = 1
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
    state.defender.unit.count = 1
    state.defender.unit.nativeTerrain = unit.nativeTerrain

    if (unit.magicImmunity) state.defender.unit.magicImmunity = unit.magicImmunity
    if (unit.spellsVulnerability) state.defender.unit.spellsVulnerability = unit.spellsVulnerability
    if (unit.ranged) state.defender.unit.ranged = unit.ranged
    if (unit.hits) state.defender.unit.hits = unit.hits

    state.defender.unit.stats = unit.stats
    state.defender.unit.effects = []
  },

  CLEAR_ATTACKER_HERO (state) {
    for (let property in state.attacker.hero) {
      state.attacker.hero[property] = null
    }
  },
  CLEAR_DEFENDER_HERO (state) {
    for (let property in state.defender.hero) {
      state.defender.hero[property] = null
    }
  },

  SWAP_HEROES (state) {
    const tmp = state.attacker.hero
    state.attacker.hero = state.defender.hero
    state.defender.hero = tmp
  }
}
