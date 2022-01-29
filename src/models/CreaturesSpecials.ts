import { Spell } from '@/models/Spell'

export type CreaturesSpecial = Readonly<
  Partial<{
    doubleAttack: boolean
    binding: boolean
    twoRetaliations: boolean
    unlimitedRetaliations: boolean
    noEnemyRetaliation: boolean
    noMeleePenalty: boolean
    jousting: boolean
    blindChange: number
    poisonChance: number
    deathStareChance: number
    dispel: boolean
    weakness: boolean
    ignoreEmenyDefencePercents: number
    lightningStrikeChance: number
    curseChance: number
    petrifyChance: number
    lifeDrain: boolean
    agingChance: number

    immunity: Array<Spell>
    magicResistance: Array<{
      chance: number
      spell: Spell
    }>

    flying: boolean

    undead: boolean
    nonLiving: boolean

    moraleBonusForArmy: number
    moralePenaltyForEnemyArmy: number
    hates: Array<number>
    magicDamperValue: number
    regeneration: boolean
  }>
>
