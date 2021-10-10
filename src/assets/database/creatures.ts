import type { Creature } from '@/models/Creature'
import { Terrains, Towns } from '@/models/enums'

export const creatures: Array<Creature> = [
  {
    name: 'Pikeman',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 1,
    minDamage: 1,
    maxDamage: 3,
    health: 10,
    level: 1,
    attack: 4,
    defense: 5,
    hits: 1,
    ranged: false,
    aiValue: 1,
    cost: 1,
    fightValue: 1,
    growth: 1,
    speed: 1,
  },
  {
    name: 'Halberdier',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 2,
    minDamage: 2,
    maxDamage: 3,
    health: 10,
    level: 1,
    attack: 6,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Archer',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 3,
    minDamage: 2,
    maxDamage: 3,
    health: 10,
    level: 2,
    attack: 6,
    defense: 3,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Marksman',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 4,
    minDamage: 2,
    maxDamage: 3,
    health: 10,
    level: 2,
    attack: 6,
    defense: 3,
    hits: 2,
    ranged: true,
  },
  {
    name: 'Griffin',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 5,
    minDamage: 3,
    maxDamage: 6,
    health: 25,
    level: 3,
    attack: 8,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Royal Griffin',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 6,
    minDamage: 3,
    maxDamage: 6,
    health: 25,
    level: 3,
    attack: 9,
    defense: 9,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Swordsman',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 7,
    minDamage: 6,
    maxDamage: 9,
    health: 35,
    level: 4,
    attack: 10,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Crusader',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 8,
    minDamage: 7,
    maxDamage: 10,
    health: 35,
    level: 4,
    attack: 12,
    defense: 12,
    hits: 2,
    ranged: false,
  },
  {
    name: 'Monk',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 9,
    minDamage: 10,
    maxDamage: 12,
    health: 30,
    level: 5,
    attack: 12,
    defense: 7,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Zealot',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 10,
    minDamage: 10,
    maxDamage: 12,
    health: 30,
    level: 5,
    attack: 12,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Cavalier',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 11,
    minDamage: 15,
    maxDamage: 25,
    health: 100,
    level: 6,
    attack: 15,
    defense: 15,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Champion',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 12,
    minDamage: 20,
    maxDamage: 25,
    health: 100,
    level: 6,
    attack: 16,
    defense: 16,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Angel',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 13,
    minDamage: 50,
    maxDamage: 50,
    health: 200,
    level: 7,
    attack: 20,
    defense: 20,
    hits: 1,
    ranged: false,
    hates: [83, 84],
  },
  {
    name: 'Archangel',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Castle,
    id: 14,
    minDamage: 50,
    maxDamage: 50,
    health: 250,
    level: 7,
    attack: 30,
    defense: 30,
    hits: 1,
    ranged: false,
    hates: [83, 84],
  },
  {
    name: 'Centaur',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 15,
    minDamage: 2,
    maxDamage: 3,
    health: 8,
    level: 1,
    attack: 5,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Centaur Captain',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 16,
    minDamage: 2,
    maxDamage: 3,
    health: 10,
    level: 1,
    attack: 6,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Dwarf',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 17,
    minDamage: 2,
    maxDamage: 4,
    health: 20,
    level: 2,
    attack: 6,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Battle Dwarf',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 18,
    minDamage: 2,
    maxDamage: 4,
    health: 20,
    level: 2,
    attack: 7,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wood Elf',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 19,
    minDamage: 3,
    maxDamage: 5,
    health: 15,
    level: 3,
    attack: 9,
    defense: 5,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Grand Elf',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 20,
    minDamage: 3,
    maxDamage: 5,
    health: 15,
    level: 3,
    attack: 9,
    defense: 5,
    hits: 2,
    ranged: true,
  },
  {
    name: 'Pegasus',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 21,
    minDamage: 5,
    maxDamage: 9,
    health: 30,
    level: 4,
    attack: 9,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Silver Pegasus',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 22,
    minDamage: 5,
    maxDamage: 9,
    health: 30,
    level: 4,
    attack: 9,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Dendroid Guard',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 23,
    minDamage: 10,
    maxDamage: 14,
    health: 55,
    level: 5,
    attack: 9,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Dendroid Soldier',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 24,
    minDamage: 10,
    maxDamage: 14,
    health: 65,
    level: 5,
    attack: 9,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Unicorn',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 25,
    minDamage: 18,
    maxDamage: 22,
    health: 90,
    level: 6,
    attack: 15,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'War Unicorn',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 26,
    minDamage: 18,
    maxDamage: 22,
    health: 110,
    level: 6,
    attack: 15,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Green Dragon',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 27,
    minDamage: 40,
    maxDamage: 50,
    health: 180,
    level: 7,
    attack: 18,
    defense: 18,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gold Dragon',
    nativeTerrain: Terrains.Grass,
    townId: Towns.Rampart,
    id: 28,
    minDamage: 40,
    maxDamage: 50,
    health: 250,
    level: 7,
    attack: 27,
    defense: 27,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gremlin',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 29,
    minDamage: 1,
    maxDamage: 2,
    health: 4,
    level: 1,
    attack: 3,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Master Gremlin',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 30,
    minDamage: 1,
    maxDamage: 2,
    health: 4,
    level: 1,
    attack: 4,
    defense: 4,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Stone Gargoyle',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 31,
    minDamage: 2,
    maxDamage: 3,
    health: 16,
    level: 2,
    attack: 6,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Obsidian Gargoyle',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 32,
    minDamage: 2,
    maxDamage: 3,
    health: 16,
    level: 2,
    attack: 7,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Stone Golem',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 33,
    minDamage: 4,
    maxDamage: 5,
    health: 30,
    level: 3,
    attack: 7,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Iron Golem',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 34,
    minDamage: 4,
    maxDamage: 5,
    health: 35,
    level: 3,
    attack: 9,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Mage',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 35,
    minDamage: 7,
    maxDamage: 9,
    health: 25,
    level: 4,
    attack: 11,
    defense: 8,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Arch Mage',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 36,
    minDamage: 7,
    maxDamage: 9,
    health: 30,
    level: 4,
    attack: 12,
    defense: 9,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Genie',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 37,
    minDamage: 13,
    maxDamage: 16,
    health: 40,
    level: 5,
    attack: 12,
    defense: 12,
    hits: 1,
    ranged: false,
    hates: [81, 82],
  },
  {
    name: 'Master Genie',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 38,
    minDamage: 13,
    maxDamage: 16,
    health: 40,
    level: 5,
    attack: 12,
    defense: 12,
    hits: 1,
    ranged: false,
    hates: [81, 82],
  },
  {
    name: 'Naga',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 39,
    minDamage: 20,
    maxDamage: 20,
    health: 110,
    level: 6,
    attack: 16,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Naga Queen',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 40,
    minDamage: 30,
    maxDamage: 30,
    health: 110,
    level: 6,
    attack: 16,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Giant',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 41,
    minDamage: 40,
    maxDamage: 60,
    health: 150,
    level: 7,
    attack: 19,
    defense: 16,
    hits: 1,
    ranged: false,
    hates: [70, 71],
  },
  {
    name: 'Titan',
    nativeTerrain: Terrains.Snow,
    townId: Towns.Tower,
    id: 42,
    minDamage: 40,
    maxDamage: 60,
    health: 300,
    level: 7,
    attack: 24,
    defense: 24,
    hits: 1,
    ranged: true,
    hates: [70, 71],
  },
  {
    name: 'Skeleton',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 43,
    minDamage: 1,
    maxDamage: 3,
    health: 6,
    level: 1,
    attack: 5,
    defense: 4,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Skeleton Warrior',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 44,
    minDamage: 1,
    maxDamage: 3,
    health: 6,
    level: 1,
    attack: 6,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Walking Dead',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 45,
    minDamage: 2,
    maxDamage: 3,
    health: 15,
    level: 2,
    attack: 5,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Zombie',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 46,
    minDamage: 2,
    maxDamage: 3,
    health: 20,
    level: 2,
    attack: 5,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wight',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 47,
    minDamage: 3,
    maxDamage: 5,
    health: 18,
    level: 3,
    attack: 7,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wraith',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 48,
    minDamage: 3,
    maxDamage: 5,
    health: 18,
    level: 3,
    attack: 7,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Vampire',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 49,
    minDamage: 5,
    maxDamage: 8,
    health: 30,
    level: 4,
    attack: 10,
    defense: 9,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Vampire Lord',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 50,
    minDamage: 5,
    maxDamage: 8,
    health: 40,
    level: 4,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Lich',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 51,
    minDamage: 11,
    maxDamage: 13,
    health: 30,
    level: 5,
    attack: 13,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Power Lich',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 52,
    minDamage: 11,
    maxDamage: 15,
    health: 40,
    level: 5,
    attack: 13,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Black Knight',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 53,
    minDamage: 15,
    maxDamage: 30,
    health: 120,
    level: 6,
    attack: 16,
    defense: 16,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Dread Knight',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 54,
    minDamage: 15,
    maxDamage: 30,
    health: 120,
    level: 6,
    attack: 18,
    defense: 18,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Bone Dragon',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 55,
    minDamage: 25,
    maxDamage: 50,
    health: 150,
    level: 7,
    attack: 17,
    defense: 15,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ghost Dragon',
    nativeTerrain: Terrains.Dirt,
    townId: Towns.Necropolis,
    id: 56,
    minDamage: 25,
    maxDamage: 50,
    health: 200,
    level: 7,
    attack: 19,
    defense: 17,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Troglodyte',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 57,
    minDamage: 1,
    maxDamage: 3,
    health: 5,
    level: 1,
    attack: 4,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Infernal Troglodyte',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 58,
    minDamage: 1,
    maxDamage: 3,
    health: 6,
    level: 1,
    attack: 5,
    defense: 4,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Harpy',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 59,
    minDamage: 1,
    maxDamage: 4,
    health: 14,
    level: 2,
    attack: 6,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Harpy Hag',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 60,
    minDamage: 1,
    maxDamage: 4,
    health: 14,
    level: 2,
    attack: 6,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Beholder',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 61,
    minDamage: 3,
    maxDamage: 5,
    health: 22,
    level: 3,
    attack: 9,
    defense: 7,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Evil Eye',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 62,
    minDamage: 3,
    maxDamage: 5,
    health: 22,
    level: 3,
    attack: 10,
    defense: 8,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Medusa',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 63,
    minDamage: 6,
    maxDamage: 8,
    health: 25,
    level: 4,
    attack: 9,
    defense: 9,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Medusa Queen',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 64,
    minDamage: 6,
    maxDamage: 8,
    health: 30,
    level: 4,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Minotaur',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 65,
    minDamage: 12,
    maxDamage: 20,
    health: 50,
    level: 5,
    attack: 14,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Minotaur King',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 66,
    minDamage: 12,
    maxDamage: 20,
    health: 50,
    level: 5,
    attack: 15,
    defense: 15,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Manticore',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 67,
    minDamage: 14,
    maxDamage: 20,
    health: 80,
    level: 6,
    attack: 15,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Scorpicore',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 68,
    minDamage: 14,
    maxDamage: 20,
    health: 80,
    level: 6,
    attack: 16,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Red Dragon',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 69,
    minDamage: 40,
    maxDamage: 50,
    health: 180,
    level: 7,
    attack: 19,
    defense: 19,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Black Dragon',
    nativeTerrain: Terrains.Subterranean,
    townId: Towns.Dungeon,
    id: 70,
    minDamage: 40,
    maxDamage: 50,
    health: 300,
    level: 7,
    attack: 25,
    defense: 25,
    hits: 1,
    ranged: false,
    hates: [41, 42],
  },
  {
    name: 'Imp',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 71,
    minDamage: 1,
    maxDamage: 2,
    health: 4,
    level: 1,
    attack: 2,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Familiar',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 72,
    minDamage: 1,
    maxDamage: 2,
    health: 4,
    level: 1,
    attack: 4,
    defense: 4,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gog',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 73,
    minDamage: 2,
    maxDamage: 4,
    health: 13,
    level: 2,
    attack: 6,
    defense: 4,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Magog',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 74,
    minDamage: 2,
    maxDamage: 4,
    health: 13,
    level: 2,
    attack: 7,
    defense: 4,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Hell Hound',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 75,
    minDamage: 2,
    maxDamage: 7,
    health: 25,
    level: 3,
    attack: 10,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Cerberus',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 76,
    minDamage: 2,
    maxDamage: 7,
    health: 25,
    level: 3,
    attack: 10,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Demon',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 77,
    minDamage: 7,
    maxDamage: 9,
    health: 35,
    level: 4,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Horned Demon',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 78,
    minDamage: 7,
    maxDamage: 9,
    health: 40,
    level: 4,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Pit Fiend',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 79,
    minDamage: 13,
    maxDamage: 17,
    health: 45,
    level: 5,
    attack: 13,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Pit Lord',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 80,
    minDamage: 13,
    maxDamage: 17,
    health: 45,
    level: 5,
    attack: 13,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Efreet',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 81,
    minDamage: 16,
    maxDamage: 24,
    health: 90,
    level: 6,
    attack: 16,
    defense: 12,
    hits: 1,
    ranged: false,
    hates: [37, 38],
  },
  {
    name: 'Efreet Sultan',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 82,
    minDamage: 16,
    maxDamage: 24,
    health: 90,
    level: 6,
    attack: 16,
    defense: 14,
    hits: 1,
    ranged: false,
    hates: [37, 38],
  },
  {
    name: 'Devil',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 83,
    minDamage: 30,
    maxDamage: 40,
    health: 160,
    level: 7,
    attack: 19,
    defense: 21,
    hits: 1,
    ranged: false,
    hates: [13, 14],
  },
  {
    name: 'Arch Devil',
    nativeTerrain: Terrains.Lava,
    townId: Towns.Inferno,
    id: 84,
    minDamage: 30,
    maxDamage: 40,
    health: 200,
    level: 7,
    attack: 26,
    defense: 28,
    hits: 1,
    ranged: false,
    hates: [13, 14],
  },
  {
    name: 'Gnoll',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 85,
    minDamage: 2,
    maxDamage: 3,
    health: 6,
    level: 1,
    attack: 3,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gnoll Marauder',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 86,
    minDamage: 2,
    maxDamage: 3,
    health: 6,
    level: 1,
    attack: 4,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Lizardman',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 87,
    minDamage: 2,
    maxDamage: 3,
    health: 14,
    level: 2,
    attack: 5,
    defense: 6,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Lizard Warrior',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 88,
    minDamage: 2,
    maxDamage: 5,
    health: 15,
    level: 2,
    attack: 6,
    defense: 8,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Serpent Fly',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 89,
    minDamage: 2,
    maxDamage: 5,
    health: 20,
    level: 3,
    attack: 7,
    defense: 9,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Dragon Fly',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 90,
    minDamage: 2,
    maxDamage: 5,
    health: 20,
    level: 3,
    attack: 8,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Basilisk',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 91,
    minDamage: 6,
    maxDamage: 10,
    health: 35,
    level: 4,
    attack: 11,
    defense: 11,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Greater Basilisk',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 92,
    minDamage: 6,
    maxDamage: 10,
    health: 40,
    level: 4,
    attack: 12,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gorgon',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 93,
    minDamage: 12,
    maxDamage: 16,
    health: 70,
    level: 5,
    attack: 10,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Mighty Gorgon',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 94,
    minDamage: 12,
    maxDamage: 16,
    health: 70,
    level: 5,
    attack: 11,
    defense: 16,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wyvern',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 95,
    minDamage: 14,
    maxDamage: 18,
    health: 70,
    level: 6,
    attack: 14,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wyvern Monarch',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 96,
    minDamage: 18,
    maxDamage: 22,
    health: 70,
    level: 6,
    attack: 14,
    defense: 14,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Hydra',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 97,
    minDamage: 25,
    maxDamage: 45,
    health: 175,
    level: 7,
    attack: 16,
    defense: 18,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Chaos Hydra',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Fortress,
    id: 98,
    minDamage: 25,
    maxDamage: 45,
    health: 250,
    level: 7,
    attack: 18,
    defense: 20,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Goblin',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 99,
    minDamage: 1,
    maxDamage: 2,
    health: 5,
    level: 1,
    attack: 4,
    defense: 2,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Hobgoblin',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 100,
    minDamage: 1,
    maxDamage: 2,
    health: 5,
    level: 1,
    attack: 5,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wolf Rider',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 101,
    minDamage: 2,
    maxDamage: 4,
    health: 10,
    level: 2,
    attack: 7,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Wolf Raider',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 102,
    minDamage: 3,
    maxDamage: 4,
    health: 10,
    level: 2,
    attack: 8,
    defense: 5,
    hits: 2,
    ranged: false,
  },
  {
    name: 'Orc',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 103,
    minDamage: 2,
    maxDamage: 5,
    health: 15,
    level: 3,
    attack: 8,
    defense: 4,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Orc Chieftain',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 104,
    minDamage: 2,
    maxDamage: 5,
    health: 20,
    level: 3,
    attack: 8,
    defense: 4,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Ogre',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 105,
    minDamage: 6,
    maxDamage: 12,
    health: 40,
    level: 4,
    attack: 13,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ogre Mage',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 106,
    minDamage: 6,
    maxDamage: 12,
    health: 60,
    level: 4,
    attack: 13,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Roc',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 107,
    minDamage: 11,
    maxDamage: 15,
    health: 60,
    level: 5,
    attack: 13,
    defense: 11,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Thunderbird',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 108,
    minDamage: 11,
    maxDamage: 15,
    health: 60,
    level: 5,
    attack: 13,
    defense: 11,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Cyclops',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 109,
    minDamage: 16,
    maxDamage: 20,
    health: 70,
    level: 6,
    attack: 15,
    defense: 12,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Cyclops King',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 110,
    minDamage: 16,
    maxDamage: 20,
    health: 70,
    level: 6,
    attack: 17,
    defense: 13,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Behemoth',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 111,
    minDamage: 30,
    maxDamage: 50,
    health: 160,
    level: 7,
    attack: 17,
    defense: 17,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ancient Behemoth',
    nativeTerrain: Terrains.Rough,
    townId: Towns.Stronghold,
    id: 112,
    minDamage: 30,
    maxDamage: 50,
    health: 300,
    level: 7,
    attack: 19,
    defense: 19,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Pixie',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 113,
    minDamage: 1,
    maxDamage: 2,
    health: 3,
    level: 1,
    attack: 2,
    defense: 2,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Sprite',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 114,
    minDamage: 1,
    maxDamage: 3,
    health: 3,
    level: 1,
    attack: 2,
    defense: 2,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Air Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 115,
    minDamage: 2,
    maxDamage: 8,
    health: 25,
    level: 2,
    attack: 9,
    defense: 9,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Storm Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 116,
    minDamage: 2,
    maxDamage: 8,
    health: 25,
    level: 2,
    attack: 9,
    defense: 9,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Water Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 117,
    minDamage: 3,
    maxDamage: 7,
    health: 30,
    level: 3,
    attack: 8,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ice Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 118,
    minDamage: 3,
    maxDamage: 7,
    health: 30,
    level: 3,
    attack: 8,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Fire Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 119,
    minDamage: 4,
    maxDamage: 6,
    health: 35,
    level: 4,
    attack: 10,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Energy Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 120,
    minDamage: 4,
    maxDamage: 6,
    health: 35,
    level: 4,
    attack: 12,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Earth Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 121,
    minDamage: 4,
    maxDamage: 8,
    health: 40,
    level: 5,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Magma Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 122,
    minDamage: 6,
    maxDamage: 10,
    health: 40,
    level: 5,
    attack: 11,
    defense: 11,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Psychic Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 123,
    minDamage: 10,
    maxDamage: 20,
    health: 75,
    level: 6,
    attack: 15,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Magic Elemental',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 124,
    minDamage: 15,
    maxDamage: 25,
    health: 80,
    level: 6,
    attack: 15,
    defense: 13,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Firebird',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 125,
    minDamage: 30,
    maxDamage: 40,
    health: 150,
    level: 7,
    attack: 18,
    defense: 18,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Phoenix',
    nativeTerrain: Terrains.Hightlands,
    townId: Towns.Conflux,
    id: 126,
    minDamage: 30,
    maxDamage: 40,
    health: 200,
    level: 7,
    attack: 21,
    defense: 18,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Peasant',
    nativeTerrain: 0,
    id: 127,
    townId: 0,
    minDamage: 1,
    maxDamage: 1,
    health: 1,
    level: 1,
    attack: 1,
    defense: 1,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Halfling',
    nativeTerrain: 0,
    id: 128,
    townId: 0,
    minDamage: 1,
    maxDamage: 3,
    health: 4,
    level: 1,
    attack: 4,
    defense: 2,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Boar',
    nativeTerrain: 0,
    id: 129,
    townId: 0,
    minDamage: 2,
    maxDamage: 3,
    health: 15,
    level: 2,
    attack: 6,
    defense: 5,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Rogue',
    nativeTerrain: 0,
    id: 130,
    townId: 0,
    minDamage: 2,
    maxDamage: 4,
    health: 10,
    level: 2,
    attack: 8,
    defense: 3,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Nomad',
    nativeTerrain: 0,
    id: 131,
    townId: 0,
    minDamage: 2,
    maxDamage: 6,
    health: 30,
    level: 3,
    attack: 9,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Mummy',
    nativeTerrain: 0,
    id: 132,
    townId: 0,
    minDamage: 3,
    maxDamage: 5,
    health: 30,
    level: 3,
    attack: 7,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Sharpshooter',
    nativeTerrain: 0,
    id: 133,
    townId: 0,
    minDamage: 8,
    maxDamage: 10,
    health: 15,
    level: 4,
    attack: 12,
    defense: 10,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Troll',
    nativeTerrain: 0,
    id: 134,
    townId: 0,
    minDamage: 10,
    maxDamage: 15,
    health: 40,
    level: 5,
    attack: 14,
    defense: 7,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Gold Golem',
    nativeTerrain: 0,
    id: 135,
    townId: 0,
    minDamage: 8,
    maxDamage: 10,
    health: 50,
    level: 5,
    attack: 11,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Diamond Golem',
    nativeTerrain: 0,
    id: 136,
    townId: 0,
    minDamage: 10,
    maxDamage: 14,
    health: 60,
    level: 6,
    attack: 13,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Enchanter',
    nativeTerrain: 0,
    id: 137,
    townId: 0,
    minDamage: 14,
    maxDamage: 14,
    health: 30,
    level: 6,
    attack: 17,
    defense: 12,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Faerie Dragon',
    nativeTerrain: 0,
    id: 138,
    townId: 0,
    minDamage: 20,
    maxDamage: 30,
    health: 500,
    level: 7,
    attack: 20,
    defense: 20,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Rust Dragon',
    nativeTerrain: 0,
    id: 139,
    townId: 0,
    minDamage: 50,
    maxDamage: 50,
    health: 750,
    level: 7,
    attack: 30,
    defense: 30,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Crystal Dragon',
    nativeTerrain: 0,
    id: 140,
    townId: 0,
    minDamage: 60,
    maxDamage: 75,
    health: 800,
    level: 7,
    attack: 40,
    defense: 40,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Azure Dragon',
    nativeTerrain: 0,
    id: 141,
    townId: 0,
    minDamage: 70,
    maxDamage: 80,
    health: 1000,
    level: 7,
    attack: 50,
    defense: 50,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ballista',
    nativeTerrain: 0,
    id: 142,
    townId: 0,
    minDamage: 2,
    maxDamage: 3,
    health: 250,
    level: 5,
    attack: 10,
    defense: 10,
    hits: 1,
    ranged: true,
    hexs: 2,
    speed: 0,
    cost: 2500,
    shots: 24,
  },
  {
    name: 'Nymph',
    nativeTerrain: Terrains.Swamp,
    id: 143,
    townId: Towns.Cove,
    minDamage: 1,
    maxDamage: 2,
    health: 4,
    level: 1,
    attack: 5,
    defense: 2,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Oceanid',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 144,
    minDamage: 1,
    maxDamage: 3,
    health: 4,
    level: 1,
    attack: 6,
    defense: 2,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Crew Mate',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 145,
    minDamage: 2,
    maxDamage: 4,
    health: 15,
    level: 2,
    attack: 7,
    defense: 4,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Seaman',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 146,
    minDamage: 3,
    maxDamage: 4,
    health: 15,
    level: 2,
    attack: 8,
    defense: 6,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Pirate',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 147,
    minDamage: 3,
    maxDamage: 7,
    health: 15,
    level: 3,
    attack: 8,
    defense: 6,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Corsair',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 148,
    minDamage: 3,
    maxDamage: 7,
    health: 15,
    level: 3,
    attack: 10,
    defense: 8,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Sea Dog',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 149,
    minDamage: 3,
    maxDamage: 7,
    health: 15,
    level: 3,
    attack: 12,
    defense: 11,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Stormbird',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 150,
    minDamage: 6,
    maxDamage: 9,
    health: 30,
    level: 4,
    attack: 10,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Ayssid',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 151,
    minDamage: 6,
    maxDamage: 10,
    health: 30,
    level: 4,
    attack: 11,
    defense: 8,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Sea Witch',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 152,
    minDamage: 10,
    maxDamage: 14,
    health: 35,
    level: 5,
    attack: 12,
    defense: 7,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Sorceress',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 153,
    minDamage: 10,
    maxDamage: 16,
    health: 35,
    level: 5,
    attack: 12,
    defense: 9,
    hits: 1,
    ranged: true,
  },
  {
    name: 'Nix',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 154,
    minDamage: 18,
    maxDamage: 22,
    health: 80,
    level: 6,
    attack: 13,
    defense: 16,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Nix Warrior',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 155,
    minDamage: 18,
    maxDamage: 22,
    health: 90,
    level: 6,
    attack: 14,
    defense: 17,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Sea Serpent',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 156,
    minDamage: 30,
    maxDamage: 55,
    health: 180,
    level: 7,
    attack: 22,
    defense: 16,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Haspid',
    nativeTerrain: Terrains.Swamp,
    townId: Towns.Cove,
    id: 157,
    minDamage: 30,
    maxDamage: 55,
    health: 300,
    level: 7,
    attack: 29,
    defense: 20,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Fangarm',
    nativeTerrain: 0,
    id: 158,
    minDamage: 8,
    maxDamage: 12,
    health: 50,
    level: 5,
    attack: 12,
    defense: 12,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Satyr',
    nativeTerrain: 0,
    townId: 0,
    id: 159,
    minDamage: 6,
    maxDamage: 10,
    health: 35,
    level: 4,
    attack: 10,
    defense: 11,
    hits: 1,
    ranged: false,
  },
  {
    name: 'Leprechaun',
    aiValue: 208,
    attack: 8,
    townId: 0,
    cost: 100,
    defense: 5,
    fightValue: 208,
    growth: 9,
    health: 15,
    hits: 1,
    id: 160,
    level: 2,
    maxDamage: 5,
    minDamage: 3,
    nativeTerrain: 0,
    speed: 5,
  },
  {
    name: 'Cannon',
    nativeTerrain: 0,
    id: 161,
    townId: 0,
    minDamage: 4,
    maxDamage: 7,
    health: 250,
    level: 6,
    attack: 20,
    defense: 10,
    hits: 1,
    ranged: true,
    hexs: 2,
    speed: 0,
    cost: 4000,
    shots: 8,
  },
  {
    name: 'Steel Golem',
    nativeTerrain: 0,
    id: 162,
    townId: 0,
    minDamage: 6,
    maxDamage: 8,
    health: 45,
    level: 4,
    cost: 400,
    growth: 4,
    aiValue: 597,
    fightValue: 597,
    attack: 10,
    defense: 11,
    speed: 6,
    hits: 1,
  },
]
