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

  const fireImmunityCreatures = [Creatures.Firebird, Creatures.Efreet, Creatures.EfreetSultan]
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

function calculateSpellEffects(target: CreatureInstance, damage: number) {
  damage = calculateReducing(target, damage)

  return damage
}

function calculateReducing(target: CreatureInstance, damage: number) {
  if (target.id === Creatures.StoneGolem) damage -= (damage / 100) * 50
  else if (target.id === Creatures.IronGolem) damage -= (damage / 100) * 75
  else if (target.id === Creatures.SteelGolem) damage -= (damage / 100) * 80
  else if (target.id === Creatures.GoldGolem) damage -= (damage / 100) * 85
  else if (target.id === Creatures.DiamondGolem) damage -= (damage / 100) * 95

  return damage
}

export const Spells = {
  magicArrow: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.MagicArrow - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },
  cure: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Cure - 1])) return 0

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
  lightningBolt: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.LightningBolt - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  fireWall: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Firewall - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  iceBolt: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.IceBolt - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  deathRipple: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.DeathRipple - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  fireball: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Fireball - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  landMine: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.LandMine - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  frostRing: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.FrostRing - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  destroyUndead: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.DestroyUndead - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  inferno: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Inferno - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  meteorShower: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.MeteorShower - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  chainLightning: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.ChainLightning - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  titansLightningBolt: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.TitansLightningBolt - 1])) return 0

    return calculateSpellEffects(target, 600)
  },

  implosion: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Implosion - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },

  armageddon: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.Armageddon - 1])) return 0

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

    return calculateSpellEffects(target, damage)
  },
}
