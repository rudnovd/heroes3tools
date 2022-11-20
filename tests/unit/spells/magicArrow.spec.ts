import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Magic Arrow', () => {
  const magicArrow = data.spells.MagicArrow

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(10)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 10 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(110)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(20)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(320)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(30)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(330)
  })

  test('With Advanced Earth and Expert Fire skills', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { fireMagic: SkillLevels.Expert, earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(30)
  })

  test('Hero with Magic Arrow specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Ciele, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(15)
  })

  test('Hero with Magic Arrow specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Ciele, {
          stats: { power: 34 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(525)
  })

  test('Hero with Magic Arrow specialty, Advanced Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Ciele, {
          stats: { power: 34 },
          skills: { fireMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(540)
  })

  test('Hero with Magic Arrow specialty, Expert Fire skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Ciele, {
          stats: { power: 34 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, magicArrow)

    expect(damage).toBe(555)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Ciele, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GreenDragon',
      'RedDragon',
      'AzureDragon',
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'EfreetSultan',
      'Efreeti',
      'FireElemental',
      'EnergyElemental',
      'Phoenix',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, magicArrow)
    })

    expect(totalDamage).toBe(0)
  })
})
