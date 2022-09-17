import type { Artifact } from '@/types'

const artifacts: Array<Artifact> = [
  {
    key: 'AdmiralsHat',
    name: 'Admirals Hat',
    slot: 'Combo',
    class: 'Relic',
    cost: 25000,
  },
  {
    key: 'AmbassadorsSash',
    name: 'Ambassadors Sash',
    slot: 'Cape',
    class: 'Major',
    cost: 5000,
    effect: {
      reduceSurrenderingCost: 0.1,
    },
  },
  {
    key: 'AmuletOfTheUndertaker',
    name: 'Amulet of the Undertaker',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 2000,
    effect: {
      skillBonus: {
        necromancy: 0.025,
      },
    },
  },
  {
    key: 'AngelFeatherArrows',
    name: 'Angel Feather Arrows',
    slot: 'Misc',
    class: 'Major',
    cost: 6000,
    effect: {
      skillBonus: {
        archery: 0.15,
      },
    },
  },
  {
    key: 'AngelWings',
    name: 'Angel Wings',
    slot: 'Cape',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'AngelicAlliance',
    name: 'Angelic Alliance',
    slot: 'Combo',
    class: 'Relic',
    cost: 84000,
    effect: {
      statsChanging: {
        attack: 21,
        defense: 21,
        power: 21,
        knowledge: 21,
      },
    },
  },
  {
    key: 'ArmageddonsBlade',
    name: 'Armageddons Blade',
    slot: 'Weapon',
    class: 'Relic',
    cost: 50000,
    effect: {
      statsChanging: {
        attack: 3,
        defense: 6,
        power: 3,
        knowledge: 6,
      },
    },
  },
  {
    key: 'ArmorOfTheDamned',
    name: 'Armor of the Damned',
    slot: 'Combo',
    class: 'Relic',
    cost: 12000,
    effect: {
      statsChanging: {
        attack: 3,
        defense: 3,
        power: 2,
        knowledge: 2,
      },
    },
  },
  {
    key: 'ArmorOfWonder',
    name: 'Armor of Wonder',
    slot: 'Torso',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        attack: 1,
        defense: 1,
        power: 1,
        knowledge: 1,
      },
    },
  },
  {
    key: 'ArmsOfLegion',
    name: 'Arms of Legion',
    slot: 'Misc',
    class: 'Major',
    cost: 5000,
  },
  {
    key: 'BadgeOfCourage',
    name: 'Badge of Courage',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      moraleBonus: 1,
    },
  },
  {
    key: 'BirdOfPerception',
    name: 'Bird of Perception',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      skillBonus: {
        eagleEye: 0.05,
      },
    },
  },
  {
    key: 'BlackshardOfTheDeadKnight',
    name: 'Blackshard of the Dead Knight',
    slot: 'Weapon',
    class: 'Minor',
    cost: 3000,
    effect: {
      statsChanging: {
        attack: 3,
      },
    },
  },
  {
    key: 'BootsOfLevitation',
    name: 'Boots of Levitation',
    slot: 'Feet',
    class: 'Relic',
    cost: 10000,
  },
  {
    key: 'BootsOfPolarity',
    name: 'Boots of Polarity',
    slot: 'Feet',
    class: 'Relic',
    cost: 6000,
    effect: {
      magicResistanceBonus: 0.15,
    },
  },
  {
    key: 'BootsOfSpeed',
    name: 'Boots of Speed',
    slot: 'Feet',
    class: 'Minor',
    cost: 6000,
  },
  {
    key: 'BowOfElvenCherrywood',
    name: 'Bow of Elven Cherrywood',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
    effect: {
      skillBonus: {
        archery: 0.05,
      },
    },
  },
  {
    key: 'BowOfTheSharpshooter',
    name: 'Bow of the Sharpshooter',
    slot: 'Combo',
    class: 'Relic',
    cost: 12000,
    effect: {
      skillBonus: {
        archery: 0.3,
      },
    },
  },
  {
    key: 'BowstringOfTheUnicornsMane',
    name: 'Bowstring of the Unicorns Mane',
    slot: 'Misc',
    class: 'Minor',
    cost: 4000,
    effect: {
      skillBonus: {
        archery: 0.1,
      },
    },
  },
  {
    key: 'BreastplateOfBrimstone',
    name: 'Breastplate of Brimstone',
    slot: 'Torso',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        power: 5,
      },
    },
  },
  {
    key: 'BreastplateOfPetrifiedWood',
    name: 'Breastplate of Petrified Wood',
    slot: 'Torso',
    class: 'Treasure',
    cost: 1000,
    effect: {
      statsChanging: {
        power: 1,
      },
    },
  },
  {
    key: 'BucklerOfTheGnollKing',
    name: 'Buckler of the Gnoll King',
    slot: 'Shield',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        defense: 4,
      },
    },
  },
  {
    key: 'CapeOfConjuring',
    name: 'Cape of Conjuring',
    slot: 'Cape',
    class: 'Treasure',
    cost: 1500,
    // effect: {

    // }
  },
  {
    key: 'CapeOfSilence',
    name: 'Cape of Silence',
    slot: 'Cape',
    class: 'Major',
    cost: 7500,
  },
  {
    key: 'CapeOfVelocity',
    name: 'CapeOfVelocity',
    slot: 'Cape',
    class: 'Major',
    cost: 10000,
    effect: {
      сreaturesSpeedBonus: 2,
    },
  },
  {
    key: 'CardsOfProphecy',
    name: 'Cards of Prophecy',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      luckBonus: 1,
    },
  },
  {
    key: 'CelestialNecklaceOfBliss',
    name: 'Celestial Necklace of Bliss',
    slot: 'Necklace',
    class: 'Relic',
    cost: 12000,
    effect: {
      statsChanging: {
        attack: 3,
        defense: 3,
        power: 3,
        knowledge: 3,
      },
    },
  },
  {
    key: 'CentaursAxe',
    name: 'Centaurs Axe',
    slot: 'Weapon',
    class: 'Treasure',
    cost: 2000,
    effect: {
      statsChanging: {
        attack: 2,
      },
    },
  },
  {
    key: 'CharmOfEclipse',
    name: 'Charm Of Eclipse',
    slot: 'Misc',
    class: 'Minor',
    cost: 5000,
    effect: {
      enemyPenalty: {
        spellPower: -0.1,
      },
    },
  },
  {
    key: 'CharmOfMana',
    name: 'Charm of Mana',
    slot: 'Misc',
    class: 'Treasure',
    cost: 500,
  },
  {
    key: 'CloakOfTheUndeadKing',
    name: 'Cloak of the Undead King',
    slot: 'Combo',
    class: 'Relic',
    cost: 12000,
  },
  {
    key: 'CloverOfFortune',
    name: 'Clover of Fortune',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      luckBonus: 1,
    },
  },
  {
    key: 'CollarOfConjuring',
    name: 'Collar of Conjuring',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 500,
  },
  {
    key: 'Cornucopia',
    name: 'Cornucopia',
    slot: 'Combo',
    class: 'Relic',
    cost: 20000,
    effect: {
      resourceBonus: {
        crystal: 5,
        gem: 5,
        mercury: 5,
        sulfur: 5,
      },
    },
  },
  {
    key: 'CrestOfValor',
    name: 'Crest of Valor',
    slot: 'Misc',
    class: 'Relic',
    cost: 8000,
    effect: {
      moraleBonus: 1,
    },
  },
  {
    key: 'CrownOfDragontooth',
    name: 'Crown of Dragontooth',
    slot: 'Helm',
    class: 'Major',
    cost: 7000,
    effect: {
      statsChanging: {
        power: 4,
        knowledge: 4,
      },
    },
  },
  {
    key: 'CrownOfTheFiveSeas',
    name: 'Crown of the Five Seas',
    slot: 'Helm',
    class: 'Major',
    cost: 7000,
    effect: {
      statsChanging: {
        knowledge: 6,
      },
    },
  },
  {
    key: 'CrownOfTheSupremeMagi',
    name: 'Crown of the Supreme Magi',
    slot: 'Helm',
    class: 'Minor',
    cost: 5000,
    effect: {
      statsChanging: {
        knowledge: 4,
      },
    },
  },
  {
    key: 'DeadMansBoots',
    name: 'Dead Mans Boots',
    slot: 'Feet',
    class: 'Major',
    cost: 6000,
    effect: {
      skillBonus: {
        necromancy: 0.075,
      },
    },
  },
  {
    key: 'DemonsHorseshoe',
    name: 'Demons Horseshoe',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
    effect: {
      enemyPenalty: {
        luck: -1,
      },
    },
  },
  {
    key: 'DiplomatsCloak',
    name: 'Diplomats Cloak',
    slot: 'Combo',
    class: 'Relic',
    cost: 15000,
    effect: {
      reduceSurrenderingCost: 0.3,
    },
  },
  {
    key: 'DiplomatsRing',
    name: 'Diplomats Ring',
    slot: 'Ring',
    class: 'Major',
    cost: 5000,
    effect: {
      reduceSurrenderingCost: 0.1,
    },
  },
  {
    key: 'DragonScaleArmor',
    name: 'Dragon Scale Armor',
    slot: 'Torso',
    class: 'Relic',
    cost: 8000,
    effect: {
      statsChanging: {
        attack: 4,
        defense: 4,
      },
    },
  },
  {
    key: 'DragonScaleShield',
    name: 'Dragon Scale Shield',
    slot: 'Shield',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        attack: 3,
        defense: 3,
      },
    },
  },
  {
    key: 'DragonWingTabard',
    name: 'Dragon Wing Tabard',
    slot: 'Cape',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        power: 2,
        knowledge: 2,
      },
    },
  },
  {
    key: 'DragonboneGreaves',
    name: 'Dragonbone Greaves',
    slot: 'Feet',
    class: 'Treasure',
    cost: 2000,
    effect: {
      statsChanging: {
        knowledge: 1,
        power: 1,
      },
    },
  },
  {
    key: 'ElixirOfLife',
    name: 'Elixir of Life',
    slot: 'Combo',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'EmblemOfCognizance',
    name: 'Emblem of Cognizance',
    slot: 'Misc',
    class: 'Minor',
    cost: 3000,
    effect: {
      skillBonus: {
        eagleEye: 0.15,
      },
    },
  },
  {
    key: 'EndlessBagOfGold',
    name: 'Endless Bag of Gold',
    slot: 'Misc',
    class: 'Major',
    cost: 7500,
    effect: {
      resourceBonus: {
        gold: 750,
      },
    },
  },
  {
    key: 'EndlessPurseOfGold',
    name: 'Endless Purse of Gold',
    slot: 'Misc',
    class: 'Major',
    cost: 5000,
    effect: {
      resourceBonus: {
        gold: 500,
      },
    },
  },
  {
    key: 'EndlessSackOfGold',
    name: 'Endless Sack of Gold',
    slot: 'Misc',
    class: 'Relic',
    cost: 10000,
    effect: {
      resourceBonus: {
        gold: 1000,
      },
    },
  },
  {
    key: 'EquestriansGloves',
    name: 'Equestrians Gloves',
    slot: 'Ring',
    class: 'Minor',
    cost: 3000,
  },
  {
    key: 'EverflowingCrystalCloak',
    name: 'Everflowing Crystal Cloak',
    slot: 'Cape',
    class: 'Major',
    cost: 5000,
    effect: {
      resourceBonus: {
        crystal: 1,
      },
    },
  },
  {
    key: 'EverpouringVialOfMercury',
    name: 'Everpouring Vial of Mercury',
    slot: 'Misc',
    class: 'Major',
    cost: 5000,
    effect: {
      resourceBonus: {
        mercury: 1,
      },
    },
  },
  {
    key: 'EversmokingRingOfSulfur',
    name: 'Eversmoking Ring of Sulfur',
    slot: 'Ring',
    class: 'Major',
    cost: 5000,
    effect: {
      resourceBonus: {
        sulfur: 1,
      },
    },
  },
  {
    key: 'GarnitureOfInterference',
    name: 'Garniture of Interference',
    slot: 'Necklace',
    class: 'Major',
    cost: 2000,
    effect: {
      magicResistanceBonus: 0.05,
    },
  },
  {
    key: 'GlyphOfGallantry',
    name: 'Glyph of Gallantry',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      moraleBonus: 1,
    },
  },
  {
    key: 'GoldenBow',
    name: 'Golden Bow',
    slot: 'Misc',
    class: 'Major',
    cost: 8000,
  },
  {
    key: 'GoldenGoose',
    name: 'Golden Goose',
    slot: 'Combo',
    class: 'Relic',
    cost: 22500,
    effect: {
      resourceBonus: {
        gold: 7000,
      },
    },
  },
  {
    key: 'GreaterGnollsFlail',
    name: 'Greater Gnolls Flail',
    slot: 'Weapon',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        attack: 4,
      },
    },
  },
  {
    key: 'HeadOfLegion',
    name: 'Head of Legion',
    slot: 'Misc',
    class: 'Major',
    cost: 5000,
  },
  {
    key: 'HellstormHelmet',
    name: 'Hellstorm Helmet',
    slot: 'Helm',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        knowledge: 5,
      },
    },
  },
  {
    key: 'HelmOfChaos',
    name: 'Helm Of Chaos',
    slot: 'Helm',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        knowledge: 3,
      },
    },
  },
  {
    key: 'HelmOfHeavenlyEnlightenment',
    name: 'Helm of Heavenly Enlightenment',
    slot: 'Helm',
    class: 'Relic',
    cost: 24000,
    effect: {
      statsChanging: {
        attack: 6,
        defense: 6,
        power: 6,
        knowledge: 6,
      },
    },
  },
  {
    key: 'HelmOfTheAlabasterUnicorn',
    name: 'Helm of the Alabaster Unicorn',
    slot: 'Helm',
    class: 'Treasure',
    cost: 1000,
    effect: {
      statsChanging: {
        knowledge: 1,
      },
    },
  },
  {
    key: 'HideousMask',
    name: 'Hideous Mask',
    slot: 'Misc',
    class: 'Minor',
    cost: 4000,
    effect: {
      enemyPenalty: {
        morale: -1,
      },
    },
  },
  {
    key: 'HornOfTheAbyss',
    name: 'Horn of the Abyss',
    slot: 'Misc',
    class: 'Relic',
    cost: 50000,
  },
  {
    key: 'HourglassOfTheEvilHour',
    name: 'Hourglass of the Evil Hour',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
  },
  {
    key: 'InexhaustibleCartOfLumber',
    name: 'Inexhaustible Cart of Lumber',
    slot: 'Misc',
    class: 'Minor',
    cost: 5000,
    effect: {
      resourceBonus: {
        wood: 1,
      },
    },
  },
  {
    key: 'InexhaustibleCartOfOre',
    name: 'Inexhaustible Cart of Ore',
    slot: 'Misc',
    class: 'Minor',
    cost: 5000,
    effect: {
      resourceBonus: {
        ore: 1,
      },
    },
  },
  {
    key: 'IronfistOfTheOgre',
    name: 'Ironfist of the Ogre',
    slot: 'Combo',
    class: 'Relic',
    cost: 20000,
    effect: {},
  },
  {
    key: 'LadybirdOfLuck',
    name: 'Ladybird of Luck',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
    effect: {
      luckBonus: 1,
    },
  },
  {
    key: 'LegsOfLegion',
    name: 'Legs of Legion',
    slot: 'Misc',
    class: 'Treasure',
    cost: 5000,
  },
  {
    key: 'LionsShieldOfCourage',
    name: 'Lions Shield of Courage',
    slot: 'Shield',
    class: 'Relic',
    cost: 16000,
    effect: {
      statsChanging: {
        attack: 4,
        defense: 4,
        power: 4,
        knowledge: 4,
      },
    },
  },
  {
    key: 'LoinsOfLegion',
    name: 'Loins of Legion',
    slot: 'Misc',
    class: 'Minor',
    cost: 5000,
  },
  {
    key: 'MysticOrbOfMana',
    name: 'Mystic Orb of Mana',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1500,
  },
  {
    key: 'NecklaceOfDragonteeth',
    name: 'Necklace of Dragonteeth',
    slot: 'Necklace',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        power: 3,
        knowledge: 3,
      },
    },
  },
  {
    key: 'NecklaceOfOceanGuidance',
    name: 'Necklace of Ocean Guidance',
    slot: 'Necklace',
    class: 'Major',
    cost: 10000,
  },
  {
    key: 'NecklaceOfSwiftness',
    name: 'Necklace of Swiftness',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 5000,
    effect: {
      сreaturesSpeedBonus: 1,
    },
  },
  {
    key: 'OgresClubOfHavoc',
    name: 'Ogres Club of Havoc',
    slot: 'Weapon',
    class: 'Major',
    cost: 5000,
    effect: {
      statsChanging: {
        attack: 5,
      },
    },
  },
  {
    key: 'OrbOfDrivingRain',
    name: 'Orb of Driving Rain',
    slot: 'Misc',
    class: 'Major',
    cost: 6000,
    effect: {
      spellsDamageBonus: {
        school: 'Water',
      },
    },
  },
  {
    key: 'OrbOfInhibition',
    name: 'Orb of Inhibition',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'OrbOfSilt',
    name: 'Orb of Silt',
    slot: 'Misc',
    class: 'Major',
    cost: 6000,
  },
  {
    key: 'OrbOfTempestuousFire',
    name: 'Orb of Tempestuous Fire',
    slot: 'Misc',
    class: 'Major',
    cost: 6000,
  },
  {
    key: 'OrbOfTheFirmament',
    name: 'Orb of the Firmament',
    slot: 'Misc',
    class: 'Major',
    cost: 6000,
  },
  {
    key: 'OrbOfVulnerability',
    name: 'Orb of Vulnerability',
    slot: 'Misc',
    class: 'Relic',
    cost: 25000,
  },
  {
    key: 'PendantOfCourage',
    name: 'Pendant of Courage',
    slot: 'Necklace',
    class: 'Major',
    cost: 7000,
    effect: {
      luckBonus: 3,
      moraleBonus: 3,
    },
  },
  {
    key: 'PendantOfDeath',
    name: 'Pendant of Death',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 2500,
    effect: {
      immuneToSpells: ['DestroyUndead'],
    },
  },
  {
    key: 'PendantOfDispassion',
    name: 'Pendant of Dispassion',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 1000,
    effect: {
      immuneToSpells: ['Berserk'],
    },
  },
  {
    key: 'PendantOfDownfall',
    name: 'Pendant of Downfall',
    slot: 'Necklace',
    class: 'Major',
    cost: 7000,
    effect: {
      enemyPenalty: {
        morale: -2,
      },
    },
  },
  {
    key: 'PendantOfFreeWill',
    name: 'Pendant of Free Will',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 1000,
    effect: {
      immuneToSpells: ['Hypnotize'],
    },
  },
  {
    key: 'PendantOfHoliness',
    name: 'Pendant of Holiness',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 5000,
    effect: {
      immuneToSpells: ['Curse'],
    },
  },
  {
    key: 'PendantOfLife',
    name: 'Pendant of Life',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 2500,
    effect: {
      immuneToSpells: ['DeathRipple'],
    },
  },
  {
    key: 'PendantOfNegativity',
    name: 'Pendant of Negativity',
    slot: 'Necklace',
    class: 'Major',
    cost: 5000,
    effect: {
      immuneToSpells: ['LightningBolt', 'ChainLightning'],
    },
  },
  {
    key: 'PendantOfReflection',
    name: 'Pendant of Reflection',
    slot: 'Combo',
    class: 'Relic',
    cost: 12000,
    effect: {
      magicResistanceBonus: 0.5,
    },
  },
  {
    key: 'PendantOfSecondSight',
    name: 'Pendant of Second Sight',
    slot: 'Necklace',
    class: 'Major',
    cost: 5000,
    effect: {
      immuneToSpells: ['Blind'],
    },
  },
  {
    key: 'PendantOfTotalRecall',
    name: 'Pendant of Total Recall',
    slot: 'Necklace',
    class: 'Treasure',
    cost: 3000,
    effect: {
      immuneToSpells: ['Forgetfulness'],
    },
  },
  {
    key: 'PlateOfDyingLight',
    name: 'Plate of Dying Light',
    slot: 'Torso',
    class: 'Relic',
    cost: 10000,
    effect: {
      enemyPenalty: {
        spellPower: -0.25,
      },
    },
  },
  {
    key: 'PowerOfTheDragonFather',
    name: 'Power of the Dragon Father',
    slot: 'Combo',
    class: 'Relic',
    cost: 42000,
    effect: {
      statsChanging: {
        attack: 16,
        defense: 16,
        power: 16,
        knowledge: 16,
      },
      luckBonus: 1,
      moraleBonus: 1,
    },
  },
  {
    key: 'QuietEyeOfTheDragon',
    name: 'Quiet Eye of the Dragon',
    slot: 'Ring',
    class: 'Treasure',
    cost: 2000,
    effect: {
      statsChanging: {
        attack: 1,
        defense: 1,
      },
    },
  },
  {
    key: 'RecantersCloak',
    name: 'Recanters Cloak',
    slot: 'Cape',
    class: 'Major',
    cost: 8000,
  },
  {
    key: 'RedDragonFlameTongue',
    name: 'Red Dragon Flame Tongue',
    slot: 'Weapon',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        attack: 2,
        defense: 2,
      },
    },
  },
  {
    key: 'RibCage',
    name: 'Rib Cage',
    slot: 'Torso',
    class: 'Minor',
    cost: 3000,
    effect: {
      statsChanging: {
        power: 2,
      },
    },
  },
  {
    key: 'RingOfConjuring',
    name: 'Ring of Conjuring',
    slot: 'Ring',
    class: 'Treasure',
    cost: 1000,
  },
  {
    key: 'RingOfInfiniteGems',
    name: 'Ring of Infinite Gems',
    slot: 'Ring',
    class: 'Major',
    cost: 5000,
    effect: {
      resourceBonus: {
        gem: 1,
      },
    },
  },
  {
    key: 'RingOfLife',
    name: 'Ring of Life',
    slot: 'Ring',
    class: 'Minor',
    cost: 5000,
    effect: {
      creaturesHealthBonus: 1,
    },
  },
  {
    key: 'RingOfOblivion',
    name: 'Ring of Oblivion',
    slot: 'Ring',
    class: 'Major',
    cost: 7500,
  },
  {
    key: 'RingOfSuppression',
    name: 'Ring of Suppression',
    slot: 'Ring',
    class: 'Treasure',
    cost: 4000,
    effect: {
      enemyPenalty: {
        morale: -1,
      },
    },
  },
  {
    key: 'RingOfTheMagi',
    name: 'Ring of the Magi',
    slot: 'Combo',
    class: 'Relic',
    cost: 3000,
  },
  {
    key: 'RingOfTheWayfarer',
    name: 'Ring of the Wayfarer',
    slot: 'Ring',
    class: 'Major',
    cost: 5000,
    effect: {
      сreaturesSpeedBonus: 1,
    },
  },
  {
    key: 'RingOfVitality',
    name: 'Ring of Vitality',
    slot: 'Ring',
    class: 'Treasure',
    cost: 5000,
    effect: {
      creaturesHealthBonus: 1,
    },
  },
  {
    key: 'RoyalArmorOfNix',
    name: 'Royal Armor of Nix',
    slot: 'Torso',
    class: 'Major',
    cost: 7000,
    effect: {
      statsChanging: {
        power: 6,
      },
    },
  },
  {
    key: 'RunesOfImminency',
    name: 'Runes of Imminency',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
    effect: {
      enemyPenalty: {
        luck: -1,
      },
    },
  },
  {
    key: 'SandalsOfTheSaint',
    name: 'Sandals of the Saint',
    slot: 'Feet',
    class: 'Relic',
    cost: 8000,
    effect: {
      statsChanging: {
        attack: 2,
        defense: 2,
        power: 2,
        knowledge: 2,
      },
    },
  },
  {
    key: 'ScalesOfTheGreaterBasilisk',
    name: 'Scales of the Greater Basilisk',
    slot: 'Torso',
    class: 'Minor',
    cost: 4000,
    effect: {
      statsChanging: {
        power: 3,
      },
    },
  },
  {
    key: 'SeaCaptainsHat',
    name: 'Sea Captains Hat',
    slot: 'Helm',
    class: 'Relic',
    cost: 15000,
  },
  {
    key: 'SealOfSunset',
    name: 'Seal of Sunset',
    slot: 'Ring',
    class: 'Minor',
    cost: 5000,
    effect: {
      enemyPenalty: {
        spellPower: -0.1,
      },
    },
  },
  {
    key: 'SentinelsShield',
    name: 'Sentinels Shield',
    slot: 'Shield',
    class: 'Relic',
    cost: 10000,
    effect: {
      statsChanging: {
        defense: 12,
        attack: -3,
      },
    },
  },
  {
    key: 'ShacklesOfWar',
    name: 'Shackles of War',
    slot: 'Misc',
    class: 'Major',
    cost: 5000,
  },
  {
    key: 'ShamansPuppet',
    name: 'Shamans Puppet',
    slot: 'Misc',
    class: 'Minor',
    cost: 4000,
    effect: {
      enemyPenalty: {
        luck: -2,
      },
    },
  },
  {
    key: 'ShieldOfNavalGlory',
    name: 'Shield of Naval Glory',
    slot: 'Shield',
    class: 'Major',
    cost: 7000,
    effect: {
      statsChanging: {
        defense: 7,
      },
    },
  },
  {
    key: 'ShieldOfTheDamned',
    name: 'Shield of the Damned',
    slot: 'Shield',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        defense: 6,
      },
    },
  },
  {
    key: 'ShieldOfTheDwarvenLords',
    name: 'Shield of the Dwarven Lords',
    slot: 'Shield',
    class: 'Treasure',
    cost: 2000,
    effect: {
      statsChanging: {
        defense: 2,
      },
    },
  },
  {
    key: 'ShieldOfTheYawningDead',
    name: 'Shield of the Yawning Dead',
    slot: 'Shield',
    class: 'Minor',
    cost: 3000,
    effect: {
      statsChanging: {
        defense: 3,
      },
    },
  },
  {
    key: 'SkullHelmet',
    name: 'Skull Helmet',
    slot: 'Helm',
    class: 'Treasure',
    cost: 3000,
    effect: {
      statsChanging: {
        knowledge: 2,
      },
    },
  },
  {
    key: 'Speculum',
    name: 'Speculum',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
  },
  {
    key: 'SpellbindersHat',
    name: 'Spellbinders Hat',
    slot: 'Helm',
    class: 'Relic',
    cost: 30000,
  },
  {
    key: 'SphereOfPermanence',
    name: 'Sphere of Permanence',
    slot: 'Misc',
    class: 'Major',
    cost: 7500,
    effect: {
      immuneToSpells: ['Dispel'],
    },
  },
  {
    key: 'SpiritOfOppression',
    name: 'Spirit of Oppression',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
  },
  {
    key: 'Spyglass',
    name: 'Spyglass',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
  },
  {
    key: 'StatesmansMedal',
    name: 'Statesmans Medal',
    slot: 'Necklace',
    class: 'Major',
    cost: 5000,
    effect: {
      reduceSurrenderingCost: 0.1,
    },
  },
  {
    key: 'StatueOfLegion',
    name: 'Statue of Legion',
    slot: 'Combo',
    class: 'Relic',
    cost: 25000,
  },
  {
    key: 'StillEyeOfTheDragon',
    name: 'Still Eye of the Dragon',
    slot: 'Ring',
    class: 'Treasure',
    cost: 2000,
    effect: {
      moraleBonus: 1,
      luckBonus: 1,
    },
  },
  {
    key: 'StoicWatchman',
    name: 'Stoic Watchman',
    slot: 'Misc',
    class: 'Treasure',
    cost: 2000,
    effect: {
      skillBonus: {
        eagleEye: 0.1,
      },
    },
  },
  {
    key: 'SurcoatOfCounterpoise',
    name: 'Surcoat of Counterpoise',
    slot: 'Cape',
    class: 'Major',
    cost: 4000,
    effect: {
      magicResistanceBonus: 0.1,
    },
  },
  {
    key: 'SwordOfHellfire',
    name: 'Sword of Hellfire',
    slot: 'Weapon',
    class: 'Major',
    cost: 6000,
    effect: {
      statsChanging: {
        attack: 6,
      },
    },
  },
  {
    key: 'SwordOfJudgement',
    name: 'Sword of Judgement',
    slot: 'Weapon',
    class: 'Relic',
    cost: 20000,
    effect: {
      statsChanging: {
        attack: 5,
        defense: 5,
        power: 5,
        knowledge: 5,
      },
    },
  },
  {
    key: 'TalismanOfMana',
    name: 'Talisman of Mana',
    slot: 'Misc',
    class: 'Treasure',
    cost: 1000,
  },
  {
    key: 'TargOfTheRampagingOgre',
    name: 'Targ of the Rampaging Ogre',
    slot: 'Shield',
    class: 'Major',
    cost: 5000,
    effect: {
      statsChanging: {
        defense: 5,
      },
    },
  },
  {
    key: 'ThunderHelmet',
    name: 'Thunder Helmet',
    slot: 'Helm',
    class: 'Relic',
    cost: 10000,
    effect: {
      statsChanging: {
        knowledge: 10,
        power: -2,
      },
    },
  },
  {
    key: 'TitansCuirass',
    name: 'Titans Cuirass',
    slot: 'Torso',
    class: 'Relic',
    cost: 10000,
    effect: {
      statsChanging: {
        power: 10,
        knowledge: -2,
      },
    },
  },
  {
    key: 'TitansGladius',
    name: 'Titans Gladius',
    slot: 'Weapon',
    class: 'Relic',
    cost: 10000,
    effect: {
      statsChanging: {
        attack: 12,
        defense: -3,
      },
    },
  },
  {
    key: 'TitansThunder',
    name: 'Titans Thunder',
    slot: 'Combo',
    class: 'Relic',
    cost: 40000,
    effect: {
      statsChanging: {
        attack: 9,
        defense: 9,
        power: 8,
        knowledge: 8,
      },
    },
  },
  {
    key: 'TomeOfAir',
    name: 'Tome of Air',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'TomeOfEarth',
    name: 'Tome of Earth',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'TomeOfFire',
    name: 'Tome of Fire',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'TomeOfWater',
    name: 'Tome of Water',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'TorsoOfLegion',
    name: 'Torso of Legion',
    slot: 'Misc',
    class: 'Minor',
    cost: 5000,
  },
  {
    key: 'TridentOfDominion',
    name: 'Trident of Dominion',
    slot: 'Weapon',
    class: 'Major',
    cost: 7000,
    effect: {
      statsChanging: {
        attack: 7,
      },
    },
  },
  {
    key: 'TunicOfTheCyclopsKing',
    name: 'Tunic of the Cyclops King',
    slot: 'Torso',
    class: 'Major',
    cost: 5000,
    effect: {
      statsChanging: {
        power: 4,
      },
    },
  },
  {
    key: 'VampiresCowl',
    name: 'Vampires Cowl',
    slot: 'Cape',
    class: 'Minor',
    cost: 4000,
    effect: {
      skillBonus: {
        necromancy: 0.05,
      },
    },
  },
  {
    key: 'VialOfDragonBlood',
    name: 'Vial of Dragon Blood',
    slot: 'Misc',
    class: 'Relic',
    cost: 20000,
  },
  {
    key: 'VialOfLifeblood',
    name: 'Vial of Lifeblood',
    slot: 'Misc',
    class: 'Major',
    cost: 10000,
    effect: {
      creaturesHealthBonus: 2,
    },
  },
  {
    key: 'WayfarersBoots',
    name: 'Wayfarers Boots',
    slot: 'Feet',
    class: 'Major',
    cost: 5000,
  },
  {
    key: 'WizardsWell',
    name: 'Wizards Well',
    slot: 'Combo',
    class: 'Relic',
    cost: 3000,
  },
]

export default artifacts
