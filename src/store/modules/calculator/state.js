export default {
  heroes: [],

  attacker: {
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
      effects: null
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
      effects: null
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

  images: {
    units: []
  }
}
