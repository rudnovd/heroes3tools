export default {
  heroes: [],
  units: [],

  attacker: {
    unit: {
      id: null,
      name: null,
      level: null,
      count: 1,
      nativeTerrain: null,
      magicImmunity: null,
      spellsVulnerability: null,
      ranged: null,
      hits: null,
      stats: {
        attack: null,
        defense: null,
        minDamage: null,
        maxDamage: null,
        health: null
      },
      effects: []
    },

    hero: {
      id: null,
      name: null,
      specialtySkill: '',
      specialtyUnit: '',
      specialtySpell: '',

      level: 1,
      attack: 0,
      defense: 0,

      archery: 0,
      armorer: 0,
      offense: 0,
      artillery: 0,

      air: 0,
      fire: 0,
      earth: 0,
      water: 0
    },

    totalMinDamage: null,
    totalMaxDamage: null,
    totalAverageDamage: null,

    totalMinKills: null,
    totalMaxKills: null,
    totalAverageKills: null
  },

  defender: {
    unit: {
      id: null,
      name: null,
      level: null,
      count: 1,
      nativeTerrain: null,
      magicImmunity: null,
      spellsVulnerability: null,
      ranged: null,
      hits: null,
      stats: {
        attack: null,
        defense: null,
        minDamage: null,
        maxDamage: null,
        health: null
      },
      effects: []
    },

    hero: {
      id: null,
      name: null,
      specialtySkill: null,
      specialtyUnit: null,
      specialtySpell: null,

      level: 1,
      attack: 0,
      defense: 0,

      archery: 0,
      armorer: 0,
      offense: 0,
      artillery: 0,

      air: 0,
      fire: 0,
      earth: 0,
      water: 0
    },

    totalMinDamage: null,
    totalMaxDamage: null,
    totalAverageDamage: null,

    totalMinKills: null,
    totalMaxKills: null,
    totalAverageKills: null
  },

  terrain: null,

  images: {
    units: [],
    heroes: []
  },

  calculate: false
}
