import type { HeroClass, HeroClassKey } from '@/types'

const classes: Record<HeroClassKey, Pick<HeroClass, 'name'>> = {
  Knight: {
    name: 'Рыцарь',
  },
  Cleric: {
    name: 'Священник',
  },
  Ranger: {
    name: 'Рейнджер',
  },
  Druid: {
    name: 'Друид',
  },
  Alchemist: {
    name: 'Алхимик',
  },
  Wizard: {
    name: 'Маг',
  },
  Demoniac: {
    name: 'Демон',
  },
  Heretic: {
    name: 'Еретик',
  },
  DeathKnight: {
    name: 'Рыцарь смерти',
  },
  Necromancer: {
    name: 'Некромант',
  },
  Overlord: {
    name: 'Лорд',
  },
  Warlock: {
    name: 'Чернокнижник',
  },
  Barbarian: {
    name: 'Варвар',
  },
  BattleMage: {
    name: 'Боевой маг',
  },
  Beastmaster: {
    name: 'Хозяин зверей',
  },
  Witch: {
    name: 'Ведьма',
  },
  Planeswalker: {
    name: 'Путешественник',
  },
  Elementalist: {
    name: 'Элементалист',
  },
  Captain: {
    name: 'Капитан',
  },
  Navigator: {
    name: 'Навигатор',
  },
}

export default classes
