import type { Class } from '@/models/Class'
import type { Creature } from '@/models/Creature'
import type { Hero } from '@/models/Hero'
import type { Level } from '@/models/Level'
import type { Skill } from '@/models/Skill'
import type { Spell } from '@/models/Spell'
import type { Terrain } from '@/models/Terrain'
import type { Town } from '@/models/Town'
import type { DBSchema } from 'idb'
import { openDB } from 'idb'

interface Data extends DBSchema {
  classes: {
    key: number
    value: Class
  }

  creatures: {
    key: number
    value: Creature
  }

  heroes: {
    key: number
    value: Hero
  }

  levels: {
    key: number
    value: Level
  }

  skills: {
    key: number
    value: Skill
  }

  spells: {
    key: number
    value: Spell
  }

  terrains: {
    key: number
    value: Terrain
  }

  towns: {
    key: number
    value: Town
  }
}

export type DataStore = 'classes' | 'creatures' | 'heroes' | 'levels' | 'skills' | 'spells' | 'terrains' | 'towns'
type DataStoreType = Class | Creature | Hero | Level | Skill | Spell | Terrain | Town
type locales = 'ru' | 'en'

export const openDatabase = openDB<Data>('data', 1, {
  upgrade(db) {
    db.createObjectStore('classes', { autoIncrement: true })
    db.createObjectStore('creatures', { autoIncrement: true })
    db.createObjectStore('heroes', { autoIncrement: true })
    db.createObjectStore('levels', { autoIncrement: true })
    db.createObjectStore('skills', { autoIncrement: true })
    db.createObjectStore('spells', { autoIncrement: true })
    db.createObjectStore('terrains', { autoIncrement: true })
    db.createObjectStore('towns', { autoIncrement: true })
  },
})

export function initDatabaseStore(store: 'classes'): Promise<Class[]>
export function initDatabaseStore(store: 'creatures'): Promise<Creature[]>
export function initDatabaseStore(store: 'heroes'): Promise<Hero[]>
export function initDatabaseStore(store: 'levels'): Promise<Level[]>
export function initDatabaseStore(store: 'skills'): Promise<Skill[]>
export function initDatabaseStore(store: 'spells'): Promise<Spell[]>
export function initDatabaseStore(store: 'terrains'): Promise<Terrain[]>
export function initDatabaseStore(store: 'towns'): Promise<Town[]>
export function initDatabaseStore(
  store: DataStore
): Promise<(Creature | Hero | Level | Skill | Spell | Terrain | Town | Class)[] | undefined>
export async function initDatabaseStore(store: DataStore): Promise<unknown> {
  try {
    const database = await openDatabase

    const data = await database.getAll(store)
    if (data.length) {
      return data
    }

    const databaseModule = await import(`./assets/database/${store}.ts`)
    for (const object of databaseModule[store]) {
      await database.add(store, object)
    }

    return database.getAll(store)
  } catch (error) {
    console.error(error)
  }
}

export function getDatabaseStore(store: 'classes'): Promise<Class[]>
export function getDatabaseStore(store: 'creatures'): Promise<Creature[]>
export function getDatabaseStore(store: 'heroes'): Promise<Hero[]>
export function getDatabaseStore(store: 'levels'): Promise<Level[]>
export function getDatabaseStore(store: 'skills'): Promise<Skill[]>
export function getDatabaseStore(store: 'spells'): Promise<Spell[]>
export function getDatabaseStore(store: 'terrains'): Promise<Terrain[]>
export function getDatabaseStore(store: 'towns'): Promise<Town[]>
export function getDatabaseStore(
  store: DataStore
): Promise<(Creature | Hero | Level | Skill | Spell | Terrain | Town | Class)[] | undefined>
export async function getDatabaseStore(store: DataStore): Promise<unknown> {
  try {
    const database = await openDatabase
    return await database.getAll(store)
  } catch (error) {
    console.error(error)
  }
}

export function getObjectById(store: 'classes', id: number): Promise<Class>
export function getObjectById(store: 'creatures', id: number): Promise<Creature>
export function getObjectById(store: 'heroes', id: number): Promise<Hero>
export function getObjectById(store: 'levels', id: number): Promise<Level>
export function getObjectById(store: 'skills', id: number): Promise<Skill>
export function getObjectById(store: 'spells', id: number): Promise<Spell>
export function getObjectById(store: 'terrains', id: number): Promise<Terrain>
export function getObjectById(store: 'towns', id: number): Promise<Town>
export async function getObjectById(store: DataStore, id: number): Promise<unknown> {
  try {
    const database = await openDatabase
    return await database.get(store, id)
  } catch (error) {
    console.error(error)
  }
}

export function updateObjectById(store: 'classes', id: number, value: Class): Promise<Class>
export function updateObjectById(store: 'creatures', id: number, value: Class): Promise<Creature>
export function updateObjectById(store: 'heroes', id: number, value: Class): Promise<Hero>
export function updateObjectById(store: 'levels', id: number, value: Class): Promise<Level>
export function updateObjectById(store: 'skills', id: number, value: Class): Promise<Skill>
export function updateObjectById(store: 'spells', id: number, value: Class): Promise<Spell>
export function updateObjectById(store: 'terrains', id: number, value: Class): Promise<Terrain>
export function updateObjectById(store: 'towns', id: number, value: Class): Promise<Town>
export async function updateObjectById(store: DataStore, id: number, value: DataStoreType): Promise<unknown> {
  try {
    const database = await openDatabase
    await database.put(store, value, id)
    return await database.get(store, id)
  } catch (error) {
    console.error(error)
  }
}

export async function loadResourcesByLocale(store: DataStore, locale: locales): Promise<void> {
  try {
    const database = await openDatabase

    const databaseModule = await import(`./assets/database/locales/${locale}/${store}.ts`)
    for (const object of databaseModule[store]) {
      const creature = await database.get(store, object.id)
      await database.put(store, { ...creature, ...object }, object.id)
    }
  } catch (error) {
    console.error(error)
  }
}
