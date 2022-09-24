import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import type { CreatureKey } from '@/types'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Chain Lightning', () => {
  let battle: Battle
  const chainLightning = data.spells.ChainLightning

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(25)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(425)
  })

  test('With Advanced Air skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.airMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(50)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.airMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1250)
  })

  test('With Expert Air skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(100)
  })

  test('With Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1300)
  })

  test('Hero with Chain Lightning specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(27)
  })

  test('Hero with Chain Lightning specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1498)
  })

  test('Hero with Chain Lightning specialty, Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.airMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1525)
  })

  test('Hero with Chain Lightning specialty, Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1579)
  })

  test('Solmyr (13 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.level = 13
    battle.attacker.hero.skills.airMagic = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.SeaSerpent)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(455)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.airMagic = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.InfernalTroglodyte)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(627)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.airMagic = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.WolfRaider)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(534)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.airMagic = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.WyvernMonarch)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(468)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.airMagic = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.GrandElf)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(494)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

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
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Air skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.AirElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(2120)
  })

  test('Cast on creatures with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithVulnerable: Array<CreatureKey> = ['AirElemental', 'StormElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(100)
  })
})
