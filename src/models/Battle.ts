import { Effects } from '@/modules/effects'
import { Modificators } from '@/modules/modificators'
import type { CreatureInstance } from './Creature'
import { Spells } from './enums'
import type { HeroInstance } from './Hero'
import type { Terrain } from './Terrain'

export type BattleSide = 'attacker' | 'defender'

export interface DamageCalculatorBattleSide {
  hero: HeroInstance | null
  creatures: Array<CreatureInstance>
  activeCreature: CreatureInstance | null
  terrain: Terrain | null
}

export class Battle {
  attacker: DamageCalculatorBattleSide
  defender: DamageCalculatorBattleSide

  constructor(attacker?: DamageCalculatorBattleSide, defender?: DamageCalculatorBattleSide) {
    this.attacker = attacker || {
      hero: null,
      creatures: [],
      terrain: null,
      activeCreature: null,
    }
    this.defender = defender || {
      hero: null,
      creatures: [],
      terrain: null,
      activeCreature: null,
    }
  }

  public calculate(): undefined | { attacker: DamageCalculatorBattleSide; defender: DamageCalculatorBattleSide } {
    if (!this.attacker.activeCreature || !this.defender.activeCreature) return

    const attackerCreature = this.calculateCreatureValues(this.attacker, this.defender)
    const defenderCreature = this.calculateCreatureValues(this.defender, this.attacker)

    if (!attackerCreature || !defenderCreature) return

    const attackerCalculation = this.calculateFinalValues(attackerCreature, defenderCreature)
    const defenderCalculation = this.calculateFinalValues(defenderCreature, attackerCreature)

    if (attackerCalculation) {
      this.attacker.activeCreature.calculation = {
        ...this.attacker.activeCreature.calculation,
        ...attackerCalculation,
      }
    }

    if (defenderCalculation) {
      this.defender.activeCreature.calculation = {
        ...this.defender.activeCreature.calculation,
        ...defenderCalculation,
      }
    }

    return {
      attacker: this.attacker,
      defender: this.defender,
    }
  }

  private calculateCreatureValues(attacker: DamageCalculatorBattleSide, defender: DamageCalculatorBattleSide) {
    let currentAttackerCreature = attacker.activeCreature
    if (!currentAttackerCreature || !defender.activeCreature) return

    currentAttackerCreature.calculation = {
      averageDamage: 0,
      averageKills: 0,
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      maxDamage: 0,
      maxKills: 0,
      minDamage: 0,
      minKills: 0,
    }

    currentAttackerCreature = this.calculateWithEffects(attacker, currentAttackerCreature)

    if (attacker.terrain) {
      currentAttackerCreature = Modificators.terrain(attacker.terrain, currentAttackerCreature)
    }

    if (attacker.hero) {
      currentAttackerCreature = Modificators.heroSpecialtySpell(attacker.hero, currentAttackerCreature)
      currentAttackerCreature = Modificators.hero(attacker.hero, currentAttackerCreature)
      currentAttackerCreature = Modificators.heroSkills(attacker.hero, currentAttackerCreature)
      currentAttackerCreature = Modificators.isArtillery(attacker.hero, currentAttackerCreature)
    }

    currentAttackerCreature = Modificators.creatureHate(currentAttackerCreature, defender.activeCreature)
    currentAttackerCreature = Modificators.creatureSpecial(currentAttackerCreature, defender.activeCreature)

    return currentAttackerCreature
  }

  private calculateWithEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    if (!target.effects.length) return target

    if (target.effects.find((effect) => effect.id === Spells.Bless)) {
      target = Effects.bless(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Curse)) {
      target = Effects.curse(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Bloodlust)) {
      target = Effects.bloodlust(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Frenzy)) {
      target = Effects.frenzy(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Frenzy)) {
      target = Effects.slayer(attacker, this.defender, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Prayer)) {
      target = Effects.prayer(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Precision)) {
      target = Effects.precision(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.StoneSkin)) {
      target = Effects.stoneSkin(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Weakness)) {
      target = Effects.weakness(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.Shield)) {
      target = Effects.shield(attacker, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.AirShield)) {
      target = Effects.airShield(attacker, target)
    }

    return target
  }

  private calculateFinalValues(attacker: CreatureInstance, defender: CreatureInstance) {
    // If ATTACKER attack > DEFENDER defense:
    // ATTACKER units count * ATTACKER unit damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

    // If DEFENDER attack > ATTACKER defense:
    // DEFENDER units count * DEFENDER unit damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

    // If DEFENDER attack < ATTACKER defense:
    // DEFENDER units count * DEFENDER unit damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))

    let damageBonus = 0,
      defenseBonus = 0,
      defenseMagicBonus = 0,
      difference = 0

    if (attacker.attack > defender.defense) {
      // Max attack cap = 3
      difference = Math.abs(0.05 * (attacker.attack - defender.defense))
      if (difference > 3) difference = 3
      damageBonus = 1 + difference + attacker.calculation.damageBonus
    } else if (attacker.attack === defender.defense) {
      damageBonus = 1 + attacker.calculation.damageBonus
    } else if (attacker.attack < defender.defense) {
      difference = Math.abs((defender.defense - attacker.attack) * 0.025)
      if (difference > 0.7) difference = 0.7
      damageBonus = 1 - difference + attacker.calculation.damageBonus
    }
    defenseBonus = 1 - defender.calculation.defenseBonus
    defenseMagicBonus = 1 - defender.calculation.defenseMagicBonus

    let minDamage = Math.abs(attacker.minDamage * (damageBonus * defenseBonus * defenseMagicBonus))
    let maxDamage = Math.abs(attacker.maxDamage * (damageBonus * defenseBonus * defenseMagicBonus))
    let averageDamage = Math.abs((minDamage + maxDamage) / 2)

    minDamage = Math.floor(minDamage * attacker.count)
    maxDamage = Math.floor(maxDamage * attacker.count)
    averageDamage = Math.floor(averageDamage * attacker.count)

    return {
      minDamage,
      maxDamage,
      averageDamage,
      minKills: Math.floor(minDamage / defender.health),
      maxKills: Math.floor(maxDamage / defender.health),
      averageKills: Math.floor(averageDamage / defender.health),
    }
  }
}
