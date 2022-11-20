import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Armageddon', () => {
  const armageddon = data.spells.Armageddon

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(30)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 10 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(430)
  })

  test('With Advanced.fireMagic skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { fireMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(60)
  })

  test('With Advanced.fireMagic skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { fireMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(1260)
  })

  test('With Expert.fireMagic skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { fireMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(120)
  })

  test('With Expert.fireMagic skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { fireMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(1320)
  })

  test('Cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 }, skills: { fireMagic: SkillLevels.Advanced } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GoldDragon',
      'BlackDragon',
      'Efreeti',
      'EfreetSultan',
      'FireElemental',
      'EnergyElemental',
      'EarthElemental',
      'MagmaElemental',
      'Phoenix',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, armageddon)
    })

    expect(totalDamage).toBe(0)
  })

  test('With Expert.fireMagic skill and high Spell Power cast on creature with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 24 }, skills: { fireMagic: SkillLevels.Expert } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.WaterElemental) },
    })
    const damage = battle.cast(battle.defender.activeCreature, armageddon)

    expect(damage).toBe(2160)
  })

  test('Cast on creatures with vulnerable', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, { stats: { power: 0 } }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithVulnerable: Array<CreatureKey> = [
      'WaterElemental',
      'IceElemental',
      'AirElemental',
      'StormElemental',
    ]

    let totalDamage = 0
    creaturesWithVulnerable.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, armageddon)
    })

    expect(totalDamage).toBe(240)
  })
})
