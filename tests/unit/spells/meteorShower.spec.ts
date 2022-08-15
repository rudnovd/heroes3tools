import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Meteor Shower', () => {
  let battle: Battle
  const meteorShower = spells.find((spell) => spell.id === SpellsEnum.MeteorShower)!

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(25)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(275)
  })

  test('With Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(50)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(800)
  })

  test('With Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(850)
  })

  test('Hero with Meteor Shower specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Aislinn)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(26)
  })

  test('Deemer (1 level, 3 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  test('Deemer (4 level, 4 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 4

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(129)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Zombie)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(651)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Thunderbird)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(573)
  })

  test('Deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(557)
  })

  test('Deemer (14 level, 18 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 14
    battle.attacker.hero.stats.power = 18

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Archangel)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(504)
  })

  test('Hero with Meteor Shower specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(902)
  })

  test('Hero with Meteor Shower specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Aislinn)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(927)
  })

  test('Hero with Meteor Shower specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(979)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.AirElemental,
      Creatures.StormElemental,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Earth skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.EarthElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(1400)
  })

  test('Cast on creatures with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithVulnerable = [Creatures.EarthElemental, Creatures.MagmaElemental]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(100)
  })
})
