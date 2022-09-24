import creatures from '@/assets/data/creatures'
import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import type { CreatureKey } from '@/types'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Resurrection', () => {
  let battle: Battle
  const resurrection = data.spells.Resurrection

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-40)
  })

  test('Base spell values when creature is undead', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-540)
  })

  test('With Advanced Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-80)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-1580)
  })

  test('With Expert Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-160)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-1660)
  })

  test('Hero with Resurrection specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alamar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-40)
  })

  test('Hero with Resurrection specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Jeddite)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-1740)
  })

  test('Hero with Resurrection specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alamar)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-1780)
  })

  test('Hero with Resurrection specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Jeddite)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, resurrection)

    expect(damage).toBe(-1860)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alamar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'Ballista',
      'Cannon',
      ...creatures.filter((creature) => creature.special?.undead).map((creature) => creature.key),
      ...creatures.filter((creature) => creature.special?.nonLiving).map((creature) => creature.key),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, resurrection)
    })

    expect(totalDamage).toBe(0)
  })
})
