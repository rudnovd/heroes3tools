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
          v-for="skill in skills"
          :key="`${sideName}-skill-${skill.name}-buttons`"
          :color="sideName"
          :name="skill.name"
          :levels="levels.slice(1, levels.length)"
          @click="side.hero!.skills[skill.name.toLowerCase()] = $event"
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
              side.activeCreature.calculation.averageDamage
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
              side.activeCreature.calculation.averageKills
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

<script lang="ts">
import PickCreatureButton from '@/components/PickCreatureButton.vue'
import SelectHero from '@/components/SelectHero.vue'
import SelectTerrain from '@/components/SelectTerrain.vue'
import type { Battle, DamageCalculatorBattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import { CreatureInstance } from '@/models/Creature'
import type { Hero } from '@/models/Hero'
import { HeroInstance } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import type { Terrain } from '@/models/Terrain'
import { useStore } from '@/store'
import { defineAsyncComponent, defineComponent, watch } from '@vue/runtime-core'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DamageCalculator',
  components: {
    PickCreatureButton,
    SelectHero,
    SelectTerrain,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
    BaseInputNumber: defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue')),
    InputHeroStat: defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue')),
    SelectSkillButtons: defineAsyncComponent(() => import('@/components/damageCalculator/SelectSkillButtons.vue')),
    BaseCheckbox: defineAsyncComponent(() => import('@/components/base/BaseCheckbox.vue')),
  },
  props: {
    battleValue: {
      type: Object as () => Battle,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n()
    const store = useStore()

    const battle = reactive(props.battleValue)
    const isStarted = ref(false)
    const heroes = computed(() => store.heroes)
    const terrains = computed(() => store.terrains)
    const levels = computed(() => store.levels)
    const skills = computed(() => store.skills)
    const effects = computed(() => [
      store.attackPositiveEffects,
      store.defensePositiveEffects,
      store.attackNegativeEffects,
    ])

    // Calculate damage values when attacker or defender props changed
    watch(
      [battle.attacker, battle.defender],
      () => {
        if (!isStarted.value) {
          battle.calculate()
          isStarted.value = true
        }
      },
      { deep: true }
    )

    // Watch isStarted ref for prevent infinite calculating
    watch(isStarted, (newIsStarted) => {
      if (newIsStarted) isStarted.value = false
    })

    // Return string of total damage or total kills
    const getTotalResultString = (min: number, max: number, average: number) => {
      if (min > 0 && min !== max) return `${min} — ${max} (~ ${average})`
      else if (min > 0 && min === max) return min
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
        side.activeCreature.effects = side.activeCreature.effects.filter((e) => e.id !== spell.id)
      }
    }

    const isEffectEnabled = (side: DamageCalculatorBattleSide, spell: Spell) => {
      return side.activeCreature!.effects.findIndex((e) => e.id === spell.id) !== -1
    }

    const onSelectTerrain = (terrain: Terrain | null) => {
      battle.attacker.terrain = terrain
      battle.defender.terrain = terrain
    }

    return {
      t,

      battle,
      heroes,
      terrains,
      levels,
      skills,
      effects,

      getTotalResultString,
      onSelectCreature,
      onSelectHero,
      onSelectCreatureEffect,
      isEffectEnabled,
      onSelectTerrain,
    }
  },
})
</script>

<style lang="scss" scoped>
.damage-calculator {
  display: grid;
  grid-template-rows: minmax(50vh, 1fr) 1fr;
  grid-template-columns: 100%;
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.5);

  @include media-large {
    grid-template-rows: 85vh 1fr;
    grid-template-columns: 50% 50%;
  }
}

.attacker,
.defender {
  display: grid;
  grid-template-rows: auto 1fr 2fr 2fr 1fr;
  grid-template-columns: 100%;
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
  margin-bottom: 2rem;
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
}

.skills {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 0;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
    gap: 0 1rem;
  }
}

.attacker {
  border-bottom: 1px solid rgb(222, 226, 230);

  @include media-large {
    border-right: 1px solid rgb(222, 226, 230);
    border-bottom: 0;
  }

  .title {
    grid-template-columns: minmax(auto, 33.3%) 1fr;
  }

  .main {
    grid-template-columns: minmax(auto, 33.3%) 1fr;
  }
}

.defender {
  .title {
    grid-template-areas: 'button title';
    grid-template-columns: 1fr minmax(auto, 33.3%);
  }
  .title > h2 {
    grid-area: title;
    text-align: right;
  }

  .main {
    grid-template-areas: 'hero creature';
    grid-template-columns: auto minmax(auto, 33.3%);
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
  display: flex;

  .parameter-attack {
    margin-right: 2rem;
    margin-left: auto;
  }
}
.damage {
  font-size: 1.2rem;
  text-align: right;

  & strong {
    display: block;
  }

  strong:first-child {
    margin-bottom: 1rem;
  }
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
  border-top: 1px solid rgb(222, 226, 230);
}

.select-terrain {
  width: 300px;
}
</style>
