import { creatures } from '@/assets/database/creatures'
import { heroes } from '@/assets/database/heroes'
import { Battle } from '@/models/Battle'
import { CreatureInstance } from '@/models/Creature'
import { Creatures, Heroes } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'

export function getCreatureInstance(id: Creatures) {
  const creature = creatures.find((creature) => creature.id === id)!
  return new CreatureInstance(creature)
}

export function getHeroInstance(id: Heroes) {
  const hero = heroes.find((hero) => hero.id === id)!
  return new HeroInstance(hero)
}

export function getBattleCreatureCalculationResults(battle: Battle) {
  battle.calculate()
  if (!battle.attacker.activeCreature || !battle.defender.activeCreature) {
    return {
      attacker: {
        damageBonus: -1,
        defenseBonus: -1,
        defenseMagicBonus: -1,
        minDamage: -1,
        maxDamage: -1,
        averageDamage: -1,
        minKills: -1,
        maxKills: -1,
        averageKills: -1,
      },
      defender: {
        damageBonus: -1,
        defenseBonus: -1,
        defenseMagicBonus: -1,
        minDamage: -1,
        maxDamage: -1,
        averageDamage: -1,
        minKills: -1,
        maxKills: -1,
        averageKills: -1,
      },
    }
  } else {
    return {
      attacker: battle.attacker.activeCreature.calculation,
      defender: battle.defender.activeCreature.calculation,
    }
  }
}
