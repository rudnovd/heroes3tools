<template>
  <section class="damage-calculator">
    <section
      v-for="(side, sideName, index) in { attacker: battle.attacker, defender: battle.defender }"
      :key="`damage-calculator-${sideName}-${index}`"
      :class="sideName"
    >
      <section class="title">
        <h2>{{ t(`data.${sideName}`) }}</h2>
        <PickCreatureButton :color="sideName" @select="onSelectCreature(side, $event)">
          {{ side.activeCreature ? side.activeCreature.name : $t('components.damageCalculator.pickCreature') }}
        </PickCreatureButton>
      </section>
      <section class="main">
        <div class="creature">
          <!-- Creature portrait -->
          <button v-if="side.activeCreature" class="creature-button">
            <img
              class="creature-img"
              :src="`/images/creatures/portraits/big/${side.activeCreature.id}.webp`"
              :alt="side.activeCreature.name"
              width="58px"
              height="64px"
            >
          </button>
          <!-- Input creatures count -->
          <BaseInputNumber
            v-if="side.activeCreature"
            :key="`${sideName}-input-creatures-count`"
            class="creature-input"
            :min="0"
            :max="9999"
            :value="side.activeCreature.count"
            :debounce="50"
            @input="side.activeCreature.count = $event"
          />
        </div>
        <div class="hero">
          <SelectHero
            :value="side.hero"
            :heroes="heroes"
            @select="onSelectHero(side, $event)"
            @clear="side.hero = null"
          />
          <div v-if="side.hero" class="hero-parameters">
            <div>
              <label :for="`${sideName}-hero-level-input-${id}`" class="stat-name">
                {{ $t('data.level') }}
              </label>
              <BaseInputNumber
                :id="`${sideName}-hero-level-input-${id}`"
                :max="74"
                :value="side.hero.level"
                :debounce="50"
                @input="side.hero.level = $event"
              />
            </div>
            <InputHeroStat
              v-for="stat in ['attack', 'defense']"
              :key="`attacker-hero-${stat}`"
              :class="`parameter-${stat}`"
              :stat="stat"
              :value="side.hero.stats[stat]"
              @input="side.hero.stats[stat] = $event"
            />
          </div>
        </div>
      </section>
      <section v-if="side.hero" class="skills">
        <SkillsForm
          v-for="(skill, key) in skills"
          :key="`${sideName}-skill-${key}-buttons`"
          v-model="side.hero.skills[key]"
          :color="sideName"
          :name="skill"
          :levels="levels.slice(1, levels.length)"
        />
      </section>
      <section v-if="side.activeCreature" class="effects">
        <fieldset v-for="group in effects" :key="`attacker-effects-group-${group.title}`" class="effects__group" :class="`color-${sideName}`">
          <legend class="skill-name">
            <span>{{ group.title }}</span>
          </legend>
          <ul class="skills-form__list">
            <li v-for="effect in group.spells" :key="`attacker-effect-${effect}`">
              <BaseCheckbox
                :color="sideName"
                :model-value="isEffectEnabled(side, effect)"
                :label="effect.name"
                @change="onSelectCreatureEffect(side, effect, $event)"
              />
            </li>
          </ul>
        </fieldset>
      </section>
      <section v-if="side.activeCreature && side.activeCreature.count" class="results">
        <div class="results-text">
          {{ $t('components.damageCalculator.damage') }}:
          <span class="tabular-num">
            {{
              getTotalResultString(
                side.activeCreature.calculation.minDamage,
                side.activeCreature.calculation.maxDamage,
                side.activeCreature.calculation.averageDamage,
              )
            }}
          </span>
        </div>
        <div class="results-text">
          {{ $t('components.damageCalculator.kills') }}:
          <span class="tabular-num">
            {{
              getTotalResultString(
                side.activeCreature.calculation.minKills,
                side.activeCreature.calculation.maxKills,
                side.activeCreature.calculation.averageKills,
              )
            }}
          </span>
        </div>
      </section>
    </section>
    <div class="calculator-footer">
      <div class="select-terrain">
        <SelectTerrain
          :value="battle.attacker.terrain"
          :terrains="terrains"
          @select="onSelectTerrain($event)"
          @clear="onSelectTerrain(null)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Battle, DamageCalculatorBattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import type { Hero } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import type { Terrain } from '@/models/Terrain'
import { computed, defineAsyncComponent, reactive, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import PickCreatureButton from '@/components/PickCreatureButton.vue'
import SelectHero from '@/components/SelectHero.vue'
import SelectTerrain from '@/components/SelectTerrain.vue'
import { CreatureInstance } from '@/models/Creature'
import { SecondarySkills } from '@/models/enums'
import { HeroInstance } from '@/models/Hero'
import { useStore } from '@/store'

const props = defineProps<{
  battleValue: Battle
}>()
const BaseInputNumber = defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue'))
const InputHeroStat = defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue'))
const SkillsForm = defineAsyncComponent(() => import('@/components/damageCalculator/SkillsForm.vue'))
const BaseCheckbox = defineAsyncComponent(() => import('@/components/base/BaseCheckbox.vue'))

const { t } = useI18n()
const store = useStore()
const id = useId()

const battle = reactive(props.battleValue)
const heroes = computed(() => store.heroes)
const terrains = computed(() => store.terrains)
const levels = computed(() => store.levels)
type SecondarySkillKey = 'air' | 'archery' | 'armorer' | 'artillery' | 'earth' | 'fire' | 'offense' | 'water'
const skills = computed(() => {
  const damageCalculatorSkillsIds = [
    SecondarySkills.Offense,
    SecondarySkills.AirMagic,
    SecondarySkills.Armorer,
    SecondarySkills.FireMagic,
    SecondarySkills.Archery,
    SecondarySkills.EarthMagic,
    SecondarySkills.Artillery,
    SecondarySkills.WaterMagic,
  ]
  const damageCalculatorSkills: SecondarySkillKey[] = ['air', 'archery', 'armorer', 'artillery', 'earth', 'fire', 'offense', 'water']
  const skills: Record<SecondarySkillKey, string> = {} as Record<SecondarySkillKey, string>
  store.skills
    .filter(skill => damageCalculatorSkillsIds.includes(skill.id))
    .forEach((skill, index) => { skills[damageCalculatorSkills[index]] = skill.name })
  return skills
})
const effects = computed(() => {
  return [
    { title: t('components.damageCalculator.effectGroups.attack'), spells: store.attackPositiveEffects },
    { title: t('components.damageCalculator.effectGroups.defense'), spells: store.defensePositiveEffects },
    { title: t('components.damageCalculator.effectGroups.weakening'), spells: store.attackNegativeEffects },
  ]
})

// Return string of total damage or total kills
function getTotalResultString(min: number, max: number, average: number) {
  if (min !== max) return `${min} — ${max} (~ ${average})`
  if (min === max) return min
  return 0
}

function onSelectCreature(side: DamageCalculatorBattleSide, creature: Creature) {
  const creatureInstance = new CreatureInstance(creature)
  if (side.activeCreature)
    creatureInstance.count = side.activeCreature.count
  side.activeCreature = creatureInstance
  side.creatures[0] = creatureInstance
}

function onSelectHero(side: DamageCalculatorBattleSide, hero: Hero) {
  side.hero = new HeroInstance(hero)
}

function onSelectCreatureEffect(side: DamageCalculatorBattleSide, spell: Spell, effectEnabled: boolean) {
  if (!side.activeCreature) return
  if (!effectEnabled) {
    side.activeCreature.effects.push(spell)
  }
  else {
    side.activeCreature.effects = side.activeCreature.effects.filter(creatureEffect => creatureEffect.id !== spell.id)
  }
}

function isEffectEnabled(side: DamageCalculatorBattleSide, spell: Spell) {
  return side.activeCreature?.effects.findIndex(creatureEffect => creatureEffect.id === spell.id) !== -1
}

function onSelectTerrain(terrain: Terrain | null) {
  battle.attacker.terrain = terrain
  battle.defender.terrain = terrain
}
</script>

<style>
.damage-calculator {
  display: grid;
  grid-template-rows: minmax(50vh, 1fr) 1fr;
  grid-template-columns: 100%;
  background-color: var(--color-bg-deep);
  box-shadow: 0 0 3px var(--color-border);
  @media screen and (width >= 1280px) {
    grid-template-rows: minmax(80vh, auto) 1fr;
    grid-template-columns: 50% 50%;
  }
  @media screen and (width >= 1920px) {
    grid-template-rows: minmax(84vh, auto) 1fr;
  }
  .attacker,
  .defender {
    display: grid;
    grid-template-rows: repeat(4, min-content) auto;
    gap: 1rem;
    padding: 0.5rem;
  }
  .title {
    display: grid;
    grid-template-areas: 'title button';
    column-gap: 0.5rem;
    align-items: center;
    & > h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .main {
    display: grid;
    column-gap: 0.5rem;
  }
  .creature {
    display: grid;
    gap: 0.5rem;
    .creature-input {
      width: 65px;
      height: 32px;
    }
  }
  .hero {
    display: grid;
    grid-template-columns: auto;
    grid-auto-rows: auto auto;
    gap: 1rem;
  }
  .effects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    & > div {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .effects__group {
      .skill-name {
        padding-inline: 4px;
      }
      &.color-attacker .skill-name {
        background: var(--color-attacker);
      }
      &.color-defender .skill-name {
        background: var(--color-defender);
      }
    }
  }
  .skills {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem 0;
    @media screen and (width >= 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
  }
  .attacker {
    border-bottom: 1px solid var(--color-border);
    transition:
      border-bottom 0.2s linear,
      border-right 0.2s linear;
    @media screen and (width >= 1280px) {
      border-right: 1px solid var(--color-border);
      border-bottom: 0;
    }
    .title {
      grid-template-columns: minmax(auto, 50%) 1fr;
    }
    .main {
      grid-template-columns: minmax(auto, 50%) 1fr;
    }
  }
  .defender {
    .title {
      grid-template-areas: 'button title';
      grid-template-columns: 1fr minmax(auto, 50%);
    }
    .title > h2 {
      grid-area: title;
      text-align: right;
    }
    .main {
      grid-template-areas: 'hero creature';
      grid-template-columns: auto minmax(auto, 50%);
    }
    .creature {
      grid-area: creature;
      justify-content: end;
    }
  }
  .creature-button {
    position: relative;
    z-index: 1;
    display: block;
    width: 58px;
    height: 64px;
    padding: 0;
    overflow: hidden;
    &::after {
      position: absolute;
      top: -50%;
      bottom: -50%;
      z-index: -1;
      width: 1.25em;
      content: '';
      background-color: hsl(0deg 0% 100% / 20%);
      transform: translate3d(-525%, 0, 0) rotate(35deg);
    }
    &:hover::after {
      transform: translate3d(200%, 0, 0) rotate(35deg);
      transition: transform 0.45s ease-in-out;
    }
  }
  .unit-effect-checkbox {
    margin-bottom: 1rem;
  }
  .hero-parameters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: column;
    gap: 8px;
    & > div {
      width: 64px;
    }
    .parameter-attack {
      margin-left: auto;
    }
  }
  .results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 1.5rem;
    text-align: right;
    .results-text {
      font-weight: 600;
    }
  }
  .calculator-footer {
    display: flex;
    grid-column: 1 / -1;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid var(--color-border);
    transition: border-top 0.2s linear;
  }
  .select-terrain {
    width: 300px;
  }
}
</style>
