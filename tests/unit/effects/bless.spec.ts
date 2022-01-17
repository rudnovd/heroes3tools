import { creatures } from '@/assets/database/creatures'
import { heroes } from '@/assets/database/heroes'
import { Battle } from '@/models/Battle'
import { CreatureInstance } from '@/models/Creature'
import { Creatures, Heroes } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { Effects } from '@/modules/effects'

function setBlessToCreature(battle: Battle, id: number): CreatureInstance {
  const creature = creatures.find((c) => c.id === id)!
  const creatureInstance = new CreatureInstance(creature)
  battle.attacker.activeCreature = creatureInstance
  return Effects.bless(battle.attacker, battle.attacker.activeCreature)
}

describe('Bless spell effect', () => {
  let battle: Battle

  describe('Bless spell effect without any modificators', () => {
    beforeEach(() => {
      battle = new Battle()
    })

    test('Pikeman creature', () => {
      const result = setBlessToCreature(battle, Creatures.Pikeman)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature', () => {
      const result = setBlessToCreature(battle, Creatures.Angel)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Archer ranged creature', () => {
      const result = setBlessToCreature(battle, Creatures.Archer)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero without water skill and water specialty', () => {
    beforeEach(() => {
      battle = new Battle()
    })

    test('Pikeman creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      const result = setBlessToCreature(battle, Creatures.Pikeman)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      const result = setBlessToCreature(battle, Creatures.Angel)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Archer ranged creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      const result = setBlessToCreature(battle, Creatures.Archer)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with base water skill and without water specialty', () => {
    beforeEach(() => {
      battle = new Battle()
    })

    test('Pikeman creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 1
      const result = setBlessToCreature(battle, Creatures.Pikeman)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 1
      const result = setBlessToCreature(battle, Creatures.Angel)
      expect(result.minDamage).toBe(50)
      expect(result.maxDamage).toBe(50)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Archer ranged creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 1
      const result = setBlessToCreature(battle, Creatures.Archer)
      expect(result.minDamage).toBe(3)
      expect(result.maxDamage).toBe(3)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with advanced water skill and without water specialty', () => {
    beforeEach(() => {
      battle = new Battle()
    })

    test('Pikeman creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 2
      const result = setBlessToCreature(battle, Creatures.Pikeman)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 2
      const result = setBlessToCreature(battle, Creatures.Angel)
      expect(result.minDamage).toBe(51)
      expect(result.maxDamage).toBe(51)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Archer ranged', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 2
      const result = setBlessToCreature(battle, Creatures.Archer)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })

  describe('Bless spell effect with hero with expert water skill and without water specialty', () => {
    beforeEach(() => {
      battle = new Battle()
    })

    test('Pikeman creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 3
      const result = setBlessToCreature(battle, Creatures.Pikeman)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Angel creature', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 3
      const result = setBlessToCreature(battle, Creatures.Angel)
      expect(result.minDamage).toBe(51)
      expect(result.maxDamage).toBe(51)
      expect(result.calculation.damageBonus).toBe(0)
    })

    test('Archer ranged', () => {
      const heroRion = heroes.find((hero) => hero.id === Heroes.Rion)!
      const heroInstance = new HeroInstance(heroRion)
      battle.attacker.hero = heroInstance
      battle.attacker.hero.stats.attack = 0
      battle.attacker.hero.skills.water = 3
      const result = setBlessToCreature(battle, Creatures.Archer)
      expect(result.minDamage).toBe(4)
      expect(result.maxDamage).toBe(4)
      expect(result.calculation.damageBonus).toBe(0)
    })
  })
})
