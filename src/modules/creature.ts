import creatures from '@/assets/data/creatures'
import type {
  Creature,
  CreatureKey,
  CreaturesSpecial,
  SkillLevels,
  Spell,
  SpellKey,
  TerrainKey,
  TownKey,
} from '@/types'

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

  readonly originalCreature: Creature
  count: number
  effects: Partial<Record<SpellKey, Spell & { level: SkillLevels }>>
  calculation: {
    damageBonus: number
    defenseBonus: number
    defenseMagicBonus: number
    minDamage: number
    maxDamage: number
  }
  rangePenalty?: boolean
  hasRetaliation: boolean

  constructor(
    creature: Creature | CreatureKey,
    options?: Partial<{ count: number; effects: Partial<Record<SpellKey, Spell>> }>
  ) {
    if (typeof creature === 'string') {
      const creatureData = creatures.find(({ key }) => key === creature)
      if (!creatureData) {
        throw new Error('Error in CreatureInstance constructor')
      }
      creature = creatureData
    }
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
    this.hexs = creature.hexs || 1
    this.hates = creature.hates
    this.special = creature.special
    this.description = creature.description

    this.originalCreature = creature
    this.count = options?.count || 1
    this.effects = options?.effects || {}
    this.calculation = {
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      minDamage: 0,
      maxDamage: 0,
    }
    this.hasRetaliation = true

    if (creature.special?.ranged) {
      this.rangePenalty = false
    }
  }

  public reset(savedValues?: Partial<{ effects: Partial<Record<SpellKey, Spell>> }>) {
    this.attack = this.originalCreature.attack
    this.defense = this.originalCreature.defense
    this.health = this.originalCreature.health
    this.hits = this.originalCreature.hits
    this.maxDamage = this.originalCreature.maxDamage
    this.minDamage = this.originalCreature.minDamage
    this.speed = this.originalCreature.speed
    this.shots = this.originalCreature.shots
    this.effects = savedValues?.effects || {}
    this.calculation = {
      damageBonus: 0,
      defenseBonus: 0,
      defenseMagicBonus: 0,
      minDamage: 0,
      maxDamage: 0,
    }
  }

  /**
   * Check creature for immunity to spell
   * @param spell Spell that cast to creature
   * @return {boolean} true if creature has immunity to spell
   */
  public hasSpellImmunity(spell: Spell): boolean {
    if (this.effects.AntiMagic) return true

    // Creatures with full magic immunity
    if (this.special?.immunityToSpellLevels?.includes(spell.level)) return true

    // Creature with immunity to spells list
    if (this.special?.immunity?.includes(spell.key)) return true

    // Creature with immunity to spell elements
    if (this.special?.immunityToSpellElement?.includes(spell.element.id)) return true

    const onlyUndeadSpells: Array<SpellKey> = ['AnimateDead', 'DestroyUndead']
    const onlyLivingSpells: Array<SpellKey> = ['DeathRipple', 'Resurrection', 'Bless']

    // If spell in list spells that not affected to undead creatures
    if (this.special?.undead && onlyLivingSpells.includes(spell.key)) return true

    // If spell in list spells that not affected to living creatures
    if (!this.special?.undead && onlyUndeadSpells.includes(spell.key)) return true

    if (spell.key === 'Resurrection' && this.special?.nonLiving) return true

    const warMachines: Array<CreatureKey> = ['Ballista', 'Cannon']
    const warMachinesImmunities: Array<SpellKey> = ['Implosion', 'Resurrection', 'DeathRipple', 'DestroyUndead']
    if (warMachinesImmunities.includes(spell.key) && warMachines.includes(this.key)) return true

    return false
  }
}
