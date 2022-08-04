import type { DamageCalculatorBattleSide } from '@/models/Battle'
import { SkillLevels, Spells as SpellsEnum } from '@/models/enums'

export const Spells = {
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

  titansLightningBolt: (): number => {
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
      damage = 30 + initiator.hero.stats.power * 40
    } else if (schoolLevel <= SkillLevels.Advanced) {
      damage = 60 + initiator.hero.stats.power * 40
    } else if (schoolLevel <= SkillLevels.Expert) {
      damage = 120 + initiator.hero.stats.power * 40
    }

    return damage
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
  // [SpellsEnum.AnimateDead]: Spells.animateDead,
  [SpellsEnum.MeteorShower]: Spells.meteorShower,
  // [SpellsEnum.Resurrection]: Spells.ressurection,
  [SpellsEnum.Implosion]: Spells.implosion,
  [SpellsEnum.LightningBolt]: Spells.lightningBolt,
  [SpellsEnum.DestroyUndead]: Spells.destroyUndead,
  [SpellsEnum.ChainLightning]: Spells.chainLightning,
  [SpellsEnum.TitansLightningBolt]: Spells.titansLightningBolt,
}
