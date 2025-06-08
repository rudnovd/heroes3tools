import { beforeEach, describe, expect, it } from 'vitest'
import { terrains } from '@/assets/database/terrains'
import { Battle } from '@/models/Battle'
import { Creatures, Terrains } from '@/models/enums'
import { getBattleCreatureCalculationResults, getCreatureInstance } from '../helpers'

describe('terrain modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  it('12 Green Dragons vs 24 Efreets on Grass terrain', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = terrains.find(terrain => terrain.id === Terrains.Grass)!

    battle.defender.activeCreature = getCreatureInstance(Creatures.Efreet)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = terrains.find(terrain => terrain.id === Terrains.Grass)!

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({ minDamage: 648, maxDamage: 810, minKills: 7, maxKills: 9 })
    expect(defender).toMatchObject({ minDamage: 355, maxDamage: 532, minKills: 1, maxKills: 2 })
  })

  it('12 Green Dragons vs 24 Efreets on Lava terrain', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.GreenDragon)
    battle.attacker.activeCreature.count = 12
    battle.attacker.terrain = terrains.find(terrain => terrain.id === Terrains.Lava)!

    battle.defender.activeCreature = getCreatureInstance(Creatures.Efreet)
    battle.defender.activeCreature.count = 24
    battle.defender.terrain = terrains.find(terrain => terrain.id === Terrains.Lava)!

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({ minDamage: 600, maxDamage: 750, minKills: 6, maxKills: 8 })
    expect(defender).toMatchObject({ minDamage: 374, maxDamage: 561, minKills: 2, maxKills: 3 })
  })
})
