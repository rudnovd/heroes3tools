import type { DamageCalculatorBattleSide } from '@/models/Battle'
import type { CreatureInstance } from '@/models/Creature'
import { Creatures, Spells } from '@/models/enums'
import { Spell } from '@/models/Spell'

export const Effects = {
  functions: {
    canAccess: (effect: Spell, target: CreatureInstance) => {
      if (!target) return false

      // if target has Anti Magic effect
      if (target.effects.find((effect) => effect.id === Spells.AntiMagic)) return false

      // if target has immunity to effect
      if (target.special?.immunity?.find((spell) => spell.id === effect.id)) return false

      const undeadImmunitySpells = [
        Spells.Bless,
        Spells.Curse,
        Spells.DeathRipple,
        Spells.Resurrection,
        Spells.Sacrifice,
      ]
      const mindSpells = [
        Spells.Berserk,
        Spells.Blind,
        Spells.Forgetfulness,
        Spells.Frenzy,
        Spells.Hypnotize,
        Spells.Mirth,
        Spells.Sorrow,
      ]

      // Check undead creatures immunities
      if (target.special?.undead) {
        if (undeadImmunitySpells.indexOf(effect.id) > -1) return false
        if (mindSpells.indexOf(effect.id) > -1) return false
      }

      // Check non living creatures immunities
      if (
        target.special?.nonLiving &&
        target.id !== Creatures.StoneGargoyle &&
        target.id !== Creatures.ObsidianGargoyle
      ) {
        if (mindSpells.indexOf(effect.id) > -1) return false
      }

      return true
    },
  },

  /**
   * Set Bless effect to creature
   * (Bless inflict maximum creature damage)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Bless effect
   */
  bless: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
    let {
      minDamage,
      maxDamage,
      calculation: { damageBonus },
    } = target

    // if battle side has hero with Bless specialty then add damageBonus value
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
   * Set Curse effect to creature
   * (Curse deliver minimum or reduced damage when creature attacking)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Curse effect
   */
  curse: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Bloodlust effect to creature
   * (Bloodlust increases creature attack)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Bloodlust effect
   */
  bloodlust: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Frenzy effect to creature
   * (Frenzy increases creature attack and sets defense to 0)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Frenzy effect
   */
  frenzy: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Slayer effect to creature
   * (Slayer increases creature attack against Dragons, Behemoths and Hydras, advanced level: Angels and Devils, expert level: Titans
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param defender Defender who accept effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Slayer effect
   */
  slayer: (
    initiator: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance
  ): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Prayer effect to creature
   * (Prayer increases creature attack, defense and speed)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Prayer effect
   */
  prayer: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Precision effect to creature
   * (Precision increases ranged creature attack)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Precision effect
   */
  precision: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Stone Skin effect to creature
   * (Stone Skin increases creature defense)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Stone Skin effect
   */
  stoneSkin: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Weakness ray effect to creature
   * (Weakness reduces creature attack)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Weakness ray effect
   */
  weakness: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Disrupting Ray effect to creature
   * (Disrupting Ray reduces defense of a single creature)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Disrupting Ray effect
   */
  disruptingRay: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Shield effect to creature
   * (Shield reduces damage taken from hand-to-hand attacks)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @return {CreatureInstance} Creature with Shield effect
   */
  shield: (initiator: DamageCalculatorBattleSide, target: CreatureInstance): CreatureInstance => {
    // get creature values for modify them
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

  /**
   * Set Air Shield effect to creature
   * (Air Shield reduces damage taken from ranged attacks)
   * @param initiator Battle side (attacker or defender) who casts effect
   * @param target Creature who accept effect
   * @param defender Battle side who deal damage
   * @return {CreatureInstance} Creature with Air Shield effect
   */
  airShield: (
    initiator: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance
  ): CreatureInstance => {
    // get creature values for modify them
    let {
      calculation: { defenseMagicBonus },
    } = target

    if (defender.activeCreature?.ranged) {
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
