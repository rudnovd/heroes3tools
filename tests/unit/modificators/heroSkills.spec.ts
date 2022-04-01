import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels } from '@/models/enums'
import { Modificators } from '@/modules/modificators'
import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Hero skills modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Offense skill', () => {
    test('damage bonus test', () => {
      const pikeman = getCreatureInstance(Creatures.Pikeman)
      const hero = getHeroInstance(Heroes.Sorsha)
      hero.skills.offense = SkillLevels.Basic
      const { calculation } = Modificators.heroSkills(hero, pikeman)

      expect(calculation).toContain({ damageBonus: 0.1 })
    })

    test('basic level', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.attacker.activeCreature.count = 20
      battle.attacker.hero = getHeroInstance(Heroes.Sorsha)
      battle.attacker.hero.skills.offense = SkillLevels.Basic

      battle.defender.activeCreature = getCreatureInstance(Creatures.Pixie)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 26, maxDamage: 78 })
    })

    test('advanced level', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.attacker.activeCreature.count = 20
      battle.attacker.hero = getHeroInstance(Heroes.Sorsha)
      battle.attacker.hero.stats.attack = 3
      battle.attacker.hero.skills.offense = SkillLevels.Advanced

      battle.defender.activeCreature = getCreatureInstance(Creatures.Pixie)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 29, maxDamage: 87 })
    })

    test('expert level', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.attacker.activeCreature.count = 20
      battle.attacker.hero = getHeroInstance(Heroes.Sorsha)
      battle.attacker.hero.stats.attack = 4
      battle.attacker.hero.skills.offense = SkillLevels.Expert

      battle.defender.activeCreature = getCreatureInstance(Creatures.Pixie)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 32, maxDamage: 96 })
    })

    test('expert level with specialty', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Roc)
      battle.attacker.activeCreature.count = 3
      battle.attacker.hero = getHeroInstance(Heroes.CragHack)
      battle.attacker.hero.stats.attack = 7
      battle.attacker.hero.level = 7
      battle.attacker.hero.skills.offense = SkillLevels.Expert

      battle.defender.activeCreature = getCreatureInstance(Creatures.CrewMate)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 72, maxDamage: 99 })
    })

    test('expert level with specialty with high hero level', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Roc)
      battle.attacker.activeCreature.count = 3
      battle.attacker.hero = getHeroInstance(Heroes.CragHack)
      battle.attacker.hero.stats.attack = 11
      battle.attacker.hero.level = 23
      battle.attacker.hero.skills.offense = SkillLevels.Expert

      battle.defender.activeCreature = getCreatureInstance(Creatures.CrewMate)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 87, maxDamage: 119 })
    })

    test('bonus for ranged creature', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)
      battle.attacker.activeCreature.count = 9
      battle.attacker.hero = getHeroInstance(Heroes.CragHack)
      battle.attacker.hero.stats.attack = 11
      battle.attacker.hero.level = 23
      battle.attacker.hero.skills.offense = SkillLevels.Expert

      battle.defender.activeCreature = getCreatureInstance(Creatures.CrewMate)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 29, maxDamage: 44 })
    })
  })

  describe('Archery skill (no penalty)', () => {
    // TODO: wrong calculation
    // test('basic level', () => {
    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)
    //   battle.attacker.activeCreature.count = 9
    //   battle.attacker.hero = getHeroInstance(Heroes.Ivor)
    //   battle.attacker.hero.skills.archery = SkillLevels.Basic

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 22, maxDamage: 34 })
    // })

    test('advanced level', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)
      battle.attacker.activeCreature.attack = 2
      battle.attacker.activeCreature.count = 9
      battle.attacker.hero = getHeroInstance(Heroes.Ivor)
      battle.attacker.hero.skills.archery = SkillLevels.Advanced

      battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.calculation).toContain({ minDamage: 26, maxDamage: 39 })
    })

    // TODO: wrong calculation
    // test('expert level', () => {
    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)
    //   battle.attacker.activeCreature.attack = 3
    //   battle.attacker.activeCreature.count = 9
    //   battle.attacker.hero = getHeroInstance(Heroes.Ivor)
    //   battle.attacker.hero.skills.archery = SkillLevels.Expert

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 32, maxDamage: 48 })
    // })

    // TODO: wrong calculation
    // test('expert level', () => {
    //   battle.attacker.activeCreature = getCreatureInstance(Creatures.StormElemental)
    //   battle.attacker.activeCreature.attack = 3
    //   battle.attacker.activeCreature.count = 15
    //   battle.attacker.hero = getHeroInstance(Heroes.Ivor)
    //   battle.attacker.hero.skills.archery = SkillLevels.Expert

    //   battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)

    //   const { attacker } = battle.calculate()

    //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 58, maxDamage: 234 })
    // })
  })

  // describe('Archery skill (with range penalty)', () => {
  // TODO: wrong calculation
  // test('expert level', () => {
  //   battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)
  //   battle.attacker.activeCreature.rangePenalty = true
  //   battle.attacker.activeCreature.attack = 3
  //   battle.attacker.activeCreature.count = 9
  //   battle.attacker.hero = getHeroInstance(Heroes.Ivor)
  //   battle.attacker.hero.skills.archery = SkillLevels.Expert
  //   battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)
  //   const { attacker } = battle.calculate()
  //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 16, maxDamage: 24 })
  // })
  // TODO: wrong calculation
  // test('expert level', () => {
  //   battle.attacker.activeCreature = getCreatureInstance(Creatures.StormElemental)
  //   battle.attacker.activeCreature.rangePenalty = true
  //   battle.attacker.activeCreature.attack = 3
  //   battle.attacker.activeCreature.count = 15
  //   battle.attacker.hero = getHeroInstance(Heroes.Ivor)
  //   battle.attacker.hero.skills.archery = SkillLevels.Expert
  //   battle.attacker.hero.skills.offense = 0
  //   battle.defender.activeCreature = getCreatureInstance(Creatures.Hobgoblin)
  //   const { attacker } = battle.calculate()
  //   expect(attacker.activeCreature.calculation).toContain({ minDamage: 29, maxDamage: 117 })
  // })
  // })
})
