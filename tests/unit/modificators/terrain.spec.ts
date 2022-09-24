import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { beforeEach, describe, expect, test } from 'vitest'
import { data, getBattleCreatureCalculationResults } from '../helpers'

describe('Terrain modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('12 Green Dragons vs 24 Efreets on Grass terrain', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = data.terrains.Grass

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Efreeti)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = data.terrains.Grass

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({ minDamage: 648, maxDamage: 810, minKills: 7, maxKills: 9 })
    expect(defender).toContain({ minDamage: 355, maxDamage: 532, minKills: 1, maxKills: 2 })
  })

  test('12 Green Dragons vs 24 Efreets on Lava terrain', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = data.terrains.Lava

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Efreeti)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = data.terrains.Lava

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({ minDamage: 600, maxDamage: 750, minKills: 6, maxKills: 8 })
    expect(defender).toContain({ minDamage: 374, maxDamage: 561, minKills: 2, maxKills: 3 })
  })
})
