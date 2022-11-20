import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Base Damage Calculator tests with specified values', () => {
  describe('120 Pikemans vs 3 Devils', () => {
    test('Base', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman, { count: 120 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Devil, { count: 3 }),
        },
      })
      const { attacker, defender } = battle.calculate()

      expect(attacker).toContain({
        minDamage: 69,
        maxDamage: 206,
      })
      expect(defender).toContain({
        minDamage: 153,
        maxDamage: 204,
      })
    })

    test('With attacker hero', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Orrin),
          activeCreature: new CreatureInstance(data.creatures.Pikeman, { count: 120 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Devil, { count: 3 }),
        },
      })
      const { attacker, defender } = battle.calculate()

      expect(attacker).toContain({
        minDamage: 75,
        maxDamage: 225,
      })
      expect(defender).toContain({
        minDamage: 144,
        maxDamage: 192,
      })
    })
  })

  test('5 Archangels with Hero vs 93 Gold Golems', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Archangel, { count: 5 }),
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { attack: 13, defense: 22 },
          skills: { offense: SkillLevels.Expert },
        }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.GoldGolem, { count: 93 }),
      },
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({
      minDamage: 712,
      maxDamage: 712,
    })
    expect(defender).toContain({
      minDamage: 223,
      maxDamage: 279,
    })
  })

  test('5 Archangels with Hero vs 12 Giants', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Archangel, { count: 5 }),
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { attack: 13, defense: 22 },
          skills: { offense: SkillLevels.Expert },
        }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Giant, { count: 12 }),
      },
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({
      minDamage: 662,
      maxDamage: 662,
    })
    expect(defender).toContain({
      minDamage: 144,
      maxDamage: 216,
    })
  })

  test('20 Wyverns with Hero vs 10 Mighty Gorgon', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Wyvern, { count: 20 }),
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { attack: 20, defense: 15 },
          skills: { offense: SkillLevels.Expert },
        }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.MightyGorgon, { count: 10 }),
      },
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({
      minDamage: 616,
      maxDamage: 792,
    })
    expect(defender).toContain({
      minDamage: 66,
      maxDamage: 88,
    })
  })

  test('20 Wyverns with Hero vs 10 Gorgon', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Wyvern, { count: 20 }),
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { attack: 20, defense: 15 },
          skills: { offense: SkillLevels.Expert, fireMagic: SkillLevels.Expert },
        }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Gorgon, {
          count: 10,
          effects: { Curse: data.spells.Curse },
        }),
      },
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({
      minDamage: 643,
      maxDamage: 828,
    })
    expect(defender).toContain({
      minDamage: 57,
      maxDamage: 57,
    })
  })

  test('11 Ogre Magi vs 59 Halberdiers', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.OgreMage, { count: 11 }),
        hero: new HeroInstance(data.heroes.Adela, { level: 10, stats: { attack: 5, defense: 1 } }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Halberdier, { count: 59 }),
      },
      terrain: data.terrains.Sand,
    })
    const { attacker } = battle.calculate()

    expect(attacker).toContain({
      minDamage: 108,
      maxDamage: 217,
    })
  })
})
