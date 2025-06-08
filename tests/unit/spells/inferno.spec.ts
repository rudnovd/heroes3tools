import { beforeEach, describe, expect, it } from 'vitest'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'

import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('inferno', () => {
  let battle: Battle
  const inferno = spells.find(spell => spell.id === SpellsEnum.Inferno)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(20)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(120)
  })

  it('with Advanced Fire skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(40)
  })

  it('with Advanced Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(340)
  })

  it('with Expert Fire skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(80)
  })

  it('with Expert Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(380)
  })

  it('hero with Inferno specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(22)
  })

  it('hero with Inferno specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(396)
  })

  it('hero with Inferno specialty, Advanced Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.fire = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(418)
  })

  it('hero with Inferno specialty, Expert Fire skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(462)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.Efreet,
      Creatures.EfreetSultan,
      Creatures.FireElemental,
      Creatures.EnergyElemental,
      Creatures.Phoenix,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)
    })

    expect(totalDamage).toBe(0)
  })

  it('with Expert Fire skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.fire = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WaterElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)

    expect(damage).toBe(640)
  })

  it('cast on creatures with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithVulnerable = [Creatures.WaterElemental, Creatures.IceElemental]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, inferno)
    })

    expect(totalDamage).toBe(80)
  })
})
