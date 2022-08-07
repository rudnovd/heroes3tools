import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, test } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('Base Magic Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Hero without any modificators vs creature without any resistance', () => {
    test('Magic arrow', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Orrin)
      battle.attacker.hero.stats.power = 1

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.StoneGargoyle)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(20)
    })

    test('Magic arrow with advanced fire', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Octavia)
      battle.attacker.hero.stats.power = 1
      battle.attacker.hero.skills.fire = 2

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.StoneGargoyle)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(30)
    })

    test('Fireball with expert fire', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.Fireball)!
      battle.attacker.hero = getHeroInstance(Heroes.Octavia)
      battle.attacker.hero.stats.power = 9
      battle.attacker.hero.skills.fire = SkillLevels.Expert

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Griffin)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(150)
    })

    test('Armageddon with expert fire', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.Armageddon)!
      battle.attacker.hero = getHeroInstance(Heroes.Octavia)
      battle.attacker.hero.stats.power = 9
      battle.attacker.hero.skills.fire = SkillLevels.Expert

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Griffin)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(480)
    })
  })

  describe('Hero with magic arrow specialty vs creature without any resistance', () => {
    test('Ciele (3sp, basic water) vs Gogs', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 3
      battle.attacker.hero.skills.water = SkillLevels.Basic

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Gog)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(60)
    })

    test('Ciele (8sp, expert water) vs Behemoth', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 8
      battle.attacker.hero.skills.water = SkillLevels.Expert

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Behemoth)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(165)
    })

    test('Ciele (13sp, expert earth, basic sorcery) vs Behemoth', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 13
      battle.attacker.hero.skills.earth = SkillLevels.Expert
      battle.attacker.hero.skills.sorcery = SkillLevels.Basic

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Nomad)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(252)
    })
  })

  describe('Hero with Frost Ring specialty vs creature without any resistance', () => {
    test('Adelaide (2sp, level 1) vs Familiar', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.FrostRing)!
      battle.attacker.hero = getHeroInstance(Heroes.Adelaide)
      battle.attacker.hero.stats.power = 2

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Familiar)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(37)
    })

    test('Adelaide (12sp, level 9) vs Familiar', () => {
      const spell = spells.find((spell) => spell.id === SpellsEnum.FrostRing)!
      battle.attacker.hero = getHeroInstance(Heroes.Adelaide)
      battle.attacker.hero.stats.power = 12
      battle.attacker.hero.level = 9

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Familiar)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(172)
    })
  })
})
