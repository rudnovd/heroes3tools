import { creatures } from '@/assets/database/creatures'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, it } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('destroy Undead', () => {
  let battle: Battle
  const destroyUndead = spells.find(spell => spell.id === SpellsEnum.DestroyUndead)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(10)
  })

  it('base spell values for not undead', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(0)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(110)
  })

  it('with Advanced Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(20)
  })

  it('with Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(320)
  })

  it('with Expert Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(50)
  })

  it('with Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)

    expect(damage).toBe(350)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      ...creatures.filter(creature => creature.special?.undead === undefined).map(creature => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, destroyUndead)
    })

    expect(totalDamage).toBe(0)
  })
})
