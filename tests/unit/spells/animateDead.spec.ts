import { SkillLevels } from '@/types'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'
import { Battle } from '@/modules/battle'

describe('Animate Dead', () => {
  const animateDead = data.spells.AnimateDead

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  test('Base spell values when creature is not undead', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
    })

    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(0)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-530)
  })

  test('With Advanced Earth skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-60)
  })

  test('With Advanced Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1560)
  })

  test('With Expert Earth skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { earthMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-160)
  })

  test('With Expert Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 30 }, skills: { earthMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1660)
  })

  test('Hero with Animate Dead specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Thant, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-30)
  })

  test('Hero with Animate Dead specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Thant, { stats: { power: 34 } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1730)
  })

  test('Hero with Animate Dead specialty, Advanced Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Thant, {
          stats: { power: 34 },
          skills: { earthMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1760)
  })

  test('Hero with Animate Dead specialty, Expert Earth skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Thant, { stats: { power: 34 }, skills: { earthMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })
    const damage = battle.cast(battle.attacker.activeCreature, animateDead)

    expect(damage).toBe(-1860)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Thant, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Skeleton),
      },
      defender: {
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
    })

    const creaturesWithImmunity = [
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'Ballista',
      'Cannon',
      // ...data.creatures.filter((creature) => creature.special?.undead === undefined).map((creature) => creature.id),
      // ...data.creatures.filter((creature) => creature.special?.nonLiving).map((creature) => creature.id),
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.attacker.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.attacker.activeCreature, animateDead)
    })

    expect(totalDamage).toBe(0)
  })
})
