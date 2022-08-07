type SpellGroup = 'mind'

export interface Spell {
  id: number
  name: string
  level: number
  element: {
    id: 'neutral' | 'fire' | 'water' | 'earth' | 'air'
    name: string
  }
  group?: Array<SpellGroup>
}
