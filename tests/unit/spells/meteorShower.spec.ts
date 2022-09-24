import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import type { CreatureKey } from '@/types'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Meteor Shower', () => {
  let battle: Battle
  const meteorShower = data.spells.MeteorShower

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(25)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(275)
  })

  test('With Advanced Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(50)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(800)
  })

  test('With Expert Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(850)
  })

  test('Hero with Meteor Shower specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Aislinn)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(26)
  })

  test('Deemer (1 level, 3 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  test('Deemer (4 level, 4 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 4

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(129)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Zombie)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(651)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Thunderbird)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(573)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Devil)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(557)
  })

  test('Deemer (14 level, 18 spell power)', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.level = 14
    battle.attacker.hero.stats.power = 18

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Archangel)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(504)
  })

  test('Hero with Meteor Shower specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(902)
  })

  test('Hero with Meteor Shower specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Aislinn)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(927)
  })

  test('Hero with Meteor Shower specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Deemer)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(979)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Xyron)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

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
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Earth skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.EarthElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(1400)
  })

  test('Cast on creatures with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithVulnerable: Array<CreatureKey> = ['EarthElemental', 'MagmaElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(100)
  })
})
