import { creatures } from '@/assets/database/creatures'
import { heroes } from '@/assets/database/heroes'
import { Battle } from '@/models/Battle'
import { CreatureInstance } from '@/models/Creature'
import { Creatures } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'

describe('120 Pikemans vs 3 Devils', () => {
  const battle = new Battle()

  const pikeman = creatures.find((creature) => creature.id === Creatures.Pikeman)
  if (!pikeman) return

  const devil = creatures.find((creature) => creature.id === Creatures.Devil)
  if (!devil) return

  battle.attacker.activeCreature = new CreatureInstance(pikeman)
  battle.defender.activeCreature = new CreatureInstance(devil)

  battle.attacker.activeCreature.count = 120
  battle.defender.activeCreature.count = 3

  test('Base', () => {
    battle.calculate()

    if (!battle.attacker.activeCreature || !battle.defender.activeCreature) return

    expect(battle.attacker.activeCreature.calculation.minDamage).toBe(69)
    expect(battle.attacker.activeCreature.calculation.averageDamage).toBe(138)
    expect(battle.attacker.activeCreature.calculation.maxDamage).toBe(206)
    expect(battle.attacker.activeCreature.calculation.minKills).toBe(0)
    expect(battle.attacker.activeCreature.calculation.averageKills).toBe(0)
    expect(battle.attacker.activeCreature.calculation.maxKills).toBe(1)

    expect(battle.defender.activeCreature.calculation.minDamage).toBe(153)
    expect(battle.defender.activeCreature.calculation.averageDamage).toBe(178)
    expect(battle.defender.activeCreature.calculation.maxDamage).toBe(204)
    expect(battle.defender.activeCreature.calculation.minKills).toBe(15)
    expect(battle.defender.activeCreature.calculation.averageKills).toBe(17)
    expect(battle.defender.activeCreature.calculation.maxKills).toBe(20)
  })

  test('With attacker hero', () => {
    const hero = new HeroInstance(heroes[0])
    hero.initialize().then(() => {
      battle.attacker.hero = hero

      battle.calculate()

      if (!battle.attacker.activeCreature || !battle.defender.activeCreature) return

      expect(battle.attacker.activeCreature.calculation.minDamage).toBe(69)
      expect(battle.attacker.activeCreature.calculation.averageDamage).toBe(138)
      expect(battle.attacker.activeCreature.calculation.maxDamage).toBe(206)
      expect(battle.attacker.activeCreature.calculation.minKills).toBe(0)
      expect(battle.attacker.activeCreature.calculation.averageKills).toBe(0)
      expect(battle.attacker.activeCreature.calculation.maxKills).toBe(1)

      expect(battle.defender.activeCreature.calculation.minDamage).toBe(153)
      expect(battle.defender.activeCreature.calculation.averageDamage).toBe(178)
      expect(battle.defender.activeCreature.calculation.maxDamage).toBe(204)
      expect(battle.defender.activeCreature.calculation.minKills).toBe(15)
      expect(battle.defender.activeCreature.calculation.averageKills).toBe(17)
      expect(battle.defender.activeCreature.calculation.maxKills).toBe(20)
    })
  })
})
