import { Battle } from '@/models/Battle'
import { Creatures } from '@/models/enums'
import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance } from '../helpers'

describe('Creature special modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('Behemoth vs Angel', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Behemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 39, maxDamage: 65 })
  })

  test('Ancient Behemoth vs Angel', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.AncientBehemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 54, maxDamage: 90 })
  })

  test('Angel vs Nix', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Nix)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 47, maxDamage: 47 })
  })

  test('Angel vs Nix Warrior', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.NixWarrior)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 38, maxDamage: 38 })
  })
})
