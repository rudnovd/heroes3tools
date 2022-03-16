import { heroes } from '@/assets/database/heroes'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { Effects } from '@/modules/effects'
import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance } from '../helpers'

describe('Bless spell effect', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Bless spell effect without any modificators', () => {
    test('Pikeman creature (different minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero without water skill and water specialty', () => {
    test('Pikeman creature (different minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with base water skill and without water specialty', () => {
    test('Pikeman creature (different minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with advanced water skill and without water specialty', () => {
    test('Pikeman creature (different minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(51)
      expect(result.maxDamage).toBe(51)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with expert water skill and without water specialty', () => {
    test('Pikeman creature (different minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const result = Effects.bless(battle.attacker, battle.attacker.activeCreature)
      expect(result.minDamage).toBe(51)
      expect(result.maxDamage).toBe(51)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })
})
