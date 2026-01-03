import type { Hero } from '@/models/Hero'
import { Classes, Creatures, SecondarySkills, SkillLevels, Spells } from '@/models/enums'

export const heroes: Array<Hero> = [
  {
    id: 1,
    name: 'Orrin',
    classId: Classes.Knight,
    skills: {
      archery: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Archery,
  },
  {
    id: 2,
    name: 'Valeska',
    classId: Classes.Knight,
    skills: {
      archery: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Archer, Creatures.Marksman],
  },
  {
    id: 3,
    name: 'Edric',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Griffin, Creatures.RoyalGriffin],
  },
  {
    id: 4,
    name: 'Sylvia',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      navigation: SkillLevels.Basic,
    },
  },
  {
    id: 5,
    name: 'Lord Haart',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
  },
  {
    id: 6,
    name: 'Sorsha',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Swordsman, Creatures.Crusader],
  },
  {
    id: 7,
    name: 'Christian',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 8,
    name: 'Tyris',
    classId: Classes.Knight,
    skills: {
      leadership: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Cavalier, Creatures.Champion],
  },
  {
    id: 9,
    name: 'Rion',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: Classes.Cleric,
  },
  {
    id: 10,
    name: 'Adela',
    classId: Classes.Cleric,
    skills: {
      wisdom: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtySpell: Spells.Bless,
  },
  {
    id: 11,
    name: 'Cuthbert',
    classId: Classes.Cleric,
    skills: {
      wisdom: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtySpell: Spells.Weakness,
  },
  {
    id: 12,
    name: 'Adelaide',
    classId: Classes.Cleric,
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtySpell: Spells.FrostRing,
  },
  {
    id: 13,
    name: 'Ingham',
    classId: Classes.Cleric,
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Monk, Creatures.Zealot],
  },
  {
    id: 14,
    name: 'Sanya',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Cleric,
  },
  {
    id: 15,
    name: 'Loynis',
    classId: Classes.Cleric,
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: Spells.Prayer,
  },
  {
    id: 16,
    name: 'Caitlin',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Cleric,
  },
  {
    id: 17,
    name: 'Mephala',
    classId: Classes.Ranger,
    skills: {
      armorer: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Armorer,
  },
  {
    id: 18,
    name: 'Ufretin',
    classId: Classes.Ranger,
    skills: {
      luck: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Dwarf, Creatures.BattleDwarf],
  },
  {
    id: 19,
    name: 'Jenova',
    skills: {
      archery: SkillLevels.Advanced,
    },
    classId: Classes.Ranger,
  },
  {
    id: 20,
    name: 'Ryland',
    classId: Classes.Ranger,
    skills: {
      leadership: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.DendroidGuard, Creatures.DendroidSoldier],
  },
  {
    id: 21,
    name: 'Thorgrim',
    skills: {
      resistance: SkillLevels.Advanced,
    },
    classId: Classes.Ranger,
  },
  {
    id: 22,
    name: 'Ivor',
    classId: Classes.Ranger,
    skills: {
      archery: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.WoodElf, Creatures.GrandElf],
  },
  {
    id: 23,
    name: 'Clancy',
    classId: Classes.Ranger,
    skills: {
      interference: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Unicorn, Creatures.WarUnicorn],
  },
  {
    id: 24,
    name: 'Kyrre',
    skills: {
      archery: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: Classes.Ranger,
  },
  {
    id: 25,
    name: 'Coronius',
    classId: Classes.Druid,
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: Spells.Slayer,
  },
  {
    id: 26,
    name: 'Uland',
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    classId: Classes.Druid,
  },
  {
    id: 27,
    name: 'Elleshar',
    skills: {
      intelligence: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    classId: Classes.Druid,
  },
  {
    id: 28,
    name: 'Gem',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Druid,
  },
  {
    id: 29,
    name: 'Malcom',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: Classes.Druid,
  },
  {
    id: 30,
    name: 'Melodia',
    skills: {
      wisdom: SkillLevels.Basic,
      luck: SkillLevels.Basic,
    },
    classId: Classes.Druid,
  },
  {
    id: 31,
    name: 'Alagar',
    classId: Classes.Druid,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySpell: Spells.IceBolt,
  },
  {
    id: 32,
    name: 'Aeris',
    classId: Classes.Druid,
    skills: {
      wisdom: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Pegasus, Creatures.SilverPegasus],
  },
  {
    id: 33,
    name: 'Piquedram',
    classId: Classes.Alchemist,
    skills: {
      mysticism: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.StoneGargoyle, Creatures.ObsidianGargoyle],
  },
  {
    id: 34,
    name: 'Thane',
    classId: Classes.Alchemist,
    skills: {
      scholar: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Genie, Creatures.MasterGenie],
  },
  {
    id: 35,
    name: 'Josephine',
    classId: Classes.Alchemist,
    skills: {
      mysticism: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.StoneGolem, Creatures.IronGolem],
  },
  {
    id: 36,
    name: 'Neela',
    classId: Classes.Alchemist,
    skills: {
      scholar: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Armorer,
  },
  {
    id: 37,
    name: 'Torosar',
    classId: Classes.Alchemist,
    skills: {
      mysticism: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 38,
    name: 'Fafner',
    classId: Classes.Alchemist,
    skills: {
      scholar: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Naga, Creatures.NagaQueen],
  },
  {
    id: 39,
    name: 'Rissa',
    skills: {
      mysticism: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: Classes.Alchemist,
  },
  {
    id: 40,
    name: 'Iona',
    classId: Classes.Alchemist,
    skills: {
      scholar: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Genie, Creatures.MasterGenie],
  },
  {
    id: 41,
    name: 'Astral',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    classId: Classes.Wizard,
  },
  {
    id: 42,
    name: 'Halon',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: Classes.Wizard,
  },
  {
    id: 43,
    name: 'Serena',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Wizard,
  },
  {
    id: 44,
    name: 'Daremyth',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Wizard,
  },
  {
    id: 45,
    name: 'Theodorus',
    classId: Classes.Wizard,
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Mage, Creatures.ArchMage],
  },
  {
    id: 46,
    name: 'Solmyr',
    classId: Classes.Wizard,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySpell: Spells.ChainLightning,
  },
  {
    id: 47,
    name: 'Cyra',
    skills: {
      wisdom: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    classId: Classes.Wizard,
  },
  {
    id: 48,
    name: 'Aine',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    classId: Classes.Wizard,
  },
  {
    id: 49,
    name: 'Fiona',
    classId: Classes.Demoniac,
    skills: {
      scouting: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.HellHound, Creatures.Cerberus],
  },
  {
    id: 50,
    name: 'Rashka',
    classId: Classes.Demoniac,
    skills: {
      scholar: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Efreet, Creatures.EfreetSultan],
  },
  {
    id: 51,
    name: 'Marius',
    classId: Classes.Demoniac,
    skills: {
      armorer: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Demon, Creatures.HornedDemon],
  },
  {
    id: 52,
    name: 'Ignatius',
    classId: Classes.Demoniac,
    skills: {
      tactics: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Imp, Creatures.Familiar],
  },
  {
    id: 53,
    name: 'Octavia',
    skills: {
      scholar: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: Classes.Demoniac,
  },
  {
    id: 54,
    name: 'Calh',
    classId: Classes.Demoniac,
    skills: {
      leadership: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Gog, Creatures.Magog],
  },
  {
    id: 55,
    name: 'Pyre',
    classId: Classes.Demoniac,
    skills: {
      logistics: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 56,
    name: 'Nymus',
    classId: Classes.Demoniac,
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.PitFiend, Creatures.PitLord],
  },
  {
    id: 57,
    name: 'Ayden',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Heretic,
  },
  {
    id: 58,
    name: 'Xyron',
    classId: Classes.Heretic,
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: Spells.Inferno,
  },
  {
    id: 59,
    name: 'Axsis',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: Classes.Heretic,
  },
  {
    id: 60,
    name: 'Olema',
    classId: Classes.Heretic,
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtySpell: Spells.Weakness,
  },
  {
    id: 61,
    name: 'Calid',
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    classId: Classes.Heretic,
  },
  {
    id: 62,
    name: 'Ash',
    classId: Classes.Heretic,
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    specialtySpell: Spells.Bloodlust,
  },
  {
    id: 63,
    name: 'Zydar',
    classId: Classes.Heretic,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 64,
    name: 'Xarfax',
    classId: Classes.Heretic,
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySpell: Spells.Fireball,
  },
  {
    id: 65,
    name: 'Straker',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.WalkingDead, Creatures.Zombie],
  },
  {
    id: 66,
    name: 'Vokial',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Vampire, Creatures.VampireLord],
  },
  {
    id: 67,
    name: 'Moandor',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Lich, Creatures.PowerLich],
  },
  {
    id: 68,
    name: 'Charna',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Wight, Creatures.Wraith],
  },
  {
    id: 69,
    name: 'Tamika',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.BlackKnight, Creatures.DreadKnight],
  },
  {
    id: 70,
    name: 'Isra',
    skills: {
      necromancy: SkillLevels.Advanced,
    },
    classId: Classes.DeathKnight,
  },
  {
    id: 71,
    name: 'Clavius',
    skills: {
      necromancy: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: Classes.DeathKnight,
  },
  {
    id: 72,
    name: 'Galthran',
    classId: Classes.DeathKnight,
    skills: {
      necromancy: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Skeleton, Creatures.SkeletonWarrior],
  },
  {
    id: 73,
    name: 'Septienna',
    classId: Classes.Necromancer,
    skills: {
      necromancy: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: Spells.DestroyUndead,
  },
  {
    id: 74,
    name: 'Aislinn',
    classId: Classes.Necromancer,
    skills: {
      necromancy: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: Spells.MeteorShower,
  },
  {
    id: 75,
    name: 'Sandro',
    classId: Classes.Necromancer,
    skills: {
      necromancy: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 76,
    name: 'Nimbus',
    skills: {
      necromancy: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Necromancer,
  },
  {
    id: 77,
    name: 'Thant',
    skills: {
      necromancy: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: Classes.Necromancer,
  },
  {
    id: 78,
    name: 'Xsi',
    classId: Classes.Necromancer,
    skills: {
      necromancy: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: Spells.StoneSkin,
  },
  {
    id: 79,
    name: 'Vidomina',
    skills: {
      necromancy: SkillLevels.Advanced,
    },
    classId: Classes.Necromancer,
  },
  {
    id: 80,
    name: 'Nagash',
    skills: {
      necromancy: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Necromancer,
  },
  {
    id: 81,
    name: 'Lorelei',
    classId: Classes.Overlord,
    skills: {
      leadership: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Harpy, Creatures.HarpyHag],
  },
  {
    id: 82,
    name: 'Arlach',
    classId: Classes.Overlord,
    skills: {
      artillery: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 83,
    name: 'Dace',
    classId: Classes.Overlord,
    skills: {
      tactics: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Minotaur, Creatures.MinotaurKing],
  },
  {
    id: 84,
    name: 'Ajit',
    classId: Classes.Overlord,
    skills: {
      leadership: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Beholder, Creatures.EvilEye],
  },
  {
    id: 85,
    name: 'Damacon',
    skills: {
      offense: SkillLevels.Advanced,
    },
    classId: Classes.Overlord,
  },
  {
    id: 86,
    name: 'Gunnar',
    skills: {
      tactics: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: Classes.Overlord,
  },
  {
    id: 87,
    name: 'Synca',
    classId: Classes.Overlord,
    skills: {
      leadership: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Manticore, Creatures.Scorpicore],
  },
  {
    id: 88,
    name: 'Shakti',
    classId: Classes.Overlord,
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Troglodyte, Creatures.InfernalTroglodyte],
  },
  {
    id: 89,
    name: 'Alamar',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    classId: Classes.Warlock,
  },
  {
    id: 90,
    name: 'Jaegar',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: Classes.Warlock,
  },
  {
    id: 91,
    name: 'Malekith',
    classId: Classes.Warlock,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 92,
    name: 'Jeddite',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    classId: Classes.Warlock,
  },
  {
    id: 93,
    name: 'Geon',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Warlock,
  },
  {
    id: 94,
    name: 'Deemer',
    classId: Classes.Warlock,
    skills: {
      wisdom: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtySpell: Spells.MeteorShower,
  },
  {
    id: 95,
    name: 'Sephinroth',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Warlock,
  },
  {
    id: 96,
    name: 'Darkstorn',
    classId: Classes.Warlock,
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySpell: Spells.StoneSkin,
  },
  {
    id: 97,
    name: 'Yog',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Cyclops, Creatures.CyclopsKing],
  },
  {
    id: 98,
    name: 'Gurnisson',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 99,
    name: 'Jabarkas',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Orc, Creatures.OrcChieftain],
  },
  {
    id: 100,
    name: 'Shiva',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Roc, Creatures.Thunderbird],
  },
  {
    id: 101,
    name: 'Gretchin',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Goblin, Creatures.Hobgoblin],
  },
  {
    id: 102,
    name: 'Krellion',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ogre, Creatures.OgreMage],
  },
  {
    id: 103,
    name: 'Crag Hack',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtySkill: SecondarySkills.Offense,
  },
  {
    id: 104,
    name: 'Tyraxor',
    classId: Classes.Barbarian,
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.WolfRider, Creatures.WolfRaider],
  },
  {
    id: 105,
    name: 'Gird',
    classId: Classes.BattleMage,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 106,
    name: 'Vey',
    classId: Classes.BattleMage,
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ogre, Creatures.OgreMage],
  },
  {
    id: 107,
    name: 'Dessa',
    skills: {
      wisdom: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: Classes.BattleMage,
  },
  {
    id: 108,
    name: 'Terek',
    skills: {
      wisdom: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    classId: Classes.BattleMage,
  },
  {
    id: 109,
    name: 'Zubin',
    classId: Classes.BattleMage,
    skills: {
      wisdom: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtySpell: Spells.Precision,
  },
  {
    id: 110,
    name: 'Gundula',
    classId: Classes.BattleMage,
    skills: {
      wisdom: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Offense,
  },
  {
    id: 111,
    name: 'Oris',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.BattleMage,
  },
  {
    id: 112,
    name: 'Saurug',
    skills: {
      wisdom: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    classId: Classes.BattleMage,
  },
  {
    id: 113,
    name: 'Bron',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Basilisk, Creatures.GreaterBasilisk],
  },
  {
    id: 114,
    name: 'Drakon',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Gnoll, Creatures.GnollMarauder],
  },
  {
    id: 115,
    name: 'Wystan',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Lizardman, Creatures.LizardWarrior],
  },
  {
    id: 116,
    name: 'Tazar',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Advanced,
    },
    specialtySkill: SecondarySkills.Armorer,
  },
  {
    id: 117,
    name: 'Alkin',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Gorgon, Creatures.MightyGorgon],
  },
  {
    id: 118,
    name: 'Korbac',
    skills: {
      armorer: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    classId: Classes.Beastmaster,
    specialtyUnit: [Creatures.SerpentFly, Creatures.DragonFly],
  },
  {
    id: 119,
    name: 'Gerwulf',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
  },
  {
    id: 120,
    name: 'Broghild',
    classId: Classes.Beastmaster,
    skills: {
      armorer: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Wyvern, Creatures.WyvernMonarch],
  },
  {
    id: 121,
    name: 'Mirlanda',
    classId: Classes.Witch,
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtySpell: Spells.Weakness,
  },
  {
    id: 122,
    name: 'Rosic',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: Classes.Witch,
  },
  {
    id: 123,
    name: 'Voy',
    skills: {
      wisdom: SkillLevels.Basic,
      navigation: SkillLevels.Basic,
    },
    classId: Classes.Witch,
  },
  {
    id: 124,
    name: 'Verdish',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: Classes.Witch,
  },
  {
    id: 125,
    name: 'Merist',
    classId: Classes.Witch,
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: Spells.StoneSkin,
  },
  {
    id: 126,
    name: 'Styg',
    classId: Classes.Witch,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 127,
    name: 'Andra',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Witch,
  },
  {
    id: 128,
    name: 'Tiva',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: Classes.Witch,
  },
  {
    id: 129,
    name: 'Pasis',
    classId: Classes.Planeswalker,
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.PsychicElemental, Creatures.MagicElemental],
  },
  {
    id: 130,
    name: 'Thunar',
    classId: Classes.Planeswalker,
    skills: {
      tactics: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.EarthElemental, Creatures.MagmaElemental],
  },
  {
    id: 131,
    name: 'Ignissa',
    classId: Classes.Planeswalker,
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.FireElemental, Creatures.EnergyElemental],
  },
  {
    id: 132,
    name: 'Lacus',
    classId: Classes.Planeswalker,
    skills: {
      tactics: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.WaterElemental, Creatures.IceElemental],
  },
  {
    id: 133,
    name: 'Monere',
    classId: Classes.Planeswalker,
    skills: {
      offense: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.PsychicElemental, Creatures.MagicElemental],
  },
  {
    id: 134,
    name: 'Erdamon',
    classId: Classes.Planeswalker,
    skills: {
      tactics: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.EarthElemental, Creatures.MagmaElemental],
  },
  {
    id: 135,
    name: 'Fiur',
    classId: Classes.Planeswalker,
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.FireElemental, Creatures.EnergyElemental],
  },
  {
    id: 136,
    name: 'Kalt',
    classId: Classes.Planeswalker,
    skills: {
      tactics: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.WaterElemental, Creatures.IceElemental],
  },
  {
    id: 137,
    name: 'Luna',
    classId: Classes.Elementalist,
    skills: {
      wisdom: SkillLevels.Basic,
      fire: SkillLevels.Basic,
    },
    specialtySpell: Spells.Firewall,
  },
  {
    id: 138,
    name: 'Brissa',
    skills: {
      wisdom: SkillLevels.Basic,
      air: SkillLevels.Basic,
    },
    classId: Classes.Elementalist,
  },
  {
    id: 139,
    name: 'Ciele',
    classId: Classes.Elementalist,
    skills: {
      wisdom: SkillLevels.Basic,
      water: SkillLevels.Basic,
    },
    specialtySpell: Spells.MagicArrow,
  },
  {
    id: 140,
    name: 'Labetha',
    classId: Classes.Elementalist,
    skills: {
      wisdom: SkillLevels.Basic,
      earth: SkillLevels.Basic,
    },
    specialtySpell: Spells.StoneSkin,
  },
  {
    id: 141,
    name: 'Inteus',
    classId: Classes.Elementalist,
    skills: {
      wisdom: SkillLevels.Basic,
      fire: SkillLevels.Basic,
    },
    specialtySpell: Spells.Bloodlust,
  },
  {
    id: 142,
    name: 'Aenain',
    classId: Classes.Elementalist,
    skills: {
      wisdom: SkillLevels.Basic,
      air: SkillLevels.Basic,
    },
    specialtySpell: Spells.DisruptingRay,
  },
  {
    id: 143,
    name: 'Gelare',
    skills: {
      wisdom: SkillLevels.Basic,
      water: SkillLevels.Basic,
    },
    classId: Classes.Elementalist,
  },
  {
    id: 144,
    name: 'Grindan',
    skills: {
      wisdom: SkillLevels.Basic,
      earth: SkillLevels.Basic,
    },
    classId: Classes.Elementalist,
  },
  {
    id: 145,
    name: 'Cassiopeia',
    classId: Classes.Captain,
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Nymph, Creatures.Oceanid],
  },
  {
    id: 146,
    name: 'Corkes',
    classId: Classes.Captain,
    skills: {
      offense: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Offense,
  },
  {
    id: 147,
    name: 'Jeremy',
    classId: Classes.Captain,
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Cannon],
  },
  {
    id: 148,
    name: 'Illor',
    classId: Classes.Captain,
    skills: {
      armorer: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Stormbird, Creatures.Ayssid],
  },
  {
    id: 149,
    name: 'Derek',
    classId: Classes.Captain,
    skills: {
      offense: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.CrewMate, Creatures.Seaman],
  },
  {
    id: 150,
    name: 'Leena',
    skills: {
      pathfinding: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    classId: Classes.Captain,
  },
  {
    id: 151,
    name: 'Anabel',
    classId: Classes.Captain,
    skills: {
      offense: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Pirate, Creatures.Corsair, Creatures.Pirate],
  },
  {
    id: 152,
    name: 'Miriam',
    skills: {
      logistics: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    classId: Classes.Captain,
  },
  {
    id: 153,
    name: 'Casmetra',
    classId: Classes.Navigator,
    skills: {
      wisdom: SkillLevels.Basic,
      water: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.SeaWitch, Creatures.Sorceress],
  },
  {
    id: 154,
    name: 'Eovacius',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: Classes.Navigator,
  },
  {
    id: 155,
    name: 'Spint',
    classId: Classes.Navigator,
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
  },
  {
    id: 156,
    name: 'Andal',
    skills: {
      wisdom: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    classId: Classes.Navigator,
  },
  {
    id: 157,
    name: 'Manfred',
    classId: Classes.Navigator,
    skills: {
      wisdom: SkillLevels.Basic,
      fire: SkillLevels.Basic,
    },
    specialtySpell: Spells.Fireball,
  },
  {
    id: 158,
    name: 'Zilare',
    skills: {
      wisdom: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    classId: Classes.Navigator,
  },
  {
    id: 159,
    name: 'Astra',
    skills: {
      wisdom: SkillLevels.Basic,
      luck: SkillLevels.Basic,
    },
    classId: Classes.Navigator,
  },
  {
    id: 160,
    name: 'Dargem',
    skills: {
      wisdom: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    classId: Classes.Navigator,
  },
  {
    id: 161,
    name: 'Giselle',
    skills: {
      interference: SkillLevels.Advanced,
    },
    classId: Classes.Ranger,
  },
  {
    id: 162,
    name: 'Agar',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Sandworm, Creatures.OlgoiKhorkhoi],
    classId: Classes.Artificer,
  },
  {
    id: 163,
    name: 'Bertram',
    skills: {
      wisdom: SkillLevels.Basic,
    },
    classId: Classes.Artificer,
  },
  {
    id: 164,
    name: 'Celestine',
    skills: {
      wisdom: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Armadillo, Creatures.BellwetherArmadillo],
    classId: Classes.Artificer,
  },
  {
    id: 165,
    name: 'Dury',
    skills: {
      armorer: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Armorer,
    classId: Classes.Mercenary,
  },
  {
    id: 166,
    name: 'Eanswythe',
    skills: {
      wisdom: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtySpell: Spells.Weakness,
    classId: Classes.Artificer,
  },
  {
    id: 167,
    name: 'Floribert',
    skills: {
      firstAid: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.FirstAid,
    classId: Classes.Mercenary,
  },
  {
    id: 168,
    name: 'Frederick',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Automaton, Creatures.SentinelAutomaton],
    classId: Classes.Artificer,
  },
  {
    id: 169,
    name: 'Henrietta',
    skills: {
      leadership: SkillLevels.Basic,
      luck: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.HalflingWasteland, Creatures.HalflingGrenadier],
    classId: Classes.Mercenary,
  },
  {
    id: 170,
    name: 'Melchior',
    skills: {
      leadership: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Diplomacy,
    classId: Classes.Mercenary,
  },
  {
    id: 171,
    name: 'Morton',
    skills: {
      artillery: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Ballista],
    classId: Classes.Mercenary,
  },
  {
    id: 172,
    name: 'Murdoch',
    skills: {
      archery: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Archery,
    classId: Classes.Mercenary,
  },
  {
    id: 173,
    name: 'Sam',
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Mechanic, Creatures.Engineer],
    classId: Classes.Mercenary,
  },
  {
    id: 174,
    name: 'Tancred',
    skills: {
      archery: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Gunslinger, Creatures.BountyHunter],
    classId: Classes.Mercenary,
  },
  {
    id: 175,
    name: 'Tavin',
    skills: {
      offense: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Offense,
    classId: Classes.Mercenary,
  },
  {
    id: 176,
    name: 'Todd',
    skills: {
      offense: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Automaton, Creatures.SentinelAutomaton],
    classId: Classes.Artificer,
  },
  {
    id: 177,
    name: 'Victoria',
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: Spells.LandMine,
    classId: Classes.Artificer,
  },
  {
    id: 178,
    name: 'Wrathmont',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtySpell: Spells.Frenzy,
    classId: Classes.Artificer,
  },
  {
    id: 179,
    name: 'Wynona',
    skills: {
      archery: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Scouting,
    classId: Classes.Mercenary,
  },
  {
    id: 180,
    name: 'Ziph',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySpell: Spells.LightningBolt,
    classId: Classes.Artificer,
  },
  {
    id: 181,
    name: 'Dhuin',
    skills: {
      archery: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.SnowElf, Creatures.SteelElf],
    classId: Classes.Chieftain,
  },
  {
    id: 182,
    name: 'Oidana',
    skills: {
      archery: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Diplomacy,
    classId: Classes.Chieftain,
  },
  {
    id: 183,
    name: 'Neia',
    skills: {
      archery: SkillLevels.Advanced,
    },
    specialtySkill: SecondarySkills.Archery,
    classId: Classes.Chieftain,
  },
  {
    id: 184,
    name: 'Eikthurn',
    skills: {
      armorer: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.MountainRam, Creatures.Argali],
    classId: Classes.Chieftain,
  },
  {
    id: 185,
    name: 'Creyle',
    skills: {
      armorer: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Mammoth, Creatures.WarMammoth],
    classId: Classes.Chieftain,
  },
  {
    id: 186,
    name: 'Spadum',
    skills: {
      leadership: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Yeti, Creatures.YetiRunemaster],
    classId: Classes.Chieftain,
  },
  {
    id: 187,
    name: 'Kynr',
    skills: {
      estates: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: [Creatures.Kobold, Creatures.KoboldForeman],
    classId: Classes.Chieftain,
  },
  {
    id: 188,
    name: 'Ergon',
    skills: {
      pathfinding: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Pathfinding,
    classId: Classes.Chieftain,
  },
  {
    id: 189,
    name: 'Kriv',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtyUnit: [Creatures.Shaman, Creatures.GreatShaman],
    classId: Classes.Elder,
  },
  {
    id: 190,
    name: 'Glacius',
    skills: {
      learning: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: Spells.FrostRing,
    classId: Classes.Elder,
  },
  {
    id: 191,
    name: 'Sial',
    skills: {
      intelligence: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: Spells.IceBolt,
    classId: Classes.Elder,
  },
  {
    id: 192,
    name: 'Dalton',
    skills: {
      armorer: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: Spells.Shield,
    classId: Classes.Elder,
  },
  {
    id: 193,
    name: 'Biarma',
    skills: {
      firstAid: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.FirstAid,
    classId: Classes.Elder,
  },
  {
    id: 194,
    name: 'Haugir',
    skills: {
      navigation: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Navigation,
    classId: Classes.Elder,
  },
  {
    id: 195,
    name: 'Akka',
    skills: {
      mysticism: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: Spells.Bloodlust,
    classId: Classes.Elder,
  },
  {
    id: 196,
    name: 'Vehr',
    skills: {
      eagleEye: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    classId: Classes.Elder,
  },
  {
    id: 197,
    name: 'Allora',
    skills: {
      sorcery: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySkill: SecondarySkills.Sorcery,
    classId: Classes.Elder,
  },
]
