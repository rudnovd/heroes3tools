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

  public calculate() {
    if (!this.attacker.activeCreature || !this.defender.activeCreature) return

    // clear calculation values
    this.attacker.activeCreature.calculation = {
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      minDamage: 0,
      maxDamage: 0,
      averageDamage: 0,
      minKills: 0,
      maxKills: 0,
      averageKills: 0,
    }

    // clear calculation values
    this.defender.activeCreature.calculation = {
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      minDamage: 0,
      maxDamage: 0,
      averageDamage: 0,
      minKills: 0,
      maxKills: 0,
      averageKills: 0,
    }

    // make copy of attacker active creature with modified stats from positive and negative spells
    let modifiedAttackerCreature = this.calculateWithPositiveEffects(this.attacker, this.attacker.activeCreature)
    modifiedAttackerCreature = this.calculateWithNegativeEffects(this.defender, modifiedAttackerCreature)

    // make copy of defender active creature with modified stats from positive and negative spells
    let modifiedDefenderCreature = this.calculateWithPositiveEffects(this.defender, this.defender.activeCreature)
    modifiedDefenderCreature = this.calculateWithNegativeEffects(this.attacker, modifiedDefenderCreature)

    if (this.attacker.hero) {
      modifiedAttackerCreature = this.calculateWithHeroModificators(this.attacker.hero, modifiedAttackerCreature)
    }
    if (this.defender.hero) {
      modifiedDefenderCreature = this.calculateWithHeroModificators(this.defender.hero, modifiedDefenderCreature)
    }

    if (this.attacker.terrain) {
      modifiedAttackerCreature = Modificators.terrain(this.attacker.terrain, modifiedAttackerCreature)
    }

    if (modifiedAttackerCreature.hates?.length) {
      modifiedAttackerCreature = Modificators.creatureHate(modifiedAttackerCreature, modifiedDefenderCreature)
    }
    if (modifiedDefenderCreature.hates?.length) {
      modifiedDefenderCreature = Modificators.creatureHate(modifiedDefenderCreature, modifiedAttackerCreature)
    }

    if (modifiedAttackerCreature.special) {
      modifiedAttackerCreature = Modificators.creatureSpecial(modifiedAttackerCreature, modifiedDefenderCreature)
    }
    if (modifiedDefenderCreature.special) {
      modifiedDefenderCreature = Modificators.creatureSpecial(modifiedDefenderCreature, modifiedAttackerCreature)
    }

    const attackerCalculation = this.calculateDamageValues(modifiedAttackerCreature, modifiedDefenderCreature)
    const defenderCalculation = this.calculateDamageValues(modifiedDefenderCreature, modifiedAttackerCreature)

    this.attacker.activeCreature.calculation = {
      ...this.attacker.activeCreature.calculation,
      ...attackerCalculation,
    }

    this.defender.activeCreature.calculation = {
      ...this.defender.activeCreature.calculation,
      ...defenderCalculation,
    }

    return {
      attacker: this.attacker,
      defender: this.defender,
    }
  }

  private calculateWithHeroModificators(hero: HeroInstance, target: CreatureInstance) {
    target = Modificators.heroSpecialtySpell(hero, target)
    target = Modificators.hero(hero, target)
    target = Modificators.heroSkills(hero, target)
    target = Modificators.isArtillery(hero, target)

    return target
  }

  private calculateWithPositiveEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    if (!target.effects.length) return target
    else if (target.effects.find((effect) => effect.id === Spells.AntiMagic)) return target

    // Check for creature spell immunity
    for (const effect of target.effects) {
      if (target.special?.immunity?.find((spell) => spell.id === effect.id)) return target
    }

    const positiveEffects: Array<{
      id: number
      effectFunction: (initiator: DamageCalculatorBattleSide, target: CreatureInstance) => CreatureInstance
    }> = [
      {
        id: Spells.Bless,
        effectFunction: Effects.bless,
      },
      {
        id: Spells.Bloodlust,
        effectFunction: Effects.bloodlust,
      },
      {
        id: Spells.Prayer,
        effectFunction: Effects.prayer,
      },
      {
        id: Spells.Precision,
        effectFunction: Effects.precision,
      },
      {
        id: Spells.StoneSkin,
        effectFunction: Effects.stoneSkin,
      },
      {
        id: Spells.Shield,
        effectFunction: Effects.shield,
      },
    ]

    positiveEffects.forEach((effect) => {
      if (target.effects.find((creatureEffect) => creatureEffect.id === effect.id)) {
        target = effect.effectFunction(attacker, target)
      }
    })

    if (target.effects.find((effect) => effect.id === Spells.Frenzy)) {
      target = Effects.slayer(attacker, this.defender, target)
    }

    if (target.effects.find((effect) => effect.id === Spells.AirShield)) {
      target = Effects.airShield(attacker, this.defender, target)
    }

    return target
  }

  private calculateWithNegativeEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    const negativeEffects: Array<{
      id: number
      effectFunction: (initiator: DamageCalculatorBattleSide, target: CreatureInstance) => CreatureInstance
    }> = [
      {
        id: Spells.Curse,
        effectFunction: Effects.curse,
      },
      {
        id: Spells.Weakness,
        effectFunction: Effects.weakness,
      },
      {
        id: Spells.DisruptingRay,
        effectFunction: Effects.disruptingRay,
      },
    ]

    negativeEffects.forEach((effect) => {
      if (target.effects.find((creatureEffect) => creatureEffect.id === effect.id)) {
        target = effect.effectFunction(attacker, target)
      }
    })

    return target
  }

  private calculateDamageValues(attacker: CreatureInstance, defender: CreatureInstance) {
    // If ATTACKER attack > DEFENDER defense:
    // damageBonus = ATTACKER creatures count * ATTACKER creature damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

    // If DEFENDER attack > ATTACKER defense:
    // damageBonus = DEFENDER creatures count * DEFENDER creature damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

    // If DEFENDER attack < ATTACKER defense:
    // damageBonus = DEFENDER creatures count * DEFENDER creature damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))

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
