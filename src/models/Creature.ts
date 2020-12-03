export interface Creature {
  aiValue?: number
  attack: number
  cost?: number
  defense: number
  fightValue?: number
  growth?: number
  health: number
  hits: number
  id: number
  level: number
  maxDamage: number
  minDamage: number
  nativeTerrain: number
  speed?: number
  name: string
  ranged?: boolean
  townId?: number
  hexs?: number
  shots?: number
  hates?: Array<number>
}

export interface CreatureTranslation {
  id: number
  name: string
}
