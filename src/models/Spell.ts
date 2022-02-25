type SpellGroup = 'mind'

export interface Spell {
  id: number
  name: string
  level: number
  element: Elements
  group?: Array<SpellGroup>
}

export interface SpellTranslation {
  id: number
  name: string
  element: ElementsRu
}

type Elements = 'Neutral' | 'Fire' | 'Water' | 'Earth' | 'Air'
type ElementsRu = 'Нейтральный' | 'Огонь' | 'Вода' | 'Земля' | 'Воздух'
