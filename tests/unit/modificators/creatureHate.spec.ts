import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Creature hate modificator', () => {
  test('10 Angels vs 10 Devils', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.Angel, { count: 10 }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Devil, { count: 10 }),
      },
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({ minDamage: 737, maxDamage: 737 })
    expect(defender).toContain({ minDamage: 442, maxDamage: 590 })
  })

  test('3 Angels vs 3 Devils with hero', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adela, { stats: { attack: 6, defense: 2 } }),
        activeCreature: new CreatureInstance(data.creatures.Angel, { count: 3 }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Devil, { count: 3 }),
      },
      terrain: data.terrains.Lava,
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({ minDamage: 255, maxDamage: 255 })
    expect(defender).toContain({ minDamage: 130, maxDamage: 174 })
  })
})
