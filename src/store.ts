import { defineStore } from 'pinia'
import { Class } from './models/Class'
import { Creature } from './models/Creature'
import { Spells } from './models/enums'
import { Hero } from './models/Hero'
import { Level } from './models/Level'
import { Skill } from './models/Skill'
import { Spell } from './models/Spell'
import { Terrain } from './models/Terrain'
import { Town } from './models/Town'

export interface StoreState {
  classes: Array<Class>
  creatures: Array<Creature>
  heroes: Array<Hero>
  skills: Array<Skill>
  levels: Array<Level>
  terrains: Array<Terrain>
  spells: Array<Spell>
  towns: Array<Town>

  isDataLoaded: boolean
}

export const useStore = defineStore('data', {
  state: (): StoreState => ({
    classes: [],
    creatures: [],
    heroes: [],
    skills: [],
    levels: [],
    terrains: [],
    spells: [],
    towns: [],

    isDataLoaded: false,
  }),
  getters: {
    attackPositiveEffects(): Array<Spell> {
      const attackPositiveEffectsIds = [
        Spells.Bless,
        Spells.Bloodlust,
        Spells.Frenzy,
        Spells.Prayer,
        Spells.Precision,
        Spells.Slayer,
      ]
      return this.spells.filter((spell) => attackPositiveEffectsIds.indexOf(spell.id) !== -1)
    },
    defensePositiveEffects(): Array<Spell> {
      const defensePositiveEffectsIds = [Spells.Shield, Spells.StoneSkin, Spells.AirShield]
      return this.spells.filter((spell) => defensePositiveEffectsIds.indexOf(spell.id) !== -1)
    },
    attackNegativeEffects(): Array<Spell> {
      const attackNegativeEffectsIds = [Spells.Curse, Spells.Weakness, Spells.DisruptingRay]
      return this.spells.filter((spell) => attackNegativeEffectsIds.indexOf(spell.id) !== -1)
    },
  },
  actions: {
    initData() {
      const tables = ['classes', 'creatures', 'heroes', 'skills', 'levels', 'terrains', 'spells', 'towns']

      const promises = tables.map(async (table: string) => {
        // dynamic load data module
        const data = await import(`./assets/database/${table}.ts`)
        this[table] = data[table]
      })
      Promise.all(promises).then(() => (this.isDataLoaded = true))
    },
  },
})
