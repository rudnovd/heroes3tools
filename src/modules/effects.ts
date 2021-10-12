import type { DamageCalculatorBattleSide } from '@/models/Battle'
import type { CreatureInstance } from '@/models/Creature'
import { Creatures, Spells } from '@/models/enums'

export const Effects = {
  /**
   * Calculate creature minDamage, maxDamage and damageBonus with bless spell
   * @param initiator DamageCalculatorBattleSide who casts effect
   * @param target Effect target
   * @return {CreatureInstance} Creature with bless effect
   */
  bless: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let {
      minDamage,
      maxDamage,
      calculation: { damageBonus },
    } = target

    if (initiator.hero && initiator.hero.specialtySpell === Spells.Bless) {
      damageBonus += (0.03 * initiator.hero.level) / initiator.hero.level
    }

    if (!initiator.hero || initiator.hero.skills.water <= 1) {
      minDamage = maxDamage
    } else if (initiator.hero.skills.water >= 2) {
      maxDamage++
      minDamage = maxDamage
    }

    return {
      ...target,
      minDamage,
      maxDamage,
      calculation: {
        ...target.calculation,
        damageBonus,
      },
    }
  },

  /**
   * Calculate curse spell effect
   * @param initiator DamageCalculatorBattleSide who casts effect
   * @param target Effect target
   * @return {CreatureInstance} Creature with curse effect
   */
  curse: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { minDamage, maxDamage } = target

    if (!initiator.hero || initiator.hero.skills.fire <= 1) {
      maxDamage = minDamage
    } else if (initiator.hero.skills.fire >= 2) {
      minDamage = minDamage * 0.8 - 1
      maxDamage = minDamage
    }

    return {
      ...target,
      minDamage,
      maxDamage,
    }
  },

  bloodlust: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { attack } = target

    if (!initiator.hero || initiator.hero.skills.fire <= 1) {
      attack += 3
    } else if (initiator.hero.skills.fire >= 2) {
      attack += 6
    }

    return {
      ...target,
      attack,
    }
  },

  frenzy: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { attack, defense } = target

    if (!initiator.hero || initiator.hero.skills.fire <= 1) {
      attack += defense
    } else if (initiator.hero.skills.fire === 2) {
      attack += defense * 1.5
    } else if (initiator.hero.skills.fire === 3) {
      defense = 0
    }

    attack += defense * 2

    return {
      ...target,
      attack,
      defense,
    }
  },

  slayer: (
    initiator: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance
  ): CreatureInstance => {
    let { attack } = target

    const slayerCreatures = [
      Creatures.GreenDragon,
      Creatures.BoneDragon,
      Creatures.GhostDragon,
      Creatures.RedDragon,
      Creatures.Hydra,
      Creatures.ChaosHydra,
      Creatures.Behemoth,
      Creatures.AncientBehemoth,
      Creatures.FaerieDragon,
      Creatures.RustDragon,
      Creatures.CrystalDragon,
      Creatures.AzureDragon,
    ]

    if (initiator.hero) {
      if (initiator.hero.skills.fire > 1) {
        slayerCreatures.push(Creatures.Angel, Creatures.Archangel, Creatures.Devil, Creatures.ArchDevil)
      }
      if (initiator.hero.skills.fire > 2) {
        slayerCreatures.push(
          Creatures.Giant,
          Creatures.Titan,
          Creatures.Firebird,
          Creatures.SeaSerpent,
          Creatures.Haspid
        )
      }
    }

    if (defender.creatures.find((defenderCreature) => slayerCreatures.indexOf(defenderCreature.id) !== -1)) {
      attack += 8
    }

    return {
      ...target,
      attack,
    }
  },

  prayer: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { attack, defense } = target

    if (!initiator.hero || initiator.hero.skills.water <= 1) {
      attack += 2
      defense += 2
    } else if (initiator.hero.skills.water >= 2) {
      attack += 2
      defense += 4
    }

    return {
      ...target,
      attack,
      defense,
    }
  },

  precision: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { attack } = target

    if (target.ranged) {
      if (!initiator.hero || initiator.hero.skills.air <= 1) {
        attack += 3
      } else if (initiator.hero.skills.air >= 2) {
        attack += 6
      }
    }

    return {
      ...target,
      attack,
    }
  },

  stoneSkin: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { defense } = target

    if (!initiator.hero || initiator.hero.skills.earth <= 1) {
      defense += 3
    } else if (initiator.hero.skills.earth >= 2) {
      defense += 6
    }

    return {
      ...target,
      defense,
    }
  },

  weakness: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { attack } = target

    if (!initiator.hero || initiator.hero.skills.water <= 1) {
      attack -= 3
    } else if (initiator.hero.skills.water >= 2) {
      attack -= 6
    }

    return {
      ...target,
      attack,
    }
  },

  disruptingRay: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let { defense } = target

    if (!initiator.hero || initiator.hero.skills.air <= 1) {
      defense -= 3
    } else if (initiator.hero.skills.air === 2) {
      defense -= 4
    } else if (initiator.hero.skills.air === 3) {
      defense -= 5
    }

    return {
      ...target,
      defense,
    }
  },

  shield: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let {
      calculation: { defenseMagicBonus },
    } = target

    if (!initiator.hero || initiator.hero.skills.earth <= 1) {
      defenseMagicBonus += 0.15
    } else if (initiator.hero.skills.earth >= 2) {
      defenseMagicBonus += 0.3
    }

    return {
      ...target,
      calculation: {
        ...target.calculation,
        defenseMagicBonus,
      },
    }
  },

  airShield: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    let {
      calculation: { defenseMagicBonus },
    } = target

    if (target.ranged) {
      if (!initiator.hero || initiator.hero.skills.air < 2) {
        defenseMagicBonus += 0.25
      } else if (initiator.hero.skills.air > 1) {
        defenseMagicBonus += 0.5
      }
    }

    return {
      ...target,
      calculation: {
        ...target.calculation,
        defenseMagicBonus,
      },
    }
  },
}
