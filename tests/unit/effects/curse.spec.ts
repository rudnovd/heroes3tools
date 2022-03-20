import { heroes } from '@/assets/database/heroes'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels, Spells } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { Effects } from '@/modules/effects'
import { beforeEach, describe, expect, test } from 'vitest'
import { getBattleCreatureCalculationResults, getCreatureInstance, getHeroInstance } from '../helpers'

describe('Curse spell effect', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Curse spell effect without any modificators', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(1)
      expect(result.maxDamage).toBe(1)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
    })
  })

  describe('Curse spell effect with hero without fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(1)
      expect(result.maxDamage).toBe(1)
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
    })
  })

  describe('Curse spell effect with hero with base fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(1)
      expect(result.maxDamage).toBe(1)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Curse spell effect with hero with advanced fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(1)
      expect(result.maxDamage).toBe(1)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(49)
      expect(result.maxDamage).toBe(49)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Curse spell effect with hero with expert fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(1)
      expect(result.maxDamage).toBe(1)
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.curse(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(49)
      expect(result.maxDamage).toBe(49)
    })
  })

  describe('Curse in battle', () => {
    test('20 Wyverns with Hero vs 10 Gorgons', () => {
      const curse = spells.find((spell) => spell.id === Spells.Curse)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
      battle.attacker.activeCreature.count = 20

      const hero = heroes.find((hero) => hero.id === Heroes.Valeska)!
      battle.attacker.hero = new HeroInstance(hero)
      battle.attacker.hero.stats.attack = 13
      battle.attacker.hero.stats.defense = 13

      battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)
      battle.defender.activeCreature.count = 10
      battle.defender.activeCreature.effects.push(curse)

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker.minDamage).toBe(461)
      expect(attacker.averageDamage).toBe(528)
      expect(attacker.maxDamage).toBe(594)
      expect(attacker.minKills).toBe(6)
      expect(attacker.averageKills).toBe(7)
      expect(attacker.maxKills).toBe(8)

      expect(defender.minDamage).toBe(69)
      expect(defender.averageDamage).toBe(69)
      expect(defender.maxDamage).toBe(69)
      expect(defender.minKills).toBe(0)
      expect(defender.averageKills).toBe(0)
      expect(defender.maxKills).toBe(0)
    })

    test('20 Wyverns with Hero with advanced Fire skill vs 10 Gorgon', () => {
      const curse = spells.find((spell) => spell.id === Spells.Curse)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
      battle.attacker.activeCreature.count = 20

      const hero = heroes.find((hero) => hero.id === Heroes.Valeska)!
      battle.attacker.hero = new HeroInstance(hero)
      battle.attacker.hero.stats.attack = 15
      battle.attacker.hero.stats.defense = 16

      battle.attacker.hero.skills.fire = SkillLevels.Advanced
      battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)
      battle.defender.activeCreature.count = 10
      battle.defender.activeCreature.effects.push(curse)

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker.minDamage).toBe(490)
      expect(attacker.averageDamage).toBe(560)
      expect(attacker.maxDamage).toBe(630)
      expect(attacker.minKills).toBe(7)
      expect(attacker.averageKills).toBe(8)
      expect(attacker.maxKills).toBe(9)

      expect(defender.minDamage).toBe(55)
      expect(defender.averageDamage).toBe(55)
      expect(defender.maxDamage).toBe(55)
      expect(defender.minKills).toBe(0)
      expect(defender.averageKills).toBe(0)
      expect(defender.maxKills).toBe(0)
    })
  })
})
