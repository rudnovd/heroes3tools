import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Chain Lightning', () => {
  let battle: Battle
  const chainLightning = spells.find((spell) => spell.id === SpellsEnum.ChainLightning)!

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(25)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(425)
  })

  test('With Advanced Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(50)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1250)
  })

  test('With Expert Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(100)
  })

  test('With Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1300)
  })

  test('Hero with Chain Lightning specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(27)
  })

  test('Hero with Chain Lightning specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1498)
  })

  test('Hero with Chain Lightning specialty, Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1525)
  })

  test('Hero with Chain Lightning specialty, Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1579)
  })

  test('Solmyr (13 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 13
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.SeaSerpent)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(455)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.InfernalTroglodyte)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(627)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WolfRaider)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(534)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WyvernMonarch)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(468)
  })

  test('Solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.GrandElf)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(494)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.EarthElemental,
      Creatures.MagmaElemental,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert Air skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.AirElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(2120)
  })

  test('Cast on creatures with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithVulnerable = [Creatures.AirElemental, Creatures.StormElemental]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(100)
  })
})
