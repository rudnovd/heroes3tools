import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Frost Ring', () => {
  const frostRing = data.spells.FrostRing

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(15)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(115)
  })

  test('With Advanced Water skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { waterMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(30)
  })

  test('With Advanced Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { waterMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(330)
  })

  test('With Expert Water skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { waterMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(60)
  })

  test('With Expert Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { waterMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(360)
  })

  test('Hero with Frost Ring specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adelaide, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(16)
  })

  test('Hero with frostRing specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adelaide, { stats: { power: 34 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(366)
  })

  test('Hero with Frost Ring specialty, Advanced Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adelaide, {
          stats: { power: 34 },
          skills: { waterMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(382)
  })

  test('Hero with Frost Ring specialty, Expert Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adelaide, {
          stats: { power: 34 },
          skills: { waterMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(412)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Adelaide, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const creaturesWithImmunity = [
      'GreenDragon',
      'RedDragon',
      'AzureDragon',
      'GoldDragon',
      'BlackDragon',
      'WaterElemental',
      'IceElemental',
      'Nymph',
      'Oceanid',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, frostRing)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Water skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 24 }, skills: { waterMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.FireElemental),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, frostRing)

    expect(damage).toBe(600)
  })

  test('Cast on Creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const creaturesWithVulnerable: Array<CreatureKey> = ['FireElemental', 'EnergyElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, frostRing)
    })

    expect(totalDamage).toBe(60)
  })
})
