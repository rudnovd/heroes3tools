import { creatures } from '@/assets/database/creatures'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Death Ripple', () => {
  let battle: Battle
  const deathRipple = spells.find((spell) => spell.id === SpellsEnum.DeathRipple)!

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  test('Base spell values for undead', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(60)
  })

  test('With Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(20)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(170)
  })

  test('With Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(30)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  test('Hero with Death Ripple specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  test('Hero with Death Ripple specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  test('Hero with Death Ripple specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(190)
  })

  test('Hero with Death Ripple specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(200)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GreenDragon,
      Creatures.RedDragon,
      Creatures.AzureDragon,
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.Ballista,
      Creatures.Cannon,
      ...creatures.filter((creature) => creature.special?.undead).map((creature) => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)
    })

    expect(totalDamage).toBe(0)
  })
})
