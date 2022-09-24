import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Animate Dead', () => {
  let battle: Battle
  const animateDead = data.spells.AnimateDead

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  test('Base spell values when creature is not undead', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-530)
  })

  test('With Advanced Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-60)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1560)
  })

  test('With Expert Earth skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-160)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1660)
  })

  test('Hero with Animate Dead specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Thant)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  test('Hero with Animate Dead specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Thant)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1730)
  })

  test('Hero with Animate Dead specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Thant)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1760)
  })

  test('Hero with Animate Dead specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Thant)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earthMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1860)
  })

  test('Cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Thant)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)

    const creaturesWithImmunity = [
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'Ballista',
      'Cannon',
      // ...data.creatures.filter((creature) => creature.special?.undead === undefined).map((creature) => creature.id),
      // ...data.creatures.filter((creature) => creature.special?.nonLiving).map((creature) => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)
    })

    expect(totalDamage).toBe(0)
  })
})
