import { Battle } from '@/modules/battle'
import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels, type CreatureKey } from '@/types'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Ice Bolt', () => {
  const iceBolt = data.spells.IceBolt

  test('Base spell values', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(10)
  })

  test('With Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 10 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(210)
  })

  test('With Advanced Water skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { waterMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(20)
  })

  test('With Advanced Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { waterMagic: SkillLevels.Advanced },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(620)
  })

  test('With Expert Water skill', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 0 },
          skills: { waterMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(50)
  })

  test('With Expert Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Orrin, {
          stats: { power: 30 },
          skills: { waterMagic: SkillLevels.Expert },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(650)
  })

  test('Hero with Ice Bolt specialty', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(11)
  })

  test('Hero with Ice Bolt specialty and standard Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 2 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(54)
  })

  test('Hero with Ice Bolt specialty and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 34 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(746)
  })

  test('Hero with Ice Bolt specialty, Advanced Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 34 },
          skills: {
            waterMagic: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(758)
  })

  test('Hero with Ice Bolt specialty, Expert Water skill and high Spell Power', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 34 },
          skills: {
            waterMagic: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(789)
  })

  test('cast on creature with immunity', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 0 },
        }),
        activeCreature: new CreatureInstance(data.creatures.Pikeman),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const creaturesWithImmunity: Array<CreatureKey> = [
      'GreenDragon',
      'RedDragon',
      'AzureDragon',
      'GoldDragon',
      'BlackDragon',
      'MagicElemental',
      'WaterElemental',
      'IceElemental',
      'Nymph',
      'Oceanid',
    ]

    let totalDamage = 0
    creaturesWithImmunity.forEach((creatureKey) => {
      battle.defender.activeCreature = new CreatureInstance(data.creatures[creatureKey])
      totalDamage += battle.cast(battle.defender.activeCreature, iceBolt)
    })

    expect(totalDamage).toBe(0)
  })

  test('Alagar (7 power, level 1, basic sorcery) cast on Pikeman', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 7 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Pikeman) },
    })

    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(162)
  })

  test('Alagar (1 power, level 1, basic sorcery) cast on Imp', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          stats: { power: 1 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Imp) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(32)
  })

  test('Alagar (2 power, level 2, basic sorcery) cast on Imp', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 2,
          stats: { power: 2 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Imp) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(56)
  })

  test('Alagar (2 power, level 3, advanced sorcery) cast on Imp', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 3,
          stats: { power: 2 },
          skills: {
            sorcery: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Imp) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(60)
  })

  test('Alagar (2 power, level 4, expert sorcery) cast on Imp', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 4,
          stats: { power: 2 },
          skills: {
            sorcery: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Imp) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(64)
  })

  test('Alagar (2 power, level 4, expert sorcery) cast on Naga', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 4,
          stats: { power: 2 },
          skills: {
            sorcery: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Naga) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(57)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Wolf Raider', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 12,
          stats: { power: 17 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.WolfRaider) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(434)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Vampire', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 12,
          stats: { power: 17 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Vampire) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(401)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Behemoth', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 12,
          stats: { power: 17 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Behemoth) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(379)
  })

  test('Alagar (17 power, level 12, basic sorcery) cast on Halberdier', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 12,
          stats: { power: 17 },
          skills: {
            sorcery: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Halberdier) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(500)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Hapry Hag', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 16,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.HarpyHag) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(556)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Imp', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 16,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Imp) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(664)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Naga Queen', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 16,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.NagaQueen) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(475)
  })

  test('Alagar (19 power, level 16, expert sorcery, basic water) cast on Haspid', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 16,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Basic,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Haspid) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(475)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Ogre Mage', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 17,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.OgreMage) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(516)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Gold Golem', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 17,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.GoldGolem) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(75)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Fire Elemental', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 17,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.FireElemental) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(1032)
  })

  test('Alagar (19 power, level 17, expert sorcery, advanced water) cast on Iron Golem', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 17,
          stats: { power: 19 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Advanced,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.IronGolem) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(132)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Nix', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 20,
          stats: { power: 29 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Nix) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(790)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Arch Devil', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 20,
          stats: { power: 29 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.ArchDevil) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(768)
  })

  test('Alagar (29 power, level 20, expert sorcery, expert water) cast on Marksman', () => {
    const battle = new Battle({
      attacker: {
        hero: new HeroInstance(data.heroes.Alagar, {
          level: 20,
          stats: { power: 29 },
          skills: {
            sorcery: SkillLevels.Expert,
            waterMagic: SkillLevels.Expert,
          },
        }),
        activeCreature: new CreatureInstance(data.creatures.Archangel),
      },
      defender: { activeCreature: new CreatureInstance(data.creatures.Marksman) },
    })
    const damage = battle.cast(battle.defender.activeCreature, iceBolt)

    expect(damage).toBe(942)
  })
})
