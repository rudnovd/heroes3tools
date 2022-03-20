import { terrains } from '@/assets/database/terrains'
import { Battle } from '@/models/Battle'
import { Creatures, Terrains } from '@/models/enums'
import { beforeEach, describe, expect, test } from 'vitest'
import { getBattleCreatureCalculationResults, getCreatureInstance } from '../helpers'

describe('Terrain modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('12 Green Dragons vs 24 Efreets on Grass terrain', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = terrains.find((terrain) => terrain.id === Terrains.Grass)!

    battle.defender.activeCreature = getCreatureInstance(Creatures.Efreet)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = terrains.find((terrain) => terrain.id === Terrains.Grass)!

    const results = getBattleCreatureCalculationResults(battle)

    expect(results.attacker.minDamage).toBe(648)
    expect(results.attacker.maxDamage).toBe(810)
    expect(results.attacker.minKills).toBe(7)
    expect(results.attacker.maxKills).toBe(9)

    expect(results.defender.minDamage).toBe(355)
    expect(results.defender.maxDamage).toBe(532)
    expect(results.defender.minKills).toBe(1)
    expect(results.defender.maxKills).toBe(2)
  })

  test('12 Green Dragons vs 24 Efreets on Lava terrain', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = terrains.find((terrain) => terrain.id === Terrains.Lava)!

    battle.defender.activeCreature = getCreatureInstance(Creatures.Efreet)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = terrains.find((terrain) => terrain.id === Terrains.Lava)!

    const results = getBattleCreatureCalculationResults(battle)

    expect(results.attacker.minDamage).toBe(600)
    expect(results.attacker.maxDamage).toBe(750)
    expect(results.attacker.minKills).toBe(6)
    expect(results.attacker.maxKills).toBe(8)

    expect(results.defender.minDamage).toBe(374)
    expect(results.defender.maxDamage).toBe(561)
    expect(results.defender.minKills).toBe(2)
    expect(results.defender.maxKills).toBe(3)
  })
})
