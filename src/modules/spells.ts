import type { DamageCalculatorBattleSide } from '@/types'
import { SkillLevels } from '@/types'

function getSpellDamage(
  initiator: DamageCalculatorBattleSide,
  element: string,
  damageGrades: Array<number>,
  powerBonus: number
) {
  const power = initiator.hero?.stats.power || 0
  const skillLevel = initiator.hero?.skills[element] || 0
  damageGrades = [damageGrades[0], ...damageGrades]

  return damageGrades[skillLevel] + power * powerBonus
}

export const Spells = {
  magicArrow: (initiator: DamageCalculatorBattleSide) => {
    let damage = 0

    let schoolLevel = 0

    if (initiator.hero?.skills.fireMagic) {
      schoolLevel = initiator.hero?.skills.fireMagic
    }
    if (initiator.hero?.skills.airMagic && initiator.hero?.skills.airMagic > schoolLevel) {
      schoolLevel = initiator.hero?.skills.airMagic
    }
    if (initiator.hero?.skills.waterMagic && initiator.hero?.skills.waterMagic > schoolLevel) {
      schoolLevel = initiator.hero?.skills.waterMagic
    }
    if (initiator.hero?.skills.earthMagic && initiator.hero?.skills.earthMagic > schoolLevel) {
      schoolLevel = initiator.hero?.skills.earthMagic
    }

    if (!initiator.hero) {
      damage = 10
    } else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 10
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 30 + initiator.hero.stats.power * 10
    }

    return damage
  },
  cure: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'waterMagic', [-10, -20, -30], -5)
  },
  lightningBolt: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'airMagic', [10, 20, 50], 25)
  },

  fireWall: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'fireMagic', [10, 20, 50], 10)
  },

  iceBolt: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'waterMagic', [10, 20, 50], 20)
  },

  deathRipple: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'earthMagic', [10, 20, 30], 5)
  },

  fireball: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'fireMagic', [15, 30, 60], 10)
  },

  landMine: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'fireMagic', [25, 50, 100], 10)
  },

  frostRing: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'waterMagic', [15, 30, 60], 10)
  },

  destroyUndead: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'airMagic', [10, 20, 50], 10)
  },

  inferno: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'fireMagic', [20, 40, 80], 10)
  },

  meteorShower: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'earthMagic', [25, 50, 100], 25)
  },

  chainLightning: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'airMagic', [25, 50, 100], 40)
  },

  titansLightningBolt: () => {
    return 600
  },

  implosion: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'earthMagic', [100, 200, 300], 75)
  },

  armageddon: (initiator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initiator, 'fireMagic', [30, 60, 120], 40)
  },

  animateDead: (initator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initator, 'earthMagic', [-30, -60, -160], -50)
  },

  resurrection: (initator: DamageCalculatorBattleSide) => {
    return getSpellDamage(initator, 'earthMagic', [-40, -80, -160], -50)
  },
}

export const spellsFunctionsMap: Record<string, (initator: DamageCalculatorBattleSide) => number> = {
  MagicArrow: Spells.magicArrow,
  FireWall: Spells.fireWall,
  Fireball: Spells.fireball,
  LandMine: Spells.landMine,
  Armageddon: Spells.armageddon,
  Inferno: Spells.inferno,
  Cure: Spells.cure,
  IceBolt: Spells.iceBolt,
  FrostRing: Spells.frostRing,
  DeathRipple: Spells.deathRipple,
  AnimateDead: Spells.animateDead,
  MeteorShower: Spells.meteorShower,
  Resurrection: Spells.resurrection,
  Implosion: Spells.implosion,
  LightningBolt: Spells.lightningBolt,
  DestroyUndead: Spells.destroyUndead,
  ChainLightning: Spells.chainLightning,
  TitansLightningBolt: Spells.titansLightningBolt,
}
