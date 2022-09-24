import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Destroy Undead', () => {
  let battle: Battle
  const destroyUndead = data.spells.DestroyUndead

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(10)
  })

  test('Base spell values for not undead', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(110)
  })

  test('With Advanced Air skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.airMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(20)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.airMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(320)
  })

  test('With Expert Air skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(50)
  })

  test('With Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.airMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(350)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Septienna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithImmunity = [
      // ...data.creatures.filter((creature) => creature.special?.undead === undefined).map((creature) => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = new CreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)
    })

    expect(totalDamage).toBe(0)
  })
})
