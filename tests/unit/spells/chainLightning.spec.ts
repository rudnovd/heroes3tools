import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Chain Lightning', () => {
  const chainLightning = data.spells.ChainLightning

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(25)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(425)
  })

  test('With Advanced Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(50)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1250)
  })

  test('With Expert Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(100)
  })

  test('With Expert Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1300)
  })

  test('Hero with Chain Lightning specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(27)
  })

  test('Hero with Chain Lightning specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, { stats: { power: 34 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1498)
  })

  test('Hero with Chain Lightning specialty, Advanced Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          stats: { power: 34 },
          skills: { airMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1525)
  })

  test('Hero with Chain Lightning specialty, Expert Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, { stats: { power: 34 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1579)
  })

  test('Solmyr (13 level, basic sorcery, expert air magic, 8 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          level: 13,
          stats: { power: 8 },
          skills: { airMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.SeaSerpent) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(455)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          level: 14,
          stats: { power: 8 },
          skills: { airMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.InfernalTroglodyte) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(627)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          level: 14,
          stats: { power: 8 },
          skills: { airMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.WolfRaider) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(534)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          level: 14,
          stats: { power: 8 },
          skills: { airMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.WyvernMonarch) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(468)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Solmyr, {
          level: 14,
          stats: { power: 8 },
          skills: { airMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.GrandElf) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(494)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
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
      'EarthElemental',
      'MagmaElemental',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Air skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 24 },
          skills: { airMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.AirElemental) },
    })
    const damage = battle.cast(battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(2120)
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

    const creaturesWithVulnerable: Array<CreatureKey> = ['AirElemental', 'StormElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(100)
  })
})
