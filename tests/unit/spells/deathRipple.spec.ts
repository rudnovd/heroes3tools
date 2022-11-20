import creatures from '@/assets/data/creatures'
import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Death Ripple', () => {
  const deathRipple = data.spells.DeathRipple

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
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  test('Base spell values for undead', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(0)
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
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(60)
  })

  test('With Advanced Earth skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(20)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(170)
  })

  test('With Expert Earth skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(30)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  test('Hero with Death Ripple specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  test('Hero with Death Ripple specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, {
          stats: { power: 34 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  test('Hero with Death Ripple specialty, Advanced Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, {
          stats: { power: 34 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(190)
  })

  test('Hero with Death Ripple specialty, Expert Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, {
          stats: { power: 34 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(200)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, {
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
      'MagicElemental',
      'Ballista',
      'Cannon',
      ...creatures.filter((creature) => creature.special?.undead).map((creature) => creature.key),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, deathRipple)
    })

    expect(totalDamage).toBe(0)
  })
})
