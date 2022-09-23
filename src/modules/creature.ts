import type { Creature, CreatureKey, CreaturesSpecial, Spell, SpellKey, TerrainKey, TownKey } from '@/types'

export class CreatureInstance implements Creature {
  readonly aiValue: number
  readonly cost: {
    readonly gold?: number
    readonly gem?: number
    readonly crystal?: number
    readonly mercury?: number
    readonly sulfur?: number
  }
  attack: number
  defense: number
  readonly fightValue: number
  readonly growth?: number
  health: number
  hits: number
  readonly key: CreatureKey
  readonly level: number
  maxDamage: number
  minDamage: number
  readonly nativeTerrain: TerrainKey
  speed: number
  name: string
  readonly town?: TownKey
  readonly hexs?: number
  shots?: number
  readonly hates?: Array<CreatureKey>
  readonly special?: Readonly<Partial<CreaturesSpecial>>
  description?: string

  count: number
  effects: Partial<Record<SpellKey, Spell>>
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
  rangePenalty?: boolean

  constructor(creature: Creature) {
    this.aiValue = creature.aiValue
    this.cost = creature.cost
    this.attack = creature.attack
    this.defense = creature.defense
    this.fightValue = creature.fightValue
    this.growth = creature.growth
    this.health = creature.health
    this.hits = creature.hits
    this.key = creature.key
    this.level = creature.level
    this.maxDamage = creature.maxDamage
    this.minDamage = creature.minDamage
    this.nativeTerrain = creature.nativeTerrain
    this.speed = creature.speed
    this.name = creature.name
    this.town = creature.town
    this.hexs = creature.hexs
    this.hates = creature.hates
    this.special = creature.special
    this.description = creature.description
    this.count = 1
    this.effects = {}
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

    if (creature.special?.ranged) {
      this.rangePenalty = false
    }
  }
}
