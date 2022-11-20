import type { CreatureInstance } from '@/modules/creature'
import { SkillLevels, type CreatureKey, type DamageCalculatorBattleSide, type Spell } from '@/types'

export const Effects = {
  /**
   * Bless inflict maximum creature damage
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Bless bonuses
   */
  bless: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target.special?.undead) {
      throw new Error('Bless cannot be used on undead creature')
    } else if (target !== initiator.activeCreature) {
      throw new Error('Bless cannot be use on enemy creature')
    }

    // if battle side has hero with Bless specialty then add damageBonus value
    if (initiator.hero?.specialtySpell === 'Bless') {
      target.calculation.damageBonus += Math.floor(initiator.hero.level / target.level) * 0.03
    }

    if (!initiator.hero || !initiator.hero.skills.waterMagic || initiator.hero.skills.waterMagic <= SkillLevels.Basic) {
      target.minDamage = target.maxDamage
    } else if (initiator.hero.skills.waterMagic >= SkillLevels.Advanced) {
      target.maxDamage++
      target.minDamage = target.maxDamage
    }

    return target
  },

  /**
   * Curse deliver minimum or reduced damage when creature attacking
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Curse penalty
   */
  curse: (sides: { defender: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { defender, target } = sides

    if (target === defender.activeCreature) {
      throw new Error('Curse cannot be used on your own creature')
    }

    if (
      !defender.hero ||
      !defender.hero.skills.fireMagic ||
      defender.hero.skills.fireMagic <= SkillLevels.Basic ||
      target.minDamage === 1
    ) {
      target.maxDamage = target.minDamage
    } else if (defender.hero.skills.fireMagic >= SkillLevels.Advanced) {
      target.minDamage = target.minDamage - 1
      target.maxDamage = target.minDamage
    }

    return target
  },

  /**
   * Bloodlust increases creature attack
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Bloodlust bonuses
   */
  bloodlust: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Bloodlust cannot be use on enemy creature')
    }

    if (!initiator.hero || !initiator.hero.skills.fireMagic || initiator.hero.skills.fireMagic <= SkillLevels.Basic) {
      target.attack += 3
    } else if (initiator.hero.skills.fireMagic >= SkillLevels.Advanced) {
      target.attack += 6
    }

    if (initiator.hero?.specialtySpell === 'Bloodlust') {
      if (target.level <= 2) {
        target.attack += 3
      } else if (target.level <= 4) {
        target.attack += 2
      } else if (target.level <= 6) {
        target.attack += 1
      }
    }

    return target
  },

  /**
   * Frenzy increases creature attack and sets defense to 0
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Frenzy bonuses
   */
  frenzy: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (!initiator.hero || !initiator.hero.skills.fireMagic || initiator.hero.skills.fireMagic <= SkillLevels.Basic) {
      target.attack += target.defense
    } else if (initiator.hero.skills.fireMagic === 2) {
      target.attack += target.defense * 1.5
    } else if (initiator.hero.skills.fireMagic === 3) {
      target.attack += target.defense * 2
    }
    target.defense = 0

    return target
  },

  /**
   * Slayer increases creature attack against Dragons, Behemoths and Hydras, advanced level: Angels and Devils, expert level: Titans
   * @param {Object} sides Battle side (attacker or defender) who casts effect, opposite Battle side and target who apply effect
   * @return {CreatureInstance} Creature with Slayer bonuses
   */
  slayer: (sides: {
    initiator: DamageCalculatorBattleSide
    defender: DamageCalculatorBattleSide
    target: CreatureInstance
  }): CreatureInstance => {
    const { initiator, defender, target } = sides

    const slayerCreatures: Array<CreatureKey> = [
      'GreenDragon',
      'BoneDragon',
      'GhostDragon',
      'RedDragon',
      'Hydra',
      'ChaosHydra',
      'Behemoth',
      'AncientBehemoth',
      'FaerieDragon',
      'RustDragon',
      'CrystalDragon',
      'AzureDragon',
    ]

    if (initiator.hero && initiator.hero.skills.fireMagic) {
      if (initiator.hero.skills.fireMagic > 1) {
        slayerCreatures.push('Angel', 'Archangel', 'Devil', 'ArchDevil')
      }
      if (initiator.hero.skills.fireMagic > 2) {
        slayerCreatures.push('Giant', 'Titan', 'Firebird', 'SeaSerpent', 'Haspid')
      }
    }

    if (defender.creatures.find((defenderCreature) => slayerCreatures.indexOf(defenderCreature.key) !== -1)) {
      target.attack += 8
    }

    return target
  },

  /**
   * (Prayer increases creature attack, defense and speed)
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Prayer effect
   */
  prayer: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Prayer cannot be use on enemy creature')
    }

    if (!initiator.hero || !initiator.hero.skills.waterMagic || initiator.hero.skills.waterMagic <= SkillLevels.Basic) {
      target.attack += 2
      target.defense += 2
    } else if (initiator.hero.skills.waterMagic >= SkillLevels.Advanced) {
      target.attack += 2
      target.defense += 4
    }

    if (initiator.hero?.specialtySpell === 'Prayer') {
      if (target.level <= 2) {
        target.attack += 3
        target.defense += 3
      } else if (target.level <= 4) {
        target.attack += 2
        target.defense += 2
      } else if (target.level <= 6) {
        target.attack += 1
        target.defense += 1
      }
    }

    return target
  },

  /**
   * Precision increases ranged creature attack
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Precision bonuses
   */
  precision: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Precision cannot be use on enemy creature')
    }

    if (target.special?.ranged) {
      if (!initiator.hero || !initiator.hero.skills.airMagic || initiator.hero.skills.airMagic <= SkillLevels.Basic) {
        target.attack += 3
      } else if (initiator.hero.skills.airMagic >= SkillLevels.Advanced) {
        target.attack += 6
      }
    }

    if (initiator.hero?.specialtySpell === 'Precision') {
      if (target.level <= 2) {
        target.attack += 3
      } else if (target.level <= 4) {
        target.attack += 2
      } else if (target.level <= 6) {
        target.attack += 1
      }
    }

    return target
  },

  /**
   * Stone Skin increases creature defense
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Stone Skin bonuses
   */
  stoneSkin: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Stone Skin cannot be use on enemy creature')
    }

    if (!initiator.hero || !initiator.hero.skills.earthMagic || initiator.hero.skills.earthMagic <= SkillLevels.Basic) {
      target.defense += 3
    } else if (initiator.hero.skills.earthMagic >= SkillLevels.Advanced) {
      target.defense += 6
    }

    if (initiator.hero?.specialtySpell === 'StoneSkin') {
      if (target.level <= 2) {
        target.defense += 3
      } else if (target.level <= 4) {
        target.defense += 2
      } else if (target.level <= 6) {
        target.defense += 1
      }
    }

    return target
  },

  /**
   * Weakness reduces creature attack
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Weakness ray penalty
   */
  weakness: (sides: { defender: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { defender, target } = sides

    if (target === defender.activeCreature) {
      throw new Error('Weakness cannot be used on your own creature')
    }

    if (!defender.hero || !defender.hero.skills.waterMagic || defender.hero.skills.waterMagic <= SkillLevels.Basic) {
      target.attack -= 3
    } else if (defender.hero.skills.waterMagic >= SkillLevels.Advanced) {
      target.attack -= 6
    }

    if (defender.hero?.specialtySpell === 'Weakness') {
      if (target.level <= 2) {
        target.attack -= 3
      } else if (target.level <= 4) {
        target.attack -= 2
      } else if (target.level <= 6) {
        target.attack -= 1
      }
    }

    if (target.attack < 0) {
      target.attack = 0
    }

    return target
  },

  /**
   * Disrupting Ray reduces defense of a single creature
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Disrupting Ray penalty
   */
  disruptingRay: (sides: { defender: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { defender, target } = sides

    if (defender.activeCreature === target) {
      throw new Error('Disrupting Ray cannot be used on your own creature')
    }

    if (!defender.hero || !defender.hero.skills.airMagic || defender.hero.skills.airMagic <= SkillLevels.Basic) {
      target.defense -= 3
    } else if (defender.hero.skills.airMagic === 2) {
      target.defense -= 4
    } else if (defender.hero.skills.airMagic === 3) {
      target.defense -= 5
    }

    if (defender.hero?.specialtySpell === 'DisruptingRay') {
      target.defense -= 2
    }

    if (target.defense < 0) {
      target.defense = 0
    }

    return target
  },

  /**
   * Shield reduces damage taken from hand-to-hand attacks
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @return {CreatureInstance} Creature with Shield bonuses
   */
  shield: (sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance }): CreatureInstance => {
    const { initiator, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Shield cannot be use on enemy creature')
    }

    if (!initiator.hero || !initiator.hero.skills.earthMagic || initiator.hero.skills.earthMagic <= SkillLevels.Basic) {
      target.calculation.defenseMagicBonus += 0.15
    } else if (initiator.hero.skills.earthMagic >= SkillLevels.Advanced) {
      target.calculation.defenseMagicBonus += 0.3
    }

    return target
  },

  /**
   * Air Shield reduces damage taken from ranged attacks
   * @param {Object} sides Battle side (attacker or defender) who casts effect and target who apply effect
   * @param defender Battle side who deal damage
   * @return {CreatureInstance} Creature with Air Shield bonuses
   */
  airShield: (sides: {
    initiator: DamageCalculatorBattleSide
    defender: DamageCalculatorBattleSide
    target: CreatureInstance
  }): CreatureInstance => {
    const { initiator, defender, target } = sides

    if (target !== initiator.activeCreature) {
      throw new Error('Air Shield cannot be use on enemy creature')
    }

    if (defender.activeCreature?.special?.ranged) {
      if (!initiator.hero || !initiator.hero.skills.airMagic || initiator.hero.skills.airMagic < 2) {
        target.calculation.defenseMagicBonus += 0.25
      } else if (initiator.hero.skills.airMagic > 1) {
        target.calculation.defenseMagicBonus += 0.5
      }
    }

    return target
  },
}
