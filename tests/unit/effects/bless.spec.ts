import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Bless spell effect', () => {
  describe('Bless spell effect without any modificators', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero without water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero with base water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero with advanced water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Advanced } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 4, maxDamage: 4 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Advanced } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 51, maxDamage: 51 })
    })
  })

  describe('Bless spell effect with hero with expert water skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Expert } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 4, maxDamage: 4 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { skills: { waterMagic: SkillLevels.Expert } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 51, maxDamage: 51 })
    })
  })

  describe('Bless spell effect with hero without water skill and Bless spell specialty', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Adela),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 3, maxDamage: 3 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Adela),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.bless({
        initiator: battle.attacker,
        target: battle.attacker.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Bless spell effect with hero without water skill and Bless spell specialty in battle', () => {
    // TODO: wrong calculation
    // test('Pikeman', () => {
    //   const bless = data.spells.Bless
    //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    //   battle.attacker.activeCreature.count = 17
    //   battle.attacker.activeCreature.effects[bless.key] = bless

    //   battle.attacker.hero = new HeroInstance(data.heroes.Adela)

    //   battle.terrain = terrains.find((terrain) => terrain.id === Terrains.Grass)!
    //

    //   battle.defender.activeCreature = new CreatureInstance(data.creatures.GnollMarauder)
    //   battle.defender.activeCreature.count = 8

    //   const { attacker } = (battle)

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 53, maxDamage: 53 })
    // })

    // test('Demon', () => {
    //   const bless = data.spells.Bless

    //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.Demon)
    //   battle.attacker.activeCreature.effects[bless.key] = bless
    //   battle.attacker.activeCreature.count = 4

    //   battle.attacker.hero = new HeroInstance(data.heroes.Adela)
    //   battle.attacker.hero.stats.attack = 4
    //   battle.attacker.hero.level = 14

    //   battle.defender.activeCreature = new CreatureInstance(data.creatures.Minotaur)
    //   battle.defender.activeCreature.count = 34

    //   const { attacker } = (battle)

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 43, maxDamage: 43 })
    // })

    // test('2 Unicorn vs 51 CrewMate', () => {
    //   const bless = data.spells.Bless

    //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.Unicorn)
    //   battle.attacker.activeCreature.count = 2
    //   battle.attacker.activeCreature.effects[bless.key] = bless

    //   battle.attacker.hero = new HeroInstance(data.heroes.Adela)
    //   battle.attacker.hero.stats.attack = 4
    //   battle.attacker.hero.stats.defense = 7
    //   battle.attacker.hero.level = 15

    //   battle.defender.activeCreature = new CreatureInstance(data.creatures.CrewMate)
    //   battle.defender.activeCreature.count = 51

    //   const { attacker } = (battle)

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 80, maxDamage: 80 })
    // })

    test('2 Unicorn vs 10 Seaman', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Unicorn, {
            count: 2,
            effects: { Bless: data.spells.Bless },
          }),
          hero: new HeroInstance(data.heroes.Adela, { level: 15, stats: { attack: 4 } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Seaman, { count: 10 }),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 75, maxDamage: 75 })
    })

    test('11 Ogre Magi vs 59 Halberdiers', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.OgreMage, {
            count: 11,
            effects: { Bless: data.spells.Bless },
          }),
          hero: new HeroInstance(data.heroes.Adela, { level: 10, stats: { attack: 5, defense: 1 } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Halberdier, { count: 59 }),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 225, maxDamage: 225 })
    })

    test('11 Ogre Magi vs 20 Halberdiers', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Adela, { level: 10, stats: { attack: 8, defense: 1 } }),
          activeCreature: new CreatureInstance(data.creatures.OgreMage, {
            count: 11,
            effects: { Bless: data.spells.Bless },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Halberdier, { count: 20 }),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 245, maxDamage: 245 })
    })
  })

  describe('Bless spell effect with hero without water skill in battle', () => {
    test('10 Wyverns vs 22 Familiars', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Valeska, { stats: { attack: 6, defense: 7 } }),
          activeCreature: new CreatureInstance(data.creatures.Wyvern, {
            count: 10,
            effects: { Bless: data.spells.Bless },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Familiar, { count: 22 }),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 324, maxDamage: 324 })
    })
  })
})
