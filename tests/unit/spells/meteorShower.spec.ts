import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, it } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('meteor Shower', () => {
  let battle: Battle
  const meteorShower = spells.find(spell => spell.id === SpellsEnum.MeteorShower)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(25)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(275)
  })

  it('with Advanced Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(50)
  })

  it('with Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(800)
  })

  it('with Expert Earth skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  it('with Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(850)
  })

  it('hero with Meteor Shower specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Aislinn)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(26)
  })

  it('deemer (1 level, 3 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(100)
  })

  it('deemer (4 level, 4 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 4

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Wight)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(129)
  })

  it('deemer (17 level, 17 spell power, expert earth)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Zombie)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(651)
  })

  it('deemer (17 level, 17 spell power, expert earth, archangel vs thunderbird)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Thunderbird)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(573)
  })

  it('deemer (17 level, 17 spell power, expert earth, archangel vs devil)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 17
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(557)
  })

  it('deemer (14 level, 18 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.level = 14
    battle.attacker.hero.stats.power = 18

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Archangel)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(504)
  })

  it('hero with Meteor Shower specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(902)
  })

  it('hero with Meteor Shower specialty, Advanced Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Aislinn)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(927)
  })

  it('hero with Meteor Shower specialty, Expert Earth skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Deemer)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(979)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Xyron)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.AirElemental,
      Creatures.StormElemental,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(0)
  })

  it('with Expert Earth skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.earth = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.EarthElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)

    expect(damage).toBe(1400)
  })

  it('cast on creatures with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithVulnerable = [Creatures.EarthElemental, Creatures.MagmaElemental]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, meteorShower)
    })

    expect(totalDamage).toBe(100)
  })
})
