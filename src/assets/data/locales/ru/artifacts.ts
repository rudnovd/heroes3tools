import type { Artifact, ArtifactKey } from '@/types'

const artifacts: Record<ArtifactKey, Pick<Artifact, 'name'>> = {
  AdmiralsHat: {
    name: 'Шляпа адмирала',
  },
  AmbassadorsSash: {
    name: 'Лента Посла',
  },
  AmuletOfTheUndertaker: {
    name: 'Амулет Гробовщика',
  },
  AngelFeatherArrows: {
    name: 'Стрелы из Ангельских Перьев',
  },
  AngelWings: {
    name: 'Крылья Ангела',
  },
  AngelicAlliance: {
    name: 'Альянс ангелов',
  },
  ArmageddonsBlade: {
    name: 'Клинок Армагеддона',
  },
  ArmorOfTheDamned: {
    name: 'Доспехи проклятого',
  },
  ArmorOfWonder: {
    name: 'Магические доспехи',
  },
  ArmsOfLegion: {
    name: 'Руки Легиона',
  },
  BadgeOfCourage: {
    name: 'Значок Смелости',
  },
  BirdOfPerception: {
    name: 'Птица Познания',
  },
  BlackshardOfTheDeadKnight: {
    name: 'Меч Мертвого Рыцаря',
  },
  BootsOfLevitation: {
    name: 'Сапоги Левитации',
  },
  BootsOfPolarity: {
    name: 'Сапоги Противодействия',
  },
  BootsOfSpeed: {
    name: 'Сапоги Скорости',
  },
  BowOfElvenCherrywood: {
    name: 'Лук из Вишневого Дерева Эльфов',
  },
  BowOfTheSharpshooter: {
    name: 'Лук Снайпера',
  },
  BowstringOfTheUnicornsMane: {
    name: 'Тетива из Волоса Гривы Единорога',
  },
  BreastplateOfBrimstone: {
    name: 'Кираса из Серного Камня',
  },
  BreastplateOfPetrifiedWood: {
    name: 'Кираса из Окаменелого Дерева',
  },
  BucklerOfTheGnollKing: {
    name: 'Щит Короля Гноллов',
  },
  CapeOfConjuring: {
    name: 'Магическая накидка',
  },
  CapeOfSilence: {
    name: 'Накидка Молчания',
  },
  CapeOfVelocity: {
    name: 'Накидка Скорости',
  },
  CardsOfProphecy: {
    name: 'Карты Пророчества',
  },
  CelestialNecklaceOfBliss: {
    name: 'Ожерелье Божественной Благодати',
  },
  CentaursAxe: {
    name: 'Секира Кентавра',
  },
  CharmOfEclipse: {
    name: 'Амулет Затмения',
  },
  CharmOfMana: {
    name: 'Амулет Маны',
  },
  CloakOfTheUndeadKing: {
    name: 'Плащ Короля Нечисти',
  },
  CloverOfFortune: {
    name: 'Клевер Удачи',
  },
  CollarOfConjuring: {
    name: 'Магический Ошейник',
  },
  Cornucopia: {
    name: 'Рог изобилия',
  },
  CrestOfValor: {
    name: 'Герб Доблести',
  },
  CrownOfDragontooth: {
    name: 'Корона из Зубов Дракона',
  },
  CrownOfTheFiveSeas: {
    name: 'Корона Пяти Морей',
  },
  CrownOfTheSupremeMagi: {
    name: 'Корона Главного Мага',
  },
  DeadMansBoots: {
    name: 'Сапоги Мертвеца',
  },
  DemonsHorseshoe: {
    name: 'Подкова Демона',
  },
  DiplomatsCloak: {
    name: 'Мантия Дипломата',
  },
  DiplomatsRing: {
    name: 'Кольцо Дипломата',
  },
  DragonScaleArmor: {
    name: 'Доспехи из Чешуи Дракона',
  },
  DragonScaleShield: {
    name: 'Щит из Чешуи Дракона',
  },
  DragonWingTabard: {
    name: 'Доспехи из Чешуи Дракона',
  },
  DragonboneGreaves: {
    name: 'Наколенники из Драконьей Кости',
  },
  ElixirOfLife: {
    name: 'Эликсир Жизни',
  },
  EmblemOfCognizance: {
    name: 'Символ Знаний',
  },
  EndlessBagOfGold: {
    name: 'Неиссякаемая Сумка Золота',
  },
  EndlessPurseOfGold: {
    name: 'Неиссякаемая Сума Золота',
  },
  EndlessSackOfGold: {
    name: 'Неиссякаемый Мешок Золота',
  },
  EquestriansGloves: {
    name: 'Перчатки Всадника',
  },
  EverflowingCrystalCloak: {
    name: 'Плащ Бесконечных Кристаллов',
  },
  EverpouringVialOfMercury: {
    name: 'Неиссякаемая Склянка Ртути',
  },
  EversmokingRingOfSulfur: {
    name: 'Вечное Кольцо Серы',
  },
  GarnitureOfInterference: {
    name: 'Колье Неприступности',
  },
  GlyphOfGallantry: {
    name: 'Знак Отваги',
  },
  GoldenBow: {
    name: 'Золотой Лук',
  },
  GoldenGoose: {
    name: 'Золотой Гусь',
  },
  GreaterGnollsFlail: {
    name: 'Кистень Великого Гнола',
  },
  HeadOfLegion: {
    name: 'Голова Легиона',
  },
  HellstormHelmet: {
    name: 'Шлем Сатанинской Ярости',
  },
  HelmOfChaos: {
    name: 'Шлем Хаоса',
  },
  HelmOfHeavenlyEnlightenment: {
    name: 'Шлем Божественного Просвещения',
  },
  HelmOfTheAlabasterUnicorn: {
    name: 'Шлем Белого Единорога',
  },
  HideousMask: {
    name: 'Устрашающая Маска',
  },
  HornOfTheAbyss: {
    name: 'Рог Бездны',
  },
  HourglassOfTheEvilHour: {
    name: 'Песочные Часы Недоброго Часа',
  },
  InexhaustibleCartOfLumber: {
    name: 'Неиссякаемая Подвода Леса',
  },
  InexhaustibleCartOfOre: {
    name: 'Неистощимая Подвода с Рудой',
  },
  IronfistOfTheOgre: {
    name: 'Железный Кулак Огра',
  },
  LadybirdOfLuck: {
    name: 'Голубка Удачи',
  },
  LegsOfLegion: {
    name: 'Ноги Легиона',
  },
  LionsShieldOfCourage: {
    name: 'Щит Львиной Храбрости',
  },
  LoinsOfLegion: {
    name: 'Поясница Легиона',
  },
  MysticOrbOfMana: {
    name: 'Магическая Медаль Маны',
  },
  NecklaceOfDragonteeth: {
    name: 'Ожерелье из Зубов Дракона',
  },
  NecklaceOfOceanGuidance: {
    name: 'Ожерелье Морского Провидения',
  },
  NecklaceOfSwiftness: {
    name: 'Ожерелье Стремительности',
  },
  OgresClubOfHavoc: {
    name: 'Карающая Дубина Огра',
  },
  OrbOfDrivingRain: {
    name: 'Сфера Проливного Дождя',
  },
  OrbOfInhibition: {
    name: 'Сфера Запрещения',
  },
  OrbOfSilt: {
    name: 'Сфера Илистого Озера',
  },
  OrbOfTempestuousFire: {
    name: 'Сфера Бушующего Огня',
  },
  OrbOfTheFirmament: {
    name: 'Сфера Небесного Свода',
  },
  OrbOfVulnerability: {
    name: 'Сфера Уязвимости',
  },
  PendantOfCourage: {
    name: 'Брелок Смелости',
  },
  PendantOfDeath: {
    name: 'Брелок Смерти',
  },
  PendantOfDispassion: {
    name: 'Амулет Бесстрастия',
  },
  PendantOfDownfall: {
    name: 'Кулон Разорения',
  },
  PendantOfFreeWill: {
    name: 'Брелок Свободы',
  },
  PendantOfHoliness: {
    name: 'Священный Брелок',
  },
  PendantOfLife: {
    name: 'Брелок Жизни',
  },
  PendantOfNegativity: {
    name: 'Брелок Отрицательности',
  },
  PendantOfReflection: {
    name: 'Кулон Отражения',
  },
  PendantOfSecondSight: {
    name: 'Брелок Ясновидения',
  },
  PendantOfTotalRecall: {
    name: 'Брелок Абсолютной Памяти',
  },
  PlateOfDyingLight: {
    name: 'Латы Гаснущих Светил',
  },
  PowerOfTheDragonFather: {
    name: 'Мощь Отца Драконов',
  },
  QuietEyeOfTheDragon: {
    name: 'Неподвижный Глаз Дракона',
  },
  RecantersCloak: {
    name: 'Плащ Отречения',
  },
  RedDragonFlameTongue: {
    name: 'Языки Пламени Красного Дракона',
  },
  RibCage: {
    name: 'Ребра',
  },
  RingOfConjuring: {
    name: 'Магическое Кольцо',
  },
  RingOfInfiniteGems: {
    name: 'Кольцо Драгоценных Камней',
  },
  RingOfLife: {
    name: 'Кольцо Жизни',
  },
  RingOfOblivion: {
    name: 'Кольцо Забвения',
  },
  RingOfSuppression: {
    name: 'Кольцо Подавления',
  },
  RingOfTheMagi: {
    name: 'Кольцо Мага',
  },
  RingOfTheWayfarer: {
    name: 'Кольцо Странника',
  },
  RingOfVitality: {
    name: 'Кольцо Жизненной Силы',
  },
  RoyalArmorOfNix: {
    name: 'Королевские Доспехи Никсов',
  },
  RunesOfImminency: {
    name: 'Руны Неизбежности',
  },
  SandalsOfTheSaint: {
    name: 'Сандалии Святых',
  },
  ScalesOfTheGreaterBasilisk: {
    name: 'Кольчуга Великого Василиска',
  },
  SeaCaptainsHat: {
    name: 'Шляпа Морского Капитана',
  },
  SealOfSunset: {
    name: 'Печать Заката',
  },
  SentinelsShield: {
    name: 'Щит Часового',
  },
  ShacklesOfWar: {
    name: 'Оковы Войны',
  },
  ShamansPuppet: {
    name: 'Кукла Шамана',
  },
  ShieldOfNavalGlory: {
    name: 'Щит Морской Славы',
  },
  ShieldOfTheDamned: {
    name: 'Щит Проклятых',
  },
  ShieldOfTheDwarvenLords: {
    name: 'Щит Гномьих Богов',
  },
  ShieldOfTheYawningDead: {
    name: 'Щит Тоскующих Мертвецов',
  },
  SkullHelmet: {
    name: 'Шлем-Череп',
  },
  Speculum: {
    name: 'Зеркало',
  },
  SpellbindersHat: {
    name: 'Шляпа оратора',
  },
  SphereOfPermanence: {
    name: 'Сфера Постоянства',
  },
  SpiritOfOppression: {
    name: 'Дух Уныния',
  },
  Spyglass: {
    name: 'Подзорная Труба',
  },
  StatesmansMedal: {
    name: 'Медаль Дипломата',
  },
  StatueOfLegion: {
    name: 'Статуя Легиона',
  },
  StillEyeOfTheDragon: {
    name: 'Застывший Глаз Дракона',
  },
  StoicWatchman: {
    name: 'Бесстрашный Хранитель',
  },
  SurcoatOfCounterpoise: {
    name: 'Мантия Равновесия',
  },
  SwordOfHellfire: {
    name: 'Адский Меч',
  },
  SwordOfJudgement: {
    name: 'Меч Правосудия',
  },
  TalismanOfMana: {
    name: 'Талисман Маны',
  },
  TargOfTheRampagingOgre: {
    name: 'Щит Яростного Огра',
  },
  ThunderHelmet: {
    name: 'Шлем Небесного Грома',
  },
  TitansCuirass: {
    name: 'Кираса Титана',
  },
  TitansGladius: {
    name: 'Гладиус Титана',
  },
  TitansThunder: {
    name: 'Грохот Титана',
  },
  TomeOfAir: {
    name: 'Книга Воздуха',
  },
  TomeOfEarth: {
    name: 'Книга Земли',
  },
  TomeOfFire: {
    name: 'Книга Огня',
  },
  TomeOfWater: {
    name: 'Книга Воды',
  },
  TorsoOfLegion: {
    name: 'Туловище Легиона',
  },
  TridentOfDominion: {
    name: 'Трезубец Могущества',
  },
  TunicOfTheCyclopsKing: {
    name: 'Туника Короля Циклопов',
  },
  VampiresCowl: {
    name: 'Мантия Вампира',
  },
  VialOfDragonBlood: {
    name: 'Пузырек с Кровью Дракона',
  },
  VialOfLifeblood: {
    name: 'Склянка Жизненной Силы',
  },
  WayfarersBoots: {
    name: 'Сапоги Странника',
  },
  WizardsWell: {
    name: 'Колодец волшебника',
  },
}

export default artifacts
