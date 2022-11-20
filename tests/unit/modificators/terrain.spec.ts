import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Terrain modificator', () => {
  test('12 Green Dragons vs 24 Efreets on Grass terrain', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.GreenDragon, { count: 12 }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Efreeti, { count: 24 }),
      },
      terrain: data.terrains.Grass,
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({ minDamage: 648, maxDamage: 810 })
    expect(defender).toContain({ minDamage: 355, maxDamage: 532 })
  })

  test('12 Green Dragons vs 24 Efreets on Lava terrain', () => {
    const battle = new Battle({
      attacker: {
        activeCreature: new CreatureInstance(data.creatures.GreenDragon, { count: 12 }),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Efreeti, { count: 24 }),
      },
      terrain: data.terrains.Lava,
    })
    const { attacker, defender } = battle.calculate()

    expect(attacker).toContain({ minDamage: 600, maxDamage: 750 })
    expect(defender).toContain({ minDamage: 374, maxDamage: 561 })
  })
})
