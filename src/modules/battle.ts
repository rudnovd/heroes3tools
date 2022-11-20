import spells from '@/assets/data/spells'
import type { CreatureInstance } from '@/modules/creature'
import type { BattleSide, DamageCalculatorBattleSide, Spell, SpellKey, Terrain } from '@/types'
import { HeroInstance } from './hero'
import { Skills } from './skills'

export function getOppositeBattleSide(side: BattleSide): BattleSide {
  return side === 'attacker' ? 'defender' : 'attacker'
}
export class Battle {
  attacker: DamageCalculatorBattleSide
  defender: DamageCalculatorBattleSide
  terrain: Terrain | { key: 'FakeTerrain'; name: 'FakeTerrain' }
  activeSide: BattleSide

  constructor(battle: {
    attacker: Partial<DamageCalculatorBattleSide> & { activeCreature: CreatureInstance }
    defender: Partial<DamageCalculatorBattleSide> & { activeCreature: CreatureInstance }
    terrain?: Terrain
    activeSide?: BattleSide
  }) {
    this.attacker = {
      hero: battle?.attacker?.hero || new HeroInstance('FakeHero'),
      creatures: battle?.attacker?.creatures || [],
      activeCreature: battle.attacker.activeCreature,
    }
    this.defender = {
      hero: battle?.defender?.hero || new HeroInstance('FakeHero'),
      creatures: battle?.defender?.creatures || [],
      activeCreature: battle.defender.activeCreature,
    }
    this.terrain = battle?.terrain || { key: 'FakeTerrain', name: 'FakeTerrain' }
    this.activeSide = battle?.activeSide || 'attacker'

    if (this.attacker.activeCreature && this.defender.activeCreature) {
      this.calculate()
    }
  }

  public calculate() {
    for (const side in { attacker: this.attacker, defender: this.defender }) {
      this.activeSide = side as BattleSide
      this.calculateCreature(this[side].activeCreature)
    }

    for (const side in { attacker: this.attacker, defender: this.defender }) {
      this.activeSide = side as BattleSide
      this[side].activeCreature.calculation = {
        ...this[side].activeCreature.calculation,
        ...this.calculateDamageValues(),
      }
    }

    this.activeSide = 'attacker'

    return {
      attacker: this.attacker.activeCreature.calculation,
      defender: this.defender.activeCreature.calculation,
    }
  }

  public calculateCreature(target: CreatureInstance) {
    const attacker = this[this.activeSide]
    const defender = this[getOppositeBattleSide(this.activeSide)]
    const targetEffects = target.effects
    target.reset()
    target.effects = targetEffects

    for (const effect in target.effects) {
      target = attacker.hero.cast(target.effects[effect], { initiator: attacker, target, defender })
    }

    if (this.terrain.key === target.nativeTerrain) {
      target.attack++
      target.defense++
    }

    const hero = attacker.hero
    if (hero.specialtyUnit?.includes(target.key)) {
      target.attack += Math.ceil(Math.floor(hero.level / target.level) * (target.attack * 0.05))
      target.defense += Math.ceil(Math.floor(hero.level / target.level) * (target.defense * 0.05))
      target.speed++
    }

    target.attack += hero.stats.attack
    target.defense += hero.stats.defense

    for (const skill in hero.skills) {
      const camelCaseSkillKey = skill[0].toLocaleLowerCase() + skill.slice(1, skill.length)
      if (!Skills[camelCaseSkillKey]) continue
      target = Skills[camelCaseSkillKey]({ hero, target })
    }

    if (target.key === 'Ballista') {
      target.minDamage = (hero.stats.attack + 1) * 2
      target.maxDamage = (hero.stats.attack + 1) * 3
    } else if (target.key === 'Cannon') {
      target.minDamage = (hero.stats.attack + 1) * 4
      target.maxDamage = (hero.stats.attack + 1) * 7
    }

    if (target.hates?.length && target.hates?.includes(defender.activeCreature.key)) {
      target.calculation.damageBonus += 0.5
    }

    if (target.special || defender.activeCreature.special) {
      if (defender.activeCreature.special?.ignoreEnemyDefensePercents) {
        target.defense = target.defense * (1 - 0.01 * defender.activeCreature.special.ignoreEnemyDefensePercents) - 1
      } else if (defender.activeCreature.special?.ignoreEnemyAttackPercents) {
        target.attack = target.attack * (1 - 0.01 * defender.activeCreature.special.ignoreEnemyAttackPercents)
      }
    }

    const index = attacker.creatures.findIndex((creature: CreatureInstance) => creature === target)
    this[this.activeSide].creatures.splice(index, 1, target)
  }

  public cast(target: CreatureInstance, spell: Spell): number {
    const attacker = this[this.activeSide]
    const defender = this[getOppositeBattleSide(this.activeSide)]

    target.reset({ effects: target.effects })

    let damage = 0
    if (target.hasSpellImmunity(spell)) {
      return damage
    }

    if (defender.hero?.skills.interference && attacker.hero) {
      attacker.hero.stats.power -= (attacker.hero.stats.power / 100) * defender.hero.skills.interference * 10
      if (defender.hero.key === 'Giselle') {
        attacker.hero.stats.power -= (attacker.hero.stats.power / 100) * defender.hero.level * 5
      }
      attacker.hero.stats.power = Math.ceil(attacker.hero.stats.power)
    }

    damage = attacker.hero.cast(spell)

    if (attacker.hero.skills.sorcery) {
      const MAX_SORCERY_BONUS = 0.96
      let sorceryBonus = attacker.hero.skills.sorcery * 0.05

      if (attacker.hero.specialtySkill === 'Sorcery') {
        sorceryBonus += attacker.hero.level * 0.05
      }

      if (sorceryBonus > MAX_SORCERY_BONUS) {
        sorceryBonus = MAX_SORCERY_BONUS
      }

      damage += damage * sorceryBonus
    }

    if (attacker.hero.specialtySpell) {
      if (spell.key === 'MagicArrow' && attacker.hero.specialtySpell === 'MagicArrow') {
        damage += damage / 2
      } else if (spell.key === 'FireWall' && attacker.hero.specialtySpell === 'FireWall') {
        damage += damage
      } else if (spell.key === attacker.hero.specialtySpell) {
        const bonus = Math.floor(attacker.hero.level / target.level) * 0.03
        if (bonus) {
          damage += Math.ceil(damage * bonus)
        }
      }
    }

    if (target.special?.vulnerablesToSpells?.includes(spell.key)) {
      damage += damage
    }

    if (target.special?.spellDamageResistance) {
      damage -= (damage * target.special.spellDamageResistance) / 100
    }

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

    // change Math.round logic (0.5 -> 0 instead 0.5 -> 1)
    return -Math.round(-damage)
  }

  private calculateDamageValues() {
    const attacker = this[this.activeSide].activeCreature
    const defender = this[getOppositeBattleSide(this.activeSide)].activeCreature

    let damageBonus = 0,
      defenseBonus = 0,
      defenseMagicBonus = 0,
      rangePenalty = attacker.rangePenalty ? 0.5 : 0

    if (attacker.attack > defender.defense) {
      const MAX_DAMAGE_BONUS = 3
      damageBonus = 0.05 * (attacker.attack - defender.defense)
      if (damageBonus > MAX_DAMAGE_BONUS) damageBonus = MAX_DAMAGE_BONUS
      damageBonus = 1 + damageBonus + attacker.calculation.damageBonus
    } else if (attacker.attack === defender.defense) {
      damageBonus = 1 + attacker.calculation.damageBonus
    } else if (attacker.attack < defender.defense) {
      const MAX_DAMAGE_BONUS = 0.7
      damageBonus = (defender.defense - attacker.attack) * 0.025
      if (damageBonus > MAX_DAMAGE_BONUS) damageBonus = MAX_DAMAGE_BONUS
      damageBonus = 1 - damageBonus + attacker.calculation.damageBonus
    }
    defenseBonus = 1 - defender.calculation.defenseBonus
    defenseMagicBonus = 1 - defender.calculation.defenseMagicBonus
    rangePenalty = 1 - rangePenalty
    const totalBonus = damageBonus * defenseBonus * defenseMagicBonus * rangePenalty

    const minDamage = Math.floor(attacker.minDamage * totalBonus * attacker.count)
    const maxDamage = Math.floor(attacker.maxDamage * totalBonus * attacker.count)

    return {
      minDamage,
      maxDamage,
    }
  }
}
