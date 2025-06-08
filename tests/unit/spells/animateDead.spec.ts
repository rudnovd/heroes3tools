import { beforeEach, describe, expect, it } from 'vitest'
import { creatures } from '@/assets/database/creatures'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'

import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('animate Dead', () => {
  let battle: Battle
  const animateDead = spells.find(spell => spell.id === SpellsEnum.AnimateDead)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  it('base spell values when creature is not undead', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(0)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-530)
  })

  it('with Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-60)
  })

  it('with Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1560)
  })

  it('with Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-160)
  })

  it('with Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1660)
  })

  it('hero with Animate Dead specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Thant)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  it('hero with Animate Dead specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Thant)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1730)
  })

  it('hero with Animate Dead specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Thant)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1760)
  })

  it('hero with Animate Dead specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Thant)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1860)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Thant)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.Ballista,
      Creatures.Cannon,
      ...creatures.filter(creature => creature.special?.undead === undefined).map(creature => creature.id),
      ...creatures.filter(creature => creature.special?.nonLiving).map(creature => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.attacker.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.attacker, battle.attacker.activeCreature, animateDead)
    })

    expect(totalDamage).toBe(0)
  })
})
