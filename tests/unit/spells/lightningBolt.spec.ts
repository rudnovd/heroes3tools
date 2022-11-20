import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Lightning Bolt', () => {
  const lightningBolt = data.spells.LightningBolt

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        creatures: [],
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        hero: new HeroInstance(data.heroes.Orrin),
        creatures: [],
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(10)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(260)
  })

  test('With Advanced Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(20)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(770)
  })

  test('With Expert Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(50)
  })

  test('With Expert Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(800)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GreenDragon',
      'RedDragon',
      'AzureDragon',
      'GoldDragon',
      'BlackDragon',
      'EarthElemental',
      'MagmaElemental',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, lightningBolt)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Fire skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 24 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.AirElemental),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, lightningBolt)

    expect(damage).toBe(1300)
  })

  test('Cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const creaturesWithVulnerable: Array<CreatureKey> = ['AirElemental', 'StormElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, lightningBolt)
    })

    expect(totalDamage).toBe(40)
  })
})
