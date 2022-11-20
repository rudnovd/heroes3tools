import type { CreatureInstance } from '@/modules/creature'
import type { HeroInstance } from '@/modules/hero'
import type {
  ArtifactKey,
  CreatureKey,
  HeroClassKey,
  HeroKey,
  SkillKey,
  SkillLevelKey,
  SpellKey,
  TerrainKey,
  TownKey,
} from '@/types'

export interface Artifact {
  readonly key: ArtifactKey
  name: string
  readonly slot: 'Cape' | 'Feet' | 'Helm' | 'Shield' | 'Necklace' | 'Weapon' | 'Ring' | 'Torso' | 'Misc' | 'Combo'
  readonly class: 'Major' | 'Minor' | 'Relic' | 'Treasure'
  readonly cost: number
  readonly effect?: {
    readonly сreaturesSpeedBonus?: number
    readonly creaturesHealthBonus?: number
    readonly statsChanging?: {
      readonly attack?: number
      readonly defense?: number
      readonly power?: number
      readonly knowledge?: number
    }
    readonly skillBonus?: {
      readonly archery?: number
      readonly eagleEye?: number
      readonly necromancy?: number
    }
    readonly spellsDamageBonus?: {
      readonly school?: 'Water' | 'Earth' | 'Fire' | 'Air'
    }
    readonly immuneToSpells?: Array<SpellKey>
    readonly magicResistanceBonus?: number
    readonly luckBonus?: number
    readonly moraleBonus?: number
    readonly reduceSurrenderingCost?: number
    readonly enemyPenalty?: {
      readonly luck?: number
      readonly morale?: number
      readonly spellPower?: number
    }
    readonly resourceBonus?: {
      readonly wood?: number
      readonly sulfur?: number
      readonly ore?: number
      readonly mercury?: number
      readonly gem?: number
      readonly crystal?: number
      readonly gold?: number
    }
  }
  readonly preventCastingSpellsLevels?: Array<number>
}

export interface HeroClass {
  readonly key: HeroClassKey
  name: string
  readonly attack: number
  readonly defense: number
  readonly power: number
  readonly knowledge: number
}

export interface Hero {
  readonly key: HeroKey | 'FakeHero'
  name: string
  readonly classId: HeroClassKey
  readonly skills: Partial<Record<Uncapitalize<SkillKey>, number>>
  readonly specialtySkill?: SkillKey
  readonly specialtySpell?: SpellKey
  readonly specialtyUnit?: Array<CreatureKey>
  readonly spells?: Array<SpellKey>
}

export interface Town {
  readonly key: TownKey
  name: string
}

export interface Terrain {
  readonly key: TerrainKey
  name: string
}

export interface Skill {
  readonly key: SkillKey
  name: string
}

export interface Level {
  readonly key: SkillLevelKey
  name: string
  readonly value: number
}

type SpellGroup = 'mind'

export interface Spell {
  readonly key: SpellKey
  name: string
  readonly level: number
  readonly element: {
    readonly id: 'neutral' | 'fire' | 'water' | 'earth' | 'air'
    name: string
  }
  readonly group?: Array<SpellGroup>
  readonly grades?: Array<number>
  readonly powerBonus?: number
  readonly type: 'buff' | 'debuff' | 'heal' | 'damage' | 'multidamage' | 'massdamage' | 'action' | 'nonbattle'
}

export interface CreaturesSpecial {
  // Creature hit twice
  doubleAttack: boolean

  // Causes an enemy to be bound to the ground, unable to move until the stack of dendroids that entangled them moves or perishes
  // Dendroid Guard and Dendroid Soldier special effect
  binding: boolean

  // Griffin special
  twoRetaliations: boolean

  // Royal Griffin special
  unlimitedRetaliations: boolean

  // Special, when defender creature doesn't hit after attacker hit
  noEnemyRetaliation: boolean

  // Melee Attack special for ranged creatures
  noMeleePenalty: boolean

  // No penalty when target behind walls
  noObstaclePenalty: boolean

  // Moving before the attack will increase their damage by 5% for each hex
  // Cavalier and Champion attack special
  jousting: boolean

  // Unicorn and War Unicorn special effect
  blindChance: number

  // Wyvern Monarch, Sea Serpent, Haspid special effect
  poisonChance: number

  // Chance to instantly kills the 'top' unit of a stack, leaving the new 'top' unit with full health
  // Mighty Gorgon special
  baseDeathStareChance: number

  // Serpent Fly and Dragon Fly attack special
  dispel: boolean

  // Dragon Fly special effect
  weakness: boolean

  // Behemoth and Ancient Behemoth specials
  ignoreEnemyDefensePercents: number

  // Nix and Nix warrior specials
  ignoreEnemyAttackPercents: number

  // Thunderbird special attack
  lightningStrikeChance: number

  // Mummy, Black Knight, Dread Knight special effect
  curseChance: number

  // Meduza and Basilisk special effect (always 20%)
  petrify: boolean

  // Vampire Lord special effect
  lifeDrain: boolean

  // Ghost Dragon special effect
  agingChance: number

  immunityToJousting: boolean

  // Spell immunity
  immunity: Array<SpellKey>

  immunityToSpellLevels: Array<number>

  immunityToSpellElement: Array<'neutral' | 'fire' | 'water' | 'earth' | 'air'>

  vulnerablesToSpells: Array<SpellKey>

  // Resistance to all spells chance
  magicResistanceChance: number

  auraOfMagicResistanceChance: number

  reduceCastSpellPointsCount: number

  // Percents reduces damage from spells
  spellDamageResistance: number

  ranged: boolean

  shots: number

  // Is creature don't use terrain for moving
  flying: boolean

  dragon: boolean

  breathAttack: boolean

  undead: boolean
  nonLiving: boolean

  // Special which increase morale for all creatures in army
  moraleBonusForArmy: number

  // Special which decrease morale for all enemy creatures
  moralePenaltyForEnemyArmy: number

  // Attack special which make 150% of creature damage to creatures in hates list
  hates: Array<CreatureKey>

  // Causes enemy hero's spells to cost extra spell points
  // Pegasus and Silver Pegasus special
  magicDamperValue: number

  // Restores all HP of single unit in creature stack
  // Wight, Wraith and Troll special
  regeneration: boolean
}

export interface Creature {
  readonly aiValue: number
  readonly attack: number
  readonly cost: {
    readonly gold?: number
    readonly gem?: number
    readonly crystal?: number
    readonly mercury?: number
    readonly sulfur?: number
  }
  readonly defense: number
  readonly fightValue: number
  readonly growth?: number
  readonly health: number
  readonly hits: number
  readonly key: CreatureKey
  readonly level: number
  readonly maxDamage: number
  readonly minDamage: number
  readonly nativeTerrain: TerrainKey
  readonly speed: number
  name: string
  readonly town?: TownKey
  readonly hexs?: number
  readonly shots?: number
  readonly hates?: Array<CreatureKey>
  readonly special?: Readonly<Partial<CreaturesSpecial>>
  description?: string
}

export interface DamageCalculatorBattleSide {
  hero: HeroInstance
  creatures: Array<CreatureInstance>
  activeCreature: CreatureInstance
}
