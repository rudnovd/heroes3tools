import { SkillLevels } from '@/types'
import type { CreatureInstance } from './creature'
import type { HeroInstance } from './hero'

export const Skills = {
  offense: (side: { hero: HeroInstance; target: CreatureInstance }): CreatureInstance => {
    const { hero, target } = side
    if (target.special?.ranged) return target

    let damageBonus = 0.1 * (hero.skills?.offense || 0)

    if (hero.specialtySkill === 'Offense') {
      const bonusFromSpecialty = 1 + 0.05 * hero.level
      const MAX_BONUS = 1.92
      damageBonus *= bonusFromSpecialty
      if (damageBonus > MAX_BONUS) damageBonus = MAX_BONUS
    }

    target.calculation.damageBonus += damageBonus
    return target
  },

  armorer: (side: { hero: HeroInstance; target: CreatureInstance }): CreatureInstance => {
    const { hero, target } = side
    let defenseBonus = 0.05 * (hero.skills.armorer || 0)

    if (hero.specialtySkill === 'Armorer') {
      const bonusFromHeroLevel = 1 + 0.05 * hero.level
      const MAX_BONUS = 0.7
      defenseBonus = defenseBonus * bonusFromHeroLevel
      if (defenseBonus > MAX_BONUS) defenseBonus = MAX_BONUS
    }

    target.calculation.defenseBonus += defenseBonus
    return target
  },

  archery: (side: { hero: HeroInstance; target: CreatureInstance }): CreatureInstance => {
    const { hero, target } = side
    let damageBonus = 0

    if (hero.skills.archery && target.special?.ranged) {
      if (hero.skills.archery === SkillLevels.Basic) {
        damageBonus = 0.1
      } else if (hero.skills.archery === SkillLevels.Advanced) {
        damageBonus = 0.25
      } else if (hero.skills.archery === SkillLevels.Expert) {
        damageBonus = 0.5
      }

      if (hero.specialtySkill === 'Archery' && target.special?.ranged) {
        const bonusFromHeroLevel = 1 + 0.05 * hero.level
        const MAX_BONUS = 3.2
        damageBonus = damageBonus * bonusFromHeroLevel
        if (damageBonus > MAX_BONUS) damageBonus = MAX_BONUS
      }
    }

    target.calculation.damageBonus += damageBonus
    return target
  },
  artillery: (side: { hero: HeroInstance; target: CreatureInstance }): CreatureInstance => {
    const { hero, target } = side
    if (target.key !== 'Ballista' && target.key !== 'Cannon') return target

    if (target.key === 'Ballista') {
      target.minDamage = (hero.stats.attack + 1) * 2
      target.maxDamage = (hero.stats.attack + 1) * 3
    } else if (target.key === 'Cannon') {
      target.minDamage = (hero.stats.attack + 1) * 4
      target.maxDamage = (hero.stats.attack + 1) * 7
    }

    if (hero.skills.artillery === SkillLevels.Advanced) {
      target.hits = 2
    }

    return target
  },
}
