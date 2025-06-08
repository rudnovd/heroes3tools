import { beforeEach, describe, expect, it } from 'vitest'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'

import { Creatures, Heroes, Spells as SpellsEnum } from '@/models/enums'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('ice Bolt', () => {
  let battle: Battle
  const iceBolt = spells.find(spell => spell.id === SpellsEnum.IceBolt)!

  beforeEach(() => {
    battle = new Battle()
  })

  it('base spell values', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(10)
  })

  it('with Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 10

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(210)
  })

  it('with Advanced Water skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.water = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(20)
  })

  it('with Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.water = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(620)
  })

  it('with Expert Water skill', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 0
    battle.attacker.hero.skills.water = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(50)
  })

  it('with Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Orrin)
    battle.attacker.hero.stats.power = 30
    battle.attacker.hero.skills.water = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(650)
  })

  it('hero with Ice Bolt specialty', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(13)
  })

  it('hero with Ice Bolt specialty and standard Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(61)
  })

  it('hero with Ice Bolt specialty and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 34

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(835)
  })

  it('hero with Ice Bolt specialty, Advanced Water skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.water = 2

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(847)
  })

  it('hero with Ice Bolt specialty, Expert Water skill and high Spell Power', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 34
    battle.attacker.hero.skills.water = 3

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(884)
  })

  it('cast on creature with immunity', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 0

    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

    const creaturesWithImmunity = [
      Creatures.GreenDragon,
      Creatures.RedDragon,
      Creatures.AzureDragon,
      Creatures.GoldDragon,
      Creatures.BlackDragon,
      Creatures.MagicElemental,
      Creatures.WaterElemental,
      Creatures.IceElemental,
      Creatures.Nymph,
      Creatures.Oceanid,
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creature) => {
      battle.defender.activeCreature = getCreatureInstance(creature)
      totalDamage += battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    })

    expect(totalDamage).toBe(0)
  })

  it('alagar (7 power, level 1, basic sorcery) cast on Pikeman', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 7
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Pikeman)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(182)
  })

  it('alagar (1 power, level 1, basic sorcery) cast on Imp', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 1
    battle.attacker.hero.stats.power = 1
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(37)
  })

  it('alagar (2 power, level 2, basic sorcery) cast on Imp', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 2
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(66)
  })

  it('alagar (2 power, level 3, advanced sorcery) cast on Imp', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 3
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 2
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(79)
  })

  it('alagar (2 power, level 4, expert sorcery) cast on Imp', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(91)
  })

  it('alagar (2 power, level 4, expert sorcery) cast on Naga', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.level = 4
    battle.attacker.hero.stats.power = 2
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Naga)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(65)
  })

  it('alagar (17 power, level 12, basic sorcery) cast on Wolf Raider', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.WolfRaider)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(617)
  })

  it('alagar (17 power, level 12, basic sorcery) cast on Vampire', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Vampire)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(501)
  })

  it('alagar (17 power, level 12, basic sorcery) cast on Behemoth', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Behemoth)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(424)
  })

  it('alagar (17 power, level 12, basic sorcery) cast on Halberdier', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 17
    battle.attacker.hero.level = 12
    battle.attacker.hero.skills.sorcery = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Halberdier)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(848)
  })

  it('alagar (19 power, level 16, expert sorcery, basic water) cast on Hapry Hag', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.HarpyHag)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(913)
  })

  it('alagar (19 power, level 16, expert sorcery, basic water) cast on Imp', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.HarpyHag)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Imp)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(1319)
  })

  it('alagar (19 power, level 16, expert sorcery, basic water) cast on Naga Queen', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.HarpyHag)
    battle.defender.activeCreature = getCreatureInstance(Creatures.NagaQueen)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(609)
  })

  it('alagar (19 power, level 16, expert sorcery, basic water) cast on Haspid', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 16
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 1
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.HarpyHag)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Haspid)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(609)
  })

  it('alagar (19 power, level 17, expert sorcery, advanced water) cast on Ogre Mage', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 2
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.OgreMage)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(728)
  })

  it('alagar (19 power, level 17, expert sorcery, advanced water) cast on Gold Golem', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 2
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.GoldGolem)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(102)
  })

  it('alagar (19 power, level 17, expert sorcery, advanced water) cast on Fire Elemental', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 2
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.FireElemental)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(1456)
  })

  it('alagar (19 power, level 17, expert sorcery, advanced water) cast on Iron Golem', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 19
    battle.attacker.hero.level = 17
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 2
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.IronGolem)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(195)
  })

  it('alagar (29 power, level 20, expert sorcery, expert water) cast on Nix', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Nix)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(1065)
  })

  it('alagar (29 power, level 20, expert sorcery, expert water) cast on Arch Devil', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.ArchDevil)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(983)
  })

  it('alagar (18 power, level 19, expert sorcery, expert water) cast on Manticores', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 18
    battle.attacker.hero.level = 19
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Manticore)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(693)
  })

  it('alagar (29 power, level 20, expert sorcery, expert water) cast on Marksman', () => {
    battle.attacker.hero = getHeroInstance(Heroes.Alagar)
    battle.attacker.hero.stats.power = 29
    battle.attacker.hero.level = 20
    battle.attacker.hero.skills.sorcery = 3
    battle.attacker.hero.skills.water = 3
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Marksman)
    const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, iceBolt)
    expect(damage).toBe(1638)
  })
})
