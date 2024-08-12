import type { SkillLevel } from './Skill'

export interface Level {
  id: number
  name: string
  value: SkillLevel
}

export interface LevelTranslation {
  id: number
  name: string
}
