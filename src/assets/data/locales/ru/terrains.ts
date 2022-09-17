import type { Terrain, TerrainKey } from '@/types'

export const terrains: Record<TerrainKey, Pick<Terrain, 'name'>> = {
  Grass: {
    name: 'Трава',
  },
  Snow: {
    name: 'Снег',
  },
  Lava: {
    name: 'Лава',
  },
  Dirt: {
    name: 'Грязь',
  },
  Subterranean: {
    name: 'Подземелье',
  },
  Rough: {
    name: 'Камни',
  },
  Swamp: {
    name: 'Болото',
  },
  Highlands: {
    name: 'Высокогорье',
  },
  Sand: {
    name: 'Песок',
  },
  Wasteland: {
    name: 'Пустоши',
  },
  Neutral: {
    name: 'Нейтральная',
  },
}

export default terrains
