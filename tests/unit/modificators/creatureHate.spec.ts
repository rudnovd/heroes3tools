import { beforeEach, describe, expect, it } from 'vitest'
import { terrains } from '@/assets/database/terrains'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Terrains } from '@/models/enums'
import { getBattleCreatureCalculationResults, getCreatureInstance, getHeroInstance } from '../helpers'

describe('creature hate modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  it('10 Angels vs 10 Devils', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 10

    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)
    battle.defender.activeCreature.count = 10

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({ minDamage: 737, maxDamage: 737 })
    expect(defender).toMatchObject({ minDamage: 442, maxDamage: 590 })
  })

  it('3 Angels vs 3 Devils with hero', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 3
    battle.attacker.hero = getHeroInstance(Heroes.Adela)
    battle.attacker.hero.stats.attack = 6
    battle.attacker.hero.stats.defense = 2

    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)
    battle.defender.activeCreature.count = 3

    battle.attacker.terrain = terrains.find(terrain => terrain.id === Terrains.Lava)!
    battle.defender.terrain = terrains.find(terrain => terrain.id === Terrains.Lava)!

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({ minDamage: 255, maxDamage: 255 })
    expect(defender).toMatchObject({ minDamage: 130, maxDamage: 174 })
  })
})
