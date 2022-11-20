import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Hero skills modificator', () => {
  describe('Offense skill', () => {
    test('damage bonus test', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Sorsha, { skills: { offense: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
      })
      battle.calculate()

      expect(battle.attacker.activeCreature?.calculation).toContain({ damageBonus: 0.1 })
    })

    test('basic level', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Sorsha, { skills: { offense: SkillLevels.Basic } }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman, { count: 20 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pixie),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 26, maxDamage: 78 })
    })

    test('advanced level', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Sorsha, {
            stats: { attack: 3 },
            skills: { offense: SkillLevels.Advanced },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman, { count: 20 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pixie),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 29, maxDamage: 87 })
    })

    test('expert level', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Sorsha, {
            stats: { attack: 4 },
            skills: { offense: SkillLevels.Expert },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman, { count: 20 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Pixie),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 32, maxDamage: 96 })
    })

    test('expert level with specialty', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.CragHack, {
            level: 7,
            stats: { attack: 7 },
            skills: { offense: SkillLevels.Expert },
          }),
          activeCreature: new CreatureInstance(data.creatures.Roc, { count: 3 }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.CrewMate),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 72, maxDamage: 99 })
    })

    test('expert level with specialty with high hero level', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Roc, { count: 3 }),
          hero: new HeroInstance(data.heroes.CragHack, {
            level: 23,
            stats: { attack: 11 },
            skills: { offense: SkillLevels.Expert },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.CrewMate),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 87, maxDamage: 119 })
    })

    test('bonus for ranged creature', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Archer, { count: 9 }),
          hero: new HeroInstance(data.heroes.CragHack, {
            level: 23,
            stats: { attack: 11 },
            skills: { offense: SkillLevels.Expert },
          }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.CrewMate),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 29, maxDamage: 44 })
    })
  })

  describe('Archery skill (no penalty)', () => {
    // TODO: wrong calculation
    // test('basic level', () => {
    //   const battle = new Battle({
    //     attacker: {
    //       hero: new HeroInstance(data.heroes.Ivor, { skills: { archery: SkillLevels.Basic } }),
    //       activeCreature: new CreatureInstance(data.creatures.Archer, { count: 9 }),
    //     },
    //     defender: {
    //       activeCreature: new CreatureInstance(data.creatures.Hobgoblin),
    //     },
    //   })
    //   const { attacker } = battle.calculate()
    //   expect(attacker).toContain({ minDamage: 22, maxDamage: 34 })
    // })
    test('advanced level', () => {
      const battle = new Battle({
        attacker: {
          activeCreature: new CreatureInstance(data.creatures.Archer, { count: 9 }),
          hero: new HeroInstance(data.heroes.Ivor, { skills: { archery: SkillLevels.Advanced } }),
        },
        defender: {
          activeCreature: new CreatureInstance(data.creatures.Hobgoblin),
        },
      })
      const { attacker } = battle.calculate()

      expect(attacker).toContain({ minDamage: 26, maxDamage: 39 })
    })
    // TODO: wrong calculation
    // test('expert level', () => {
    //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archer)
    //   battle.attacker.activeCreature.attack = 3
    //   battle.attacker.activeCreature.count = 9
    //   battle.attacker.hero = new HeroInstance(data.heroes.Ivor)
    //   battle.attacker.hero.skills.archery = SkillLevels.Expert
    //   battle.defender.activeCreature = new CreatureInstance(data.creatures.Hobgoblin)
    //   const { attacker } = (battle)
    //   expect(attacker).toContain({ minDamage: 32, maxDamage: 48 })
    // })
    // TODO: wrong calculation
    // test('expert level', () => {
    //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.StormElemental)
    //   battle.attacker.activeCreature.attack = 3
    //   battle.attacker.activeCreature.count = 15
    //   battle.attacker.hero = new HeroInstance(data.heroes.Ivor)
    //   battle.attacker.hero.skills.archery = SkillLevels.Expert
    //   battle.defender.activeCreature = new CreatureInstance(data.creatures.Hobgoblin)
    //   const { attacker } = (battle)
    //   expect(attacker).toContain({ minDamage: 58, maxDamage: 234 })
    // })
  })

  // describe('Archery skill (with range penalty)', () => {
  // TODO: wrong calculation
  // test('expert level', () => {
  //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archer)
  //   battle.attacker.activeCreature.rangePenalty = true
  //   battle.attacker.activeCreature.attack = 3
  //   battle.attacker.activeCreature.count = 9
  //   battle.attacker.hero = new HeroInstance(data.heroes.Ivor)
  //   battle.attacker.hero.skills.archery = SkillLevels.Expert
  //   battle.defender.activeCreature = new CreatureInstance(data.creatures.Hobgoblin)
  //   const { attacker } = (battle)
  //   expect(attacker).toContain({ minDamage: 16, maxDamage: 24 })
  // })
  // TODO: wrong calculation
  // test('expert level', () => {
  //   battle.attacker.activeCreature = new CreatureInstance(data.creatures.StormElemental)
  //   battle.attacker.activeCreature.rangePenalty = true
  //   battle.attacker.activeCreature.attack = 3
  //   battle.attacker.activeCreature.count = 15
  //   battle.attacker.hero = new HeroInstance(data.heroes.Ivor)
  //   battle.attacker.hero.skills.archery = SkillLevels.Expert
  //   battle.attacker.hero.skills.offense = 0
  //   battle.defender.activeCreature = new CreatureInstance(data.creatures.Hobgoblin)
  //   const { attacker } = (battle)
  //   expect(attacker).toContain({ minDamage: 29, maxDamage: 117 })
  // })
  // })
})
