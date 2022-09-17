import type { Hero } from '@/types'
import { SkillLevels } from '@/types'

const heroes: Array<Hero> = [
  {
    key: 'Orrin',
    name: 'Orrin',
    classId: 'Knight',
    skills: {
      archery: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySkill: 'Archery',
  },
  {
    key: 'Valeska',
    name: 'Valeska',
    classId: 'Knight',
    skills: {
      archery: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: ['Archer', 'Marksman'],
  },
  {
    key: 'Edric',
    name: 'Edric',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtyUnit: ['Griffin', 'RoyalGriffin'],
  },
  {
    key: 'Sylvia',
    name: 'Sylvia',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      navigation: SkillLevels.Basic,
    },
  },
  {
    key: 'LordHaart',
    name: 'Lord Haart',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
  },
  {
    key: 'Sorsha',
    name: 'Sorsha',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['Swordsman', 'Crusader'],
  },
  {
    key: 'Christian',
    name: 'Christian',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Tyris',
    name: 'Tyris',
    classId: 'Knight',
    skills: {
      leadership: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Cavalier', 'Champion'],
  },
  {
    key: 'Rion',
    name: 'Rion',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: 'Cleric',
  },
  {
    key: 'Adela',
    name: 'Adela',
    classId: 'Cleric',
    skills: {
      wisdom: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtySpell: 'Bless',
  },
  {
    key: 'Cuthbert',
    name: 'Cuthbert',
    classId: 'Cleric',
    skills: {
      wisdom: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtySpell: 'Weakness',
  },
  {
    key: 'Adelaide',
    name: 'Adelaide',
    classId: 'Cleric',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtySpell: 'FrostRing',
  },
  {
    key: 'Ingham',
    name: 'Ingham',
    classId: 'Cleric',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    specialtyUnit: ['Monk', 'Zealot'],
  },
  {
    key: 'Sanya',
    name: 'Sanya',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Cleric',
  },
  {
    key: 'Loynis',
    name: 'Loynis',
    classId: 'Cleric',
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: 'Prayer',
  },
  {
    key: 'Caitlin',
    name: 'Caitlin',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Cleric',
  },
  {
    key: 'Mephala',
    name: 'Mephala',
    classId: 'Ranger',
    skills: {
      armorer: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtySkill: 'Armorer',
  },
  {
    key: 'Ufretin',
    name: 'Ufretin',
    classId: 'Ranger',
    skills: {
      luck: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Dwarf', 'BattleDwarf'],
  },
  {
    key: 'Jenova',
    name: 'Jenova',
    skills: {
      archery: SkillLevels.Advanced,
    },
    classId: 'Ranger',
  },
  {
    key: 'Ryland',
    name: 'Ryland',
    classId: 'Ranger',
    skills: {
      leadership: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtyUnit: ['DendroidGuard', 'DendroidSoldier'],
  },
  {
    key: 'Thorgrim',
    name: 'Thorgrim',
    skills: {
      resistance: SkillLevels.Advanced,
    },
    classId: 'Ranger',
  },
  {
    key: 'Ivor',
    name: 'Ivor',
    classId: 'Ranger',
    skills: {
      archery: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['WoodElf', 'GrandElf'],
  },
  {
    key: 'Clancy',
    name: 'Clancy',
    classId: 'Ranger',
    skills: {
      interference: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: ['Unicorn', 'WarUnicorn'],
  },
  {
    key: 'Kyrre',
    name: 'Kyrre',
    skills: {
      archery: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: 'Ranger',
  },
  {
    key: 'Coronius',
    name: 'Coronius',
    classId: 'Druid',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: 'Slayer',
  },
  {
    key: 'Uland',
    name: 'Uland',
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    classId: 'Druid',
  },
  {
    key: 'Elleshar',
    name: 'Elleshar',
    skills: {
      intelligence: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    classId: 'Druid',
  },
  {
    key: 'Gem',
    name: 'Gem',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Druid',
  },
  {
    key: 'Malcom',
    name: 'Malcom',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: 'Druid',
  },
  {
    key: 'Melodia',
    name: 'Melodia',
    skills: {
      wisdom: SkillLevels.Basic,
      luck: SkillLevels.Basic,
    },
    classId: 'Druid',
  },
  {
    key: 'Alagar',
    name: 'Alagar',
    classId: 'Druid',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySpell: 'IceBolt',
  },
  {
    key: 'Aeris',
    name: 'Aeris',
    classId: 'Druid',
    skills: {
      wisdom: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: ['Pegasus', 'SilverPegasus'],
  },
  {
    key: 'Piquedram',
    name: 'Piquedram',
    classId: 'Alchemist',
    skills: {
      mysticism: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: ['StoneGargoyle', 'ObsidianGargoyle'],
  },
  {
    key: 'Thane',
    name: 'Thane',
    classId: 'Alchemist',
    skills: {
      scholar: SkillLevels.Advanced,
    },
    specialtyUnit: ['Genie', 'MasterGenie'],
  },
  {
    key: 'Josephine',
    name: 'Josephine',
    classId: 'Alchemist',
    skills: {
      mysticism: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtyUnit: ['StoneGolem', 'IronGolem'],
  },
  {
    key: 'Neela',
    name: 'Neela',
    classId: 'Alchemist',
    skills: {
      scholar: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtySkill: 'Armorer',
  },
  {
    key: 'Torosar',
    name: 'Torosar',
    classId: 'Alchemist',
    skills: {
      mysticism: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Fafner',
    name: 'Fafner',
    classId: 'Alchemist',
    skills: {
      scholar: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Naga', 'NagaQueen'],
  },
  {
    key: 'Rissa',
    name: 'Rissa',
    skills: {
      mysticism: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: 'Alchemist',
  },
  {
    key: 'Iona',
    name: 'Iona',
    classId: 'Alchemist',
    skills: {
      scholar: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    specialtyUnit: ['Genie', 'MasterGenie'],
  },
  {
    key: 'Astral',
    name: 'Astral',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    classId: 'Wizard',
  },
  {
    key: 'Halon',
    name: 'Halon',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: 'Wizard',
  },
  {
    key: 'Serena',
    name: 'Serena',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Wizard',
  },
  {
    key: 'Daremyth',
    name: 'Daremyth',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Wizard',
  },
  {
    key: 'Theodorus',
    name: 'Theodorus',
    classId: 'Wizard',
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtyUnit: ['Mage', 'ArchMage'],
  },
  {
    key: 'Solmyr',
    name: 'Solmyr',
    classId: 'Wizard',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySpell: 'ChainLightning',
  },
  {
    key: 'Cyra',
    name: 'Cyra',
    skills: {
      wisdom: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    classId: 'Wizard',
  },
  {
    key: 'Aine',
    name: 'Aine',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    classId: 'Wizard',
  },
  {
    key: 'Fiona',
    name: 'Fiona',
    classId: 'Demoniac',
    skills: {
      scouting: SkillLevels.Advanced,
    },
    specialtyUnit: ['HellHound', 'Cerberus'],
  },
  {
    key: 'Rashka',
    name: 'Rashka',
    classId: 'Demoniac',
    skills: {
      scholar: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtyUnit: ['Efreeti', 'EfreetSultan'],
  },
  {
    key: 'Marius',
    name: 'Marius',
    classId: 'Demoniac',
    skills: {
      armorer: SkillLevels.Advanced,
    },
    specialtyUnit: ['Demon', 'HornedDemon'],
  },
  {
    key: 'Ignatius',
    name: 'Ignatius',
    classId: 'Demoniac',
    skills: {
      tactics: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Imp', 'Familiar'],
  },
  {
    key: 'Octavia',
    name: 'Octavia',
    skills: {
      scholar: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: 'Demoniac',
  },
  {
    key: 'Calh',
    name: 'Calh',
    classId: 'Demoniac',
    skills: {
      leadership: SkillLevels.Basic,
      diplomacy: SkillLevels.Basic,
    },
    specialtyUnit: ['Gog', 'Magog'],
  },
  {
    key: 'Pyre',
    name: 'Pyre',
    classId: 'Demoniac',
    skills: {
      logistics: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Nymus',
    name: 'Nymus',
    classId: 'Demoniac',
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtyUnit: ['PitFiend', 'PitLord'],
  },
  {
    key: 'Ayden',
    name: 'Ayden',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Heretic',
  },
  {
    key: 'Xyron',
    name: 'Xyron',
    classId: 'Heretic',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: 'Inferno',
  },
  {
    key: 'Axsis',
    name: 'Axsis',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: 'Heretic',
  },
  {
    key: 'Olema',
    name: 'Olema',
    classId: 'Heretic',
    skills: {
      wisdom: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtySpell: 'Weakness',
  },
  {
    key: 'Calid',
    name: 'Calid',
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    classId: 'Heretic',
  },
  {
    key: 'Ash',
    name: 'Ash',
    classId: 'Heretic',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    specialtySpell: 'Bloodlust',
  },
  {
    key: 'Zydar',
    name: 'Zydar',
    classId: 'Heretic',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Xarfax',
    name: 'Xarfax',
    classId: 'Heretic',
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySpell: 'Fireball',
  },
  {
    key: 'Straker',
    name: 'Straker',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['WalkingDead', 'Zombie'],
  },
  {
    key: 'Vokial',
    name: 'Vokial',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Vampire', 'VampireLord'],
  },
  {
    key: 'Moandor',
    name: 'Moandor',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtyUnit: ['Lich', 'PowerLich'],
  },
  {
    key: 'Charna',
    name: 'Charna',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Wight', 'Wraith'],
  },
  {
    key: 'Tamika',
    name: 'Tamika',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['BlackKnight', 'DreadKnight'],
  },
  {
    key: 'Isra',
    name: 'Isra',
    skills: {
      necromancy: SkillLevels.Advanced,
    },
    classId: 'DeathKnight',
  },
  {
    key: 'Clavius',
    name: 'Clavius',
    skills: {
      necromancy: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    classId: 'DeathKnight',
  },
  {
    key: 'Galthran',
    name: 'Galthran',
    classId: 'DeathKnight',
    skills: {
      necromancy: SkillLevels.Basic,
      armorer: SkillLevels.Basic,
    },
    specialtyUnit: ['Skeleton', 'SkeletonWarrior'],
  },
  {
    key: 'Septienna',
    name: 'Septienna',
    classId: 'Necromancer',
    skills: {
      necromancy: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtySpell: 'DestroyUndead',
  },
  {
    key: 'Aislinn',
    name: 'Aislinn',
    classId: 'Necromancer',
    skills: {
      necromancy: SkillLevels.Basic,
      wisdom: SkillLevels.Basic,
    },
    specialtySpell: 'MeteorShower',
  },
  {
    key: 'Sandro',
    name: 'Sandro',
    classId: 'Necromancer',
    skills: {
      necromancy: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Nimbus',
    name: 'Nimbus',
    skills: {
      necromancy: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Necromancer',
  },
  {
    key: 'Thant',
    name: 'Thant',
    skills: {
      necromancy: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: 'Necromancer',
  },
  {
    key: 'Xsi',
    name: 'Xsi',
    classId: 'Necromancer',
    skills: {
      necromancy: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: 'StoneSkin',
  },
  {
    key: 'Vidomina',
    name: 'Vidomina',
    skills: {
      necromancy: SkillLevels.Advanced,
    },
    classId: 'Necromancer',
  },
  {
    key: 'Nagash',
    name: 'Nagash',
    skills: {
      necromancy: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Necromancer',
  },
  {
    key: 'Lorelei',
    name: 'Lorelei',
    classId: 'Overlord',
    skills: {
      leadership: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: ['Harpy', 'HarpyHag'],
  },
  {
    key: 'Arlach',
    name: 'Arlach',
    classId: 'Overlord',
    skills: {
      artillery: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Dace',
    name: 'Dace',
    classId: 'Overlord',
    skills: {
      tactics: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['Minotaur', 'MinotaurKing'],
  },
  {
    key: 'Ajit',
    name: 'Ajit',
    classId: 'Overlord',
    skills: {
      leadership: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Beholder', 'EvilEye'],
  },
  {
    key: 'Damacon',
    name: 'Damacon',
    skills: {
      offense: SkillLevels.Advanced,
    },
    classId: 'Overlord',
  },
  {
    key: 'Gunnar',
    name: 'Gunnar',
    skills: {
      tactics: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: 'Overlord',
  },
  {
    key: 'Synca',
    name: 'Synca',
    classId: 'Overlord',
    skills: {
      leadership: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    specialtyUnit: ['Manticore', 'Scorpicore'],
  },
  {
    key: 'Shakti',
    name: 'Shakti',
    classId: 'Overlord',
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Troglodyte', 'InfernalTroglodyte'],
  },
  {
    key: 'Alamar',
    name: 'Alamar',
    skills: {
      wisdom: SkillLevels.Basic,
      scholar: SkillLevels.Basic,
    },
    classId: 'Warlock',
  },
  {
    key: 'Jaegar',
    name: 'Jaegar',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: 'Warlock',
  },
  {
    key: 'Malekith',
    name: 'Malekith',
    classId: 'Warlock',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Jeddite',
    name: 'Jeddite',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    classId: 'Warlock',
  },
  {
    key: 'Geon',
    name: 'Geon',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Warlock',
  },
  {
    key: 'Deemer',
    name: 'Deemer',
    classId: 'Warlock',
    skills: {
      wisdom: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtySpell: 'MeteorShower',
  },
  {
    key: 'Sephinroth',
    name: 'Sephinroth',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Warlock',
  },
  {
    key: 'Darkstorn',
    name: 'Darkstorn',
    classId: 'Warlock',
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtySpell: 'StoneSkin',
  },
  {
    key: 'Yog',
    name: 'Yog',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      ballistics: SkillLevels.Basic,
    },
    specialtyUnit: ['Cyclops', 'CyclopsKing'],
  },
  {
    key: 'Gurnisson',
    name: 'Gurnisson',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Jabarkas',
    name: 'Jabarkas',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: ['Orc', 'OrcChieftain'],
  },
  {
    key: 'Shiva',
    name: 'Shiva',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: ['Roc', 'Thunderbird'],
  },
  {
    key: 'Gretchin',
    name: 'Gretchin',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtyUnit: ['Goblin', 'Hobgoblin'],
  },
  {
    key: 'Krellion',
    name: 'Krellion',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Ogre', 'OgreMage'],
  },
  {
    key: 'CragHack',
    name: 'Crag Hack',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtySkill: 'Offense',
  },
  {
    key: 'Tyraxor',
    name: 'Tyraxor',
    classId: 'Barbarian',
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['WolfRider', 'WolfRaider'],
  },
  {
    key: 'Gird',
    name: 'Gird',
    classId: 'BattleMage',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Vey',
    name: 'Vey',
    classId: 'BattleMage',
    skills: {
      wisdom: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: ['Ogre', 'OgreMage'],
  },
  {
    key: 'Dessa',
    name: 'Dessa',
    skills: {
      wisdom: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    classId: 'BattleMage',
  },
  {
    key: 'Terek',
    name: 'Terek',
    skills: {
      wisdom: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    classId: 'BattleMage',
  },
  {
    key: 'Zubin',
    name: 'Zubin',
    classId: 'BattleMage',
    skills: {
      wisdom: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtySpell: 'Precision',
  },
  {
    key: 'Gundula',
    name: 'Gundula',
    classId: 'BattleMage',
    skills: {
      wisdom: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtySkill: 'Offense',
  },
  {
    key: 'Oris',
    name: 'Oris',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'BattleMage',
  },
  {
    key: 'Saurug',
    name: 'Saurug',
    skills: {
      wisdom: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    classId: 'BattleMage',
  },
  {
    key: 'Bron',
    name: 'Bron',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    specialtyUnit: ['Basilisk', 'GreaterBasilisk'],
  },
  {
    key: 'Drakon',
    name: 'Drakon',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: ['Gnoll', 'GnollMarauder'],
  },
  {
    key: 'Wystan',
    name: 'Wystan',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: ['Lizardman', 'LizardWarrior'],
  },
  {
    key: 'Tazar',
    name: 'Tazar',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Advanced,
    },
    specialtySkill: 'Armorer',
  },
  {
    key: 'Alkin',
    name: 'Alkin',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      offense: SkillLevels.Basic,
    },
    specialtyUnit: ['Gorgon', 'MightyGorgon'],
  },
  {
    key: 'Korbac',
    name: 'Korbac',
    skills: {
      armorer: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    classId: 'Beastmaster',
    specialtyUnit: ['SerpentFly', 'DragonFly'],
  },
  {
    key: 'Gerwulf',
    name: 'Gerwulf',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Ballista'],
  },
  {
    key: 'Broghild',
    name: 'Broghild',
    classId: 'Beastmaster',
    skills: {
      armorer: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    specialtyUnit: ['Wyvern', 'WyvernMonarch'],
  },
  {
    key: 'Mirlanda',
    name: 'Mirlanda',
    classId: 'Witch',
    skills: {
      wisdom: SkillLevels.Advanced,
    },
    specialtySpell: 'Weakness',
  },
  {
    key: 'Rosic',
    name: 'Rosic',
    skills: {
      wisdom: SkillLevels.Basic,
      mysticism: SkillLevels.Basic,
    },
    classId: 'Witch',
  },
  {
    key: 'Voy',
    name: 'Voy',
    skills: {
      wisdom: SkillLevels.Basic,
      navigation: SkillLevels.Basic,
    },
    classId: 'Witch',
  },
  {
    key: 'Verdish',
    name: 'Verdish',
    skills: {
      wisdom: SkillLevels.Basic,
      firstAid: SkillLevels.Basic,
    },
    classId: 'Witch',
  },
  {
    key: 'Merist',
    name: 'Merist',
    classId: 'Witch',
    skills: {
      wisdom: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtySpell: 'StoneSkin',
  },
  {
    key: 'Styg',
    name: 'Styg',
    classId: 'Witch',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Andra',
    name: 'Andra',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Witch',
  },
  {
    key: 'Tiva',
    name: 'Tiva',
    skills: {
      wisdom: SkillLevels.Basic,
      eagleEye: SkillLevels.Basic,
    },
    classId: 'Witch',
  },
  {
    key: 'Pasis',
    name: 'Pasis',
    classId: 'Planeswalker',
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['PsychicElemental', 'MagicElemental'],
  },
  {
    key: 'Thunar',
    name: 'Thunar',
    classId: 'Planeswalker',
    skills: {
      tactics: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtyUnit: ['EarthElemental', 'MagmaElemental'],
  },
  {
    key: 'Ignissa',
    name: 'Ignissa',
    classId: 'Planeswalker',
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['FireElemental', 'EnergyElemental'],
  },
  {
    key: 'Lacus',
    name: 'Lacus',
    classId: 'Planeswalker',
    skills: {
      tactics: SkillLevels.Advanced,
    },
    specialtyUnit: ['WaterElemental', 'IceElemental'],
  },
  {
    key: 'Monere',
    name: 'Monere',
    classId: 'Planeswalker',
    skills: {
      offense: SkillLevels.Basic,
      logistics: SkillLevels.Basic,
    },
    specialtyUnit: ['PsychicElemental', 'MagicElemental'],
  },
  {
    key: 'Erdamon',
    name: 'Erdamon',
    classId: 'Planeswalker',
    skills: {
      tactics: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    specialtyUnit: ['EarthElemental', 'MagmaElemental'],
  },
  {
    key: 'Fiur',
    name: 'Fiur',
    classId: 'Planeswalker',
    skills: {
      offense: SkillLevels.Advanced,
    },
    specialtyUnit: ['FireElemental', 'EnergyElemental'],
  },
  {
    key: 'Kalt',
    name: 'Kalt',
    classId: 'Planeswalker',
    skills: {
      tactics: SkillLevels.Basic,
      learning: SkillLevels.Basic,
    },
    specialtyUnit: ['WaterElemental', 'IceElemental'],
  },
  {
    key: 'Luna',
    name: 'Luna',
    classId: 'Elementalist',
    skills: {
      wisdom: SkillLevels.Basic,
      fireMagic: SkillLevels.Basic,
    },
    specialtySpell: 'FireWall',
  },
  {
    key: 'Brissa',
    name: 'Brissa',
    skills: {
      wisdom: SkillLevels.Basic,
      airMagic: SkillLevels.Basic,
    },
    classId: 'Elementalist',
  },
  {
    key: 'Ciele',
    name: 'Ciele',
    classId: 'Elementalist',
    skills: {
      wisdom: SkillLevels.Basic,
      waterMagic: SkillLevels.Basic,
    },
    specialtySpell: 'MagicArrow',
  },
  {
    key: 'Labetha',
    name: 'Labetha',
    classId: 'Elementalist',
    skills: {
      wisdom: SkillLevels.Basic,
      earthMagic: SkillLevels.Basic,
    },
    specialtySpell: 'StoneSkin',
  },
  {
    key: 'Inteus',
    name: 'Inteus',
    classId: 'Elementalist',
    skills: {
      wisdom: SkillLevels.Basic,
      fireMagic: SkillLevels.Basic,
    },
    specialtySpell: 'Bloodlust',
  },
  {
    key: 'Aenain',
    name: 'Aenain',
    classId: 'Elementalist',
    skills: {
      wisdom: SkillLevels.Basic,
      airMagic: SkillLevels.Basic,
    },
    specialtySpell: 'DisruptingRay',
  },
  {
    key: 'Gelare',
    name: 'Gelare',
    skills: {
      wisdom: SkillLevels.Basic,
      waterMagic: SkillLevels.Basic,
    },
    classId: 'Elementalist',
  },
  {
    key: 'Grindan',
    name: 'Grindan',
    skills: {
      wisdom: SkillLevels.Basic,
      earthMagic: SkillLevels.Basic,
    },
    classId: 'Elementalist',
  },
  {
    key: 'Cassiopeia',
    name: 'Cassiopeia',
    classId: 'Captain',
    skills: {
      offense: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Nymph', 'Oceanid'],
  },
  {
    key: 'Corkes',
    name: 'Corkes',
    classId: 'Captain',
    skills: {
      offense: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    specialtySkill: 'Offense',
  },
  {
    key: 'Jeremy',
    name: 'Jeremy',
    classId: 'Captain',
    skills: {
      offense: SkillLevels.Basic,
      artillery: SkillLevels.Basic,
    },
    specialtyUnit: ['Cannon'],
  },
  {
    key: 'Illor',
    name: 'Illor',
    classId: 'Captain',
    skills: {
      armorer: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    specialtyUnit: ['Stormbird', 'Ayssid'],
  },
  {
    key: 'Derek',
    name: 'Derek',
    classId: 'Captain',
    skills: {
      offense: SkillLevels.Basic,
      leadership: SkillLevels.Basic,
    },
    specialtyUnit: ['CrewMate', 'Seaman'],
  },
  {
    key: 'Leena',
    name: 'Leena',
    skills: {
      pathfinding: SkillLevels.Basic,
      estates: SkillLevels.Basic,
    },
    classId: 'Captain',
  },
  {
    key: 'Anabel',
    name: 'Anabel',
    classId: 'Captain',
    skills: {
      offense: SkillLevels.Basic,
      archery: SkillLevels.Basic,
    },
    specialtyUnit: ['Pirate', 'Corsair', 'Pirate'],
  },
  {
    key: 'Miriam',
    name: 'Miriam',
    skills: {
      logistics: SkillLevels.Basic,
      scouting: SkillLevels.Basic,
    },
    classId: 'Captain',
  },
  {
    key: 'Casmetra',
    name: 'Casmetra',
    classId: 'Navigator',
    skills: {
      wisdom: SkillLevels.Basic,
      waterMagic: SkillLevels.Basic,
    },
    specialtyUnit: ['SeaWitch', 'Sorceress'],
  },
  {
    key: 'Eovacius',
    name: 'Eovacius',
    skills: {
      wisdom: SkillLevels.Basic,
      intelligence: SkillLevels.Basic,
    },
    classId: 'Navigator',
  },
  {
    key: 'Spint',
    name: 'Spint',
    classId: 'Navigator',
    skills: {
      wisdom: SkillLevels.Basic,
      sorcery: SkillLevels.Basic,
    },
    specialtySkill: 'Sorcery',
  },
  {
    key: 'Andal',
    name: 'Andal',
    skills: {
      wisdom: SkillLevels.Basic,
      pathfinding: SkillLevels.Basic,
    },
    classId: 'Navigator',
  },
  {
    key: 'Manfred',
    name: 'Manfred',
    classId: 'Navigator',
    skills: {
      wisdom: SkillLevels.Basic,
      fireMagic: SkillLevels.Basic,
    },
    specialtySpell: 'Fireball',
  },
  {
    key: 'Zilare',
    name: 'Zilare',
    skills: {
      wisdom: SkillLevels.Basic,
      interference: SkillLevels.Basic,
    },
    classId: 'Navigator',
  },
  {
    key: 'Astra',
    name: 'Astra',
    skills: {
      wisdom: SkillLevels.Basic,
      luck: SkillLevels.Basic,
    },
    classId: 'Navigator',
  },
  {
    key: 'Dargem',
    name: 'Dargem',
    skills: {
      wisdom: SkillLevels.Basic,
      tactics: SkillLevels.Basic,
    },
    classId: 'Navigator',
  },
  {
    key: 'Giselle',
    name: 'Giselle',
    skills: {
      interference: SkillLevels.Advanced,
    },
    classId: 'Ranger',
  },
]

export default heroes
