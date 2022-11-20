import { CreatureInstance } from '@/modules/creature'
import { HeroInstance } from '@/modules/hero'
import { SkillLevels } from '@/types'

import { Battle } from '@/modules/battle'

import { describe, expect, test } from 'vitest'
import { data } from '../helpers'

describe('Base Magic Calculator tests with specified values', () => {
  describe('Hero without any modificators Cast on creature without any resistance', () => {
    test('Magic arrow', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Orrin, {
            stats: { power: 1 },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.StoneGargoyle) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.MagicArrow)

      expect(damage).toBe(20)
    })

    test('Magic arrow with advanced fire', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Octavia, {
            stats: { power: 1 },
            skills: { fireMagic: SkillLevels.Advanced },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.StoneGargoyle) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.MagicArrow)

      expect(damage).toBe(30)
    })

    test('Fireball with expert fire', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Octavia, {
            stats: { power: 9 },
            skills: { fireMagic: SkillLevels.Expert },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Griffin) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.Fireball)

      expect(damage).toBe(150)
    })

    test('Armageddon with expert fire', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Octavia, {
            stats: { power: 9 },
            skills: { fireMagic: SkillLevels.Expert },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Griffin) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.Armageddon)

      expect(damage).toBe(480)
    })
  })

  describe('Hero with magic arrow specialty cast on creature without any resistance', () => {
    test('Ciele (3sp, basic water) cast on Gogs', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ciele, {
            stats: { power: 3 },
            skills: { waterMagic: SkillLevels.Basic },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Gog) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.MagicArrow)

      expect(damage).toBe(60)
    })

    test('Ciele (8sp, expert water) Cast on Behemoth', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ciele, {
            stats: { power: 8 },
            skills: { waterMagic: SkillLevels.Expert },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Behemoth) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.MagicArrow)

      expect(damage).toBe(165)
    })

    test('Ciele (13sp, expert earth, basic sorcery) cast on Behemoth', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Ciele, {
            stats: { power: 13 },
            skills: { earthMagic: SkillLevels.Expert, sorcery: SkillLevels.Basic },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Nomad) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.MagicArrow)

      expect(damage).toBe(252)
    })
  })

  describe('Hero with Frost Ring specialty cast on creature without any resistance', () => {
    test('Adelaide (2sp, level 1) cast on Familiar', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Adelaide, {
            stats: { power: 2 },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Familiar) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.FrostRing)

      expect(damage).toBe(37)
    })

    test('Adelaide (12sp, level 9) cast on Familiar', () => {
      const battle = new Battle({
        attacker: {
          hero: new HeroInstance(data.heroes.Adelaide, {
            level: 9,
            stats: { power: 12 },
          }),
          activeCreature: new CreatureInstance(data.creatures.Pikeman),
        },
        defender: { activeCreature: new CreatureInstance(data.creatures.Familiar) },
      })
      const damage = battle.cast(battle.defender.activeCreature, data.spells.FrostRing)

      expect(damage).toBe(172)
    })
  })
})
