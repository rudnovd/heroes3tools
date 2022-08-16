import type { Spell } from '@/models/Spell'

export const spells: Array<Spell> = [
  {
    id: 1,
    level: 1,
    name: 'Magic Arrow',
    element: {
      id: 'neutral',
      name: 'Neutral',
    },
  },
  {
    id: 2,
    level: 1,
    name: 'Visions',
    element: {
      id: 'neutral',
      name: 'Neutral',
    },
  },
  {
    id: 3,
    level: 1,
    name: 'Bloodlust',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 4,
    level: 1,
    name: 'Curse',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 5,
    level: 1,
    name: 'Protection From Fire',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 6,
    level: 2,
    name: 'Blind',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    id: 7,
    level: 2,
    name: 'Fire wall',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 8,
    level: 3,
    name: 'Fireball',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 9,
    level: 3,
    name: 'Land Mine',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 10,
    level: 3,
    name: 'Misfortune',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 11,
    level: 4,
    name: 'Armageddon',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 12,
    level: 4,
    name: 'Berserk',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    id: 13,
    level: 4,
    name: 'Fire Shield',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 14,
    level: 4,
    name: 'Frenzy',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    id: 15,
    level: 4,
    name: 'Inferno',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 16,
    level: 4,
    name: 'Slayer',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 17,
    level: 5,
    name: 'Sacrifice',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 18,
    level: 5,
    name: 'Summon Fire Elemental',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    id: 19,
    level: 1,
    name: 'Bless',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 20,
    level: 1,
    name: 'Cure',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 21,
    level: 1,
    name: 'Dispel',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 22,
    level: 1,
    name: 'Protection From Water',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 23,
    level: 1,
    name: 'Summon Boat',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 24,
    level: 2,
    name: 'Ice Bolt',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 25,
    level: 2,
    name: 'Remove Obstacle',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 26,
    level: 2,
    name: 'Scuttle Boat',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 27,
    level: 2,
    name: 'Weakness',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 28,
    level: 3,
    name: 'Forgetfulness',
    element: {
      id: 'water',
      name: 'Water',
    },
    group: ['mind'],
  },
  {
    id: 29,
    level: 3,
    name: 'Frost Ring',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 30,
    level: 3,
    name: 'Mirth',
    element: {
      id: 'water',
      name: 'Water',
    },
    group: ['mind'],
  },
  {
    id: 31,
    level: 3,
    name: 'Teleport',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 32,
    level: 4,
    name: 'Clone',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 33,
    level: 4,
    name: 'Prayer',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 34,
    level: 4,
    name: 'Water Walk',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 35,
    level: 5,
    name: 'Summon Water Elemental',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    id: 36,
    level: 1,
    name: 'Shield',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 37,
    level: 1,
    name: 'Slow',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 38,
    level: 1,
    name: 'Stone Skin',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 39,
    level: 1,
    name: 'View Earth',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 40,
    level: 2,
    name: 'Death Ripple',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 41,
    level: 2,
    name: 'Quicksand',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 42,
    level: 3,
    name: 'Animate Dead',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 43,
    level: 3,
    name: 'Anti-Magic',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 44,
    level: 3,
    name: 'Earthquake',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 45,
    level: 3,
    name: 'Force Field',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 46,
    level: 3,
    name: 'Protection From Earth',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 47,
    level: 4,
    name: 'Meteor Shower',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 48,
    level: 4,
    name: 'Resurrection',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 49,
    level: 4,
    name: 'Sorrow',
    element: {
      id: 'earth',
      name: 'Earth',
    },
    group: ['mind'],
  },
  {
    id: 50,
    level: 4,
    name: 'Town Portal',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 51,
    level: 5,
    name: 'Implosion',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 52,
    level: 5,
    name: 'Summon Earth Elemental',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 53,
    level: 1,
    name: 'Haste',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 54,
    level: 1,
    name: 'View Air',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 55,
    level: 2,
    name: 'Disguise',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 56,
    level: 2,
    name: 'Disrupting Ray',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 57,
    level: 2,
    name: 'Fortune',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 58,
    level: 2,
    name: 'Lightning Bolt',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 59,
    level: 2,
    name: 'Precision',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 60,
    level: 2,
    name: 'Protection From Air',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 61,
    level: 3,
    name: 'Air Shield',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 62,
    level: 3,
    name: 'Destroy Undead',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 63,
    level: 3,
    name: 'Hypnotize',
    element: {
      id: 'air',
      name: 'Air',
    },
    group: ['mind'],
  },
  {
    id: 64,
    level: 4,
    name: 'Chain Lightning',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 65,
    level: 4,
    name: 'Counterstrike',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 66,
    level: 5,
    name: 'Dimension Door',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 67,
    level: 5,
    name: 'Fly',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 68,
    level: 5,
    name: 'Magic Mirror',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 69,
    level: 5,
    name: 'Summon Air Elemental',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    id: 70,
    level: 4,
    name: 'Titans Lightning Bolt',
    element: {
      id: 'neutral',
      name: 'neutral',
    },
  },
]
