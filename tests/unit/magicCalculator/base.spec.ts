import { spells } from '@/assets/database/spells'
import { Battle } from '@/models/Battle'
import { Creatures, Heroes, SkillLevels, Spells as SpellsEnum } from '@/models/enums'

import { beforeEach, describe, expect, it } from 'vitest'
import { getCreatureInstance, getHeroInstance } from '../helpers'

describe('base Magic Calculator tests with specified values', () => {
  let battle: Battle

  beforeEach(() => {
    battle = new Battle()
  })

  describe('hero without any modificators Cast on creature without any resistance', () => {
    it('magic arrow', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Orrin)
      battle.attacker.hero.stats.power = 1

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.StoneGargoyle)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(20)
    })

    it('magic arrow with advanced fire', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.MagicArrow)!
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

    it('fireball with expert fire', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.Fireball)!
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

    it('armageddon with expert fire', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.Armageddon)!
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

  describe('hero with magic arrow specialty cast on creature without any resistance', () => {
    it('ciele (3sp, basic water) cast on Gogs', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 3
      battle.attacker.hero.skills.water = SkillLevels.Basic

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Gog)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(60)
    })

    it('ciele (8sp, expert water) Cast on Behemoth', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 8
      battle.attacker.hero.skills.water = SkillLevels.Expert

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Behemoth)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(165)
    })

    it('ciele (13sp, expert earth, basic sorcery) cast on Behemoth', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.MagicArrow)!
      battle.attacker.hero = getHeroInstance(Heroes.Ciele)
      battle.attacker.hero.stats.power = 13
      battle.attacker.hero.skills.earth = SkillLevels.Expert
      battle.attacker.hero.skills.sorcery = SkillLevels.Basic

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Nomad)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(252)
    })
  })

  describe('hero with Frost Ring specialty cast on creature without any resistance', () => {
    it('adelaide (2sp, level 1) cast on Familiar', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.FrostRing)!
      battle.attacker.hero = getHeroInstance(Heroes.Adelaide)
      battle.attacker.hero.stats.power = 2

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Familiar)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(37)
    })

    it('adelaide (12sp, level 9) cast on Familiar', () => {
      const spell = spells.find(spell => spell.id === SpellsEnum.FrostRing)!
      battle.attacker.hero = getHeroInstance(Heroes.Adelaide)
      battle.attacker.hero.stats.power = 12
      battle.attacker.hero.level = 9

      battle.attacker.activeCreature = getCreatureInstance(Creatures.Pikeman)
      battle.defender.activeCreature = getCreatureInstance(Creatures.Familiar)

      const damage = battle.cast(battle.attacker, battle.defender, battle.defender.activeCreature, spell)

      expect(damage).toBe(172)
    })
  })
})
