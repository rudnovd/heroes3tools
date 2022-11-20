import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Creature special modificator', () => {
  test('Behemoth vs Angel', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Behemoth),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Angel),
      },
    })
    const { attacker } = battle.calculate()

    expect(attacker).toContain({ minDamage: 39, maxDamage: 65 })
  })

  test('Ancient Behemoth vs Angel', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.AncientBehemoth),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Angel),
      },
    })
    const { attacker } = battle.calculate()

    expect(attacker).toContain({ minDamage: 54, maxDamage: 90 })
  })

  test('Angel vs Nix', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Angel),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Nix),
      },
    })
    const { attacker } = battle.calculate()

    expect(attacker).toContain({ minDamage: 47, maxDamage: 47 })
  })

  test('Angel vs Nix Warrior', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Angel),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.NixWarrior),
      },
    })
    const { attacker } = battle.calculate()

    expect(attacker).toContain({ minDamage: 38, maxDamage: 38 })
  })
})
