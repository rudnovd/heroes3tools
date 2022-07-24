import { spells } from '@/assets/database/spells'
import type { DamageCalculatorBattleSide } from '@/models/Battle'
import type { CreatureInstance } from '@/models/Creature'
import { Creatures, SkillLevels, Spells as SpellsEnum } from '@/models/enums'
import type { Spell } from '@/models/Spell'

function hasImmunity(target: CreatureInstance, spell: Spell) {
  if (target.effects.find((effect) => effect.id === SpellsEnum.AntiMagic)) return true

  const creaturesWithImmunity = [
    Creatures.BlackDragon,
    Creatures.MagicElemental,
    Creatures.FireElemental,
    Creatures.EnergyElemental,
  ]
  if (creaturesWithImmunity.includes(target.id)) return true

  const fireImmunityCreatures = [Creatures.Efreet, Creatures.EfreetSultan]
  if (fireImmunityCreatures.includes(target.id)) return true

  const threeSpellLevelImmunityCreatures = [Creatures.GreenDragon, Creatures.RedDragon]
  if (threeSpellLevelImmunityCreatures.includes(target.id) && spell.level <= 3) return true

  const fourSpellLevelImmunityCreatures = [Creatures.GoldDragon]
  if (fourSpellLevelImmunityCreatures.includes(target.id) && spell.level <= 4) return true

  if (
    (target.id === Creatures.AirElemental || target.id === Creatures.StormElemental) &&
    spell.id === SpellsEnum.MeteorShower
  )
    return true

  if (
    (target.id === Creatures.WaterElemental || target.id === Creatures.IceElemental) &&
    (spell.id === SpellsEnum.IceBolt || spell.id === SpellsEnum.FrostRing)
  )
    return true

  if (
    (target.id === Creatures.EarthElemental || target.id === Creatures.MagmaElemental) &&
    (spell.id === SpellsEnum.LightningBolt ||
      spell.id === SpellsEnum.ChainLightning ||
      spell.id === SpellsEnum.Armageddon)
  )
    return true

  return false
}

function calculateReducing(
  initiator: DamageCalculatorBattleSide,
  target: CreatureInstance,
  spell: Spell,
  damage: number
) {
  if (target.id === Creatures.StoneGolem) damage -= (damage / 100) * 50
  else if (target.id === Creatures.IronGolem) damage -= (damage / 100) * 75
  else if (target.id === Creatures.SteelGolem) damage -= (damage / 100) * 80
  else if (target.id === Creatures.GoldGolem) damage -= (damage / 100) * 85
  else if (target.id === Creatures.DiamondGolem) damage -= (damage / 100) * 95

  if (spell.element === 'Fire' && target.effects.find((effect) => effect.id === SpellsEnum.ProtectionFromFire)) {
    if (!initiator.hero) {
      damage -= (damage / 100) * 30
    } else if (initiator.hero.skills.fire && initiator.hero.skills.fire >= 1) {
      damage -= (damage / 100) * 50
    }
  }

  return damage
}

function calculateSpecialtyBonus(
  initiator: DamageCalculatorBattleSide,
  target: CreatureInstance,
  spell: Spell,
  damage: number
) {
  if (!initiator.hero) return damage

  const { specialtySpell } = initiator.hero
  let bonus = 0

  if (spell.id === SpellsEnum.MagicArrow && specialtySpell === SpellsEnum.MagicArrow) {
    bonus = damage / 2
  } else if (spell.id === SpellsEnum.Firewall && specialtySpell === SpellsEnum.Firewall) {
    bonus = damage
  } else if (spell.id === specialtySpell) {
    bonus = 1 + (initiator.hero.level / target.level) * 0.03
  }

  return damage + bonus
}

export const Spells = {
  cast(initiator: DamageCalculatorBattleSide, target: CreatureInstance, spell: Spell) {
    if (hasImmunity(target, spell)) return 0

    const originalSpell = spells.find((_spell) => _spell.id === spell.id)!
    const spellCamelName =
      originalSpell.name[0].toLocaleLowerCase() +
      originalSpell.name.slice(1, originalSpell.name.length).replace(/\s+/g, '')

    let damage = this[spellCamelName](initiator)
    damage = calculateSpecialtyBonus(initiator, target, spell, damage)
    damage = calculateReducing(initiator, target, spell, damage)

    return damage
  },

  magicArrow: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel =
      initiator.hero?.skills.fire ||
      initiator.hero?.skills.air ||
      initiator.hero?.skills.water ||
      initiator.hero?.skills.earth ||
      0

    if (!initiator.hero) {
      damage = 20
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 30 + initiator.hero.stats.power * 10
    }

    return damage
  },
  cure: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.water || 0

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 5
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 5
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 30 + initiator.hero.stats.power * 5
    }

    return -damage
  },
  lightningBolt: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.air || 0

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 25
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 25
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 50 + initiator.hero.stats.power * 25
    }

    return damage
  },

  fireWall: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.fire || 0

    if (!initiator.hero) {
      damage = 15
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 15 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 30 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 60 + initiator.hero.stats.power * 10
    }

    return damage
  },

  iceBolt: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.water || 0

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 20
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 20
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 50 + initiator.hero.stats.power * 20
    }

    return damage
  },

  deathRipple: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.earth || 0

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 5
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 5
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 30 + initiator.hero.stats.power * 5
    }

    return damage
  },

  fireball: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.fire || 0

    if (!initiator.hero) {
      damage = 15
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 15 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 30 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 60 + initiator.hero.stats.power * 10
    }

    return damage
  },

  landMine: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.fire || 0

    if (!initiator.hero) {
      damage = 25
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 25 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 50 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 100 + initiator.hero.stats.power * 10
    }

    return damage
  },

  frostRing: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.water || 0

    if (!initiator.hero) {
      damage = 15
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 15 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 30 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 60 + initiator.hero.stats.power * 10
    }

    return damage
  },

  destroyUndead: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.air || 0

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 50 + initiator.hero.stats.power * 10
    }

    return damage
  },

  inferno: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.fire || 0

    if (!initiator.hero) {
      damage = 20
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 20 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 40 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 80 + initiator.hero.stats.power * 10
    }

    return damage
  },

  meteorShower: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.earth || 0

    if (!initiator.hero) {
      damage = 25
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 25 + initiator.hero.stats.power * 25
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 50 + initiator.hero.stats.power * 25
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 100 + initiator.hero.stats.power * 25
    }

    return damage
  },

  chainLightning: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.air || 0

    if (!initiator.hero) {
      damage = 25
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 25 + initiator.hero.stats.power * 40
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 50 + initiator.hero.stats.power * 40
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 100 + initiator.hero.stats.power * 40
    }

    return damage
  },

  titansLightningBolt: (initiator: DamageCalculatorBattleSide): number => {
    return 600
  },

  implosion: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.earth || 0

    if (!initiator.hero) {
      damage = 100
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 100 + initiator.hero.stats.power * 75
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 200 + initiator.hero.stats.power * 75
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 300 + initiator.hero.stats.power * 75
    }

    return damage
  },

  armageddon: (initiator: DamageCalculatorBattleSide): number => {
    let damage = 0

    const schoolLevel = initiator.hero?.skills.fire || 0

    if (!initiator.hero) {
      damage = 30
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 30 + initiator.hero.stats.power * 50
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 60 + initiator.hero.stats.power * 50
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 120 + initiator.hero.stats.power * 50
    }

    return damage
  },
}
