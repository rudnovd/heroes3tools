import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Hero modificator', () => {
  describe('hero attack impact to creature attack', () => {
    test('single pikeman', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Orrin),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toEqual(6)
    })

    test('single pikeman in battle', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
          hero: new HeroInstance(data.heroes.Orrin),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toEqual(6)
    })
  })

  describe('hero defense impact to creature defense', () => {
    test('single pikeman', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
          hero: new HeroInstance(data.heroes.Orrin),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toEqual(7)
    })

    test('single pikeman in battle', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
          hero: new HeroInstance(data.heroes.Orrin),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toEqual(7)
    })
  })

  describe('heroes with creatures specialty', () => {
    describe('griffins specialty', () => {
      test('1 level Edric with 4 griffins vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Edric),
            activeCreature: new CreatureInstance(data.creatures.Griffin, { count: 4 }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })

        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 10, defense: 10 })
        expect(attacker).toContain({ minDamage: 16, maxDamage: 33 })
      })

      test('3 level Edric with 4 griffins vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Edric, { level: 3, stats: { attack: 3 } }),
            activeCreature: new CreatureInstance(data.creatures.Griffin, { count: 4 }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })
        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 12, defense: 11 })
        expect(attacker).toContain({ minDamage: 18, maxDamage: 36 })
      })

      test('9 level Edric with 4 griffins vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Edric, { level: 9, stats: { attack: 4, defense: 6 } }),
            activeCreature: new CreatureInstance(data.creatures.Griffin, { count: 4 }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })
        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 14, defense: 16, speed: 7 })
        expect(attacker).toContain({ minDamage: 19, maxDamage: 38 })
      })

      test('15 level Edric with 4 griffins vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Edric, { level: 15, stats: { attack: 6, defense: 8 } }),
            activeCreature: new CreatureInstance(data.creatures.Griffin, { count: 4 }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })
        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 16, defense: 18, speed: 7 })
        expect(attacker).toContain({ minDamage: 20, maxDamage: 40 })
      })

      test('15 level Edric with 4 royal griffins vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Edric, { level: 15, stats: { attack: 6, defense: 8 } }),
            activeCreature: new CreatureInstance(data.creatures.RoyalGriffin, { count: 4 }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })
        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 18, defense: 20, speed: 10 })
        expect(attacker).toContain({ minDamage: 21, maxDamage: 43 })
      })
    })

    describe('gargoyles specialty', () => {
      test('3 level Piquedram with 17 stone gargoyles with bloodlust effect vs pixies', () => {
        const battle = new Battle({
          attacker: {
            hero: new HeroInstance(data.heroes.Piquedram, { level: 3, stats: { attack: 2, defense: 1 } }),
            activeCreature: new CreatureInstance(data.creatures.StoneGargoyle, {
              count: 17,
              effects: { Bloodlust: data.spells.Bloodlust },
            }),
          },
          defender: {
            activeCreature: new CreatureInstance(data.creatures.Pixie),
          },
        })
        const { attacker } = battle.calculate()

        expect(battle.attacker.activeCreature).toContain({ attack: 12, defense: 8, speed: 7 })
        expect(attacker).toContain({ minDamage: 51, maxDamage: 76 })
      })
    })
  })
})
