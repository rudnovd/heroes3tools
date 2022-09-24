import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { Modificators } from '@/modules/modificators'
import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Hero modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('hero attack impact to creature attack', () => {
    test('single pikeman', () => {
      const pikeman = new CreatureInstance(data.creatures.Pikeman)
      const hero = new HeroInstance(data.heroes.Orrin)
      const { attack } = Modificators.hero(hero, pikeman)

      expect(attack).toEqual(6)
    })

    test('single pikeman in battle', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.attacker.hero = new HeroInstance(data.heroes.Orrin)

      battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.attack).toEqual(6)
    })
  })

  describe('hero defense impact to creature defense', () => {
    test('single pikeman', () => {
      const pikeman = new CreatureInstance(data.creatures.Pikeman)
      const hero = new HeroInstance(data.heroes.Orrin)
      const { defense } = Modificators.hero(hero, pikeman)

      expect(defense).toEqual(7)
    })

    test('single pikeman in battle', () => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.attacker.hero = new HeroInstance(data.heroes.Orrin)

      battle.defender.activeCreature = new CreatureInstance(data.creatures.Pikeman)

      const { attacker } = battle.calculate()

      expect(attacker.activeCreature.defense).toEqual(7)
    })
  })

  describe('heroes with creatures specialty', () => {
    describe('griffins specialty', () => {
      test('1 level Edric with 4 griffins vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Edric)
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.Griffin)
        battle.attacker.activeCreature.count = 4

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 10, defense: 10 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 16, maxDamage: 33 })
      })

      test('3 level Edric with 4 griffins vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Edric)
        battle.attacker.hero.stats.attack = 3
        battle.attacker.hero.level = 3
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.Griffin)
        battle.attacker.activeCreature.count = 4

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 12, defense: 11 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 18, maxDamage: 36 })
      })

      test('9 level Edric with 4 griffins vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Edric)
        battle.attacker.hero.stats.attack = 4
        battle.attacker.hero.stats.defense = 6
        battle.attacker.hero.level = 9
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.Griffin)
        battle.attacker.activeCreature.count = 4

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 14, defense: 16, speed: 7 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 19, maxDamage: 38 })
      })

      test('15 level Edric with 4 griffins vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Edric)
        battle.attacker.hero.stats.attack = 6
        battle.attacker.hero.stats.defense = 8
        battle.attacker.hero.level = 15
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.Griffin)
        battle.attacker.activeCreature.count = 4

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 16, defense: 18, speed: 7 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 20, maxDamage: 40 })
      })

      test('15 level Edric with 4 royal griffins vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Edric)
        battle.attacker.hero.stats.attack = 6
        battle.attacker.hero.stats.defense = 8
        battle.attacker.hero.level = 15
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.RoyalGriffin)
        battle.attacker.activeCreature.count = 4

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 18, defense: 20, speed: 10 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 21, maxDamage: 43 })
      })
    })

    describe('gargoyles specialty', () => {
      test('3 level Piquedram with 17 stone gargoyles with bloodlust effect vs pixies', () => {
        battle.attacker.hero = new HeroInstance(data.heroes.Piquedram)
        battle.attacker.hero.stats.attack = 2
        battle.attacker.hero.stats.defense = 1
        battle.attacker.hero.level = 3
        battle.attacker.activeCreature = new CreatureInstance(data.creatures.StoneGargoyle)
        battle.attacker.activeCreature.count = 17

        const bloodlust = data.spells.Bloodlust
        battle.attacker.activeCreature.effects[bloodlust.key] = bloodlust

        battle.defender.activeCreature = new CreatureInstance(data.creatures.Pixie)

        const { attacker } = battle.calculate()

        expect(attacker.activeCreature).toContain({ attack: 12, defense: 8, speed: 7 })
        expect(attacker.activeCreature.calculation).toContain({ minDamage: 51, maxDamage: 76 })
      })
    })
  })
})
