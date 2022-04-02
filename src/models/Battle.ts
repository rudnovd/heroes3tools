import { creatures } from '@/assets/database/creatures'
import { Effects } from '@/modules/effects'
import { Modificators } from '@/modules/modificators'
import { CreatureInstance } from './Creature'
import { Creatures, Spells } from './enums'
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
    if (!this.attacker.activeCreature || !this.defender.activeCreature) {
      throw new Error('Calculate function require attacker and defender active creatures')
    }

    const attackerCreatureOriginal = creatures.find((creature) => creature.id === this.attacker.activeCreature?.id)
    const defenderCreatureOriginal = creatures.find((creature) => creature.id === this.defender.activeCreature?.id)
    if (!attackerCreatureOriginal || !defenderCreatureOriginal) throw new Error()

    // clear active creatures values
    this.attacker.activeCreature = {
      ...new CreatureInstance(attackerCreatureOriginal),
      effects: this.attacker.activeCreature.effects,
      count: this.attacker.activeCreature.count,
      rangePenalty: this.attacker.activeCreature.rangePenalty,
    }
    this.defender.activeCreature = {
      ...new CreatureInstance(defenderCreatureOriginal),
      effects: this.defender.activeCreature.effects,
      count: this.defender.activeCreature.count,
      rangePenalty: this.attacker.activeCreature.rangePenalty,
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

    if (this.attacker.terrain && this.defender.terrain) {
      modifiedAttackerCreature = Modificators.terrain(this.attacker.terrain, modifiedAttackerCreature)
      modifiedDefenderCreature = Modificators.terrain(this.defender.terrain, modifiedDefenderCreature)
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

    this.attacker.activeCreature = {
      ...this.attacker.activeCreature,
      ...modifiedAttackerCreature,
      calculation: {
        ...this.attacker.activeCreature.calculation,
        ...attackerCalculation,
      },
    }

    this.defender.activeCreature = {
      ...this.defender.activeCreature,
      ...modifiedDefenderCreature,
      calculation: {
        ...this.defender.activeCreature.calculation,
        ...defenderCalculation,
      },
    }

    return {
      attacker: {
        ...this.attacker,
        activeCreature: this.attacker.activeCreature,
      },
      defender: {
        ...this.defender,
        activeCreature: this.defender.activeCreature,
      },
    }
  }

  private calculateWithHeroModificators(hero: HeroInstance, target: CreatureInstance) {
    if (hero.specialtySpell) target = Modificators.heroSpecialtySpell(hero, target)
    target = Modificators.hero(hero, target)
    target = Modificators.heroSkills(hero, target)
    if (target.id === Creatures.Ballista || target.id === Creatures.Cannon) {
      target = Modificators.artillery(hero, target)
    }

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
        id: Spells.Frenzy,
        effectFunction: Effects.frenzy,
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

    if (target.effects.find((effect) => effect.id === Spells.Slayer)) {
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
      rangePenalty = attacker.rangePenalty ? 0.5 : 0

    if (attacker.attack > defender.defense) {
      // Max attack cap = 3
      damageBonus = 0.05 * (attacker.attack - defender.defense)
      if (damageBonus > 3) damageBonus = 3
      damageBonus = 1 + damageBonus + attacker.calculation.damageBonus
    } else if (attacker.attack === defender.defense) {
      damageBonus = 1 + attacker.calculation.damageBonus
    } else if (attacker.attack < defender.defense) {
      damageBonus = (defender.defense - attacker.attack) * 0.025
      if (damageBonus > 0.7) damageBonus = 0.7
      damageBonus = 1 - damageBonus + attacker.calculation.damageBonus
    }
    defenseBonus = 1 - defender.calculation.defenseBonus
    defenseMagicBonus = 1 - defender.calculation.defenseMagicBonus
    rangePenalty = 1 - rangePenalty
    const totalBonus = damageBonus * defenseBonus * defenseMagicBonus * rangePenalty

    const minDamage = Math.floor(attacker.minDamage * totalBonus * attacker.count)
    const maxDamage = Math.floor(attacker.maxDamage * totalBonus * attacker.count)
    const averageDamage = Math.floor((minDamage + maxDamage) / 2)

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
