import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Creature special modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('Behemoth vs Angel', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Behemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toContain({ minDamage: 39, maxDamage: 65 })
  })

  test('Ancient Behemoth vs Angel', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.AncientBehemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toContain({ minDamage: 54, maxDamage: 90 })
  })

  test('Angel vs Nix', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Nix)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toContain({ minDamage: 47, maxDamage: 47 })
  })

  test('Angel vs Nix Warrior', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = new CreatureInstance(data.creatures.NixWarrior)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toContain({ minDamage: 38, maxDamage: 38 })
  })
})
