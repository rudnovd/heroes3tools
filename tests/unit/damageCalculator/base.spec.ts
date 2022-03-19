import { heroes } from '@/assets/database/heroes'
import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels, Spells } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { beforeEach, describe, expect, test } from 'vitest'
import { getBattleCreaturCalculationResults, getCreatureInstance } from '../helpers'

describe('Base Damage Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  test('120 Pikemans vs 3 Devils', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

    battle.attacker.activeCreature.count = 120
    battle.defender.activeCreature.count = 3

    test('Base', () => {
      const { attacker, defender } = getBattleCreaturCalculationResults(battle)

      expect(attacker.minDamage).toBe(69)
      expect(attacker.averageDamage).toBe(138)
      expect(attacker.maxDamage).toBe(206)
      expect(attacker.minKills).toBe(0)
      expect(attacker.averageKills).toBe(0)
      expect(attacker.maxKills).toBe(1)

      expect(defender.minDamage).toBe(153)
      expect(defender.averageDamage).toBe(178)
      expect(defender.maxDamage).toBe(204)
      expect(defender.minKills).toBe(15)
      expect(defender.averageKills).toBe(17)
      expect(defender.maxKills).toBe(20)
    })

    test('With attacker hero', () => {
      const hero = new HeroInstance(heroes[0])
      battle.attacker.hero = hero

      const { attacker, defender } = getBattleCreaturCalculationResults(battle)

      expect(attacker.minDamage).toBe(75)
      expect(attacker.averageDamage).toBe(150)
      expect(attacker.maxDamage).toBe(225)
      expect(attacker.minKills).toBe(0)
      expect(attacker.averageKills).toBe(0)
      expect(attacker.maxKills).toBe(1)

      expect(defender.minDamage).toBe(144)
      expect(defender.averageDamage).toBe(168)
      expect(defender.maxDamage).toBe(192)
      expect(defender.minKills).toBe(14)
      expect(defender.averageKills).toBe(16)
      expect(defender.maxKills).toBe(19)
    })
  })

  test('5 Archangels with Hero vs 93 Gold Golems', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.GoldGolem)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 93

    const hero = heroes.find((hero) => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(712)
    expect(attacker.averageDamage).toBe(712)
    expect(attacker.maxDamage).toBe(712)
    expect(attacker.minKills).toBe(14)
    expect(attacker.averageKills).toBe(14)
    expect(attacker.maxKills).toBe(14)

    expect(defender.minDamage).toBe(223)
    expect(defender.averageDamage).toBe(251)
    expect(defender.maxDamage).toBe(279)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(1)
    expect(defender.maxKills).toBe(1)
  })

  test('5 Archangels with Hero vs 12 Giants', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Giant)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 12

    const hero = heroes.find((hero) => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(662)
    expect(attacker.averageDamage).toBe(662)
    expect(attacker.maxDamage).toBe(662)
    expect(attacker.minKills).toBe(4)
    expect(attacker.averageKills).toBe(4)
    expect(attacker.maxKills).toBe(4)

    expect(defender.minDamage).toBe(144)
    expect(defender.averageDamage).toBe(180)
    expect(defender.maxDamage).toBe(216)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(0)
    expect(defender.maxKills).toBe(0)
  })

  test('20 Wyverns with Hero vs 10 Mighty Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.MightyGorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find((hero) => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(616)
    expect(attacker.averageDamage).toBe(704)
    expect(attacker.maxDamage).toBe(792)
    expect(attacker.minKills).toBe(8)
    expect(attacker.averageKills).toBe(10)
    expect(attacker.maxKills).toBe(11)

    expect(defender.minDamage).toBe(66)
    expect(defender.averageDamage).toBe(77)
    expect(defender.maxDamage).toBe(88)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(1)
    expect(defender.maxKills).toBe(1)
  })

  test('20 Wyverns with Hero vs 10 Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find((hero) => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert
    battle.attacker.hero.skills.fire = SkillLevels.Expert

    const curse = spells.find((spell) => spell.id === Spells.Curse)!
    battle.defender.activeCreature.effects.push(curse)

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(643)
    expect(attacker.averageDamage).toBe(736)
    expect(attacker.maxDamage).toBe(828)
    expect(attacker.minKills).toBe(9)
    expect(attacker.averageKills).toBe(10)
    expect(attacker.maxKills).toBe(11)

    expect(defender.minDamage).toBe(57)
    expect(defender.averageDamage).toBe(57)
    expect(defender.maxDamage).toBe(57)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(0)
    expect(defender.maxKills).toBe(0)
  })

  test('20 Wyverns with Hero vs 10 Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find((hero) => hero.id === Heroes.Valeska)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 13

    const curse = spells.find((spell) => spell.id === Spells.Curse)!
    battle.defender.activeCreature.effects.push(curse)

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(461)
    expect(attacker.averageDamage).toBe(528)
    expect(attacker.maxDamage).toBe(594)
    expect(attacker.minKills).toBe(6)
    expect(attacker.averageKills).toBe(7)
    expect(attacker.maxKills).toBe(8)

    expect(defender.minDamage).toBe(69)
    expect(defender.averageDamage).toBe(69)
    expect(defender.maxDamage).toBe(69)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(0)
    expect(defender.maxKills).toBe(0)
  })
  test('20 Wyverns with Hero vs 10 Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find((hero) => hero.id === Heroes.Valeska)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 15
    battle.attacker.hero.stats.defense = 16
    battle.attacker.hero.skills.fire = SkillLevels.Advanced

    const curse = spells.find((spell) => spell.id === Spells.Curse)!
    battle.defender.activeCreature.effects.push(curse)

    const { attacker, defender } = getBattleCreaturCalculationResults(battle)

    expect(attacker.minDamage).toBe(490)
    expect(attacker.averageDamage).toBe(560)
    expect(attacker.maxDamage).toBe(630)
    expect(attacker.minKills).toBe(7)
    expect(attacker.averageKills).toBe(8)
    expect(attacker.maxKills).toBe(9)

    expect(defender.minDamage).toBe(55)
    expect(defender.averageDamage).toBe(55)
    expect(defender.maxDamage).toBe(55)
    expect(defender.minKills).toBe(0)
    expect(defender.averageKills).toBe(0)
    expect(defender.maxKills).toBe(0)
  })
})
