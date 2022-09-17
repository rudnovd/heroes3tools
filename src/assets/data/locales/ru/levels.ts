import type { Level, SkillLevelKey } from '@/types'

const levels: Record<SkillLevelKey, Pick<Level, 'name'>> = {
  Basic: {
    name: 'Базовый',
  },
  Advanced: {
    name: 'Продвинутый',
  },
  Expert: {
    name: 'Эксперт',
  },
}

export default levels
