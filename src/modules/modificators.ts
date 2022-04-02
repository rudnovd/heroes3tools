import type { CreatureInstance } from '@/models/Creature'
import { Creatures, SecondarySkills, Spells } from '@/models/enums'
import type { HeroInstance } from '@/models/Hero'
import type { Terrain } from '@/models/Terrain'

export const Modificators = {
  heroSpecialtySpell: (hero: HeroInstance, target: CreatureInstance): CreatureInstance => {
    let { attack, defense } = target

    switch (hero.specialtySpell) {
      case Spells.Bloodlust:
        if (target.level === 1 || target.level === 2) {
          attack += 3
        } else if (target.level === 3 || target.level === 4) {
          attack += 2
        } else if (target.level === 5 || target.level === 6) {
          attack += 1
        }
        break
      case Spells.Prayer:
        if (target.level === 1 || target.level === 2) {
          attack += 3
          defense += 3
        } else if (target.level === 3 || target.level === 4) {
          attack += 2
          defense += 2
        } else if (target.level === 5 || target.level === 6) {
          attack += 1
          defense += 1
        }
        break
      case Spells.Precision:
        if (target.level === 1 || target.level === 2) {
          attack += 3
        } else if (target.level === 3 || target.level === 4) {
          attack += 2
        } else if (target.level === 5 || target.level === 6) {
          attack += 1
        }
        break
      case Spells.StoneSkin:
        if (target.level === 1 || target.level === 2) {
          defense += 3
        } else if (target.level === 3 || target.level === 4) {
          defense += 2
        } else if (target.level === 5 || target.level === 6) {
          defense += 1
        }
        break
      case Spells.Weakness:
        if (target.level === 1 || target.level === 2) {
          attack -= 3
        } else if (target.level === 3 || target.level === 4) {
          attack -= 2
        } else if (target.level === 5 || target.level === 6) {
          attack -= 1
        }
        break
      case Spells.DisruptingRay:
        defense -= 2
        break
      default:
        break
    }

    return {
      ...target,
      attack,
      defense,
    }
  },

  terrain: (terrain: Terrain, target: CreatureInstance): CreatureInstance => {
    let { attack, defense } = target

    if (terrain.id === target.nativeTerrain) {
      attack++
      defense++
    }

    return {
      ...target,
      attack,
      defense,
    }
  },

  hero: (hero: HeroInstance, target: CreatureInstance): CreatureInstance => {
    let { attack, speed, defense } = target

    if (hero.specialtyUnit?.includes(target.id)) {
      attack += Math.ceil(Math.floor(hero.level / target.level) * (attack * 0.05))
      defense += Math.ceil(Math.floor(hero.level / target.level) * (defense * 0.05))
      speed++
    }

    attack += hero.stats.attack
    defense += hero.stats.defense

    return {
      ...target,
      attack,
      defense,
      speed,
    }
  },

  heroSkills: (hero: HeroInstance, target: CreatureInstance): CreatureInstance => {
    let {
      hits,
      calculation: { damageBonus, defenseBonus },
    } = target

    const levelBonus = 1 + 0.05 * hero.level

    if (hero.skills.offense && !target.ranged) {
      let bonus = 0.1 * hero.skills.offense

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Offense) {
        bonus = bonus * levelBonus > 1.92 ? 1.92 : bonus * levelBonus
      }
      damageBonus += bonus
    }

    if (hero.skills.armorer) {
      let bonus = 0.05 * hero.skills.armorer

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Armorer) {
        bonus = bonus * levelBonus > 0.7 ? 0.7 : bonus * levelBonus
      }
      defenseBonus += bonus
    }

    if (hero.skills.archery && target.ranged) {
      let bonus = 0
      if (hero.skills.archery === 1) {
        bonus = 0.1
      } else if (hero.skills.archery === 2) {
        bonus = 0.25
      } else if (hero.skills.archery === 3) {
        bonus = 0.5
      }

      if (hero.specialtySkill && hero.specialtySkill === SecondarySkills.Archery) {
        bonus = bonus * levelBonus > 3.2 ? 3.2 : bonus * levelBonus
      }
      damageBonus += bonus
    }

    if (
      (target.id === Creatures.Ballista || target.id === Creatures.Cannon) &&
      hero.skills.artillery &&
      hero.skills.artillery === 2
    ) {
      hits = 2
    }

    return {
      ...target,
      hits,
      calculation: {
        ...target.calculation,
        damageBonus,
        defenseBonus,
      },
    }
  },

  creatureHate: (attacker: CreatureInstance, defender: CreatureInstance): CreatureInstance => {
    let {
      calculation: { damageBonus },
    } = attacker

    if (attacker.hates && attacker.hates.indexOf(defender.id) !== -1) {
      damageBonus += 0.5
    }

    return {
      ...attacker,
      calculation: {
        ...attacker.calculation,
        damageBonus,
      },
    }
  },

  artillery: (hero: HeroInstance, target: CreatureInstance): CreatureInstance => {
    let { minDamage, maxDamage } = target

    if (target.id === Creatures.Ballista) {
      minDamage = (hero.stats.attack + 1) * 2
      maxDamage = (hero.stats.attack + 1) * 3
    } else if (target.id === Creatures.Cannon) {
      minDamage = (hero.stats.attack + 1) * 4
      maxDamage = (hero.stats.attack + 1) * 7
    }

    return {
      ...target,
      minDamage,
      maxDamage,
    }
  },

  creatureSpecial: (attacker: CreatureInstance, defender: CreatureInstance): CreatureInstance => {
    let { attack, defense } = attacker

    switch (defender.id) {
      case Creatures.Behemoth:
        defense = defense * 0.6 - 1
        break
      case Creatures.AncientBehemoth:
        defense = defense * 0.2 - 1
        break
      case Creatures.Nix:
        attack *= 0.7
        break
      case Creatures.NixWarrior:
        attack *= 0.4
        break
      default:
        break
    }

    if (defense <= 0) defense = 1

    return {
      ...attacker,
      attack,
      defense,
    }
  },
}
