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
          {{ side.activeCreature ? side.activeCreature.name : t('components.damageCalculator.pickCreature') }}
        </PickCreatureButton>
      </section>

      <section class="main">
        <div class="creature">
          <!-- Creature portrait -->
          <button v-if="side.activeCreature" class="creature-button">
            <ObjectPortrait
              :file="{ name: side.activeCreature.id, alt: side.activeCreature.name }"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :width="58"
              :height="64"
            />
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
            @input="side.activeCreature!.count = $event"
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
              <label class="stat-name">
                {{ t('data.level') }}
              </label>
              <BaseInputNumber :max="99" :value="side.hero.level" :debounce="50" @input="side.hero!.level = $event" />
            </div>

            <InputHeroStat
              v-for="stat in ['attack', 'defense']"
              :key="`attacker-hero-${stat}`"
              :class="`parameter-${stat}`"
              :stat="stat"
              :value="side.hero.stats[stat]"
              @input="side.hero!.stats[stat] = $event"
            />
          </div>
        </div>
      </section>

      <section v-if="side.hero" class="skills">
        <SelectSkillButtons
          v-for="(skill, key) in skills"
          :key="`${sideName}-skill-${key}-buttons`"
          :color="sideName"
          :name="skill"
          :value="side.hero.skills[key] || 0"
          :levels="levels.slice(1, levels.length)"
          @click="side.hero!.skills[key] = $event"
        />
      </section>

      <section v-if="side.activeCreature" class="effects">
        <div v-for="(effectGroup, i) in effects" :key="`attacker-effects-group-${i}`">
          <template v-for="effect in effectGroup" :key="`attacker-effect-${effect}`">
            <BaseCheckbox
              :color="sideName"
              :value="isEffectEnabled(side, effect)"
              :label="effect.name"
              @change="onSelectCreatureEffect(side, effect, $event)"
            />
          </template>
        </div>
      </section>

      <section v-if="side.activeCreature" class="damage">
        <strong>
          <!-- Damage result -->
          {{ t('components.damageCalculator.damage') }}:
          {{
            getTotalResultString(
              side.activeCreature.calculation.minDamage,
              side.activeCreature.calculation.maxDamage,
              side.activeCreature.calculation.averageDamage,
            )
          }}
        </strong>
        <strong>
          <!-- Kills result -->
          {{ t('components.damageCalculator.kills') }}:
          {{
            getTotalResultString(
              side.activeCreature.calculation.minKills,
              side.activeCreature.calculation.maxKills,
              side.activeCreature.calculation.averageKills,
            )
          }}
        </strong>
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
import PickCreatureButton from '@/components/PickCreatureButton.vue'
import SelectHero from '@/components/SelectHero.vue'
import SelectTerrain from '@/components/SelectTerrain.vue'
import type { Battle, DamageCalculatorBattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import { CreatureInstance } from '@/models/Creature'
import { SecondarySkills } from '@/models/enums'
import type { Hero } from '@/models/Hero'
import { HeroInstance } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import type { Terrain } from '@/models/Terrain'
import { useStore } from '@/store'
import { computed, defineAsyncComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))
const BaseInputNumber = defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue'))
const InputHeroStat = defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue'))
const SelectSkillButtons = defineAsyncComponent(() => import('@/components/damageCalculator/SelectSkillButtons.vue'))
const BaseCheckbox = defineAsyncComponent(() => import('@/components/base/BaseCheckbox.vue'))

const props = defineProps<{
  battleValue: Battle
}>()

const { t } = useI18n()
const store = useStore()

const battle = reactive(props.battleValue)
const heroes = computed(() => store.heroes)
const terrains = computed(() => store.terrains)
const levels = computed(() => store.levels)
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
  const damageCalculatorSkills = ['air', 'archery', 'armorer', 'artillery', 'earth', 'fire', 'offense', 'water']
  const skills = {}
  store.skills
    .filter((skill) => damageCalculatorSkillsIds.includes(skill.id))
    .forEach((skill, index) => (skills[damageCalculatorSkills[index]] = skill.name))
  return skills
})
const effects = computed(() => [store.attackPositiveEffects, store.defensePositiveEffects, store.attackNegativeEffects])

// Return string of total damage or total kills
const getTotalResultString = (min: number, max: number, average: number) => {
  if (min !== max) return `${min} — ${max} (~ ${average})`
  else if (min === max) return min
  else return 0
}

const onSelectCreature = (side: DamageCalculatorBattleSide, creature: Creature) => {
  const creatureInstance = new CreatureInstance(creature)
  if (side.activeCreature) creatureInstance.count = side.activeCreature.count
  side.activeCreature = creatureInstance
  side.creatures[0] = creatureInstance
}

const onSelectHero = (side: DamageCalculatorBattleSide, hero: Hero) => {
  side.hero = new HeroInstance(hero)
}

const onSelectCreatureEffect = (side: DamageCalculatorBattleSide, spell: Spell, effectEnabled: boolean) => {
  if (!side.activeCreature) return

  if (!effectEnabled) {
    side.activeCreature.effects.push(spell)
  } else {
    side.activeCreature.effects = side.activeCreature.effects.filter((creatureEffect) => creatureEffect.id !== spell.id)
  }
}

const isEffectEnabled = (side: DamageCalculatorBattleSide, spell: Spell) => {
  return side.activeCreature?.effects.findIndex((creatureEffect) => creatureEffect.id === spell.id) !== -1
}

const onSelectTerrain = (terrain: Terrain | null) => {
  battle.attacker.terrain = terrain
  battle.defender.terrain = terrain
}
</script>

<style lang="scss" scoped>
.damage-calculator {
  display: grid;
  grid-template-rows: minmax(50vh, 1fr) 1fr;
  grid-template-columns: 100%;
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.5);

  @include media-large {
    grid-template-rows: minmax(80vh, auto) 1fr;
    grid-template-columns: 50% 50%;
  }

  @include media-maximum {
    grid-template-rows: minmax(84vh, auto) 1fr;
  }
}

.attacker,
.defender {
  display: grid;
  grid-template-rows: repeat(4, min-content) auto;
  gap: 1rem;
  padding: 10px;

  @include media-large {
    padding: 20px;
  }
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
  padding-left: 4px;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
}

.skills {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 0;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1rem;
  }
}

.attacker {
  border-bottom: 1px solid var(--color-border);
  transition:
    border-bottom 0.2s linear,
    border-right 0.2s linear;

  @include media-large {
    border-right: 1px solid var(--color-border);
    border-bottom: 0;
  }

  .title {
    grid-template-columns: minmax(auto, 40%) 1fr;
  }

  .main {
    grid-template-columns: minmax(auto, 40%) 1fr;
  }
}

.defender {
  .title {
    grid-template-areas: 'button title';
    grid-template-columns: 1fr minmax(auto, 40%);
  }
  .title > h2 {
    grid-area: title;
    text-align: right;
  }

  .main {
    grid-template-areas: 'hero creature';
    grid-template-columns: auto minmax(auto, 40%);
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
    background-color: hsla(0, 0%, 100%, 0.2);
    transform: translate3d(-525%, 0, 0) rotate(35deg);
  }

  &:hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translate3d(200%, 0, 0) rotate(35deg);
  }
}

.creature-img {
  position: relative;
  z-index: -1;
}

.unit-effect-checkbox {
  margin-bottom: 1rem;
}

.select-skill-buttons {
  @include media-large {
    &:nth-child(even) {
      text-align: center;
    }
  }
}

.hero-parameters {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-gap: 8px;

  & > div {
    width: 64px;
  }

  .parameter-attack {
    margin-left: auto;
  }
}
.damage {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 1.5rem;
  text-align: right;
}

.stat-name {
  display: block;
  margin-bottom: 10px;
}

.calculator-footer {
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
  padding: 5px;
  border-top: 1px solid var(--color-border);
  transition: border-top 0.2 linear;
}

.select-terrain {
  width: 300px;
}
</style>
