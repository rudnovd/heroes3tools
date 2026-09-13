import type { DamageCalculatorBattleSide } from '@/models/Battle'
import { SkillLevels, Spells as SpellsEnum } from '@/models/enums'

function getSpellDamage(
  initiator: DamageCalculatorBattleSide,
  element: string,
  damageGrades: Array<number>,
  powerBonus: number,
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

    if (initiator.hero?.skills.fire) {
      schoolLevel = initiator.hero?.skills.fire
    }
    if (initiator.hero?.skills.air && initiator.hero?.skills.air > schoolLevel) {
      schoolLevel = initiator.hero?.skills.air
    }
    if (initiator.hero?.skills.water && initiator.hero?.skills.water > schoolLevel) {
      schoolLevel = initiator.hero?.skills.water
    }
    if (initiator.hero?.skills.earth && initiator.hero?.skills.earth > schoolLevel) {
      schoolLevel = initiator.hero?.skills.earth
    }

    if (!initiator.hero) {
      damage = 10
    }
    else if (schoolLevel <= SkillLevels.Basic) {
      damage = 10 + initiator.hero.stats.power * 10
    }
    else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 20 + initiator.hero.stats.power * 10
    }
    else if (schoolLevel <= SkillLevels.Expert) {
      damage = 30 + initiator.hero.stats.power * 10
    }

    return damage
  },
  cure: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = -5
    return getSpellDamage(initiator, 'water', [-10, -20, -30], BONUS_PER_POWER_POINT)
  },
  lightningBolt: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 25
    return getSpellDamage(initiator, 'air', [10, 20, 50], BONUS_PER_POWER_POINT)
  },

  fireWall: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 15
    return getSpellDamage(initiator, 'fire', [10, 20, 50], BONUS_PER_POWER_POINT)
  },

  iceBolt: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 20
    return getSpellDamage(initiator, 'water', [10, 20, 50], BONUS_PER_POWER_POINT)
  },

  deathRipple: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 5
    return getSpellDamage(initiator, 'earth', [10, 20, 30], BONUS_PER_POWER_POINT)
  },

  fireball: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 10
    return getSpellDamage(initiator, 'fire', [15, 30, 60], BONUS_PER_POWER_POINT)
  },

  landMine: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 10
    return getSpellDamage(initiator, 'fire', [25, 50, 100], BONUS_PER_POWER_POINT)
  },

  frostRing: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 10
    return getSpellDamage(initiator, 'water', [15, 30, 60], BONUS_PER_POWER_POINT)
  },

  destroyUndead: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 10
    return getSpellDamage(initiator, 'air', [10, 20, 50], BONUS_PER_POWER_POINT)
  },

  inferno: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 10
    return getSpellDamage(initiator, 'fire', [20, 40, 80], BONUS_PER_POWER_POINT)
  },

  meteorShower: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 25
    return getSpellDamage(initiator, 'earth', [25, 50, 100], BONUS_PER_POWER_POINT)
  },

  chainLightning: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 40
    return getSpellDamage(initiator, 'air', [25, 50, 100], BONUS_PER_POWER_POINT)
  },

  titansLightningBolt: () => {
    return 600
  },

  implosion: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 75
    return getSpellDamage(initiator, 'earth', [100, 200, 300], BONUS_PER_POWER_POINT)
  },

  armageddon: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = 40
    return getSpellDamage(initiator, 'fire', [30, 60, 120], BONUS_PER_POWER_POINT)
  },

  animateDead: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = -50
    return getSpellDamage(initiator, 'earth', [-30, -60, -160], BONUS_PER_POWER_POINT)
  },

  resurrection: (initiator: DamageCalculatorBattleSide) => {
    const BONUS_PER_POWER_POINT = -50
    return getSpellDamage(initiator, 'earth', [-40, -80, -160], BONUS_PER_POWER_POINT)
  },
}

export const spellsFunctionsMap = {
  [SpellsEnum.MagicArrow]: Spells.magicArrow,
  [SpellsEnum.Firewall]: Spells.fireWall,
  [SpellsEnum.Fireball]: Spells.fireball,
  [SpellsEnum.LandMine]: Spells.landMine,
  [SpellsEnum.Armageddon]: Spells.armageddon,
  [SpellsEnum.Inferno]: Spells.inferno,
  [SpellsEnum.Cure]: Spells.cure,
  [SpellsEnum.IceBolt]: Spells.iceBolt,
  [SpellsEnum.FrostRing]: Spells.frostRing,
  [SpellsEnum.DeathRipple]: Spells.deathRipple,
  [SpellsEnum.AnimateDead]: Spells.animateDead,
  [SpellsEnum.MeteorShower]: Spells.meteorShower,
  [SpellsEnum.Resurrection]: Spells.resurrection,
  [SpellsEnum.Implosion]: Spells.implosion,
  [SpellsEnum.LightningBolt]: Spells.lightningBolt,
  [SpellsEnum.DestroyUndead]: Spells.destroyUndead,
  [SpellsEnum.ChainLightning]: Spells.chainLightning,
  [SpellsEnum.TitansLightningBolt]: Spells.titansLightningBolt,
}
