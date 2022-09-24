import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'

import { Battle } from '@/modules/battle'

import { beforeEach, describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Base Magic Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('Hero without any modificators Cast on creature without any resistance', () => {
    test('Magic arrow', () => {
      const spell = data.spells.MagicArrow
      battle.attacker.hero = new HeroInstance(data.heroes.Orrin)
      battle.attacker.hero.stats.power = 1

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.StoneGargoyle)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(20)
    })

    test('Magic arrow with advanced fire', () => {
      const spell = data.spells.MagicArrow
      battle.attacker.hero = new HeroInstance(data.heroes.Octavia)
      battle.attacker.hero.stats.power = 1
      battle.attacker.hero.skills.fireMagic = 2

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.StoneGargoyle)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(30)
    })

    test('Fireball with expert fire', () => {
      const spell = data.spells.Fireball
      battle.attacker.hero = new HeroInstance(data.heroes.Octavia)
      battle.attacker.hero.stats.power = 9
      battle.attacker.hero.skills.fireMagic = SkillLevels.Expert

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Griffin)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(150)
    })

    test('Armageddon with expert fire', () => {
      const spell = data.spells.Armageddon
      battle.attacker.hero = new HeroInstance(data.heroes.Octavia)
      battle.attacker.hero.stats.power = 9
      battle.attacker.hero.skills.fireMagic = SkillLevels.Expert

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Griffin)

      battle.attacker.activeCreature.count = 1
      battle.defender.activeCreature.count = 1

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(480)
    })
  })

  describe('Hero with magic arrow specialty cast on creature without any resistance', () => {
    test('Ciele (3sp, basic water) cast on Gogs', () => {
      const spell = data.spells.MagicArrow
      battle.attacker.hero = new HeroInstance(data.heroes.Ciele)
      battle.attacker.hero.stats.power = 3
      battle.attacker.hero.skills.waterMagic = SkillLevels.Basic

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Gog)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(60)
    })

    test('Ciele (8sp, expert water) Cast on Behemoth', () => {
      const spell = data.spells.MagicArrow
      battle.attacker.hero = new HeroInstance(data.heroes.Ciele)
      battle.attacker.hero.stats.power = 8
      battle.attacker.hero.skills.waterMagic = SkillLevels.Expert

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Behemoth)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(165)
    })

    test('Ciele (13sp, expert earth, basic sorcery) cast on Behemoth', () => {
      const spell = data.spells.MagicArrow
      battle.attacker.hero = new HeroInstance(data.heroes.Ciele)
      battle.attacker.hero.stats.power = 13
      battle.attacker.hero.skills.earthMagic = SkillLevels.Expert
      battle.attacker.hero.skills.sorcery = SkillLevels.Basic

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Nomad)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(252)
    })
  })

  describe('Hero with Frost Ring specialty cast on creature without any resistance', () => {
    test('Adelaide (2sp, level 1) cast on Familiar', () => {
      const spell = data.spells.FrostRing
      battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
      battle.attacker.hero.stats.power = 2

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Familiar)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(37)
    })

    test('Adelaide (12sp, level 9) cast on Familiar', () => {
      const spell = data.spells.FrostRing
      battle.attacker.hero = new HeroInstance(data.heroes.Adelaide)
      battle.attacker.hero.stats.power = 12
      battle.attacker.hero.level = 9

      battle.attacker.activeCreature = new CreatureInstance(data.creatures.Pikeman)
      battle.defender.activeCreature = new CreatureInstance(data.creatures.Familiar)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(172)
    })
  })
})
