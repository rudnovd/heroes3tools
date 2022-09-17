import type { Town, TownKey } from '@/types'

const towns: Record<TownKey, Pick<Town, 'name'>> = {
  Castle: {
    name: 'Замок',
  },
  Rampart: {
    name: 'Оплот',
  },
  Tower: {
    name: 'Башня',
  },
  Inferno: {
    name: 'Инферно',
  },
  Necropolis: {
    name: 'Некрополис',
  },
  Dungeon: {
    name: 'Темница',
  },
  Fortress: {
    name: 'Цитадель',
  },
  Stronghold: {
    name: 'Крепость',
  },
  Conflux: {
    name: 'Сопряжение',
  },
  Cove: {
    name: 'Причал',
  },
  Factory: {
    name: 'Фабрика',
  },
}

export default towns
