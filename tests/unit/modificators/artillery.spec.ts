import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { Modificators } from '@/modules/modificators'
import { SkillLevels } from '@/types'
import { beforeEach, describe, expect, test } from 'vitest'
import { data, getBattleCreatureCalculationResults } from '../helpers'

describe('Artillery modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Ballista', () => {
    test('base test with hero', () => {
      const { minDamage, maxDamage } = Modificators.artillery(
        new HeroInstance(data.heroes.Rion),
        new CreatureInstance(data.creatures.Ballista)
      )

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 4, maxDamage: 6 })
    })

    test('with hero with high attack', () => {
      const hero = new HeroInstance(data.heroes.Tyris)
      hero.stats.attack = 15

      const { minDamage, maxDamage } = Modificators.artillery(hero, new CreatureInstance(data.creatures.Ballista))

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 32, maxDamage: 48 })
    })

    test('with hero with high attack vs Naga Queen', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Ballista)
      battle.attacker.hero = new HeroInstance(data.heroes.Tyris)
      battle.attacker.hero.stats.attack = 15

      battle.defender.activeCreature = new CreatureInstance(data.creatures.NagaQueen)

      const { attacker } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({ minDamage: 51, maxDamage: 76 })
    })

    test('with hero with advanced artillery', () => {
      const hero = new HeroInstance(data.heroes.Rion)
      hero.skills.artillery = SkillLevels.Advanced

      const ballista = new CreatureInstance(data.creatures.Ballista)

      const modifiedBallista = Modificators.heroSkills(hero, ballista)
      const { minDamage, maxDamage, hits } = Modificators.artillery(hero, modifiedBallista)

      expect({ minDamage, maxDamage, hits }).toEqual({ minDamage: 4, maxDamage: 6, hits: 2 })
    })
  })

  describe('Cannon', () => {
    test('base test with hero', () => {
      const { minDamage, maxDamage } = Modificators.artillery(
        new HeroInstance(data.heroes.Rion),
        new CreatureInstance(data.creatures.Cannon)
      )

      expect({ minDamage, maxDamage }).toContain({ minDamage: 8, maxDamage: 14 })
    })

    test('with hero with high attack', () => {
      const hero = new HeroInstance(data.heroes.Tyris)
      hero.stats.attack = 15

      const { minDamage, maxDamage } = Modificators.artillery(hero, new CreatureInstance(data.creatures.Cannon))

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 64, maxDamage: 112 })
    })

    test('with hero with high attack vs Red Dragon', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Cannon)
      battle.attacker.hero = new HeroInstance(data.heroes.Tyris)
      battle.attacker.hero.stats.attack = 15

      battle.defender.activeCreature = new CreatureInstance(data.creatures.RedDragon)

      const { attacker } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({ minDamage: 115, maxDamage: 201 })
    })

    test('with hero with advanced artillery', () => {
      const hero = new HeroInstance(data.heroes.Rion)
      hero.skills.artillery = SkillLevels.Advanced

      const cannon = new CreatureInstance(data.creatures.Cannon)

      const modifiedCannon = Modificators.heroSkills(hero, cannon)
      const { minDamage, maxDamage, hits } = Modificators.artillery(hero, modifiedCannon)

      expect({ minDamage, maxDamage, hits }).toEqual({ minDamage: 8, maxDamage: 14, hits: 2 })
    })
  })
})
