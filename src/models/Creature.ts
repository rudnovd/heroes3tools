import type { CreaturesSpecial } from '@/models/CreaturesSpecials'
import type { Spell } from './Spell'

export interface Creature {
  aiValue?: number
  attack: number
  cost?: {
    gold?: number
    gem?: number
    crystal?: number
    mercury?: number
    sulfur?: number
  }
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
  ranged: boolean
  townId?: number
  hexs?: number
  shots?: number
  hates?: Array<number>
  special?: CreaturesSpecial
  description?: string
}

export interface CreatureTranslation {
  id: number
  name: string
  description?: string
}

export class CreatureInstance implements Creature {
  aiValue?: number
  cost?: {
    gold?: number
    gem?: number
    crystal?: number
    mercury?: number
    sulfur?: number
  }
  attack: number
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
  ranged: boolean
  townId?: number
  hexs?: number
  shots?: number
  hates?: number[]
  special?: CreaturesSpecial
  description?: string

  count: number
  effects: Array<Spell>
  calculation: {
    damageBonus: number
    defenseBonus: number
    defenseMagicBonus: number
    minDamage: number
    maxDamage: number
    averageDamage: number
    minKills: number
    maxKills: number
    averageKills: number
  }

  constructor(creature: Creature) {
    this.aiValue = creature.aiValue
    this.cost = creature.cost
    this.attack = creature.attack
    this.defense = creature.defense
    this.fightValue = creature.fightValue
    this.growth = creature.growth
    this.health = creature.health
    this.hits = creature.hits
    this.id = creature.id
    this.level = creature.level
    this.maxDamage = creature.maxDamage
    this.minDamage = creature.minDamage
    this.nativeTerrain = creature.nativeTerrain
    this.speed = creature.speed
    this.name = creature.name
    this.ranged = creature.ranged
    this.townId = creature.townId
    this.hexs = creature.hexs
    this.hates = creature.hates
    this.special = creature.special
    this.description = creature.description
    this.count = 1
    this.effects = []
    this.calculation = {
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      minDamage: 0,
      maxDamage: 0,
      averageDamage: 0,
      minKills: 0,
      maxKills: 0,
      averageKills: 0,
    }
  }
}
