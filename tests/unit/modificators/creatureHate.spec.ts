import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { beforeEach, describe, expect, test } from 'vitest'
import { data, getBattleCreatureCalculationResults } from '../helpers'

describe('Creature hate modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('10 Angels vs 10 Devils', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.attacker.activeCreature.count = 10

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Devil)
    battle.defender.activeCreature.count = 10

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({ minDamage: 737, maxDamage: 737 })
    expect(defender).toContain({ minDamage: 442, maxDamage: 590 })
  })

  test('3 Angels vs 3 Devils with hero', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.attacker.activeCreature.count = 3
    battle.attacker.hero = new HeroInstance(data.heroes.Adela)
    battle.attacker.hero.stats.attack = 6
    battle.attacker.hero.stats.defense = 2

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Devil)
    battle.defender.activeCreature.count = 3

    battle.attacker.terrain = data.terrains.Lava
    battle.defender.terrain = data.terrains.Lava

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({ minDamage: 255, maxDamage: 255 })
    expect(defender).toContain({ minDamage: 130, maxDamage: 174 })
  })
})
