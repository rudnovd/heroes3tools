import type { Spell } from '@/types'

const spells: Array<Spell> = [
  {
    key: 'MagicArrow',
    level: 1,
    name: 'Magic Arrow',
    element: {
      id: 'neutral',
      name: 'Neutral',
    },
  },
  {
    key: 'Visions',
    level: 1,
    name: 'Visions',
    element: {
      id: 'neutral',
      name: 'Neutral',
    },
  },
  {
    key: 'Bloodlust',
    level: 1,
    name: 'Bloodlust',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Curse',
    level: 1,
    name: 'Curse',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'ProtectionFromFire',
    level: 1,
    name: 'Protection From Fire',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Blind',
    level: 2,
    name: 'Blind',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    key: 'FireWall',
    level: 2,
    name: 'Fire wall',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Fireball',
    level: 3,
    name: 'Fireball',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'LandMine',
    level: 3,
    name: 'Land Mine',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Misfortune',
    level: 3,
    name: 'Misfortune',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Armageddon',
    level: 4,
    name: 'Armageddon',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Berserk',
    level: 4,
    name: 'Berserk',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    key: 'FireShield',
    level: 4,
    name: 'Fire Shield',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Frenzy',
    level: 4,
    name: 'Frenzy',
    element: {
      id: 'fire',
      name: 'Fire',
    },
    group: ['mind'],
  },
  {
    key: 'Inferno',
    level: 4,
    name: 'Inferno',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Slayer',
    level: 4,
    name: 'Slayer',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Sacrifice',
    level: 5,
    name: 'Sacrifice',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'SummonFireElemental',
    level: 5,
    name: 'Summon Fire Elemental',
    element: {
      id: 'fire',
      name: 'Fire',
    },
  },
  {
    key: 'Bless',
    level: 1,
    name: 'Bless',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Cure',
    level: 1,
    name: 'Cure',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Dispel',
    level: 1,
    name: 'Dispel',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'ProtectionFromWater',
    level: 1,
    name: 'Protection From Water',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'SummonBoat',
    level: 1,
    name: 'Summon Boat',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'IceBolt',
    level: 2,
    name: 'Ice Bolt',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'RemoveObstacle',
    level: 2,
    name: 'Remove Obstacle',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'ScuttleBoat',
    level: 2,
    name: 'Scuttle Boat',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Weakness',
    level: 2,
    name: 'Weakness',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Forgetfulness',
    level: 3,
    name: 'Forgetfulness',
    element: {
      id: 'water',
      name: 'Water',
    },
    group: ['mind'],
  },
  {
    key: 'FrostRing',
    level: 3,
    name: 'Frost Ring',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Mirth',
    level: 3,
    name: 'Mirth',
    element: {
      id: 'water',
      name: 'Water',
    },
    group: ['mind'],
  },
  {
    key: 'Teleport',
    level: 3,
    name: 'Teleport',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Clone',
    level: 4,
    name: 'Clone',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Prayer',
    level: 4,
    name: 'Prayer',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'WaterWalk',
    level: 4,
    name: 'Water Walk',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'SummonWaterElemental',
    level: 5,
    name: 'Summon Water Elemental',
    element: {
      id: 'water',
      name: 'Water',
    },
  },
  {
    key: 'Shield',
    level: 1,
    name: 'Shield',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Slow',
    level: 1,
    name: 'Slow',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'StoneSkin',
    level: 1,
    name: 'Stone Skin',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'ViewEarth',
    level: 1,
    name: 'View Earth',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'DeathRipple',
    level: 2,
    name: 'Death Ripple',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Quicksand',
    level: 2,
    name: 'Quicksand',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'AnimateDead',
    level: 3,
    name: 'Animate Dead',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'AntiMagic',
    level: 3,
    name: 'Anti-Magic',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Earthquake',
    level: 3,
    name: 'Earthquake',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'ForceField',
    level: 3,
    name: 'Force Field',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'ProtectionFromEarth',
    level: 3,
    name: 'Protection From Earth',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'MeteorShower',
    level: 4,
    name: 'Meteor Shower',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Resurrection',
    level: 4,
    name: 'Resurrection',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Sorrow',
    level: 4,
    name: 'Sorrow',
    element: {
      id: 'earth',
      name: 'Earth',
    },
    group: ['mind'],
  },
  {
    key: 'TownPortal',
    level: 4,
    name: 'Town Portal',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Implosion',
    level: 5,
    name: 'Implosion',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'SummonEarthElemental',
    level: 5,
    name: 'Summon Earth Elemental',
    element: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    key: 'Haste',
    level: 1,
    name: 'Haste',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'ViewAir',
    level: 1,
    name: 'View Air',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Disguise',
    level: 2,
    name: 'Disguise',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'DisruptingRay',
    level: 2,
    name: 'Disrupting Ray',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Fortune',
    level: 2,
    name: 'Fortune',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'LightningBolt',
    level: 2,
    name: 'Lightning Bolt',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Precision',
    level: 2,
    name: 'Precision',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'ProtectionFromAir',
    level: 2,
    name: 'Protection From Air',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'AirShield',
    level: 3,
    name: 'Air Shield',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'DestroyUndead',
    level: 3,
    name: 'Destroy Undead',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Hypnotize',
    level: 3,
    name: 'Hypnotize',
    element: {
      id: 'air',
      name: 'Air',
    },
    group: ['mind'],
  },
  {
    key: 'ChainLightning',
    level: 4,
    name: 'Chain Lightning',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Counterstrike',
    level: 4,
    name: 'Counterstrike',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'DimensionDoor',
    level: 5,
    name: 'Dimension Door',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'Fly',
    level: 5,
    name: 'Fly',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'MagicMirror',
    level: 5,
    name: 'Magic Mirror',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'SummonAirElemental',
    level: 5,
    name: 'Summon Air Elemental',
    element: {
      id: 'air',
      name: 'Air',
    },
  },
  {
    key: 'TitansLightningBolt',
    level: 4,
    name: 'Titans Lightning Bolt',
    element: {
      id: 'neutral',
      name: 'neutral',
    },
  },
]

export default spells
