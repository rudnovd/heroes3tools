import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'
import { beforeEach, describe, expect, test } from 'vitest'
import { data, getBattleCreatureCalculationResults } from '../helpers'

describe('Base Damage Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('120 Pikemans vs 3 Devils', () => {
    test('Base', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Devil)

      battle.attacker.activeCreature.count = 120
      battle.defender.activeCreature.count = 3

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({
        minDamage: 69,
        maxDamage: 206,
        minKills: 0,
        maxKills: 1,
      })
      expect(defender).toContain({
        minDamage: 153,
        maxDamage: 204,
        minKills: 15,
        maxKills: 20,
      })
    })

    test('With attacker hero', () => {
      const hero = new HeroInstance(data.heroes.Orrin)
      battle.attacker.hero = hero
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Devil)

      battle.attacker.activeCreature.count = 120
      battle.defender.activeCreature.count = 3

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toContain({
        minDamage: 75,
        maxDamage: 225,
        minKills: 0,
        maxKills: 1,
      })
      expect(defender).toContain({
        minDamage: 144,
        maxDamage: 192,
        minKills: 14,
        maxKills: 19,
      })
    })
  })

  test('5 Archangels with Hero vs 93 Gold Golems', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.GoldGolem)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 93

    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({
      minDamage: 712,
      maxDamage: 712,
      minKills: 14,
      maxKills: 14,
    })
    expect(defender).toContain({
      minDamage: 223,
      maxDamage: 279,
      minKills: 0,
      maxKills: 1,
    })
  })

  test('5 Archangels with Hero vs 12 Giants', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archangel)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Giant)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 12

    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({
      minDamage: 662,
      maxDamage: 662,
      minKills: 4,
      maxKills: 4,
    })
    expect(defender).toContain({
      minDamage: 144,
      maxDamage: 216,
      minKills: 0,
      maxKills: 0,
    })
  })

  test('20 Wyverns with Hero vs 10 Mighty Gorgon', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Wyvern)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.MightyGorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({
      minDamage: 616,
      maxDamage: 792,
      minKills: 8,
      maxKills: 11,
    })
    expect(defender).toContain({
      minDamage: 66,
      maxDamage: 88,
      minKills: 0,
      maxKills: 1,
    })
  })

  test('20 Wyverns with Hero vs 10 Gorgon', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.Wyvern)
    battle.defender.activeCreature = new CreatureInstance(data.creatures.Gorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert
    battle.attacker.hero.skills.fireMagic = SkillLevels.Expert

    const curse = data.spells.Curse
    battle.defender.activeCreature.effects[curse.key] = curse

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({
      minDamage: 643,
      maxDamage: 828,
      minKills: 9,
      maxKills: 11,
    })
    expect(defender).toContain({
      minDamage: 57,
      maxDamage: 57,
      minKills: 0,
      maxKills: 0,
    })
  })

  test('11 Ogre Magi vs 59 Halberdiers', () => {
    battle.attacker.activeCreature = new CreatureInstance(data.creatures.OgreMage)
    battle.attacker.activeCreature.count = 11

    battle.attacker.hero = new HeroInstance(data.heroes.Adela)
    battle.attacker.hero.stats.attack = 5
    battle.attacker.hero.stats.defense = 1
    battle.attacker.hero.level = 10

    battle.attacker.terrain = data.terrains.Sand
    battle.defender.terrain = data.terrains.Sand

    battle.defender.activeCreature = new CreatureInstance(data.creatures.Halberdier)
    battle.defender.activeCreature.count = 59

    const { attacker } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toContain({
      minDamage: 108,
      maxDamage: 217,
      minKills: 10,
      maxKills: 21,
    })
  })
})
