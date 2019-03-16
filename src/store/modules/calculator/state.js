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

      archery: null,
      armorer: null,
      offense: null,
      artillery: null,

      air: null,
      fire: null,
      earth: null,
      water: null
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
      count: null,
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

      archery: null,
      armorer: null,
      offense: null,
      artillery: null,

      air: null,
      fire: null,
      earth: null,
      water: null
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
