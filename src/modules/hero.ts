import classes from '@/assets/data/classes'
import type { CreatureKey, Hero, HeroClassKey, HeroKey, SkillKey, SpellKey } from '@/types'

export class HeroInstance implements Hero {
  key: HeroKey
  name: string
  classId: HeroClassKey
  specialtySkill?: SkillKey
  specialtySpell?: SpellKey
  specialtyUnit?: Array<CreatureKey>

  level: number
  stats: {
    [key: string]: number
    attack: number
    defense: number
    power: number
    knowledge: number
  }
  skills: Partial<Record<Uncapitalize<SkillKey>, number>>

  constructor(hero: Hero) {
    this.key = hero.key
    this.name = hero.name
    this.classId = hero.classId
    this.specialtySkill = hero.specialtySkill
    this.specialtySpell = hero.specialtySpell
    this.specialtyUnit = hero.specialtyUnit

    this.level = 1
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

    const heroClass = classes.find((classObject) => classObject.key === this.classId)
    if (heroClass) {
      this.stats = {
        attack: heroClass.attack,
        defense: heroClass.defense,
        knowledge: heroClass.knowledge,
        power: heroClass.power,
      }
    } else {
      this.stats = {
        attack: 0,
        defense: 0,
        knowledge: 0,
        power: 0,
      }
    }
  }
}
