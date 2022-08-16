import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Fire Wall', () => {
  let battle: Battle
  const fireWall = spells.find((spell) => spell.id === SpellsEnum.Firewall)!

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(10)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(110)
  })

  test('With Advanced Fire skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(20)
  })

  test('With Advanced Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(320)
  })

  test('With Expert Fire skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(50)
  })

  test('With Expert Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(350)
  })

  test('Hero with Fire Wall specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Luna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(20)
  })

  test('Hero with Fire Wall specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Luna)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(700)
  })

  test('Hero with Fire Wall specialty, Advanced Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Luna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(720)
  })

  test('Hero with Fire Wall specialty, Expert Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Luna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)

    expect(damage).toBe(780)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Luna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GreenDragon,
      Creatures.RedDragon,
      Creatures.AzureDragon,
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.EfreetSultan,
      Creatures.Efreet,
      Creatures.FireElemental,
      Creatures.EnergyElemental,
      Creatures.Phoenix,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, fireWall)
    })

    expect(totalDamage).toBe(0)
  })
})
