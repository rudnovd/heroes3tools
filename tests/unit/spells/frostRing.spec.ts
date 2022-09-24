import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import type { CreatureKey } from '@/types'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Frost Ring', () => {
  let battle: Battle
  const frostRing = data.spells.FrostRing

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(15)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(115)
  })

  test('With Advanced Water skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(30)
  })

  test('With Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(330)
  })

  test('With Expert Water skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(60)
  })

  test('With Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(360)
  })

  test('Hero with Frost Ring specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(16)
  })

  test('Hero with frostRing specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(366)
  })

  test('Hero with Frost Ring specialty, Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(382)
  })

  test('Hero with Frost Ring specialty, Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(412)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

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
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Water skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.FireElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)

    expect(damage).toBe(600)
  })

  test('Cast on Creature with vulnerable', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithVulnerable: Array<CreatureKey> = ['FireElemental', 'EnergyElemental']

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, frostRing)
    })

    expect(totalDamage).toBe(60)
  })
})
