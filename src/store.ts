import type { AvailableLocale } from '@/i18n'
import type { Artifact, Creature, Hero, HeroClass, Level, Skill, Spell, Terrain, Town } from '@/types'
import { dataModules } from '@/utilities'
import { openDB } from 'idb'
import { createPinia, defineStore } from 'pinia'

export interface StoreState {
  artifacts: Array<Artifact>
  classes: Array<HeroClass>
  creatures: Array<Creature>
  heroes: Array<Hero>
  skills: Array<Skill>
  levels: Array<Level>
  terrains: Array<Terrain>
  spells: Array<Spell>
  towns: Array<Town>

  isDataLoaded: boolean
}

const pinia = createPinia()

export const useStore = defineStore('data', {
  state: (): StoreState => ({
    artifacts: [],
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
  actions: {
    async loadData(locale: AvailableLocale) {
      // open database
      const database = await openDB('data', import.meta.env.VITE_APP_DATABASES_VERSIONS.DATA, {
        // called if this version of the database has never been opened before
        upgrade(db) {
          // delete old stores when database version upgraded
          for (const module of db.objectStoreNames) {
            db.deleteObjectStore(module)
          }

          // create stores
          for (const module of dataModules) {
            db.createObjectStore(module)
          }
        },
      })

      for (const store of database.objectStoreNames) {
        // if data already exist - continue
        if (await database.count(store)) continue

        // save data in indexedDB from file
        const module = await import(`@/assets/data/${store}.ts`)
        module.default.forEach((value: object, index: number) => database.add(store, value, index))
      }

      try {
        // fill store from database
        for (const store of database.objectStoreNames) {
          this[store] = await database.getAll(store)
        }

        // load locale data
        if (locale !== 'en') {
          this.loadLocaleData(locale)
        }
      } finally {
        database.close()
        if (locale === 'en') {
          this.isDataLoaded = true
        }
      }
    },
    async loadLocaleData(locale: AvailableLocale) {
      if (locale === 'en') {
        return this.loadData('en')
      }

      this.isDataLoaded = false

      // open locales database
      const database = await openDB('locales', import.meta.env.VITE_APP_DATABASES_VERSIONS.LOCALES, {
        // called if this version of the database has never been opened before
        upgrade(db) {
          // delete old stores when database version upgraded
          for (const store of db.objectStoreNames) {
            db.deleteObjectStore(store)
          }

          // create stores
          db.createObjectStore(locale)
        },
      })

      try {
        for (const module of dataModules) {
          let localeData: object = await database.get(locale, module)

          // add data to the database, if it is unavailable
          if (!localeData || !Object.keys(localeData).length) {
            const data = await import(`@/assets/data/locales/${locale}/${module}.ts`)
            database.add(locale, data.default, module)
            localeData = data.default
          }

          // merge data in store
          this[module] = this[module].map((value) => {
            return {
              ...value,
              ...localeData[value.key],
            }
          })
        }
      } finally {
        database.close()
        this.isDataLoaded = true
      }
    },
  },
})

export default pinia
