import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Artillery modificator', () => {
  describe('Ballista', () => {
    test('base test with hero', () => {
      const { attacker } = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Ballista),
          hero: new HeroInstance(data.heroes.Rion),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })

      expect(attacker.activeCreature?.calculation).toContain({ minDamage: 5, maxDamage: 7 })
    })

    test('with hero with high attack', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Tyris, { stats: { attack: 15 } }),
          activeCreature: new CreatureInstance(data.creatures.Ballista),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 64, maxDamage: 96 })
    })

    test('with hero with high attack vs Naga Queen', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Ballista),
          hero: new HeroInstance(data.heroes.Tyris, { stats: { attack: 15 } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.NagaQueen),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 51, maxDamage: 76 })
    })

    test('with hero with advanced artillery', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Ballista),
          hero: new HeroInstance(data.heroes.Rion, { skills: { artillery: SkillLevels.Advanced } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 5, maxDamage: 7 })
      expect(battle.attacker.activeCreature?.hits).toEqual(2)
    })
  })

  describe('Cannon', () => {
    test('base test with hero', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion),
          activeCreature: new CreatureInstance(data.creatures.Cannon),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 14, maxDamage: 25 })
    })

    test('with hero with high attack', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Tyris, { stats: { attack: 15 } }),
          activeCreature: new CreatureInstance(data.creatures.Cannon),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 160, maxDamage: 280 })
    })

    test('with hero with high attack vs Red Dragon', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Tyris, { stats: { attack: 15 } }),
          activeCreature: new CreatureInstance(data.creatures.Cannon),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.RedDragon),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 115, maxDamage: 201 })
    })

    test('with hero with advanced artillery', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Cannon),
          hero: new HeroInstance(data.heroes.Rion, { skills: { artillery: SkillLevels.Advanced } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 14, maxDamage: 25 })
      expect(battle.attacker.activeCreature?.hits).toEqual(2)
    })
  })
})
