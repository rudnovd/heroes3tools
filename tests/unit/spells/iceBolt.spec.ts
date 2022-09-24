import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import type { CreatureKey } from '@/types'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Ice Bolt', () => {
  let battle: Battle
  const iceBolt = data.spells.IceBolt

  beforeEach(() => {
    battle = new Battle()
  })

  test('Base spell values', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(10)
  })

  test('With Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(210)
  })

  test('With Advanced Water skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(20)
  })

  test('With Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(620)
  })

  test('With Expert Water skill', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(50)
  })

  test('With Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(650)
  })

  test('Hero with Ice Bolt specialty', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(11)
  })

  test('Hero with Ice Bolt specialty and standard Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(54)
  })

  test('Hero with Ice Bolt specialty and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(746)
  })

  test('Hero with Ice Bolt specialty, Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.waterMagic = 2

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(758)
  })

  test('Hero with Ice Bolt specialty, Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.waterMagic = 3

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(789)
  })

  test('cast on creature with immunity', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GreenDragon',
      'RedDragon',
      'AzureDragon',
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'WaterElemental',
      'IceElemental',
      'Nymph',
      'Oceanid',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    })

    expect(totalDamage).toBe(0)
  })

  test('Alagar (7 power, level 1, basic sorcery) cast on Pikeman', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 7
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(162)
  })

  test('Alagar (1 power, level 1, basic sorcery) cast on Imp', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 1
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(32)
  })

  test('Alagar (2 power, level 2, basic sorcery) cast on Imp', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 2
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(56)
  })

  test('Alagar (2 power, level 3, advanced sorcery) cast on Imp', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 3
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 2
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(60)
  })

  test('Alagar (2 power, level 4, expert sorcery) cast on Imp', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(64)
  })

  test('Alagar (2 power, level 4, expert sorcery) cast on Naga', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Naga)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(57)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Wolf Raider', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.WolfRaider)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(434)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Vampire', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Vampire)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(401)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Behemoth', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Behemoth)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(379)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Halberdier', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Halberdier)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(500)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Hapry Hag', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.HarpyHag)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(556)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Imp', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.HarpyHag)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(664)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Naga Queen', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.HarpyHag)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.NagaQueen)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(475)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Haspid', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 1
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.HarpyHag)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Haspid)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(475)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Ogre Mage', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 2
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.OgreMage)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(516)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Gold Golem', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 2
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.GoldGolem)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(75)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Fire Elemental', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 2
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.FireElemental)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(1032)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Iron Golem', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 2
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.IronGolem)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(132)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Nix', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 3
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Nix)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(790)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Arch Devil', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 3
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.ArchDevil)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(768)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Marksman', () => {
    battle.attacker.hero = new HeroInstance(data.heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.waterMagic = 3
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Marksman)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(942)
  })
})
