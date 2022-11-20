import classes from '@/assets/data/classes'
import heroes from '@/assets/data/heroes'
import type {
  CreatureKey,
  DamageCalculatorBattleSide,
  Hero,
  HeroClassKey,
  HeroKey,
  SkillKey,
  Spell,
  SpellKey,
} from '@/types'
import type { CreatureInstance } from './creature'
import { Effects } from './effects'
interface HeroStats {
  attack: number
  defense: number
  power: number
  knowledge: number
}

export class HeroInstance implements Hero {
  key: HeroKey | 'FakeHero'
  name: string
  classId: HeroClassKey
  specialtySkill?: SkillKey
  specialtySpell?: SpellKey
  specialtyUnit?: Array<CreatureKey>

  level: number
  stats: HeroStats
  skills: Partial<Record<Uncapitalize<SkillKey>, number>>
  spells?: Array<SpellKey>

  constructor(
    hero: Hero | HeroKey | 'FakeHero',
    options?: { level?: number; stats?: Partial<HeroStats>; skills?: Partial<Record<Uncapitalize<SkillKey>, number>> }
  ) {
    if (hero === 'FakeHero') {
      this.key = 'FakeHero'
      this.name = 'FakeHero'
      this.classId = 'Alchemist'
      this.level = options?.level || 1
      this.stats = {
        attack: 0,
        defense: 0,
        power: 0,
        knowledge: 0,
      }
      this.skills = {
        offense: 0,
        armorer: 0,
        archery: 0,
        artillery: 0,
        airMagic: 0,
        fireMagic: 0,
        earthMagic: 0,
        waterMagic: 0,
      }
      return
    }

    if (typeof hero === 'string') {
      const heroData = heroes.find(({ key }) => key === hero)
      if (!heroData) {
        throw new Error('Error in HeroInstance constructor')
      }
      hero = heroData
    }

    this.key = hero.key
    this.name = hero.name
    this.classId = hero.classId
    this.specialtySkill = hero.specialtySkill
    this.specialtySpell = hero.specialtySpell
    this.specialtyUnit = hero.specialtyUnit

    this.level = options?.level || 1
    this.stats = {
      attack: 0,
      defense: 0,
      power: 0,
      knowledge: 0,
    }
    this.skills = {
      offense: 0,
      armorer: 0,
      archery: 0,
      artillery: 0,
      airMagic: 0,
      fireMagic: 0,
      earthMagic: 0,
      waterMagic: 0,
      ...hero.skills,
    }

    if (options?.skills) {
      this.skills = {
        ...this.skills,
        ...options.skills,
      }
    }

    const heroClass = classes.find((classObject) => classObject.key === this.classId)
    if (heroClass) {
      this.stats = {
        attack: heroClass.attack,
        defense: heroClass.defense,
        knowledge: heroClass.knowledge,
        power: heroClass.power,
      }

      if (options?.stats) {
        this.stats = {
          ...this.stats,
          ...options.stats,
        }
      }
    }
  }

  cast(
    spell: Spell,
    sides: { initiator: DamageCalculatorBattleSide; target: CreatureInstance; defender: DamageCalculatorBattleSide }
  ): CreatureInstance
  cast(spell: Spell): number
  cast(
    spell: Spell,
    sides?: {
      initiator: DamageCalculatorBattleSide
      target: CreatureInstance
      defender: DamageCalculatorBattleSide
    }
  ) {
    if (sides?.initiator) {
      const camelCaseEffectKey = spell.key[0].toLocaleLowerCase() + spell.key.slice(1, spell.key.length)
      sides.target = Effects[camelCaseEffectKey]({
        initiator: sides.initiator,
        target: sides.target,
        defender: sides.defender,
      })

      return sides.target
    }

    const allowedTypes = ['damage', 'multidamage', 'massdamage', 'heal']
    if (allowedTypes.includes(spell.type)) {
      if (!spell.grades?.length) return 0
      const power = spell.powerBonus !== undefined ? this.stats.power : 0

      let spellElement = spell.element.id

      if (spell.key === 'MagicArrow') {
        let level = 0
        if (this.skills.fireMagic) {
          spellElement = 'fire'
          level = this.skills.fireMagic
        }
        if (this.skills.airMagic && this.skills.airMagic > level) {
          spellElement = 'air'
          level = this.skills.airMagic
        }
        if (this.skills.waterMagic && this.skills.waterMagic > level) {
          spellElement = 'water'
          level = this.skills.waterMagic
        }
        if (this.skills.earthMagic && this.skills.earthMagic > level) {
          spellElement = 'earth'
          level = this.skills.earthMagic
        }
      }
      const skillLevel = this.skills[`${spellElement}Magic`] ?? 0
      return spell.grades[skillLevel > 0 ? skillLevel - 1 : skillLevel] + power * (spell.powerBonus ?? 1)
    } else {
      return 0
    }
  }

  reset(savedValues: {
    level: number
    stats?: Partial<HeroStats>
    skills?: Partial<Record<Uncapitalize<SkillKey>, number>>
  }) {
    this.level = savedValues?.level || 1
    this.stats = {
      attack: 0,
      defense: 0,
      power: 0,
      knowledge: 0,
    }
    this.skills = {
      offense: 0,
      armorer: 0,
      archery: 0,
      artillery: 0,
      airMagic: 0,
      fireMagic: 0,
      earthMagic: 0,
      waterMagic: 0,
      ...savedValues.skills,
    }

    if (savedValues?.skills) {
      this.skills = {
        ...this.skills,
        ...savedValues.skills,
      }
    }

    const heroClass = classes.find((classObject) => classObject.key === this.classId)
    if (heroClass) {
      this.stats = {
        attack: heroClass.attack,
        defense: heroClass.defense,
        knowledge: heroClass.knowledge,
        power: heroClass.power,
      }

      if (savedValues?.stats) {
        this.stats = {
          ...this.stats,
          ...savedValues.stats,
        }
      }
    }
  }
}
