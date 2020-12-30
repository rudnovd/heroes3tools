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
