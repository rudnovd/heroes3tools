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
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero without fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with base fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with advanced fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
    })
  })

  describe('Curse spell effect with hero with expert fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.fire = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.curse(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
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
