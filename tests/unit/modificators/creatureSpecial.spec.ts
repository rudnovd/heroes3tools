import { Battle } from '@/models/Battle'
import { Creatures } from '@/models/enums'
import { beforeEach, describe, expect, it } from 'vitest'
import { getCreatureInstance } from '../helpers'

describe('creature special modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  it('behemoth vs Angel', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Behemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 39, maxDamage: 65 })
  })

  it('ancient Behemoth vs Angel', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.AncientBehemoth)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 54, maxDamage: 90 })
  })

  it('angel vs Nix', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.Nix)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 47, maxDamage: 47 })
  })

  it('angel vs Nix Warrior', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Angel)
    battle.attacker.activeCreature.count = 1

    battle.defender.activeCreature = getCreatureInstance(Creatures.NixWarrior)
    battle.defender.activeCreature.count = 1

    const { attacker } = battle.calculate()

    expect(attacker.activeCreature.calculation).toMatchObject({ minDamage: 38, maxDamage: 38 })
  })
})
