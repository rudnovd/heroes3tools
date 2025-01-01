import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels } from '@/models/enums'
import { Modificators } from '@/modules/modificators'
import { beforeEach, describe, expect, it } from 'vitest'
import { getBattleCreatureCalculationResults, getCreatureInstance, getHeroInstance } from '../helpers'

describe('artillery modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('ballista', () => {
    it('base test with hero', () => {
      const { minDamage, maxDamage } = Modificators.artillery(
        getHeroInstance(Heroes.Rion),
        getCreatureInstance(Creatures.Ballista),
      )

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 12, maxDamage: 18 })
    })

    it('with hero with high attack', () => {
      const hero = getHeroInstance(Heroes.Tyris)
      hero.stats.attack = 15

      const { minDamage, maxDamage } = Modificators.artillery(hero, getCreatureInstance(Creatures.Ballista))

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 40, maxDamage: 60 })
    })

    it('with hero with high attack vs Naga Queen', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Ballista)
      battle.attacker.hero = getHeroInstance(Heroes.Tyris)
      battle.attacker.hero.stats.attack = 15

      battle.defender.activeCreature = getCreatureInstance(Creatures.NagaQueen)

      const { attacker } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toMatchObject({ minDamage: 64, maxDamage: 96 })
    })

    it('with hero with advanced artillery', () => {
      const hero = getHeroInstance(Heroes.Rion)
      hero.skills.artillery = SkillLevels.Advanced

      const ballista = getCreatureInstance(Creatures.Ballista)

      const modifiedBallista = Modificators.heroSkills(hero, ballista)
      const { minDamage, maxDamage, hits } = Modificators.artillery(hero, modifiedBallista)

      expect({ minDamage, maxDamage, hits }).toEqual({ minDamage: 12, maxDamage: 18, hits: 2 })
    })
  })

  describe('cannon', () => {
    it('base test with hero', () => {
      const { minDamage, maxDamage } = Modificators.artillery(
        getHeroInstance(Heroes.Rion),
        getCreatureInstance(Creatures.Cannon),
      )

      expect({ minDamage, maxDamage }).toMatchObject({ minDamage: 8, maxDamage: 14 })
    })

    it('with hero with high attack', () => {
      const hero = getHeroInstance(Heroes.Tyris)
      hero.stats.attack = 15

      const { minDamage, maxDamage } = Modificators.artillery(hero, getCreatureInstance(Creatures.Cannon))

      expect({ minDamage, maxDamage }).toEqual({ minDamage: 64, maxDamage: 112 })
    })

    it('with hero with high attack vs Red Dragon', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Cannon)
      battle.attacker.hero = getHeroInstance(Heroes.Tyris)
      battle.attacker.hero.stats.attack = 15

      battle.defender.activeCreature = getCreatureInstance(Creatures.RedDragon)

      const { attacker } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toMatchObject({ minDamage: 115, maxDamage: 201 })
    })

    it('with hero with advanced artillery', () => {
      const hero = getHeroInstance(Heroes.Rion)
      hero.skills.artillery = SkillLevels.Advanced

      const cannon = getCreatureInstance(Creatures.Cannon)

      const modifiedCannon = Modificators.heroSkills(hero, cannon)
      const { minDamage, maxDamage, hits } = Modificators.artillery(hero, modifiedCannon)

      expect({ minDamage, maxDamage, hits }).toEqual({ minDamage: 8, maxDamage: 14, hits: 2 })
    })
  })
})
