import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells } from '@/models/enums'
import { Effects } from '@/modules/effects'
import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Bless spell effect', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Bless spell effect without any modificators', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const pikeman = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, pikeman)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const angel = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, angel)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero without water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero with base water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero with advanced water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 4, maxDamage: 4 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 2
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 51, maxDamage: 51 })
    })
  })

  describe('Bless spell effect with hero with expert water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 4, maxDamage: 4 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.hero.skills.water = 3
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 51, maxDamage: 51 })
    })
  })

  describe('Bless spell effect with hero without water skill and Bless spell specialty', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Adela)
      battle.attacker.hero.level = 1
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Rion)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
      const { minDamage, maxDamage } = Effects.bless(battle.attacker, battle.attacker.activeCreature)

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero without water skill and Bless spell specialty in battle', () => {
    // TODO: wrong calculation
    // test('Pikeman', () => {
    //   const bless = spells.find((spell) => spell.id === Spells.Bless)!
    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    //   battle.attacker.activeCreature.count = 17
    //   battle.attacker.activeCreature.effects.push(bless)

    //   battle.attacker.hero = getHeroInstance(Heroes.Adela)

    //   battle.attacker.terrain = terrains.find((terrain) => terrain.id === Terrains.Grass)!
    //   battle.defender.terrain = terrains.find((terrain) => terrain.id === Terrains.Grass)!

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.GnollMarauder)
    //   battle.defender.activeCreature.count = 8

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 53, maxDamage: 53 })
    // })

    // test('Demon', () => {
    //   const bless = spells.find((spell) => spell.id === Spells.Bless)!

    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Demon)
    //   battle.attacker.activeCreature.effects.push(bless)
    //   battle.attacker.activeCreature.count = 4

    //   battle.attacker.hero = getHeroInstance(Heroes.Adela)
    //   battle.attacker.hero.stats.attack = 4
    //   battle.attacker.hero.level = 14

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.Minotaur)
    //   battle.defender.activeCreature.count = 34

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 43, maxDamage: 43 })
    // })

    // test('2 Unicorn vs 51 CrewMate', () => {
    //   const bless = spells.find((spell) => spell.id === Spells.Bless)!

    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Unicorn)
    //   battle.attacker.activeCreature.count = 2
    //   battle.attacker.activeCreature.effects.push(bless)

    //   battle.attacker.hero = getHeroInstance(Heroes.Adela)
    //   battle.attacker.hero.stats.attack = 4
    //   battle.attacker.hero.stats.defense = 7
    //   battle.attacker.hero.level = 15

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.CrewMate)
    //   battle.defender.activeCreature.count = 51

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 80, maxDamage: 80 })
    // })

    test('2 Unicorn vs 10 Seaman', () => {
      const bless = spells.find((spell) => spell.id === Spells.Bless)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Unicorn)
      battle.attacker.activeCreature.count = 2
      battle.attacker.activeCreature.effects.push(bless)

      battle.attacker.hero = getHeroInstance(Heroes.Adela)
      battle.attacker.hero.stats.attack = 4
      battle.attacker.hero.level = 15

      battle.defender.activeCreature = getCreatureInstance(Creatures.Seaman)
      battle.defender.activeCreature.count = 10

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 75, maxDamage: 75 })
    })

    test('11 Ogre Magi vs 59 Halberdiers', () => {
      const bless = spells.find((spell) => spell.id === Spells.Bless)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.OgreMage)
      battle.attacker.activeCreature.count = 11
      battle.attacker.activeCreature.effects.push(bless)

      battle.attacker.hero = getHeroInstance(Heroes.Adela)
      battle.attacker.hero.stats.attack = 5
      battle.attacker.hero.stats.defense = 1
      battle.attacker.hero.level = 10

      battle.defender.activeCreature = getCreatureInstance(Creatures.Halberdier)
      battle.defender.activeCreature.count = 59

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 225, maxDamage: 225 })
    })

    test('11 Ogre Magi vs 20 Halberdiers', () => {
      const bless = spells.find((spell) => spell.id === Spells.Bless)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.OgreMage)
      battle.attacker.activeCreature.count = 11
      battle.attacker.activeCreature.effects.push(bless)

      battle.attacker.hero = getHeroInstance(Heroes.Adela)
      battle.attacker.hero.stats.attack = 8
      battle.attacker.hero.stats.defense = 1
      battle.attacker.hero.level = 10

      battle.defender.activeCreature = getCreatureInstance(Creatures.Halberdier)
      battle.defender.activeCreature.count = 20

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 245, maxDamage: 245 })
    })
  })

  describe('Bless spell effect with hero without water skill in battle', () => {
    test('10 Wyverns vs 22 Familiars', () => {
      const bless = spells.find((spell) => spell.id === Spells.Bless)!
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
      battle.attacker.activeCreature.count = 10
      battle.attacker.activeCreature.effects.push(bless)

      battle.attacker.hero = getHeroInstance(Heroes.Valeska)
      battle.attacker.hero.stats.attack = 6
      battle.attacker.hero.stats.defense = 7

      battle.defender.activeCreature = getCreatureInstance(Creatures.Familiar)
      battle.defender.activeCreature.count = 22

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 324, maxDamage: 324 })
    })
  })
})
