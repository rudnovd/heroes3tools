import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Curse spell effect', () => {
  describe('Curse spell effect without any modificators', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel creature (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero without fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with base fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 }, skills: { fireMagic: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 }, skills: { fireMagic: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 50, maxDamage: 50 })
    })
  })

  describe('Curse spell effect with hero with advanced fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, {
            stats: { attack: 0 },
            skills: { fireMagic: SkillLevels.Advanced },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, {
            stats: { attack: 0 },
            skills: { fireMagic: SkillLevels.Advanced },
          }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
    })
  })

  describe('Curse spell effect with hero with expert fire skill', () => {
    test('Pikeman (different minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 }, skills: { fireMagic: SkillLevels.Expert } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 1, maxDamage: 1 })
    })

    test('Angel (equal minDamage and maxDamage)', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Rion, { stats: { attack: 0 }, skills: { fireMagic: SkillLevels.Expert } }),
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Angel),
        },
      })
      const { minDamage, maxDamage } = Effects.curse({
        defender: battle.attacker,
        target: battle.defender.activeCreature,
      })

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 49, maxDamage: 49 })
    })
  })

  describe('Curse in battle', () => {
    test('20 Wyverns with Hero vs 10 Gorgons', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Valeska, {
            stats: { attack: 13, defense: 13 },
            skills: {
              fireMagic: SkillLevels.Advanced,
            },
          }),
          activeCreature: new CreatureInstance(data.creatures.Wyvern, { count: 20 }),
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
        minDamage: 461,
        maxDamage: 594,
      })
      expect(defender).toContain({
        minDamage: 63,
        maxDamage: 63,
      })
    })

    test('20 Wyverns with Hero with advanced Fire skill vs 10 Gorgon', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Valeska, {
            stats: { attack: 15, defense: 16 },
            skills: {
              fireMagic: SkillLevels.Advanced,
            },
          }),
          activeCreature: new CreatureInstance(data.creatures.Wyvern, { count: 20 }),
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
        minDamage: 490,
        maxDamage: 630,
      })
      expect(defender).toContain({
        minDamage: 55,
        maxDamage: 55,
      })
    })
  })
})
