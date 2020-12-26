import { openDB, DBSchema } from 'idb'
import { Class } from '@/models/Class'
import { Creature } from '@/models/Creature'
import { Hero } from '@/models/Hero'
import { Level } from '@/models/Level'
import { Skill } from '@/models/Skill'
import { Spell } from '@/models/Spell'
import { Terrain } from '@/models/Terrain'
import { Town } from '@/models/Town'

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

type DataStore = 'classes' | 'creatures' | 'heroes' | 'levels' | 'skills' | 'spells' | 'terrains' | 'towns'
type DataStoreType = Class | Creature | Hero | Level | Skill | Spell | Terrain | Town
type locales = 'ru' | 'en'

const openDatabase = openDB<Data>('data', 1, {
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

export function initDatabaseStore(storeName: 'classes'): Promise<Class[]>
export function initDatabaseStore(storeName: 'creatures'): Promise<Creature[]>
export function initDatabaseStore(storeName: 'heroes'): Promise<Hero[]>
export function initDatabaseStore(storeName: 'levels'): Promise<Level[]>
export function initDatabaseStore(storeName: 'skills'): Promise<Skill[]>
export function initDatabaseStore(storeName: 'spells'): Promise<Spell[]>
export function initDatabaseStore(storeName: 'terrains'): Promise<Terrain[]>
export function initDatabaseStore(storeName: 'towns'): Promise<Town[]>
export async function initDatabaseStore(store: DataStore): Promise<unknown> {
  try {
    const database = await openDatabase

    const data = await database.getAll(store)
    if (data.length) {
      return data
    }

    const databaseModule = await import(`@/assets/database/${store}.ts`)
    for (const object of databaseModule[store]) {
      await database.add(store, object)
    }

    return database.getAll(store)
  } catch (error) {
    console.error(error)
  }
}

export function getDatabaseStore(storeName: 'classes'): Promise<Class[]>
export function getDatabaseStore(storeName: 'creatures'): Promise<Creature[]>
export function getDatabaseStore(storeName: 'heroes'): Promise<Hero[]>
export function getDatabaseStore(storeName: 'levels'): Promise<Level[]>
export function getDatabaseStore(storeName: 'skills'): Promise<Skill[]>
export function getDatabaseStore(storeName: 'spells'): Promise<Spell[]>
export function getDatabaseStore(storeName: 'terrains'): Promise<Terrain[]>
export function getDatabaseStore(storeName: 'towns'): Promise<Town[]>
export async function getDatabaseStore(store: DataStore): Promise<unknown> {
  try {
    const database = await openDatabase
    return await database.getAll(store)
  } catch (error) {
    console.error(error)
  }
}

export function getObjectById(storeName: 'classes', id: number): Promise<Class>
export function getObjectById(storeName: 'creatures', id: number): Promise<Creature>
export function getObjectById(storeName: 'heroes', id: number): Promise<Hero>
export function getObjectById(storeName: 'levels', id: number): Promise<Level>
export function getObjectById(storeName: 'skills', id: number): Promise<Skill>
export function getObjectById(storeName: 'spells', id: number): Promise<Spell>
export function getObjectById(storeName: 'terrains', id: number): Promise<Terrain>
export function getObjectById(storeName: 'towns', id: number): Promise<Town>
export async function getObjectById(store: DataStore, id: number): Promise<unknown> {
  try {
    const database = await openDatabase
    return await database.get(store, id)
  } catch (error) {
    console.error(error)
  }
}

export function updateObjectById(storeName: 'classes', id: number, value: Class): Promise<Class>
export function updateObjectById(storeName: 'creatures', id: number, value: Class): Promise<Creature>
export function updateObjectById(storeName: 'heroes', id: number, value: Class): Promise<Hero>
export function updateObjectById(storeName: 'levels', id: number, value: Class): Promise<Level>
export function updateObjectById(storeName: 'skills', id: number, value: Class): Promise<Skill>
export function updateObjectById(storeName: 'spells', id: number, value: Class): Promise<Spell>
export function updateObjectById(storeName: 'terrains', id: number, value: Class): Promise<Terrain>
export function updateObjectById(storeName: 'towns', id: number, value: Class): Promise<Town>
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

    const databaseModule = await import(`@/assets/database/locales/${locale}/${store}.ts`)
    for (const object of databaseModule[store]) {
      const creature = await database.get(store, object.id)
      await database.put(store, { ...creature, ...object }, object.id)
    }
  } catch (error) {
    console.error(error)
  }
}
