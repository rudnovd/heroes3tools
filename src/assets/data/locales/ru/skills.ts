import type { Skill, SkillKey } from '@/types'

const skills: Record<SkillKey, Pick<Skill, 'name'>> = {
  AirMagic: {
    name: 'Магия Воздуха',
  },
  Archery: {
    name: 'Стрельба',
  },
  Armorer: {
    name: 'Доспехи',
  },
  Artillery: {
    name: 'Артиллерия',
  },
  Ballistics: {
    name: 'Балистика',
  },
  Diplomacy: {
    name: 'Дипломатия',
  },
  EagleEye: {
    name: 'Зоркость',
  },
  EarthMagic: {
    name: 'Магия Земли',
  },
  Estates: {
    name: 'Имущество',
  },
  FireMagic: {
    name: 'Магия Огня',
  },
  FirstAid: {
    name: 'Первая Помощь',
  },
  Intelligence: {
    name: 'Интеллект',
  },
  Leadership: {
    name: 'Лидерство',
  },
  Learning: {
    name: 'Обучение',
  },
  Logistics: {
    name: 'Логистика',
  },
  Luck: {
    name: 'Удача',
  },
  Mysticism: {
    name: 'Мистицизм',
  },
  Navigation: {
    name: 'Навигация',
  },
  Necromancy: {
    name: 'Некромантия',
  },
  Offense: {
    name: 'Атака',
  },
  Pathfinding: {
    name: 'Поиск пути',
  },
  Resistance: {
    name: 'Сопротивление',
  },
  Scholar: {
    name: 'Грамотность',
  },
  Scouting: {
    name: 'Разведка',
  },
  Sorcery: {
    name: 'Волшебство',
  },
  Tactics: {
    name: 'Тактика',
  },
  WaterMagic: {
    name: 'Магия Воды',
  },
  Wisdom: {
    name: 'Мудрость',
  },
  Interference: {
    name: 'Помехи',
  },
}

export default skills
