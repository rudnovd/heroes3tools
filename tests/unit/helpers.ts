import artifacts from '@/assets/data/artifacts'
import classes from '@/assets/data/classes'
import creatures from '@/assets/data/creatures'
import heroes from '@/assets/data/heroes'
import levels from '@/assets/data/levels'
import skills from '@/assets/data/skills'
import spells from '@/assets/data/spells'
import terrains from '@/assets/data/terrains'
import towns from '@/assets/data/towns'
import type {
  Artifact,
  ArtifactKey,
  Creature,
  CreatureKey,
  Hero,
  HeroClass,
  HeroClassKey,
  HeroKey,
  Level,
  Skill,
  SkillKey,
  SkillLevelKey,
  Spell,
  SpellKey,
  Terrain,
  TerrainKey,
  Town,
  TownKey,
} from '@/types'

export const data = {
  artifacts: artifacts.reduce((previous, artifact) => {
    return {
      ...previous,
      [artifact.key]: artifact,
    }
  }, {}) as Record<ArtifactKey, Artifact>,
  classes: classes.reduce((previous, heroClass) => {
    return {
      ...previous,
      [heroClass.key]: heroClass,
    }
  }, {}) as Record<HeroClassKey, HeroClass>,
  creatures: creatures.reduce((previous, creature) => {
    return {
      ...previous,
      [creature.key]: creature,
    }
  }, {}) as Record<CreatureKey, Creature>,
  heroes: heroes.reduce((previous, hero) => {
    return {
      ...previous,
      [hero.key]: hero,
    }
  }, {}) as Record<HeroKey, Hero>,
  levels: levels.reduce((previous, level) => {
    return {
      ...previous,
      [level.key]: level,
    }
  }, {}) as Record<SkillLevelKey, Level>,
  skills: skills.reduce((previous, skill) => {
    return {
      ...previous,
      [skill.key]: skill,
    }
  }, {}) as Record<SkillKey, Skill>,
  spells: spells.reduce((previous, spell) => {
    return {
      ...previous,
      [spell.key]: spell,
    }
  }, {}) as Record<SpellKey, Spell>,
  terrains: terrains.reduce((previous, terrain) => {
    return {
      ...previous,
      [terrain.key]: terrain,
    }
  }, {}) as Record<TerrainKey, Terrain>,
  towns: towns.reduce((previous, town) => {
    return {
      ...previous,
      [town.key]: town,
    }
  }, {}) as Record<TownKey, Town>,
}
