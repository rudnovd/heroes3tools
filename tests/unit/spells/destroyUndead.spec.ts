import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Destroy Undead', () => {
  const destroyUndead = data.spells.DestroyUndead

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(10)
  })

  test('Base spell values for not undead', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(110)
  })

  test('With Advanced Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(20)
  })

  test('With Advanced Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(320)
  })

  test('With Expert Air skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(50)
  })

  test('With Expert Air skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { airMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })
    const damage = battle.cast(battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(350)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Septienna, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })

    const creaturesWithImmunity = [
      // ...data.creatures.filter((creature) => creature.special?.undead === undefined).map((creature) => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = new CreatureInstance(creature)
      totalDamage += battle.cast(battle.defender.activeCreature, destroyUndead)
    })

    expect(totalDamage).toBe(0)
  })
})
