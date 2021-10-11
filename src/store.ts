import { defineStore } from 'pinia'
import { DataStore, getDatabaseStore, initDatabaseStore } from './database'
import { Class } from './models/Class'
import { Creature } from './models/Creature'
import { Spells } from './models/enums'
import { Hero } from './models/Hero'
import { Level } from './models/Level'
import { Skill } from './models/Skill'
import { Spell } from './models/Spell'
import { Terrain } from './models/Terrain'
import { Town } from './models/Town'

export interface PiniaStateData {
  classes: Array<Class>
  creatures: Array<Creature>
  heroes: Array<Hero>
  skills: Array<Skill>
  levels: Array<Level>
  terrains: Array<Terrain>
  spells: Array<Spell>
  towns: Array<Town>
}

export const useStore = defineStore('data', {
  state: () =>
    ({
      classes: [],
      creatures: [],
      heroes: [],
      skills: [],
      levels: [],
      terrains: [],
      spells: [],
      towns: [],
    } as PiniaStateData),
  getters: {
    attackPositiveEffects(state) {
      const attackPositiveEffectsIds = [
        Spells.Bless,
        Spells.Bloodlust,
        Spells.Frenzy,
        Spells.Prayer,
        Spells.Precision,
        Spells.Slayer,
      ]

      return state.spells.filter((spell) => attackPositiveEffectsIds.indexOf(spell.id) !== -1)
    },
    defensePositiveEffects(state) {
      const defensePositiveEffectsIds = [Spells.Shield, Spells.StoneSkin, Spells.AirShield]
      return state.spells.filter((spell) => defensePositiveEffectsIds.indexOf(spell.id) !== -1)
    },
    attackNegativeEffects(state) {
      const attackNegativeEffectsIds = [Spells.Curse, Spells.Weakness, Spells.DisruptingRay]
      return state.spells.filter((spell) => attackNegativeEffectsIds.indexOf(spell.id) !== -1)
    },
  },
  actions: {
    async initData() {
      const dataStores: Array<DataStore> = [
        'classes',
        'creatures',
        'heroes',
        'skills',
        'levels',
        'terrains',
        'spells',
        'towns',
      ]

      dataStores.forEach(async (datastore: DataStore) => {
        let data = await getDatabaseStore(datastore)

        if (!data || !data.length) {
          data = await initDatabaseStore(datastore)
        }

        // TODO: fix
        if (datastore === 'classes') this.classes = data as Class[]
        if (datastore === 'creatures') this.creatures = data as Creature[]
        if (datastore === 'heroes') this.heroes = data as Hero[]
        if (datastore === 'skills') this.skills = data as Skill[]
        if (datastore === 'levels') this.levels = data as Level[]
        if (datastore === 'terrains') this.terrains = data as Terrain[]
        if (datastore === 'spells') this.spells = data as Spell[]
        if (datastore === 'towns') this.towns = data as Town[]
      })
    },
  },
})
