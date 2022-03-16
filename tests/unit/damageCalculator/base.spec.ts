import { heroes } from '@/assets/database/heroes'
import { Battle } from '@/models/Battle'
import { Creatures } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { beforeEach, describe, expect, test } from 'vitest'
import { getBattleCreaturCalculationResults, getCreatureInstance } from '../helpers'

describe('Base Damage Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('120 Pikemans vs 3 Devils', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

    battle.attacker.activeCreature.count = 120
    battle.defender.activeCreature.count = 3

    test('Base', () => {
      const { attacker, defender } = getBattleCreaturCalculationResults(battle)

      expect(attacker.minDamage).toBe(69)
      expect(attacker.averageDamage).toBe(138)
      expect(attacker.maxDamage).toBe(206)
      expect(attacker.minKills).toBe(0)
      expect(attacker.averageKills).toBe(0)
      expect(attacker.maxKills).toBe(1)

      expect(defender.minDamage).toBe(153)
      expect(defender.averageDamage).toBe(178)
      expect(defender.maxDamage).toBe(204)
      expect(defender.minKills).toBe(15)
      expect(defender.averageKills).toBe(17)
      expect(defender.maxKills).toBe(20)
    })

    test('With attacker hero', () => {
      const hero = new HeroInstance(heroes[0])
      battle.attacker.hero = hero

      const { attacker, defender } = getBattleCreaturCalculationResults(battle)

      expect(attacker.minDamage).toBe(75)
      expect(attacker.averageDamage).toBe(150)
      expect(attacker.maxDamage).toBe(225)
      expect(attacker.minKills).toBe(0)
      expect(attacker.averageKills).toBe(0)
      expect(attacker.maxKills).toBe(1)

      expect(defender.minDamage).toBe(144)
      expect(defender.averageDamage).toBe(168)
      expect(defender.maxDamage).toBe(192)
      expect(defender.minKills).toBe(14)
      expect(defender.averageKills).toBe(16)
      expect(defender.maxKills).toBe(19)
    })
  })
})
