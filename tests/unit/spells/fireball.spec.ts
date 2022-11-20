import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Fireball', () => {
  const fireball = data.spells.Fireball

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(15)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 10 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(115)
  })

  test('With Advanced Fire skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { fireMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(30)
  })

  test('With Advanced Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { fireMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(330)
  })

  test('With Expert Fire skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(60)
  })

  test('With Expert Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(360)
  })

  test('Hero with Fireball specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Xarfax, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(16)
  })

  test('Hero with Fireball specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Manfred, {
          stats: { power: 34 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(366)
  })

  test('Hero with Fireball specialty, Advanced Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Xarfax, {
          stats: { power: 34 },
          skills: { fireMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(382)
  })

  test('Hero with Fireball specialty, Expert Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Manfred, {
          stats: { power: 34 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(412)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
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
      'Efreeti',
      'EfreetSultan',
      'FireElemental',
      'EnergyElemental',
      'Phoenix',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, fireball)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Fire skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 24 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.WaterElemental),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, fireball)

    expect(damage).toBe(600)
  })

  test('Cast on creatures with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const creaturesWithVulnerable: Array<CreatureKey> = ['WaterElemental', 'IceElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, fireball)
    })

    expect(totalDamage).toBe(60)
  })
})
