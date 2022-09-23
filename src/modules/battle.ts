import creatures from '@/assets/data/creatures'
import spells from '@/assets/data/spells'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import type { HeroInstance } from '@/modules/hero'
import { Modificators } from '@/modules/modificators'
import { spellsFunctionsMap } from '@/modules/spells'
import type { BattleSide, CreatureKey, DamageCalculatorBattleSide, Spell, SpellKey } from '@/types'

export function getOppositeBattleSide(side: BattleSide): BattleSide {
  return side === 'attacker' ? 'defender' : 'attacker'
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

    const attackerCreatureOriginal = creatures.find((creature) => creature.key === this.attacker.activeCreature?.key)
    const defenderCreatureOriginal = creatures.find((creature) => creature.key === this.defender.activeCreature?.key)
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

    let attackerCopy = JSON.parse(JSON.stringify(attacker))
    let defenderCopy = JSON.parse(JSON.stringify(defender))
    attackerCopy = this.getStatsReducing(attackerCopy, defenderCopy)
    defenderCopy = this.getStatsReducing(defenderCopy, attackerCopy)

    damage = spellsFunctionsMap[spell.key](attackerCopy)

    damage = this.calculateSpellBonuses(attackerCopy, target, spell, damage)
    damage = this.calculateSpellSpecialtyBonus(attackerCopy, target, spell, damage)

    if (target.special?.vulnerablesToSpells && target.special.vulnerablesToSpells.includes(spell.key)) {
      damage += damage
    }

    damage = this.calculateSpellReducing(attackerCopy, defenderCopy, target, spell, damage)

    // change Math.round logic (0.5 -> 0 instead 0.5 -> 1)
    return -Math.round(-damage)
  }

  private calculateWithHeroModificators(hero: HeroInstance, target: CreatureInstance) {
    if (hero.specialtySpell) target = Modificators.heroSpecialtySpell(hero, target)
    target = Modificators.hero(hero, target)
    target = Modificators.heroSkills(hero, target)
    if (target.key === 'Ballista' || target.key === 'Cannon') {
      target = Modificators.artillery(hero, target)
    }

    return target
  }

  private getStatsReducing(attacker: DamageCalculatorBattleSide, defender: DamageCalculatorBattleSide) {
    if (!attacker.hero || !defender.hero) return attacker

    const { interference } = attacker.hero.skills
    if (interference) {
      defender.hero.stats.power -= (defender.hero.stats.power / 100) * interference * 10
      if (attacker.hero.key === 'Giselle') {
        defender.hero.stats.power -= (defender.hero.stats.power / 100) * attacker.hero.level * 5
      }
      defender.hero.stats.power = Math.ceil(defender.hero.stats.power)
    }

    return attacker
  }

  private calculateWithPositiveEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    if (!Object.keys(target.effects).length) return target
    // else if (target.effects.find((effect) => effect.id === Spells.AntiMagic)) return target
    else if (target.effects['AntiMagic']) return target

    // Check for creature spell immunity
    for (const effect in target.effects) {
      if (target.special?.immunity?.find((spell) => spell === effect)) return target
    }

    const positiveEffects = {
      Bless: Effects.bless,
      Bloodlust: Effects.bloodlust,
      Frenzy: Effects.frenzy,
      Prayer: Effects.prayer,
      Precision: Effects.precision,
      StoneSkin: Effects.stoneSkin,
      Shield: Effects.shield,
    }

    for (const key in positiveEffects) {
      if (target.effects[key]) {
        const camelCaseKey = key[0].toLocaleLowerCase() + key.slice(1, key.length)
        target = Effects[camelCaseKey](attacker, target)
      }
    }

    if (target.effects.Slayer) {
      target = Effects.slayer(attacker, this.defender, target)
    }

    if (target.effects.AirShield) {
      target = Effects.airShield(attacker, this.defender, target)
    }

    return target
  }

  private calculateWithNegativeEffects(attacker: DamageCalculatorBattleSide, target: CreatureInstance) {
    const negativeEffects = {
      Curse: Effects.curse,
      Weakness: Effects.weakness,
      DisruptingRay: Effects.disruptingRay,
    }

    for (const key in negativeEffects) {
      if (target.effects[key]) {
        target = negativeEffects[key](attacker, target)
      }
    }

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

  /**
   * Check creature for immunity to spell
   * @param target Creature who accept spell
   * @param spell Spell that cast to target
   * @return {Boolean} true if creature has immunity to spell
   */
  private hasSpellImmunity(target: CreatureInstance, spell: Spell): boolean {
    // If creature with Antimagic effect spell
    if (target.effects.AntiMagic) return true

    // Creatures with full magic immunity
    if (target.special?.immunityToSpellLevels?.includes(spell.level)) return true

    // Creature with immunity to spells list
    if (target.special?.immunity?.includes(spell.key)) return true

    if (target.special?.immunityToSpellElement?.includes(spell.element.id)) return true

    const onlyUndeadSpells: Array<SpellKey> = ['AnimateDead', 'DestroyUndead']
    const onlyLivingSpells: Array<SpellKey> = ['DeathRipple', 'Resurrection', 'Bless']

    // If spell in list spells that not affected to undead creatures
    if (target.special?.undead && onlyLivingSpells.includes(spell.key)) return true

    // If spell in list spells that not affected to living creatures
    if (!target.special?.undead && onlyUndeadSpells.includes(spell.key)) return true

    if (spell.key === 'Resurrection' && target.special?.nonLiving) return true

    const warMachines: Array<CreatureKey> = ['Ballista', 'Cannon']
    const warMachinesImmunities: Array<SpellKey> = ['Implosion', 'Resurrection', 'DeathRipple', 'DestroyUndead']
    if (warMachinesImmunities.includes(spell.key) && warMachines.includes(target.key)) return true

    return false
  }

  private calculateSpellReducing(
    _attacker: DamageCalculatorBattleSide,
    defender: DamageCalculatorBattleSide,
    target: CreatureInstance,
    spell: Spell,
    damage: number
  ) {
    if (target.special?.spellDamageResistance) damage -= (damage * target.special.spellDamageResistance) / 100

    if (spell.element.id !== 'neutral') {
      const protectionsSpellsKeys: Array<SpellKey> = [
        'ProtectionFromFire',
        'ProtectionFromWater',
        'ProtectionFromEarth',
        'ProtectionFromAir',
      ]

      const creatureProtections: Array<Spell> = []
      for (const key in target.effects) {
        if (protectionsSpellsKeys.includes(key as SpellKey)) creatureProtections.push(spells[key])
      }

      if (creatureProtections.find((s) => s.element === spell.element)) {
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
    damage: number
  ) {
    if (!initiator.hero) return damage

    const { specialtySpell } = initiator.hero

    if (spell.key === 'MagicArrow' && specialtySpell === 'MagicArrow') {
      damage += damage / 2
    } else if (spell.key === 'FireWall' && specialtySpell === 'FireWall') {
      damage += damage
    } else if (spell.key === specialtySpell) {
      const bonus = Math.floor(initiator.hero.level / target.level) * 0.03
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
    damage: number
  ) {
    if (!initiator.hero) return damage

    if (initiator.hero.skills.sorcery) {
      let sorceryBonus = initiator.hero.skills.sorcery * 0.05

      if (initiator.hero.specialtySkill === 'Sorcery') {
        sorceryBonus += initiator.hero.level * 0.05
      }

      // Max sorcery bonus
      if (sorceryBonus > 0.96) {
        sorceryBonus = 0.96
      }

      damage += damage * sorceryBonus
    }

    return damage
  }
}
