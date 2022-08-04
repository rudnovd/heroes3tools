import { creatures } from '@/assets/database/creatures'
import { Effects } from '@/modules/effects'
import { Modificators } from '@/modules/modificators'
import { spellsFunctionsMap } from '@/modules/spells'
import { CreatureInstance } from './Creature'
import { Creatures, SkillLevels, Spells } from './enums'
import type { HeroInstance } from './Hero'
import type { Spell } from './Spell'
import type { Terrain } from './Terrain'

export type BattleSide = 'attacker' | 'defender'

export function getOppositeBattleSide(side: BattleSide): string {
  return side === 'attacker' ? 'defender' : 'attacker'
}

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
      name: this.attacker.activeCreature.name,
    }
    this.defender.activeCreature = {
      ...new CreatureInstance(defenderCreatureOriginal),
      effects: this.defender.activeCreature.effects,
      count: this.defender.activeCreature.count,
      rangePenalty: this.defender.activeCreature.rangePenalty,
      name: this.defender.activeCreature.name,
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

  public cast(
    attacker: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell
  ) {
    if (!attacker || !target) throw new Error('initiator and target required')

    let damage = 0
    if (this.hasSpellImmunity(target, spell)) return damage
    damage = spellsFunctionsMap[spell.id](attacker)
    damage = this.calculateSpellSpecialtyBonus(attacker, target, spell, damage)
    damage = this.calculateSpellBonuses(attacker, target, spell, damage)
    damage = this.calculateSpellReducing(attacker, defender, target, spell, damage)

    return Math.floor(damage)
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

  private hasSpellImmunity(target: CreatureInstance, spell: Spell) {
    if (target.effects.find((effect) => effect.id === Spells.AntiMagic)) return true

    const creaturesWithImmunity = [
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.FireElemental,
      Creatures.EnergyElemental,
    ]
    if (creaturesWithImmunity.includes(target.id)) return true

    const fireImmunityCreatures = [Creatures.Efreet, Creatures.EfreetSultan]
    if (fireImmunityCreatures.includes(target.id)) return true

    const threeSpellLevelImmunityCreatures = [Creatures.GreenDragon, Creatures.RedDragon]
    if (threeSpellLevelImmunityCreatures.includes(target.id) && spell.level <= 3) return true

    const fourSpellLevelImmunityCreatures = [Creatures.GoldDragon]
    if (fourSpellLevelImmunityCreatures.includes(target.id) && spell.level <= 4) return true

    if (
      (target.id === Creatures.AirElemental || target.id === Creatures.StormElemental) &&
      spell.id === Spells.MeteorShower
    )
      return true

    if (
      (target.id === Creatures.WaterElemental || target.id === Creatures.IceElemental) &&
      (spell.id === Spells.IceBolt || spell.id === Spells.FrostRing)
    )
      return true

    if (
      (target.id === Creatures.EarthElemental || target.id === Creatures.MagmaElemental) &&
      (spell.id === Spells.LightningBolt || spell.id === Spells.ChainLightning || spell.id === Spells.Armageddon)
    )
      return true

    return false
  }

  private calculateSpellReducing(
    attacker: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number
  ) {
    if (target.id === Creatures.StoneGolem) damage -= (damage / 100) * 50
    else if (target.id === Creatures.IronGolem) damage -= (damage / 100) * 75
    else if (target.id === Creatures.SteelGolem) damage -= (damage / 100) * 80
    else if (target.id === Creatures.GoldGolem) damage -= (damage / 100) * 85
    else if (target.id === Creatures.DiamondGolem) damage -= (damage / 100) * 95

    if (spell.element !== 'Neutral') {
      const protectionsIds = [
        Spells.ProtectionFromFire,
        Spells.ProtectionFromWater,
        Spells.ProtectionFromEarth,
        Spells.ProtectionFromAir,
      ]

      const effects = target.effects.filter((effect) => protectionsIds.includes(effect.id))

      if (effects.find((effect: Spell) => effect.element === spell.element)) {
        const schoolLevel = defender.hero?.skills[spell.element.toLocaleLowerCase()] || 0

        if (!defender.hero || !schoolLevel) {
          damage -= (damage / 100) * 50
        } else if (schoolLevel >= 1) {
          damage -= (damage / 100) * 75
        }
      }
    }

    return damage
  }

  private calculateSpellSpecialtyBonus(
    initiator: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number
  ) {
    if (!initiator.hero) return damage

    const { specialtySpell } = initiator.hero
    let bonus = 0

    if (spell.id === Spells.MagicArrow && specialtySpell === Spells.MagicArrow) {
      bonus = damage / 2
    } else if (spell.id === Spells.Firewall && specialtySpell === Spells.Firewall) {
      bonus = damage
    } else if (spell.id === specialtySpell) {
      bonus = 1 + (initiator.hero.level / target.level) * 0.03
    }

    return damage + bonus
  }

  private calculateSpellBonuses(
    initiator: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number
  ) {
    if (!initiator.hero) return damage

    let bonus = 0
    if (initiator.hero.skills.sorcery && initiator.hero.skills.sorcery <= SkillLevels.Basic) {
      bonus += (damage / 100) * 5
    } else if (initiator.hero.skills.sorcery && initiator.hero.skills.sorcery <= SkillLevels.Advanced) {
      bonus += (damage / 100) * 10
    } else if (initiator.hero.skills.sorcery && initiator.hero.skills.sorcery <= SkillLevels.Expert) {
      bonus += (damage / 100) * 15
    }

    return damage + bonus
  }
}
