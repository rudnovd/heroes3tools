export interface Hero {
  id: number
  name: string
  classId: number
  specialtySkill?: string
  specialtySpell?: number
  specialtyUnit?: Array<number>
}

export interface HeroTranslation {
  id: number
  name: string
}
