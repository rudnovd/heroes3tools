import { beforeEach, describe, expect, it } from 'vitest'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes } from '@/models/enums'
import { Effects } from '@/modules/effects'
import { Modificators } from '@/modules/modificators'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('hero specialty spell modificator', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('bloodlust spell specialty', () => {
    it('ash with Imp (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Ash)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Imp)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(15)
    })

    it('ash with Griffin (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Ash)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Griffin)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(19)
    })

    it('ash with Genie (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Ash)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Genie)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(21)
    })

    it('ash with Bone Dragon (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Ash)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.BoneDragon)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.bloodlust(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(24)
    })
  })

  describe('prayer spell specialty', () => {
    it('loynis with Troglodyte (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Loynis)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Troglodyte)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 9, defense: 8 })
    })

    it('loynis with Hell Hound (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Loynis)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.HellHound)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 15, defense: 11 })
    })

    it('loynis with Gorgon (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Loynis)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Gorgon)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 14, defense: 18 })
    })

    it('loynis with Behemoth (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Loynis)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Behemoth)

      const creatureWithModifiedStats = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack, defense } = Effects.prayer(battle.attacker, creatureWithModifiedStats)

      expect({ attack, defense }).toEqual({ attack: 20, defense: 20 })
    })
  })

  describe('precision spell specialty', () => {
    it('zubin with Archer (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Zubin)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Archer)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(19)
    })

    it('zubin with Wood Elf (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Zubin)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.WoodElf)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(20)
    })

    it('zubin with Monk (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Zubin)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Monk)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(21)
    })

    it('zubin with Titan (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Zubin)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Titan)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.precision(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(31)
    })
  })

  describe('stone Skin spell specialty', () => {
    it('darkstorn with Pikeman (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Darkstorn)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(18)
    })

    it('darkstorn with Royal Griffin (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Darkstorn)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.RoyalGriffin)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(20)
    })

    it('darkstorn with Dendroid Guard (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Darkstorn)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.DendroidGuard)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(21)
    })

    it('darkstorn with Gold Dragon (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Darkstorn)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.GoldDragon)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.stoneSkin(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(34)
    })
  })

  describe('weakness spell specialty', () => {
    it('mirlanda with Gremlin (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Mirlanda)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Gremlin)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(0)
    })

    it('mirlanda with Iron Golem (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Mirlanda)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.IronGolem)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(0)
    })

    it('mirlanda with Master Genie (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Mirlanda)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.MasterGenie)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(1)
    })

    it('mirlanda with Master Black Dragon (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Mirlanda)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.BlackDragon)

      const creatureWithModifiedAttack = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { attack } = Effects.weakness(battle.attacker, creatureWithModifiedAttack)

      expect(attack).toBe(12)
    })
  })

  describe('disrupting Ray spell specialty', () => {
    it('aenain with Skeleton (creature level - 1)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Aenain)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Skeleton)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(0)
    })

    it('aenain with Wraith (creature level - 3)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Aenain)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.Wraith)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(0)
    })

    it('aenain with Power Lich (creature level - 5)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Aenain)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.PowerLich)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(0)
    })

    it('aenain with Ghost Dragon (creature level - 7)', () => {
      battle.attacker.hero = getHeroInstance(Heroes.Aenain)
      battle.attacker.activeCreature = getCreatureInstance(Creatures.GhostDragon)

      const creatureWithModifiedDefense = Modificators.heroSpecialtySpell(
        battle.attacker.hero,
        battle.attacker.activeCreature,
      )
      const { defense } = Effects.disruptingRay(battle.attacker, creatureWithModifiedDefense)

      expect(defense).toBe(4)
    })
  })
})
