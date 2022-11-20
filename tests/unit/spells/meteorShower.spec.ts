import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Meteor Shower', () => {
  const meteorShower = data.spells.MeteorShower

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
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(25)
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
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(275)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(50)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(800)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
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
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(850)
  })

  test('Hero with Meteor Shower specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Aislinn, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(26)
  })

  test('Deemer (1 level, 3 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          stats: { power: 3 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Wight) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  test('Deemer (4 level, 4 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          level: 4,
          stats: { power: 4 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Wight) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(129)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          level: 17,
          stats: { power: 17 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Zombie) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(651)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          level: 17,
          stats: { power: 17 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Thunderbird) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(573)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          level: 17,
          stats: { power: 17 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Devil) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(557)
  })

  test('Deemer (14 level, 18 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          level: 14,
          stats: { power: 18 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Archangel) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(504)
  })

  test('Hero with Meteor Shower specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          stats: { power: 34 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(902)
  })

  test('Hero with Meteor Shower specialty, Advanced Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Aislinn, {
          stats: { power: 34 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(927)
  })

  test('Hero with Meteor Shower specialty, Expert Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Deemer, {
          stats: { power: 34 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(979)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Xyron, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'AirElemental',
      'StormElemental',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Earth skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 24 },
          skills: { earthMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.EarthElemental) },
    })
    const damage = battle.cast(battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(1400)
  })

  test('Cast on creatures with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithVulnerable: Array<CreatureKey> = ['EarthElemental', 'MagmaElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(100)
  })
})
