import type { SpellKey } from '@/types'

interface SpellTranslation {
  name: string
  element: {
    name: string
  }
}

const spells: Record<SpellKey, SpellTranslation> = {
  MagicArrow: {
    name: 'Магическая Стрела',
    element: {
      name: 'Нейтральный',
    },
  },
  Visions: {
    name: 'Видение',
    element: {
      name: 'Нейтральный',
    },
  },
  Bloodlust: {
    name: 'Жажда Крови',
    element: {
      name: 'Огонь',
    },
  },
  Curse: {
    name: 'Проклятие',
    element: {
      name: 'Огонь',
    },
  },
  ProtectionFromFire: {
    name: 'Защита От Огня',
    element: {
      name: 'Огонь',
    },
  },
  Blind: {
    name: 'Слепота',
    element: {
      name: 'Огонь',
    },
  },
  FireWall: {
    name: 'Стена Огня',
    element: {
      name: 'Огонь',
    },
  },
  Fireball: {
    name: 'Огненный Шар',
    element: {
      name: 'Огонь',
    },
  },
  LandMine: {
    name: 'Мина',
    element: {
      name: 'Огонь',
    },
  },
  Misfortune: {
    name: 'Неудача',
    element: {
      name: 'Огонь',
    },
  },
  Armageddon: {
    name: 'Армагеддон',
    element: {
      name: 'Огонь',
    },
  },
  Berserk: {
    name: 'Берсерк',
    element: {
      name: 'Огонь',
    },
  },
  FireShield: {
    name: 'Огненный Щит',
    element: {
      name: 'Огонь',
    },
  },
  Frenzy: {
    name: 'Бешенство',
    element: {
      name: 'Огонь',
    },
  },
  Inferno: {
    name: 'Инферно',
    element: {
      name: 'Огонь',
    },
  },
  Slayer: {
    name: 'Палач',
    element: {
      name: 'Огонь',
    },
  },
  Sacrifice: {
    name: 'Жертва',
    element: {
      name: 'Огонь',
    },
  },
  SummonFireElemental: {
    name: 'Элементаль Огня',
    element: {
      name: 'Огонь',
    },
  },
  Bless: {
    name: 'Благословение',
    element: {
      name: 'Вода',
    },
  },
  Cure: {
    name: 'Лечение',
    element: {
      name: 'Вода',
    },
  },
  Dispel: {
    name: 'Рассеивание',
    element: {
      name: 'Вода',
    },
  },
  ProtectionFromWater: {
    name: 'Защита От Воды',
    element: {
      name: 'Вода',
    },
  },
  SummonBoat: {
    name: 'Вызвать Лодку',
    element: {
      name: 'Вода',
    },
  },
  IceBolt: {
    name: 'Ледяная Стрела',
    element: {
      name: 'Вода',
    },
  },
  RemoveObstacle: {
    name: 'Устранение Преград',
    element: {
      name: 'Вода',
    },
  },
  ScuttleBoat: {
    name: 'Потопить Лодку',
    element: {
      name: 'Вода',
    },
  },
  Weakness: {
    name: 'Слабость',
    element: {
      name: 'Вода',
    },
  },
  Forgetfulness: {
    name: 'Забывчивость',
    element: {
      name: 'Вода',
    },
  },
  FrostRing: {
    name: 'Ледяное Кольцо',
    element: {
      name: 'Вода',
    },
  },
  Mirth: {
    name: 'Радость',
    element: {
      name: 'Вода',
    },
  },
  Teleport: {
    name: 'Телепортация',
    element: {
      name: 'Вода',
    },
  },
  Clone: {
    name: 'Клон',
    element: {
      name: 'Вода',
    },
  },
  Prayer: {
    name: 'Молитва',
    element: {
      name: 'Вода',
    },
  },
  WaterWalk: {
    name: 'Ходьба по воде',
    element: {
      name: 'Вода',
    },
  },
  SummonWaterElemental: {
    name: 'Элементаль Воды',
    element: {
      name: 'Вода',
    },
  },
  Shield: {
    name: 'Щит',
    element: {
      name: 'Земля',
    },
  },
  Slow: {
    name: 'Замедление',
    element: {
      name: 'Земля',
    },
  },
  StoneSkin: {
    name: 'Каменная Кожа',
    element: {
      name: 'Земля',
    },
  },
  ViewEarth: {
    name: 'Просмотр Земли',
    element: {
      name: 'Земля',
    },
  },
  DeathRipple: {
    name: 'Волна Смерти',
    element: {
      name: 'Земля',
    },
  },
  Quicksand: {
    name: 'Зыбучий Песок',
    element: {
      name: 'Земля',
    },
  },
  AnimateDead: {
    name: 'Оживить Мертвеца',
    element: {
      name: 'Земля',
    },
  },
  AntiMagic: {
    name: 'Анти-Магия',
    element: {
      name: 'Земля',
    },
  },
  Earthquake: {
    name: 'Землетрясение',
    element: {
      name: 'Земля',
    },
  },
  ForceField: {
    name: 'Силовое поле',
    element: {
      name: 'Земля',
    },
  },
  ProtectionFromEarth: {
    name: 'Защита От Земли',
    element: {
      name: 'Земля',
    },
  },
  MeteorShower: {
    name: 'Метеоритный Дождь',
    element: {
      name: 'Земля',
    },
  },
  Resurrection: {
    name: 'Воскрешение',
    element: {
      name: 'Земля',
    },
  },
  Sorrow: {
    name: 'Печаль',
    element: {
      name: 'Земля',
    },
  },
  TownPortal: {
    name: 'Городской Портал',
    element: {
      name: 'Земля',
    },
  },
  Implosion: {
    name: 'Взрыв',
    element: {
      name: 'Земля',
    },
  },
  SummonEarthElemental: {
    name: 'Элементаль Земли',
    element: {
      name: 'Земля',
    },
  },
  Haste: {
    name: 'Ускорение',
    element: {
      name: 'Воздух',
    },
  },
  ViewAir: {
    name: 'Просмотр Воздуха',
    element: {
      name: 'Воздух',
    },
  },
  Disguise: {
    name: 'Маскировка',
    element: {
      name: 'Воздух',
    },
  },
  DisruptingRay: {
    name: 'Разрушающий Луч',
    element: {
      name: 'Воздух',
    },
  },
  Fortune: {
    name: 'Удача',
    element: {
      name: 'Воздух',
    },
  },
  LightningBolt: {
    name: 'Молния',
    element: {
      name: 'Воздух',
    },
  },
  Precision: {
    name: 'Точность',
    element: {
      name: 'Воздух',
    },
  },
  ProtectionFromAir: {
    name: 'Защита От Воздуха',
    element: {
      name: 'Воздух',
    },
  },
  AirShield: {
    name: 'Воздушный Щит',
    element: {
      name: 'Воздух',
    },
  },
  DestroyUndead: {
    name: 'Уничтожить Нежить',
    element: {
      name: 'Воздух',
    },
  },
  Hypnotize: {
    name: 'Гипноз',
    element: {
      name: 'Воздух',
    },
  },
  ChainLightning: {
    name: 'Цепная Молния',
    element: {
      name: 'Воздух',
    },
  },
  Counterstrike: {
    name: 'Ответный Удар',
    element: {
      name: 'Воздух',
    },
  },
  DimensionDoor: {
    name: 'Дверь Измерений',
    element: {
      name: 'Воздух',
    },
  },
  Fly: {
    name: 'Полёт',
    element: {
      name: 'Воздух',
    },
  },
  MagicMirror: {
    name: 'Магическое Зеркало',
    element: {
      name: 'Воздух',
    },
  },
  SummonAirElemental: {
    name: 'Элементаль Воздуха',
    element: {
      name: 'Воздух',
    },
  },
  TitansLightningBolt: {
    name: 'Стрела Титана',
    element: {
      name: 'Нейтральный',
    },
  },
}

export default spells
