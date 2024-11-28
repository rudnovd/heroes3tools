import { heroes } from '@/assets/database/heroes'
import { spells } from '@/assets/database/spells'
import { terrains } from '@/assets/database/terrains'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels, Spells, Terrains } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { beforeEach, describe, expect, it } from 'vitest'
import { getBattleCreatureCalculationResults, getCreatureInstance, getHeroInstance } from '../helpers'

describe('base Damage Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('120 Pikemans vs 3 Devils', () => {
    it('base', () => {
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

      battle.attacker.activeCreature.count = 120
      battle.defender.activeCreature.count = 3

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toMatchObject({
        minDamage: 69,
        maxDamage: 206,
        minKills: 0,
        maxKills: 1,
      })
      expect(defender).toMatchObject({
        minDamage: 153,
        maxDamage: 204,
        minKills: 15,
        maxKills: 20,
      })
    })

    it('with attacker hero', () => {
      const hero = new HeroInstance(heroes[0])
      battle.attacker.hero = hero
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Devil)

      battle.attacker.activeCreature.count = 120
      battle.defender.activeCreature.count = 3

      const { attacker, defender } = getBattleCreatureCalculationResults(battle)

      expect(attacker).toMatchObject({
        minDamage: 75,
        maxDamage: 225,
        minKills: 0,
        maxKills: 1,
      })
      expect(defender).toMatchObject({
        minDamage: 144,
        maxDamage: 192,
        minKills: 14,
        maxKills: 19,
      })
    })
  })

  it('5 Archangels with Hero vs 93 Gold Golems', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.GoldGolem)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 93

    const hero = heroes.find(hero => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({
      minDamage: 712,
      maxDamage: 712,
      minKills: 14,
      maxKills: 14,
    })
    expect(defender).toMatchObject({
      minDamage: 223,
      maxDamage: 279,
      minKills: 0,
      maxKills: 1,
    })
  })

  it('5 Archangels with Hero vs 12 Giants', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Archangel)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Giant)

    battle.attacker.activeCreature.count = 5
    battle.defender.activeCreature.count = 12

    const hero = heroes.find(hero => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 13
    battle.attacker.hero.stats.defense = 22
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({
      minDamage: 662,
      maxDamage: 662,
      minKills: 4,
      maxKills: 4,
    })
    expect(defender).toMatchObject({
      minDamage: 144,
      maxDamage: 216,
      minKills: 0,
      maxKills: 0,
    })
  })

  it('20 Wyverns with Hero vs 10 Mighty Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.MightyGorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find(hero => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({
      minDamage: 616,
      maxDamage: 792,
      minKills: 8,
      maxKills: 11,
    })
    expect(defender).toMatchObject({
      minDamage: 66,
      maxDamage: 88,
      minKills: 0,
      maxKills: 1,
    })
  })

  it('20 Wyverns with Hero vs 10 Gorgon', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.Wyvern)
    battle.defender.activeCreature = getCreatureInstance(Creatures.Gorgon)

    battle.attacker.activeCreature.count = 20
    battle.defender.activeCreature.count = 10

    const hero = heroes.find(hero => hero.id === Heroes.Orrin)!
    battle.attacker.hero = new HeroInstance(hero)
    battle.attacker.hero.stats.attack = 20
    battle.attacker.hero.stats.defense = 15
    battle.attacker.hero.skills.offense = SkillLevels.Expert
    battle.attacker.hero.skills.fire = SkillLevels.Expert

    const curse = spells.find(spell => spell.id === Spells.Curse)!
    battle.defender.activeCreature.effects.push(curse)

    const { attacker, defender } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({
      minDamage: 643,
      maxDamage: 828,
      minKills: 9,
      maxKills: 11,
    })
    expect(defender).toMatchObject({
      minDamage: 57,
      maxDamage: 57,
      minKills: 0,
      maxKills: 0,
    })
  })

  it('11 Ogre Magi vs 59 Halberdiers', () => {
    battle.attacker.activeCreature = getCreatureInstance(Creatures.OgreMage)
    battle.attacker.activeCreature.count = 11

    battle.attacker.hero = getHeroInstance(Heroes.Adela)
    battle.attacker.hero.stats.attack = 5
    battle.attacker.hero.stats.defense = 1
    battle.attacker.hero.level = 10

    battle.attacker.terrain = terrains.find(terrain => terrain.id === Terrains.Sand)!
    battle.defender.terrain = terrains.find(terrain => terrain.id === Terrains.Sand)!

    battle.defender.activeCreature = getCreatureInstance(Creatures.Halberdier)
    battle.defender.activeCreature.count = 59

    const { attacker } = getBattleCreatureCalculationResults(battle)

    expect(attacker).toMatchObject({
      minDamage: 108,
      maxDamage: 217,
      minKills: 10,
      maxKills: 21,
    })
  })
})
