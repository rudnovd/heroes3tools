import { terrains } from '@/assets/database/terrains'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Terrains } from '@/models/enums'
import { beforeEach, describe, expect, test } from 'vitest'
import { getBattleCreatureCalculationResults, getCreatureInstance, getHeroInstance } from '../helpers'

describe('Creature hate modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('10 Angels vs 10 Devils', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 10

    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)
    battle.defender.activeCreature.count = 10

    const results = getBattleCreatureCalculationResults(battle)

    expect(results.attacker.minDamage).toBe(737)
    expect(results.attacker.maxDamage).toBe(737)

    expect(results.defender.minDamage).toBe(442)
    expect(results.defender.maxDamage).toBe(590)
  })

  test('3 Angels vs 3 Devils with hero', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 3
    battle.attacker.hero = getHeroInstance(Heroes.Adela)
    battle.attacker.hero.stats.attack = 6
    battle.attacker.hero.stats.defense = 2

    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)
    battle.defender.activeCreature.count = 3

    battle.attacker.terrain = terrains.find((terrain) => terrain.id === Terrains.Lava)!
    battle.defender.terrain = terrains.find((terrain) => terrain.id === Terrains.Lava)!

    const results = getBattleCreatureCalculationResults(battle)

    expect(results.attacker.minDamage).toBe(255)
    expect(results.attacker.maxDamage).toBe(255)

    expect(results.defender.minDamage).toBe(130)
    expect(results.defender.maxDamage).toBe(174)
  })
})
