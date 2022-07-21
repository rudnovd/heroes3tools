import { spells } from '@/assets/database/spells'
import type { DamageCalculatorBattleSide } from '@/models/Battle'
import type { CreatureInstance } from '@/models/Creature'
import { Creatures, SkillLevels, Spells as SpellsEnum } from '@/models/enums'
import type { Spell } from '@/models/Spell'

function hasImmunity(target: CreatureInstance, spell: Spell) {
  if (target.effects.find((effect) => effect.id === SpellsEnum.AntiMagic)) return true
  if (target.id === Creatures.BlackDragon) return true

  return false
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
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

    return damage
  },

  titansLightningBolt: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): number => {
    if (hasImmunity(target, spells[SpellsEnum.TitansLightningBolt - 1])) return 0

    return 600
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

    return damage
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

    return damage
  },
}
