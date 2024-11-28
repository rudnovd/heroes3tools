import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, it } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('chain Lightning', () => {
  let battle: Battle
  const chainLightning = spells.find(spell => spell.id === SpellsEnum.ChainLightning)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(25)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(425)
  })

  it('with Advanced Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(50)
  })

  it('with Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1250)
  })

  it('with Expert Air skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(100)
  })

  it('with Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1300)
  })

  it('hero with Chain Lightning specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(27)
  })

  it('hero with Chain Lightning specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1498)
  })

  it('hero with Chain Lightning specialty, Advanced Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.air = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1525)
  })

  it('hero with Chain Lightning specialty, Expert Air skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(1579)
  })

  it('solmyr (13 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 13
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.SeaSerpent)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(455)
  })

  it('solmyr (14 level, basic sorcery, expert air magic, 8 spell power)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.InfernalTroglodyte)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(627)
  })

  it('solmyr (14 level, basic sorcery, expert air magic, 8 spell power, arhangel vs wolf raider)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WolfRaider)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(534)
  })

  it('solmyr (14 level, basic sorcery, expert air magic, 8 spell power archangel vs wyvern monarch)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WyvernMonarch)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(468)
  })

  it('solmyr (14 level, basic sorcery, expert air magic, 8 spell power archangel vs grand elf)', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Solmyr)
    battle.attacker.hero.level = 14
    battle.attacker.hero.skills.air = 3
    battle.attacker.hero.stats.power = 8
    battle.attacker.hero.skills.sorcery = 1

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.GrandElf)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(494)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.EarthElemental,
      Creatures.MagmaElemental,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(0)
  })

  it('with Expert Air skill and high Spell Power cast on creature with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 24
    battle.attacker.hero.skills.air = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.AirElemental)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)

    expect(damage).toBe(2120)
  })

  it('cast on creatures with vulnerable', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithVulnerable = [Creatures.AirElemental, Creatures.StormElemental]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, chainLightning)
    })

    expect(totalDamage).toBe(100)
  })
})
