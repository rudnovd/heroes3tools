import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import { HeroInstance } from '@/modules/hero'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Hero specialty spell modificator', () => {
  describe('Bloodlust spell specialty', () => {
    test('Ash with Imp (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ash),
          activeCreature: new CreatureInstance(data.creatures.Imp, { effects: { Bloodlust: data.spells.Bloodlust } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Imp),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(9)
    })

    test('Ash with Griffin (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ash),
          activeCreature: new CreatureInstance(data.creatures.Griffin, {
            effects: { Bloodlust: data.spells.Bloodlust },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Griffin),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(14)
    })

    test('Ash with Genie (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ash),
          activeCreature: new CreatureInstance(data.creatures.Genie, { effects: { Bloodlust: data.spells.Bloodlust } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Genie),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(17)
    })

    test('Ash with Bone Dragon (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ash),
          activeCreature: new CreatureInstance(data.creatures.BoneDragon, {
            effects: { Bloodlust: data.spells.Bloodlust },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.BoneDragon),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(21)
    })
  })

  describe('Prayer spell specialty', () => {
    test('Loynis with Troglodyte (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Loynis),
          activeCreature: new CreatureInstance(data.creatures.Troglodyte, {
            effects: { Prayer: data.spells.Prayer },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Troglodyte),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(10)
      expect(battle.attacker.activeCreature?.defense).toBe(8)
    })

    test('Loynis with Hell Hound (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Loynis),
          activeCreature: new CreatureInstance(data.creatures.HellHound, {
            effects: { Prayer: data.spells.Prayer },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.HellHound),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(15)
      expect(battle.attacker.activeCreature?.defense).toBe(10)
    })

    test('Loynis with Gorgon (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Loynis),
          activeCreature: new CreatureInstance(data.creatures.Gorgon, {
            effects: { Prayer: data.spells.Prayer },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Gorgon),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(14)
      expect(battle.attacker.activeCreature?.defense).toBe(17)
    })

    test('Loynis with Behemoth (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Loynis),
          activeCreature: new CreatureInstance(data.creatures.Behemoth, {
            effects: { Prayer: data.spells.Prayer },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(20)
      expect(battle.attacker.activeCreature?.defense).toBe(19)
    })
  })

  describe('Precision spell specialty', () => {
    test('Zubin with Archer (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Zubin),
          activeCreature: new CreatureInstance(data.creatures.Archer, {
            effects: { Precision: data.spells.Precision },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Archer),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(14)
    })

    test('Zubin with Wood Elf (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Zubin),
          activeCreature: new CreatureInstance(data.creatures.WoodElf, {
            effects: { Precision: data.spells.Precision },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.WoodElf),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(16)
    })

    test('Zubin with Monk (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Zubin),
          activeCreature: new CreatureInstance(data.creatures.Monk, { effects: { Precision: data.spells.Precision } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Monk),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(18)
    })

    test('Zubin with Titan (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Zubin),
          activeCreature: new CreatureInstance(data.creatures.Titan, { effects: { Precision: data.spells.Precision } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Titan),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(29)
    })
  })

  describe('Stone Skin spell specialty', () => {
    test('Darkstorn with Pikeman (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Darkstorn),
          activeCreature: new CreatureInstance(data.creatures.Pikeman, {
            effects: { StoneSkin: data.spells.StoneSkin },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toBe(11)
    })

    test('Darkstorn with Royal Griffin (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Darkstorn),
          activeCreature: new CreatureInstance(data.creatures.RoyalGriffin, {
            effects: { StoneSkin: data.spells.StoneSkin },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.RoyalGriffin),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toBe(14)
    })

    test('Darkstorn with Dendroid Guard (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Darkstorn),
          activeCreature: new CreatureInstance(data.creatures.DendroidGuard, {
            effects: { StoneSkin: data.spells.StoneSkin },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.DendroidGuard),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toBe(16)
    })

    test('Darkstorn with Gold Dragon (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Darkstorn),
          activeCreature: new CreatureInstance(data.creatures.GoldDragon, {
            effects: { StoneSkin: data.spells.StoneSkin },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.GoldDragon),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.defense).toBe(30)
    })
  })

  describe('Weakness spell specialty', () => {
    test('Mirlanda with Gremlin (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Mirlanda),
          activeCreature: new CreatureInstance(data.creatures.Gremlin, {
            effects: { Weakness: data.spells.Weakness },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Gremlin),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.attack).toBe(0)
    })

    test('Mirlanda with Iron Golem (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Mirlanda),
          activeCreature: new CreatureInstance(data.creatures.IronGolem),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.IronGolem, {
            effects: { Weakness: data.spells.Weakness },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.attack).toBe(4)
    })

    test('Mirlanda with Master Genie (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Mirlanda),
          activeCreature: new CreatureInstance(data.creatures.MasterGenie),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.MasterGenie, {
            effects: { Weakness: data.spells.Weakness },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.attack).toBe(8)
    })

    test('Mirlanda with Master Black Dragon (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Mirlanda),
          activeCreature: new CreatureInstance(data.creatures.BlackDragon),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.BlackDragon, {
            effects: { Weakness: data.spells.Weakness },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.attack).toBe(22)
    })
  })

  describe('Disrupting Ray spell specialty', () => {
    test('Aenain with Skeleton (creature level - 1)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Aenain),
          activeCreature: new CreatureInstance(data.creatures.Skeleton),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Skeleton, {
            effects: { DisruptingRay: data.spells.DisruptingRay },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.defense).toBe(0)
    })

    test('Aenain with Wraith (creature level - 3)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Aenain),
          activeCreature: new CreatureInstance(data.creatures.Wraith),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Wraith, {
            effects: { DisruptingRay: data.spells.DisruptingRay },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.defense).toBe(2)
    })

    test('Aenain with Power Lich (creature level - 5)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Aenain),
          activeCreature: new CreatureInstance(data.creatures.PowerLich),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.PowerLich, {
            effects: { DisruptingRay: data.spells.DisruptingRay },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.defense).toBe(5)
    })

    test('Aenain with Ghost Dragon (creature level - 7)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Aenain),
          activeCreature: new CreatureInstance(data.creatures.GhostDragon),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.GhostDragon, {
            effects: { DisruptingRay: data.spells.DisruptingRay },
          }),
        },
      })
      battle.calculate()

      expect(battle.defender.activeCreature?.defense).toBe(12)
    })
  })
})
