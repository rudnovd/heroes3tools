import { Hero } from '@/models/Hero'
import { Creature } from '@/models/Creature'
import { Terrain } from '@/models/Terrain'
import { Creatures, SecondarySkills, Spells } from '@/models/enums'
import { getObjectById } from '@/database'
import { Spell } from './Spell'

export type Side = 'attacker' | 'defender'

export class CalculatorInstance {
  [key: string]: unknown
  attacker: CalculatorSide
  defender: CalculatorSide
  terrain?: Terrain

  constructor() {
    this.attacker = {
      hero: undefined,
      creature: undefined,
      minDamage: 0,
      maxDamage: 0,
      averageDamage: 0,
      minKills: 0,
      maxKills: 0,
      averageKills: 0,
    }

    this.defender = {
      hero: undefined,
      creature: undefined,
      minDamage: 0,
      maxDamage: 0,
      averageDamage: 0,
      minKills: 0,
      maxKills: 0,
      averageKills: 0,
    }
  }

  /**
   * Calculate final damage values of two creatures
   * @param attacker Creature who attacks
   * @param defender Creature who accept damage from attacker creature
   * @returns {Object} Creature damage values
   */
  public calculate(attacker: CalculatorCreature, defender: CalculatorCreature): any {
    // If ATTACKER attack > DEFENDER defense:
    // ATTACKER units count * ATTACKER unit damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

    // If DEFENDER attack > ATTACKER defense:
    // DEFENDER units count * DEFENDER unit damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

    // If DEFENDER attack < ATTACKER defense:
    // DEFENDER units count * DEFENDER unit damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))

    let damageBonus = 0,
      defenseBonus = 0,
      defenseMagicBonus = 0,
      difference = 0

    if (attacker.attack > defender.defense) {
      // Max attack cap = 3
      difference = Math.abs(0.05 * (attacker.attack - defender.defense))
      if (difference > 3) difference = 3
      damageBonus = 1 + difference + attacker.damageBonus
    } else if (attacker.attack === defender.defense) {
      damageBonus = 1 + attacker.damageBonus
    } else if (attacker.attack < defender.defense) {
      difference = Math.abs((defender.defense - attacker.attack) * 0.025)
      if (difference > 0.7) difference = 0.7
      damageBonus = 1 - difference + attacker.damageBonus
    }
    defenseBonus = 1 - defender.defenseBonus
    defenseMagicBonus = 1 - defender.defenseMagicBonus

    attacker.minDamage = Math.abs(attacker.minDamage * (damageBonus * defenseBonus * defenseMagicBonus))
    attacker.maxDamage = Math.abs(attacker.maxDamage * (damageBonus * defenseBonus * defenseMagicBonus))

    const minDamage = Math.floor(attacker.minDamage * attacker.count),
      maxDamage = Math.floor(attacker.maxDamage * attacker.count),
      averageDamage = Math.floor((attacker.minDamage + attacker.maxDamage) / 2)

    return {
      minDamage,
      maxDamage,
      averageDamage,
      minKills: Math.floor(minDamage / defender.health),
      maxKills: Math.floor(maxDamage / defender.health),
      averageKills: Math.floor(averageDamage / defender.health),
    }
  }
}

export interface CalculatorSide {
  hero: StateHero | undefined
  creature: CalculatorCreature | undefined
  minDamage: number
  maxDamage: number
  averageDamage: number
  minKills: number
  maxKills: number
  averageKills: number
  terrain?: Terrain
}

export interface StateCreature extends Creature {
  count: number
  damageBonus: number
  defenseBonus: number
  defenseMagicBonus: number
  effects: Array<string>
}

export class CalculatorHero implements Hero {
  id: number
  name: string
  classId: number
  specialtySkill?: number
  specialtySpell?: number
  specialtyUnit?: Array<number>

  level: number
  stats: {
    attack: number
    defense: number
    power: number
    knowledge: number
  }
  skills: {
    [key: string]: number

    offense: number
    armorer: number
    archery: number
    artillery: number
    air: number
    fire: number
    earth: number
    water: number
  }

  constructor(hero: Hero) {
    this.id = hero.id
    this.name = hero.name
    this.classId = hero.classId
    this.specialtySkill = hero.specialtySkill
    this.specialtySpell = hero.specialtySpell
    this.specialtyUnit = hero.specialtyUnit
    this.level = 1
    this.stats = {
      attack: 0,
      defense: 0,
      power: 0,
      knowledge: 0,
    }
    this.getClassStats()
    this.skills = {
      offense: 0,
      armorer: 0,
      archery: 0,
      artillery: 0,
      air: 0,
      fire: 0,
      earth: 0,
      water: 0,
    }
  }

  private async getClassStats() {
    const heroClass = await getObjectById('classes', this.classId)

    this.stats = {
      attack: heroClass.attack,
      defense: heroClass.defense,
      knowledge: heroClass.knowledge,
      power: heroClass.power,
    }
  }
}

export class CalculatorCreature implements Creature {
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

  count: number
  damageBonus: number
  defenseBonus: number
  defenseMagicBonus: number
  effects: Array<Spell>

  constructor(creature: Creature) {
    this.id = creature.id
    this.attack = creature.attack
    this.defense = creature.defense
    this.health = creature.health
    this.hits = creature.hits
    this.level = creature.level
    this.maxDamage = creature.maxDamage
    this.minDamage = creature.minDamage
    this.nativeTerrain = creature.nativeTerrain
    this.name = creature.name
    this.count = 0
    this.damageBonus = 0
    this.defenseBonus = 0
    this.defenseMagicBonus = 0
    this.effects = []
  }

  setEffect(
    hero: CalculatorHero,
    effect: number,
    defenderHero: CalculatorHero,
    defender: CalculatorCreature,
    terrain: Terrain
  ): void {
    const currentEffect = this.effects.findIndex((creatureEffect: Spell) => creatureEffect.id === effect)
    if (currentEffect === -1) {
      getObjectById('spells', effect).then((effectObject: Spell) => {
        this.effects.push(effectObject)
      })
    } else {
      this.effects.splice(currentEffect)
    }

    if (effect === Spells.Bless) this.effectBless(hero)
    if (effect === Spells.Curse) this.effectCurse(defenderHero)
    this.modificatorEffects(hero, defenderHero, defender)
    this.modificatorShields(hero)
    this.modificatorHeroSpecialtySpell(hero)
    this.modificatorTerrain(terrain)
    this.modificatorHero(hero)
    this.modificatorHeroSkills(hero)
    this.modificatorHates(defender)
    this.isArtilleryCreature(hero)
    this.modificatorUnitsSpecials()
  }

  private effectBless(hero: CalculatorHero) {
    if (hero.specialtySpell === Spells.Bless) {
      this.damageBonus += (0.03 * hero.level) / this.level
    }

    if (hero.skills.water <= 1) {
      this.minDamage = this.maxDamage
    } else if (hero.skills.water >= 2) {
      this.minDamage = this.maxDamage + 1
      this.maxDamage++
    }
  }

  private effectCurse(defenderHero: CalculatorHero) {
    if (defenderHero.skills.fire <= 1) {
      this.maxDamage = this.minDamage
    } else if (defenderHero.skills.fire >= 2) {
      this.minDamage = this.minDamage * 0.8 - 1
      this.maxDamage = this.minDamage
    }
  }

  private modificatorEffects(hero: CalculatorHero, defenderHero: CalculatorHero, defenderCreature: CalculatorCreature) {
    if (this.effects.some((effect: Spell) => effect.id === Spells.Bloodlust)) {
      if (hero.skills.fire <= 1) this.attack += 3
      else if (hero.skills.fire >= 2) this.attack += 6
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.Frenzy)) {
      if (hero.skills.fire <= 1) this.attack += this.defense
      else if (hero.skills.fire === 2) this.attack += this.defense * 1.5
      else if (hero.skills.fire === 3) this.defense = 0

      this.attack += this.defense * 2
    }

    // Slayer spell
    if (this.effects.some((effect: Spell) => effect.id === Spells.Slayer)) {
      const slayerCreatures = [
        Creatures.GreenDragon,
        Creatures.BoneDragon,
        Creatures.GhostDragon,
        Creatures.RedDragon,
        Creatures.Hydra,
        Creatures.ChaosHydra,
        Creatures.Behemoth,
        Creatures.AncientBehemoth,
        Creatures.FaerieDragon,
        Creatures.RustDragon,
        Creatures.CrystalDragon,
        Creatures.AzureDragon,
      ]

      if (hero.skills.fire === 2) {
        slayerCreatures.push(Creatures.Angel, Creatures.Archangel, Creatures.Devil, Creatures.ArchDevil)
      } else if (hero.skills.fire === 3) {
        slayerCreatures.push(
          Creatures.Giant,
          Creatures.Titan,
          Creatures.Firebird,
          Creatures.SeaSerpent,
          Creatures.Haspid
        )
      }

      if (slayerCreatures.includes(defenderCreature.id)) this.attack += 8
    }

    // Prayer spell
    if (this.effects.some((effect: Spell) => effect.id === Spells.Precision)) {
      if (hero.skills.water <= 1) {
        this.attack += 2
        this.defense += 2
      } else if (hero.skills.water >= 2) {
        this.attack += 2
        this.defense += 4
      }
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.Precision) && this.ranged) {
      if (hero.skills.air <= 1) this.attack += 3
      else if (hero.skills.air >= 2) this.attack += 6
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.StoneSkin)) {
      if (hero.skills.earth <= 1) this.defense += 3
      else if (hero.skills.earth >= 2) this.defense += 6
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.Weakness)) {
      if (defenderHero.skills.water <= 1) this.attack -= 3
      else if (defenderHero.skills.water >= 2) this.attack -= 6
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.DisruptingRay)) {
      if (defenderHero.skills.air <= 1) this.defense -= 3
      else if (defenderHero.skills.air === 2) this.defense -= 4
      else if (defenderHero.skills.air === 3) this.defense -= 5
    }
  }

  private modificatorShields(hero: CalculatorHero) {
    if (this.effects.some((effect: Spell) => effect.id === Spells.Shield)) {
      if (hero.skills.earth <= 1) this.defenseMagicBonus += 0.15
      else if (hero.skills.earth >= 2) this.defenseMagicBonus += 0.3
    }

    if (this.effects.some((effect: Spell) => effect.id === Spells.AirShield) && this.ranged) {
      if (hero.skills.air < 2) this.defenseMagicBonus += 0.25
      else if (hero.skills.air > 1) this.defenseMagicBonus += 0.5
    }
  }

  private modificatorHeroSpecialtySpell(hero: CalculatorHero) {
    switch (hero.specialtySpell) {
      case Spells.Bloodlust:
        if (this.level <= 2) this.attack += 3
        else if (this.level <= 4) this.attack += 2
        else if (this.level <= 6) this.attack += 1
        break
      case Spells.Prayer:
        if (this.level <= 2) {
          this.attack += 3
          this.defense += 3
        } else if (this.level <= 4) {
          this.attack += 2
          this.defense += 2
        } else if (this.level <= 6) {
          this.attack += 1
          this.defense += 1
        }
        break
      case Spells.Precision:
        if (this.level <= 2) this.attack += 3
        else if (this.level <= 4) this.attack += 2
        else if (this.level <= 6) this.attack += 1
        break
      case Spells.StoneSkin:
        if (this.level <= 2) this.defense += 3
        else if (this.level <= 4) this.defense += 2
        else if (this.level <= 6) this.defense += 1
        break
      case Spells.Weakness:
        if (this.level <= 2) this.attack -= 3
        else if (this.level <= 4) this.attack -= 2
        else if (this.level <= 6) this.attack -= 1
        break
      case Spells.DisruptingRay:
        this.defense -= 2
        break
      default:
        break
    }
  }

  private modificatorTerrain(terrain: Terrain | undefined) {
    if (terrain && terrain.id && this.nativeTerrain === terrain.id) {
      this.attack++
      this.defense++
    }
  }

  private modificatorHero(hero: CalculatorHero) {
    this.attack += hero.stats.attack
    this.defense += hero.stats.defense

    // check hero for creature specialization
    if (hero.specialtyUnit) {
      if (hero.specialtyUnit.includes(this.id)) {
        this.attack *= 1 + (hero.level / this.level) * 0.05
        this.defense *= 1 + (hero.level / this.level) * 0.05

        this.attack = Math.ceil(this.attack)
        this.defense = Math.ceil(this.defense)
      }
    }
  }

  private modificatorHeroSkills(hero: CalculatorHero) {
    let damageBonus = 0,
      defenseBonus = 0
    const levelBonus = 1 + 0.05 * hero.level

    // Offense skill bonus
    if (hero.skills.offense && !this.ranged) {
      let bonus = 0.1 * hero.skills.offense

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Offense) {
        bonus = bonus * levelBonus > 1.92 ? 1.92 : bonus * levelBonus
      }
      damageBonus += bonus
    }

    // Armorer skill bonus
    if (hero.skills.armorer) {
      let bonus = 0.05 * hero.skills.armorer

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Armorer) {
        bonus = bonus * levelBonus > 0.7 ? 0.7 : bonus * levelBonus
      }
      defenseBonus += bonus
    }

    // Archery skill bonus
    if (hero.skills.archery && this.ranged) {
      let bonus = 0
      if (hero.skills.archery === 1) bonus = 0.1
      else if (hero.skills.archery === 2) bonus = 0.25
      else if (hero.skills.archery === 3) bonus = 0.5

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Archery) {
        bonus = bonus * levelBonus > 3.2 ? 3.2 : bonus * levelBonus
      }
      damageBonus += bonus
    }

    // Artillery skill bonus (for ballista and cannon only)
    if (
      hero.skills.artillery &&
      hero.skills.artillery === 3 &&
      (this.id === Creatures.Ballista || this.id === Creatures.Cannon)
    ) {
      this.minDamage *= 2
      this.maxDamage *= 2
    }

    this.damageBonus = damageBonus
    this.defenseBonus = defenseBonus
  }

  private modificatorHates(defenderCreature: CalculatorCreature) {
    if (this.hates && this.hates.indexOf(defenderCreature.id) !== -1) {
      this.damageBonus += 0.5
    }
  }

  private isArtilleryCreature(hero: CalculatorHero) {
    if (this.id === Creatures.Ballista) {
      this.minDamage += (this.attack - hero.stats.attack) * 2
      this.maxDamage += (this.attack - hero.stats.attack) * 3
    } else if (this.id === Creatures.Cannon) {
      this.minDamage += (this.attack - hero.stats.attack) * 4
      this.maxDamage += (this.attack - hero.stats.attack) * 7
    }
  }

  private modificatorUnitsSpecials() {
    switch (this.id) {
      case Creatures.Behemoth:
        this.defense *= 0.6
        break
      case Creatures.AncientBehemoth:
        this.defense *= 0.2
        break
      case Creatures.Nix:
        this.attack *= 0.7
        break
      case Creatures.NixWarrior:
        this.attack *= 0.4
        break
    }
  }
}

export interface StateHero extends Hero {
  level: number
  stats: {
    attack: number
    defense: number
    power: number
    knowledge: number
  }
  skills: {
    [key: string]: number
    offense: number
    armorer: number
    archery: number
    artillery: number
    air: number
    fire: number
    earth: number
    water: number
  }
}
