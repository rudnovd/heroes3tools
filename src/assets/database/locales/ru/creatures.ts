import type { CreatureTranslation } from '@/models/Creature'

export const creatures: Array<CreatureTranslation> = [
  {
    id: 1,
    name: 'Копейщик',
    description: 'Иммунитет к Кавалерийскому бонусу',
  },
  {
    id: 2,
    name: 'Алебардщик',
    description: 'Иммунитет к Кавалерийскому бонусу',
  },
  {
    id: 3,
    name: 'Лучник',
    description: 'Стреляет (12 выстрелов)',
  },
  {
    id: 4,
    name: 'Стрелок',
    description: 'Стреляет (24 выстрела), Стреляет дважды',
  },
  {
    id: 5,
    name: 'Грифон',
    description: 'Летающий, Два ответных удара за ход',
  },
  {
    id: 6,
    name: 'Королевский грифон',
    description: 'Летающий, Ответные удары на все атаки',
  },
  {
    id: 7,
    name: 'Рыцарь',
  },
  {
    id: 8,
    name: 'Крестоносец',
    description: 'Атакует два раза (до и после ответного удара)',
  },
  {
    id: 9,
    name: 'Монах',
    description: 'Стреляет (12 выстрелов)',
  },
  {
    id: 10,
    name: 'Фанатик',
    description: 'Стреляет (24 выстрела), Не имеет штрафа в ближнем бою',
  },
  {
    id: 11,
    name: 'Кавалерист',
    description:
      'Кавалерийский бонус - увеличение силы атаки на 5% за каждую клетку, пройденную на поле боя перед атакой',
  },
  {
    id: 12,
    name: 'Чемпион',
    description:
      'Кавалерийский бонус - увеличение силы атаки на 5% за каждую клетку, пройденную на поле боя перед атакой',
  },
  {
    id: 13,
    name: 'Ангел',
    description: 'Летающий, Ненавидит дьяволов (150% урона), +1 морали всем сущствам в армии',
  },
  {
    id: 14,
    name: 'Архангел',
    description:
      'Летающий, Ненавидит дьяволов (150% урона), +1 морали всем сущствам в армии, Воскрешает дружественное существо (один раз за бой) из расчета 100 HP на одного Архангела',
  },
  {
    id: 15,
    name: 'Кентавр',
  },
  {
    id: 16,
    name: 'Командир кентавров',
  },
  {
    id: 17,
    name: 'Гном',
    description: 'Отражает магию противника с 20% шансом',
  },
  {
    id: 18,
    name: 'Боевой гном',
    description: 'Отражает магию противника с 40% шансом',
  },
  {
    id: 19,
    name: 'Эльф',
    description: 'Стреляет (24 выстрела)',
  },
  {
    id: 20,
    name: 'Великий эльф',
    description: 'Стреляет (24 выстрела), Стреляет дважды',
  },
  {
    id: 21,
    name: 'Пегас',
    description: 'Увеличивает стоимость всех заклинаний противника на 2',
  },
  {
    id: 22,
    name: 'Серебряный пегас',
    description: 'Увеличивает стоимость всех заклинаний противника на 2',
  },
  {
    id: 23,
    name: 'Страж-дендроид',
    description:
      'После удара накладывает на противника эффект запрещающий перемещаться по полю боя (до момента пока дендроид-солдат не будет уничтожен или не сдвинется с места)',
  },
  {
    id: 24,
    name: 'Дендроид-солдат',
    description:
      'После удара накладывает на противника эффект запрещающий перемещаться по полю боя (до момента пока дендроид-солдат не будет уничтожен или не сдвинется с места)',
  },
  {
    id: 25,
    name: 'Единорог',
    description:
      'После удара накладывает на противника ослепление с 20% шансом (3 раунда), Излучает магическую ауру, которая придает 20% сопротивляемости к магии союзникам на соседних клетках',
  },
  {
    id: 26,
    name: 'Боевой единорог',
    description:
      'После удара накладывает на противника ослепление с 20% шансом (3 раунда), Излучает магическую ауру, которая придает 20% сопротивляемости к магии союзникам на соседних клетках',
  },
  {
    id: 27,
    name: 'Зеленый дракон',
    description: 'Иммунитет к заклинаниями ниже 4 уровня. Атакует на две клетки по направлению атаки',
  },
  {
    id: 28,
    name: 'Золотой дракон',
    description: 'Иммунитет к заклинаниями ниже 5 уровня. Атакует на две клетки по направлению атаки',
  },
  {
    id: 29,
    name: 'Гремлин',
  },
  {
    id: 30,
    name: 'Гремлин-вожак',
    description: 'Стреляет (8 выстрелов)',
  },
  {
    id: 31,
    name: 'Каменная горгулья',
    description: 'Неживой, Летающий',
  },
  {
    id: 32,
    name: 'Обсидиановая горгулья',
    description: 'Неживой, Летающий',
  },
  {
    id: 33,
    name: 'Каменный голем',
    description: 'Получаемый урон от магии снижен на 50%',
  },
  {
    id: 34,
    name: 'Железный голем',
    description: 'Получаемый урон от магии снижен на 75%',
  },
  {
    id: 35,
    name: 'Маг',
    description: 'Стреляет (24 выстрела), Не имеет штрафа в ближнем бою, Снижает стоимость всех заклинаний на 2',
  },
  {
    id: 36,
    name: 'Архи-маг',
    description: 'Стреляет (24 выстрела), Не имеет штрафа в ближнем бою, Снижает стоимость всех заклинаний на 2',
  },
  {
    id: 37,
    name: 'Джин',
    description: 'Летающий, Ненавидит эфритов (150% урона)',
  },
  {
    id: 38,
    name: 'Мастер джин',
    description:
      'Летающий, Ненавидит эфритов (150% урона), Накладывает одно из заклинаний на дружественное существо (3 раза за бой) (Антимагия, Бешенство, Благословление, Воздушный щит, Жажда крови, Защита от воды, Защита от воздуха, Защита от земли, Защита от огня, Каменная кожа, Ответный удар, Лечение, Магическое зеркало, Молитва, Огненный щит, Палач, Радость, Точность, Удача, Ускорение, Щит)',
  },
  {
    id: 39,
    name: 'Нага',
    description: 'Противник не наносит ответный удар',
  },
  {
    id: 40,
    name: 'Нага-королева',
    description: 'Противник не наносит ответный удар',
  },
  {
    id: 41,
    name: 'Гигант',
    description:
      'Иммунитет к заклинаниям воздействующим на разум (Берсерк, Ослепление, Забывчивость, Бешенство, Гипноз, Радость, Печаль)',
  },
  {
    id: 42,
    name: 'Титан',
    description:
      'Стреляет (24 выстрела), Иммунитет к заклинаниям воздействующим на разум (Берсерк, Ослепление, Забывчивость, Бешенство, Гипноз, Радость, Печаль), Ненавидят черных драконов (150% урона), Не имеет штрафа в ближнем бою',
  },
  {
    id: 43,
    name: 'Скелет',
    description:
      'Нежить (Всегда нейтральная мораль, Иммунитет к магии, воздействующей на разум (Берсерк, Ослепление, Забывчивость, Бешенство, Гипноз, Радость, Печаль), Иммунитет к заклинаниям (Благословление, Проклятье, Волна смерти, Воскрешение, Жертва))',
  },
  {
    id: 44,
    name: 'Скелет-воин',
    description: 'Нежить',
  },
  {
    id: 45,
    name: 'Живой мертвец',
    description: 'Нежить',
  },
  {
    id: 46,
    name: 'Зомби',
    description:
      'Нежить, При атаке с шансом 20% накладывает болезнь (атака и защита пораженного монстра снижается на 2 на три хода)',
  },
  {
    id: 47,
    name: 'Страж',
    description:
      'Нежить, При атаке с шансом 20% накладывает болезнь (атака и защита пораженного монстра снижается на 2 на три хода)',
  },
  {
    id: 48,
    name: 'Привидение',
    description: 'Нежить, Полностью регенерирует здоровье юнита в начале каждого хода',
  },
  {
    id: 49,
    name: 'Вампир',
    description:
      'Нежить, Полностью регенерирует здоровье юнита в начале каждого хода, Уменьшает запас маны противника в начале хода (2 единицы маны за каждое существо)',
  },
  {
    id: 50,
    name: 'Вампир-лорд',
    description: 'Нежить, Противник не наносит ответный удар, Поглощает здоровье равное нанесенному урону',
  },
  {
    id: 51,
    name: 'Лич',
    description:
      'Нежить, Стреляет (12 выстрелов), Смертоностное облако (при попадании выстрела наносит урон соседним живым целям от цели, не действует на элементалей, големов, гаргулий и боевые машины)',
  },
  {
    id: 52,
    name: 'Могущественный лич',
    description:
      'Нежить, Стреляет (24 выстрела), Смертоностное облако (при попадании выстрела наносит урон соседним живым целям от цели, не действует на элементалей, големов, гаргулий и боевые машины)',
  },
  {
    id: 53,
    name: 'Черный рыцарь',
    description:
      'Нежить, При атаке с вероятностью 20% накладывает Проклятие (на  3 раунда), С вероятностью в 20% наносит двойной урон',
  },
  {
    id: 54,
    name: 'Рыцарь смерти',
    description:
      'Нежить, При атаке с вероятностью 20% накладывает Проклятие (на  3 раунда), С вероятностью в 20% наносит двойной урон',
  },
  {
    id: 55,
    name: 'Костяной дракон',
    description: 'Нежить, -1 морали всем сущствам противника',
  },
  {
    id: 56,
    name: 'Дракон-привидение',
    description:
      'Нежить, -1 морали всем сущствам противника, С вероятностью 20% накладывает Старение (3 раунда наполовину снижает запас здоровья противника)',
  },
  {
    id: 57,
    name: 'Троглодит',
    description: 'Иммунитет к Ослеплению',
  },
  {
    id: 58,
    name: 'Адский троглодит',
    description: 'Иммунитет к Ослеплению',
  },
  {
    id: 59,
    name: 'Гарпия',
    description: 'После атаки возвращается на место',
  },
  {
    id: 60,
    name: 'Гарпия-ведьма',
    description: 'После атаки возвращается на место, Противник не наносит ответный удар',
  },
  {
    id: 61,
    name: 'Созерцатель',
    description: 'Стреляет (12 выстрелов), Нет штрафа в ближнем бою',
  },
  {
    id: 62,
    name: 'Злой глаз',
    description: 'Стреляет (24 выстрела), Нет штрафа в ближнем бою',
  },
  {
    id: 63,
    name: 'Медуза',
    description: 'Стреляет (4 выстрела), При атаке в ближнем бою с вероятностью 20% обращает противника в камень',
  },
  {
    id: 64,
    name: 'Королева медуза',
    description: 'Стреляет (8 выстрела), При атаке в ближнем бою с вероятностью 20% обращает противника в камень',
  },
  {
    id: 65,
    name: 'Минотавр',
    description: 'Всегда имеет положительную мораль',
  },
  {
    id: 66,
    name: 'Король-минотавр',
    description: 'Всегда имеет положительную мораль',
  },
  {
    id: 67,
    name: 'Мантикора',
    description: 'Летающий',
  },
  {
    id: 68,
    name: 'Скорпикора',
    description:
      'После атаки с вероятностью 20% парализует противника (парализованные воины не могут двигаться в течение трёх ходов, если только по ним раньше не будет нанесен удар, который и выведет их из этого состояния)',
  },
  {
    id: 69,
    name: 'Красный дракон',
    description: 'Иммунитет к заклинаниям 1-3 уровня, Атакует на две клетки по направлению атаки',
  },
  {
    id: 70,
    name: 'Черный дракон',
    description: 'Иммунитет к заклинаниям, Ненавидит Гигантов и Титанов, Атакует на две клетки по направлению атаки',
  },
  {
    id: 71,
    name: 'Бес',
  },
  {
    id: 72,
    name: 'Фамильяр',
    description:
      'При применении противником заклинания организует Канал маны и добавляет своему герою 20% маны, используемой противником для заклятия',
  },
  {
    id: 73,
    name: 'Гог',
    description: 'Стреляет (12 выстрелов)',
  },
  {
    id: 74,
    name: 'Магог',
    description:
      'Стреляет (24 выстрела), Огненный шар (при попадании выстрела поражает всех монстров в диаметре 3 клеток)',
  },
  {
    id: 75,
    name: 'Адская гончая',
  },
  {
    id: 76,
    name: 'Цербер',
    description:
      'Атакует одновременно до трёх отрядов противника, находящихся в смежных клетках, Противник не наносит ответный удар ',
  },
  {
    id: 77,
    name: 'Демон',
  },
  {
    id: 78,
    name: 'Рогатый демон',
  },
  {
    id: 79,
    name: 'Порождение зла',
  },
  {
    id: 80,
    name: 'Адское отродье',
    description:
      'Воскрешает демонов (один раз за бой), суммарное количество воскрешенных не может превышать количество существ погибшего',
  },
  {
    id: 81,
    name: 'Ифрит',
    description: 'Иммунитет к заклинаниям магии огня, Ненавидит джинов (150% урона)',
  },
  {
    id: 82,
    name: 'Султан-ифрит',
    description:
      'Иммунитет к заклинаниям магии огня, Ненавидит джинов (150% урона), Обладает естественным защитным полем, что позволяет возвратить всем монстрам, которые не имеют иммунитета к огню, 20% нанесенного ими урона',
  },
  {
    id: 83,
    name: 'Дьявол',
    description:
      'Противник не наносит ответный удар, -1 удачи всем сущствам противника, Ненавидит Ангелов и Архангелов (150% урона)',
  },
  {
    id: 84,
    name: 'Архидьявол',
    description:
      'Противник не наносит ответный удар, -1 удачи всем сущствам противника, Ненавидит Ангелов и Архангелов (150% урона)',
  },
  {
    id: 85,
    name: 'Гнолл',
  },
  {
    id: 86,
    name: 'Гнолл-мародер',
  },
  {
    id: 87,
    name: 'Ящер',
    description: 'Стреляет (12 выстрелов)',
  },
  {
    id: 88,
    name: 'Ящер-воин',
    description: 'Стреляет (24 выстрела)',
  },
  {
    id: 89,
    name: 'Змий',
    description: 'При ударе рассеивает все положительные заклинания с существа',
  },
  {
    id: 90,
    name: 'Стрекоза',
    description:
      'При ударе рассеивает все положительные заклинания с существа и накладывает Слабость (продвинутый уровень, -6 к атаке на 3 раунда)',
  },
  {
    id: 91,
    name: 'Василиск',
    description: 'При атаке с вероятностью 20% обращает противника в камень',
  },
  {
    id: 92,
    name: 'Великий василиск',
    description: 'При атаке с вероятностью 20% обращает противника в камень',
  },
  {
    id: 93,
    name: 'Горгона',
  },
  {
    id: 94,
    name: 'Могучая горгона',
    description: 'При атаке с вероятностью 10% мгновенно убивает одного монстр в стеке противника',
  },
  {
    id: 95,
    name: 'Виверна',
    description: 'Летающий',
  },
  {
    id: 96,
    name: 'Виверна-монарх',
    description:
      'При атаке с вероятностью 50% накладывает Яд (снижает на 10% НР стека от максимальных НР существа каждый раунд (включая на момент атаки), но не более 50%)',
  },
  {
    id: 97,
    name: 'Гидра',
    description: 'Атакует все смежные клетки, Противник не наносит ответный удар',
  },
  {
    id: 98,
    name: 'Гидра хаоса',
    description: 'Атакует все смежные клетки, Противник не наносит ответный удар',
  },
  {
    id: 99,
    name: 'Гоблин',
  },
  {
    id: 100,
    name: 'Хобгоблин',
  },
  {
    id: 101,
    name: 'Наездник на волках',
  },
  {
    id: 102,
    name: 'Налетчик',
    description: 'Атакует дважды',
  },
  {
    id: 103,
    name: 'Орк',
    description: 'Стреляет (12 выстрелов)',
  },
  {
    id: 104,
    name: 'Орк-вождь',
    description: 'Стреляет (24 выстрела)',
  },
  {
    id: 105,
    name: 'Огр',
  },
  {
    id: 106,
    name: 'Огр-маг',
    description: 'Накладывает Жажду Крови на дружественное существо (продвинутый уровень, +6 к атаке на 3 раунда)',
  },
  {
    id: 107,
    name: 'Птица рух',
    description: 'Летающий',
  },
  {
    id: 108,
    name: 'Птица грома',
    description:
      'При атаке с вероятностью 20% может наносит урон заклинанием Молнии (урон наносится дополнительно к основному прямому урону и равен 10xN, где N - количество Птиц Грома)',
  },
  {
    id: 109,
    name: 'Циклоп',
    description: 'Стреляет (16 выстрелов), Стреляет камнями крепостные стены',
  },
  {
    id: 110,
    name: 'Король циклопов',
    description: 'Стреляет (24 выстрела), Стреляет камнями крепостные стены',
  },
  {
    id: 111,
    name: 'Чудище',
    description: 'При атаке наносит урон игнорируя 40% защиты противника',
  },
  {
    id: 112,
    name: 'Древнее чудище',
    description: 'При атаке наносит урон игнорируя 80% защиты противника',
  },
  {
    id: 113,
    name: 'Маленькая фея',
    description: 'Летающий',
  },
  {
    id: 114,
    name: 'Фея',
    description: 'Противник не наносит ответный удар',
  },
  {
    id: 115,
    name: 'Воздушный элементаль',
    description:
      'Получает двойной урон от заклинаний: Молния, Цепная Молния, Армагеддон, Иммунитет к заклинаниям: Метеоритный Дождь, Наносит двойной урон Земляным Элементалям',
  },
  {
    id: 116,
    name: 'Элементаль шторма',
    description:
      'Стреляет (24 выстрела), Не имеет штрафа в ближнем бою*, Накладывает Защиту от Воздуха на 3 раунда, Получает двойной урон от заклинаний: Молния, Цепная Молния, Армагеддон, Иммунитет к заклинаниям: Метеоритный Дождь, Наносит двойной урон Земляным Элементалям',
  },
  {
    id: 117,
    name: 'Элементаль воды',
    description:
      'Получает двойной урон от заклинаний: Инферно, Огненный Шар, Армагеддон, Иммунитет к заклинаниям: Ледяная Молния, Кольцо Холода, Наносит двойной урон Огненным Элементалям',
  },
  {
    id: 118,
    name: 'Ледяной элементаль',
    description:
      'Стреляет (24 выстрела), Накладывает Защиту от Воды на 3 раунда, Получает двойной урон от заклинаний: Инферно, Огненный Шар, Армагеддон, Иммунитет к заклинаниям: Ледяная Молния, Кольцо Холода, Наносит двойной урон Огненным Элементалям',
  },
  {
    id: 119,
    name: 'Огненный элементаль',
    description:
      'Получает двойной урон от заклинаний: Ледяная Молния, Ледяное кольцо, Иммунитет ко всем заклинаниям магии Огня, Наносит двойной урон Водяным Элементалям',
  },
  {
    id: 120,
    name: 'Энергетический элементаль',
    description:
      'Накладывает Защиту от Огня на 3 раунда, Получает двойной урон от заклинаний: Ледяная Молния, Ледяное кольцо, Иммунитет ко всем заклинаниям магии Огня, Наносит двойной урон Водяным Элементалям',
  },
  {
    id: 121,
    name: 'Элементаль земли',
    description:
      'Получает двойной урон от заклинаний: Метеоритный Дождь, Иммунитет к заклинаниям: Молния, Цепная Молния, Армагеддон, Наносит двойной урон Воздушным Элементалям',
  },
  {
    id: 122,
    name: 'Элементаль магмы',
    description:
      'Накладывает Защиту от Земли на 3 раунда, Получает двойной урон от заклинаний: Метеоритный Дождь, Иммунитет к заклинаниям: Молния, Цепная Молния, Армагеддон, Наносит двойной урон Воздушным Элементалям',
  },
  {
    id: 123,
    name: 'Психический элементаль',
    description:
      'Атакует всех существ стоящих рядом, Не наносит ответный удар, Наносит половинный урон Черным Драконам',
  },
  {
    id: 124,
    name: 'Магический элементаль',
    description:
      'Атакует всех существ стоящих рядом, Не наносит ответный удар, Наносит половинный урон Черным Драконам, Иммунитет ко всей магии',
  },
  {
    id: 125,
    name: 'Огненная птица',
    description: 'Иммунитет к магии огня',
  },
  {
    id: 126,
    name: 'Феникс',
    description:
      'Имеет шанс восстанавливатся после смерти в количестве 20% от первоначального, Атакует на две клетки по направлению атаки, Иммунитет к магии огня',
  },
  {
    id: 127,
    name: 'Крестьянин',
  },
  {
    id: 128,
    name: 'Хоббит',
    description: 'Стреляет (24 выстрела), Всегда имеет положительную удачу',
  },
  {
    id: 129,
    name: 'Кабан',
  },
  {
    id: 130,
    name: 'Вор',
    description:
      'Позволяет получать на расстоянии 3*SP информацию о характеристиках героев противника, о составе и численности его армии, а также узнавать степень лояльности нейтральных отрядов монстров',
  },
  {
    id: 131,
    name: 'Кочевник',
    description: 'Не имеет штрафа при передвижении по песку',
  },
  {
    id: 132,
    name: 'Мумия',
    description: 'При атаке может с вероятностью накладывает Проклятие на 3 раунда',
  },
  {
    id: 133,
    name: 'Снайпер',
    description: 'Стреляет (32 выстрела), Не имеет штрафа при стрельбе, Штраф в ближнем бою 50%',
  },
  {
    id: 134,
    name: 'Тролль',
    description: 'Регенерирует здоровье в начале хода',
  },
  {
    id: 135,
    name: 'Золотой голем',
    description: 'Получаемый урон от магии снижается на 85%',
  },
  {
    id: 136,
    name: 'Алмазный голем',
    description: 'Получаемый урон от магии снижается на 95%',
  },
  {
    id: 137,
    name: 'Чародей',
    description:
      'Стреляет (32 выстрела), Три раза за бой имеет возможность применить случайное дружественное заклинание на всю армию (без пропуска хода) на 3 хода: Ускорение, Каменная Кожа, Благословление, Воздушный Щит',
  },
  {
    id: 138,
    name: 'Сказочный дракон',
    description:
      'Дракон, Летающий, 20% шанс отразить заклинание на случайный вражеское существо, Применяет атакующие заклинания (Магическая Стрела (Земля), Метеоритный Дождь (Земля), Ледяная стрела (Вода), Ледяное кольцо (Вода)Ледяное кольцо (Вода), Огненный шар (Огонь), Инферно (Огонь), Молния (Воздух), Цепная Молния (Воздух))',
  },
  {
    id: 139,
    name: 'Ржавый дракон',
    description:
      'При атаке накладывает Кислотное дыхание (снижает защиту пораженного монстра на 3 единицы до конца боя, неограниченное количетво раз, до 0 защиты), Атакует на две клетки по направлению атаки',
  },
  {
    id: 140,
    name: 'Кристальный дракон',
    description: 'Сопротивление к магии с вероятностью 20%, В конце каждой недели приносит +3 кристалла',
  },
  {
    id: 141,
    name: 'Лазурный дракон',
    description:
      'При атаке с вероятностью 10% накладывает Страх (существо пропускает ход), Не действует на Големов, Элементалей, Нежить и Мумий',
  },
  {
    id: 142,
    name: 'Баллиста',
    description: 'Стреляет (24 выстрела)',
  },
  {
    id: 143,
    name: 'Нимфа',
    description: 'Телепортация, Иммунитет к заклинаниям: Ледяная Молния, Кольцо Холода',
  },
  {
    id: 144,
    name: 'Океанида',
    description: 'Телепортация, Иммунитет к заклинаниям: Ледяная Молния, Кольцо Холода',
  },
  {
    id: 145,
    name: 'Матрос',
  },
  {
    id: 146,
    name: 'Головорез',
  },
  {
    id: 147,
    name: 'Пират',
    description: 'Стреляет (4 выстрела), Нет штрафа в ближнем бою',
  },
  {
    id: 148,
    name: 'Корсар',
    description: 'Стреляет (4 выстрела), Нет штрафа в ближнем бою, Противник не наносит ответный удар',
  },
  {
    id: 149,
    name: 'Морской Волк',
    description:
      'Стреляет (12 выстрелов), Нет штрафа в ближнем бою, Противник не наносит ответный удар, При выстреле имеет шанс применить Меткий Выстрел (каждое существо из атакующего отряда имеет X% шанс убить существо в атакованном отряде, но общее количество убитых существ не может быть больше, чем (количество существ в атакующем отряде)*X/100 (с округлением вверх). При выстреле без штрафа за расстояние X = 3, со штрафом X = 2)',
  },
  {
    id: 150,
    name: 'Дух Океана',
    description: 'Летающий',
  },
  {
    id: 151,
    name: 'Ассида',
    description: 'Кровожадность - если при атаке было убито хоть одно существо, наносится второй удар',
  },
  {
    id: 152,
    name: 'Жрица Моря',
    description:
      'При выстреле накладывает Слабость на 3 раунда или, если Слабость уже наложена, Разрушающий Луч (базовый уровень)',
  },
  {
    id: 153,
    name: 'Заклинательница',
    description:
      'При выстреле накладывает Слабость на 3 раунда или, если Слабость уже наложена, Разрушающий Луч (продвинутый уровень)',
  },
  {
    id: 154,
    name: 'Никс',
    description: 'Игнорирует 30% атаки противника при получении урона',
  },
  {
    id: 155,
    name: 'Никс-воин',
    description: 'Игнорирует 60% атаки противника при получении урона',
  },
  {
    id: 156,
    name: 'Морской Змей',
    description:
      'При атаке накладывает Яд (в начале каждого раунда яд отнимает отряду 10% здоровья, но общий отнятый ядом процент здоровья за бой не может превышать 50%) на 3 хода',
  },
  {
    id: 157,
    name: 'Аспид',
    description:
      'При атаке накладывает Яд (в начале каждого раунда яд отнимает отряду 10% здоровья, но общий отнятый ядом процент здоровья за бой не может превышать 50%) на 3 хода',
  },
  {
    id: 158,
    name: 'Фангарм',
    description:
      'Летающий, Иммунитет к заклинаниям воздействующим на разум (Берсерк, Ослепление, Забывчивость, Бешенство, Гипноз, Радость, Печаль), Ответные удары на все атаки, Накладывает Гипноз при атаке',
  },
  {
    id: 159,
    name: 'Сатир',
    description: 'Накладывает Радость на дружественное существо',
  },
  {
    id: 160,
    name: 'Лепрекон',
    description:
      'Удваивает удачу дружественных существ, Три раза за бой может наложить Удачу на дружественное существо на 6 раундов',
  },
  {
    id: 161,
    name: 'Пушка',
    description: 'Стреляет (8 выстрелов)',
  },
  {
    id: 162,
    name: 'Стальной голем',
    description: 'Получаемый урон от магии снижается на 80%',
  },
  {
    id: 163,
    name: 'Полурослик',
    description: 'Стреляет (24 выстрела), Всегда положительная удача',
  },
  {
    id: 164,
    name: 'Полурослик-Гренадёр',
    description: 'Стреляет (24 выстрела), Всегда положительная удача, При выстреле игнорирует 20% защиты противника',
  },
  {
    id: 165,
    name: 'Механик',
    description: 'Огненное дыхание, Чинит механических существ (10 здоровья за каждого Механика)',
  },
  {
    id: 166,
    name: 'Инженер',
    description: 'Огненное дыхание, Чинит механических существ (20 здоровья за каждого Механика)',
  },
  {
    id: 167,
    name: 'Броненосец',
  },
  {
    id: 168,
    name: 'Броненосец-Вожак',
  },
  {
    id: 169,
    name: 'Автоматон',
    description: 'Механический, Взрыв при гибели',
  },
  {
    id: 170,
    name: 'Автоматон-Часовой',
    description: 'Механический, Враг не отвечает на атаку, Взрыв при гибели',
  },
  {
    id: 171,
    name: 'Песчаный Червь',
    description: 'Перемещается под землёй, Иммунитет к Слепоте, Иммунитет к Окаменению',
  },
  {
    id: 172,
    name: 'Олгой-Хорхои',
    description:
      'Перемещается под землёй, Иммунитет к Слепоте, Иммунитет к Окаменению, Пожирает трупы и получает дополнительные атаки',
  },
  {
    id: 173,
    name: 'Стрелок',
    description: 'Стреляет (16 выстрелов), Упреждающий выстрел (один раз за раунд)',
  },
  {
    id: 174,
    name: 'Охотник за Головами',
    description: 'Стреляет (24 выстрела), Упреждающий выстрел (любое число за раунд)',
  },
  {
    id: 175,
    name: 'Коатль',
    description: 'Летает, Получает временную неуязвимость вместо хода',
  },
  {
    id: 176,
    name: 'Багровый Коатль',
    description: 'Летает, Получает временную неуязвимость без траты хода',
  },
  {
    id: 177,
    name: 'Дредноут',
    description: 'Механический, Может атаковать тепловым лучом без движения',
  },
  {
    id: 178,
    name: 'Джаггернаут',
    description: 'Механический, Может атаковать тепловым лучом без движения',
  },
]
