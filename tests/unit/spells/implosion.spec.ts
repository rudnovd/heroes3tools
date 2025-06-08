import { beforeEach, describe, expect, it } from 'vitest'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'

import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('implosion', () => {
  let battle: Battle
  const implosion = spells.find(spell => spell.id === SpellsEnum.Implosion)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(100)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(850)
  })

  it('with Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(200)
  })

  it('with Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(2450)
  })

  it('with Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(300)
  })

  it('with Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)

    expect(damage).toBe(2550)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.Ballista,
      Creatures.Cannon,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, implosion)
    })

    expect(totalDamage).toBe(0)
  })
})
