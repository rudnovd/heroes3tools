import type { HeroInstance } from './Hero'
import type { Spell } from './Spell'
import type { Terrain } from './Terrain'
import { creatures } from '@/assets/database/creatures'
import { Effects } from '@/modules/effects'
import { Modificators } from '@/modules/modificators'
import { spellsFunctionsMap } from '@/modules/spells'
import { CreatureInstance } from './Creature'
import { Creatures, Heroes, SecondarySkills, Spells } from './enums'

export type BattleSide = 'attacker' | 'defender'

export function getOppositeBattleSide(side: BattleSide): BattleSide {
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

    const attackerCreatureOriginal = creatures.find(creature => creature.id === this.attacker.activeCreature?.id)
    const defenderCreatureOriginal = creatures.find(creature => creature.id === this.defender.activeCreature?.id)
    if (!attackerCreatureOriginal || !defenderCreatureOriginal)
      throw new Error('Creature not found')

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
      modifiedAttackerCreature = this.calculateWithHeroModifiers(this.attacker.hero, modifiedAttackerCreature)
    }
    if (this.defender.hero) {
      modifiedDefenderCreature = this.calculateWithHeroModifiers(this.defender.hero, modifiedDefenderCreature)
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

    const isMachine = modifiedAttackerCreature.id === Creatures.Cannon || modifiedAttackerCreature.id === Creatures.Ballista
    if (this.attacker.hero?.skills.artillery && isMachine) {
      defenderCalculation.minDamage = Math.floor(defenderCalculation.minDamage * 0.4)
      defenderCalculation.maxDamage = Math.floor(defenderCalculation.maxDamage * 0.4)
      defenderCalculation.averageDamage = Math.floor(defenderCalculation.averageDamage * 0.4)
      defenderCalculation.minKills = Math.floor(defenderCalculation.minDamage / modifiedDefenderCreature.health)
      defenderCalculation.maxKills = Math.floor(defenderCalculation.maxDamage / modifiedDefenderCreature.health)
      defenderCalculation.averageKills = Math.floor(defenderCalculation.averageDamage / modifiedDefenderCreature.health)
    }
    if (this.defender.hero?.skills.artillery && isMachine) {
      attackerCalculation.minDamage = Math.floor(attackerCalculation.minDamage * 0.4)
      attackerCalculation.maxDamage = Math.floor(attackerCalculation.maxDamage * 0.4)
      attackerCalculation.averageDamage = Math.floor(attackerCalculation.averageDamage * 0.4)
      attackerCalculation.minKills = Math.floor(attackerCalculation.minDamage / modifiedAttackerCreature.health)
      attackerCalculation.maxKills = Math.floor(attackerCalculation.maxDamage / modifiedAttackerCreature.health)
      attackerCalculation.averageKills = Math.floor(attackerCalculation.averageDamage / modifiedAttackerCreature.health)
    }

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
    spell: Spell,
  ) {
    if (!attacker || !target)
      throw new Error('initiator and target required')

    let damage = 0
    if (this.hasSpellImmunity(target, spell))
      return damage

    let attackerCopy = JSON.parse(JSON.stringify(attacker))
    let defenderCopy = JSON.parse(JSON.stringify(defender))
    attackerCopy = this.getStatsReducing(attackerCopy, defenderCopy)
    defenderCopy = this.getStatsReducing(defenderCopy, attackerCopy)

    damage = spellsFunctionsMap[spell.id](attackerCopy)

    damage = this.calculateSpellBonuses(attackerCopy, target, spell, damage)
    damage = this.calculateSpellSpecialtyBonus(attackerCopy, target, spell, damage)

    if (target.special?.vulnerablesToSpells && target.special.vulnerablesToSpells.includes(spell.id)) {
      damage += damage
    }

    damage = this.calculateSpellReducing(attackerCopy, defenderCopy, target, spell, damage)

    // change Math.round logic (0.5 -> 0 instead 0.5 -> 1)
    return -Math.round(-damage)
  }

  private calculateWithHeroModifiers(hero: HeroInstance, target: CreatureInstance) {
    if (hero.specialtySpell)
      target = Modificators.heroSpecialtySpell(hero, target)

    target = Modificators.hero(hero, target)
    target = Modificators.heroSkills(hero, target)
    if (target.id === Creatures.Ballista || target.id === Creatures.Cannon) {
      target = Modificators.artillery(hero, target)
    }

    return target
  }

  private getStatsReducing(attacker: DamageCalculatorBattleSide, defender: DamageCalculatorBattleSide) {
    if (!attacker.hero || !defender.hero)
      return attacker

    const { interference } = attacker.hero.skills
    if (interference) {
      defender.hero.stats.power -= (defender.hero.stats.power / 100) * interference * 10
      if (attacker.hero.id === Heroes.Giselle) {
        defender.hero.stats.power -= (defender.hero.stats.power / 100) * attacker.hero.level * 5
      }
      defender.hero.stats.power = Math.ceil(defender.hero.stats.power)
    }

    return attacker
  }

  private calculateWithPositiveEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    if (!target.effects.length)
      return target
    else if (target.effects.find(effect => effect.id === Spells.AntiMagic))
      return target

    // Check for creature spell immunity
    for (const effect of target.effects) {
      if (target.special?.immunity?.find(spell => spell === effect.id))
        return target
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
      if (target.effects.find(creatureEffect => creatureEffect.id === effect.id)) {
        target = effect.effectFunction(attacker, target)
      }
    })

    if (target.effects.find(effect => effect.id === Spells.Slayer)) {
      target = Effects.slayer(attacker, this.defender, target)
    }

    if (target.effects.find(effect => effect.id === Spells.AirShield)) {
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
      if (target.effects.find(creatureEffect => creatureEffect.id === effect.id)) {
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

    let damageBonus = 0
    let defenseBonus = 0
    let defenseMagicBonus = 0
    let rangePenalty = attacker.rangePenalty ? 0.5 : 0

    if (attacker.attack > defender.defense) {
      // Max attack cap = 3
      damageBonus = 0.05 * (attacker.attack - defender.defense)
      if (damageBonus > 3)
        damageBonus = 3
      damageBonus = 1 + damageBonus + attacker.calculation.damageBonus
    }
    else if (attacker.attack === defender.defense) {
      damageBonus = 1 + attacker.calculation.damageBonus
    }
    else if (attacker.attack < defender.defense) {
      damageBonus = (defender.defense - attacker.attack) * 0.025
      if (damageBonus > 0.7)
        damageBonus = 0.7
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

  /**
   * Check creature for immunity to spell
   * @param target Creature who accept spell
   * @param spell Spell that cast to target
   * @return {boolean} true if creature has immunity to spell
   */
  private hasSpellImmunity(target: CreatureInstance, spell: Spell): boolean {
    // If creature with Antimagic effect spell
    if (target.effects.find(effect => effect.id === Spells.AntiMagic))
      return true

    // Creatures with full magic immunity
    if (target.special?.immunityToSpellLevels?.includes(spell.level))
      return true

    // Creature with immunity to spells list
    if (target.special?.immunity?.includes(spell.id))
      return true

    if (target.special?.immunityToSpellElement?.includes(spell.element.id))
      return true

    const onlyUndeadSpells = [Spells.AnimateDead, Spells.DestroyUndead]
    const onlyLivingSpells = [Spells.DeathRipple, Spells.Resurrection, Spells.Bless]

    // If spell in list spells that not affected to undead creatures
    if (target.special?.undead && onlyLivingSpells.includes(spell.id))
      return true

    // If spell in list spells that not affected to living creatures
    if (!target.special?.undead && onlyUndeadSpells.includes(spell.id))
      return true

    if (spell.id === Spells.Resurrection && target.special?.nonLiving)
      return true

    const warMachines = [Creatures.Ballista, Creatures.Cannon]
    const warMachinesImmunities = [Spells.Implosion, Spells.Resurrection, Spells.DeathRipple, Spells.DestroyUndead]
    if (warMachinesImmunities.includes(spell.id) && warMachines.includes(target.id))
      return true

    return false
  }

  private calculateSpellReducing(
    _attacker: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number,
  ) {
    if (target.special?.spellDamageResistance)
      damage -= (damage * target.special.spellDamageResistance) / 100

    if (spell.element.id !== 'neutral') {
      const protectionsIds = [
        Spells.ProtectionFromFire,
        Spells.ProtectionFromWater,
        Spells.ProtectionFromEarth,
        Spells.ProtectionFromAir,
      ]

      const effects = target.effects.filter(effect => protectionsIds.includes(effect.id))

      if (effects.find((effect: Spell) => effect.element.id === spell.element.id)) {
        const schoolLevel = defender.hero?.skills[spell.element.id] || 0
        damage -= schoolLevel > 1 ? damage * 0.75 : damage * 0.5
      }
    }

    return damage
  }

  private calculateSpellSpecialtyBonus(
    initiator: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number,
  ) {
    if (!initiator.hero)
      return damage

    const { specialtySpell } = initiator.hero

    if (spell.id === Spells.MagicArrow && specialtySpell === Spells.MagicArrow) {
      damage += damage / 2
    }
    else if (spell.id === Spells.Firewall && specialtySpell === Spells.Firewall) {
      damage += damage * 0.25
    }
    else if (spell.id === specialtySpell) {
      let bonus: number
      if ([Spells.MeteorShower, Spells.ChainLightning, Spells.Resurrection, Spells.AnimateDead].includes(spell.id)) {
        bonus = Math.floor(initiator.hero.level / target.level) * 0.05
      }
      else {
        bonus = Math.floor(initiator.hero.level / target.level) * 0.1
      }
      if (bonus) {
        damage += Math.ceil(damage * bonus)
      }
    }

    return damage
  }

  private calculateSpellBonuses(
    initiator: DamageCalculatorBattleSide,
    _target: CreatureInstance,
    _spell: Spell,
    damage: number,
  ) {
    if (!initiator.hero)
      return damage

    if (initiator.hero.skills.sorcery) {
      let sorceryBonus = initiator.hero.skills.sorcery * 0.1

      if (initiator.hero.specialtySkill === SecondarySkills.Sorcery) {
        const bonus = initiator.hero.level * 0.05
        const MAX_SORCERY_BONUS = 0.96
        sorceryBonus += initiator.hero.level * bonus > MAX_SORCERY_BONUS ? MAX_SORCERY_BONUS : bonus
      }

      damage += damage * sorceryBonus
    }

    return damage
  }
}
