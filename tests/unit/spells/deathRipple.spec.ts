import { beforeEach, describe, expect, it } from 'vitest'
import { creatures } from '@/assets/database/creatures'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'

import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('death Ripple', () => {
  let battle: Battle
  const deathRipple = spells.find(spell => spell.id === SpellsEnum.DeathRipple)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  it('base spell values for undead', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Skeleton)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(0)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(60)
  })

  it('with Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(20)
  })

  it('with Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(170)
  })

  it('with Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(30)
  })

  it('with Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  it('hero with Death Ripple specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(10)
  })

  it('hero with Death Ripple specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(180)
  })

  it('hero with Death Ripple specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(190)
  })

  it('hero with Death Ripple specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Septienna)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)

    expect(damage).toBe(200)
  })

  it('cast on creature with immunity', () => {
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
      ...creatures.filter(creature => creature.special?.undead).map(creature => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, deathRipple)
    })

    expect(totalDamage).toBe(0)
  })
})
