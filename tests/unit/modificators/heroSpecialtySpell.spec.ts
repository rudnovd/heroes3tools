import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { Effects } from '@/modules/effects'
import { HeroInstance } from '@/modules/hero'
import { Modificators } from '@/modules/modificators'
import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Hero specialty spell modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Bloodlust spell specialty', () => {
    test('Ash with Imp (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Ash)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Imp)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(8)
    })

    test('Ash with Griffin (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Ash)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Griffin)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(13)
    })

    test('Ash with Genie (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Ash)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Genie)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(16)
    })

    test('Ash with Bone Dragon (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Ash)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.BoneDragon)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(20)
    })
  })

  describe('Prayer spell specialty', () => {
    test('Loynis with Troglodyte (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Loynis)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Troglodyte)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 9, defense: 8 })
    })

    test('Loynis with Hell Hound (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Loynis)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.HellHound)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 14, defense: 10 })
    })

    test('Loynis with Gorgon (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Loynis)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Gorgon)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 13, defense: 17 })
    })

    test('Loynis with Behemoth (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Loynis)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Behemoth)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 19, defense: 19 })
    })
  })

  describe('Precision spell specialty', () => {
    test('Zubin with Archer (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Zubin)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Archer)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(12)
    })

    test('Zubin with Wood Elf (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Zubin)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.WoodElf)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(14)
    })

    test('Zubin with Monk (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Zubin)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Monk)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(16)
    })

    test('Zubin with Titan (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Zubin)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Titan)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(27)
    })
  })

  describe('Stone Skin spell specialty', () => {
    test('Darkstorn with Pikeman (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Darkstorn)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(11)
    })

    test('Darkstorn with Royal Griffin (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Darkstorn)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.RoyalGriffin)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(14)
    })

    test('Darkstorn with Dendroid Guard (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Darkstorn)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.DendroidGuard)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(16)
    })

    test('Darkstorn with Gold Dragon (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Darkstorn)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.GoldDragon)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(30)
    })
  })

  describe('Weakness spell specialty', () => {
    test('Mirlanda with Gremlin (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Mirlanda)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Gremlin)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(0)
    })

    test('Mirlanda with Iron Golem (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Mirlanda)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.IronGolem)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(4)
    })

    test('Mirlanda with Master Genie (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Mirlanda)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.MasterGenie)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(8)
    })

    test('Mirlanda with Master Black Dragon (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Mirlanda)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.BlackDragon)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(22)
    })
  })

  describe('Disrupting Ray spell specialty', () => {
    test('Aenain with Skeleton (creature level - 1)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Aenain)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Skeleton)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(0)
    })

    test('Aenain with Wraith (creature level - 3)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Aenain)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Wraith)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(2)
    })

    test('Aenain with Power Lich (creature level - 5)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Aenain)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.PowerLich)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(5)
    })

    test('Aenain with Ghost Dragon (creature level - 7)', () => {
      battle.attacker.hero = new HeroInstance(data.heroes.Aenain)
      battle.attacker.activeCreature = new CreatureInstance(data.creatures.GhostDragon)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(12)
    })
  })
})
