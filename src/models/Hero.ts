import { classes } from '@/assets/database/classes'

export interface Hero {
  id: number
  name: string
  classId: number
  specialtySkill?: number
  specialtySpell?: number
  specialtyUnit?: Array<number>
}

export interface HeroTranslation {
  id: number
  name: string
}

export class HeroInstance implements Hero {
  id: number
  name: string
  classId: number
  specialtySkill?: number
  specialtySpell?: number
  specialtyUnit?: Array<number>

  level: number
  stats: {
    [key: string]: number
    attack: number
    defense: number
    power: number
    knowledge: number
  }
  skills: {
    [key: string]: number
    offense: number
    armorer: number
    archery: number
    artillery: number
    air: number
    fire: number
    earth: number
    water: number
  }

  constructor(hero: Hero) {
    this.id = hero.id
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
      air: 0,
      fire: 0,
      earth: 0,
      water: 0,
    }

    const heroClass = classes.find((classObject) => classObject.id === this.classId)
    if (heroClass) {
      this.stats = {
        attack: heroClass.attack,
        defense: heroClass.defense,
        knowledge: heroClass.knowledge,
        power: heroClass.power,
      }
    }
  }
}
