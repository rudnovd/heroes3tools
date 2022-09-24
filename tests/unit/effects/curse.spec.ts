import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { beforeEach, describe, expect, test } from 'vitest'
import { data, getBattleCreatureCalculationResults } from '../helpers'

describe('Curse spell effect', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Curse spell effect without any modificators', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero without fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with base fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 1
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 1
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with advanced fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 2
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 2
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
    })
  })

  describe('Curse spell effect with hero with expert fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 3
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fireMagic = 3
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
    })
  })

  describe('Curse in battle', () => {
    test('20 Wyverns with Hero vs 10 Gorgons', () => {
      const curse = data.spells.Curse
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Wyvern)
      battle.attacker.activeCreature.count = 20

      battle.attacker.hero = new HeroInstance(data.heroes.Valeska)
      battle.attacker.hero.stats.attack = 13
      battle.attacker.hero.stats.defense = 13

      battle.defender.activeCreature = new CreatureInstance(data.creatures.Gorgon)
      battle.defender.activeCreature.count = 10
      battle.defender.activeCreature.effects[curse.key] = curse

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({
        minDamage: 461,
        maxDamage: 594,
        minKills: 6,
        maxKills: 8,
      })
      expect(defender).toContain({
        minDamage: 69,
        maxDamage: 69,
        minKills: 0,
        maxKills: 0,
      })
    })

    test('20 Wyverns with Hero with advanced Fire skill vs 10 Gorgon', () => {
      const curse = data.spells.Curse
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Wyvern)
      battle.attacker.activeCreature.count = 20

      battle.attacker.hero = new HeroInstance(data.heroes.Valeska)
      battle.attacker.hero.stats.attack = 15
      battle.attacker.hero.stats.defense = 16

      battle.attacker.hero.skills.fireMagic = SkillLevels.Advanced
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Gorgon)
      battle.defender.activeCreature.count = 10
      battle.defender.activeCreature.effects[curse.key] = curse

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({
        minDamage: 490,
        maxDamage: 630,
        minKills: 7,
        maxKills: 9,
      })
      expect(defender).toContain({
        minDamage: 55,
        maxDamage: 55,
        minKills: 0,
        maxKills: 0,
      })
    })
  })
})
