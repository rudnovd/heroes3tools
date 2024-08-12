export type CreaturesSpecial = Readonly<
  Partial<{
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
    immunity: Array<number>

    immunityToSpellLevels: Array<number>

    immunityToSpellElement: Array<string>

    vulnerablesToSpells: Array<number>

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
    hates: Array<number>

    // Causes enemy hero's spells to cost extra spell points
    // Pegasus and Silver Pegasus special
    magicDamperValue: number

    // Restores all HP of single unit in creature stack
    // Wight, Wraith and Troll special
    regeneration: boolean
  }>
>
