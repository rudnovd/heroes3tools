import { defineStore } from 'pinia'
import type { Class } from './models/Class'
import type { Creature } from './models/Creature'
import { Spells } from './models/enums'
import type { Hero } from './models/Hero'
import type { Level } from './models/Level'
import type { Skill } from './models/Skill'
import type { Spell } from './models/Spell'
import type { Terrain } from './models/Terrain'
import type { Town } from './models/Town'

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
    loadData(locale = 'en') {
      const tables = ['classes', 'creatures', 'heroes', 'skills', 'levels', 'terrains', 'spells', 'towns']

      // dynamic load data modules
      const promises = tables.map(async (table: string) => {
        // load original data if this not exist in store
        if (!this[table].length || locale === 'en') {
          const originalData = await import(`./assets/database/${table}.ts`)
          this[table] = originalData[table]
        }
        if (locale === 'en') return

        // load translation data
        const data = await import(`./assets/database/locales/${locale}/${table}.ts`)
        this[table] = this[table].map((tableData: Record<string, unknown>, index: number) => {
          return {
            ...tableData,
            ...data[table][index],
          }
        })
      })
      Promise.all(promises).then(() => (this.isDataLoaded = true))
    },
  },
})
