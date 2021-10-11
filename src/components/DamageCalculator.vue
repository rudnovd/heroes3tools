<template>
  <section class="damage-calculator">
    <section
      v-for="(side, sideName, index) in { attacker: battle.attacker, defender: battle.defender }"
      :key="`damage-calculator-${sideName}-${index}`"
      :class="sideName"
    >
      <section class="title">
        <h2>{{ t(`side.${[sideName]}`) }}</h2>
        <PickCreatureButton :color="sideName" @select="onSelectCreature(side, $event)">
          {{ side.activeCreature ? side.activeCreature.name : t('damageCalculator.pickCreature') }}
        </PickCreatureButton>
      </section>

      <section class="main">
        <div class="creature">
          <button v-if="side.activeCreature" class="creature-button">
            <CreaturePortrait
              :creature="side.activeCreature"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :width="58"
              :height="64"
            />
          </button>

          <BaseInputNumber
            v-if="side.activeCreature"
            :key="`${sideName}-input-creatures-count`"
            class="creature-input"
            :min="0"
            :max="9999"
            :value="side.activeCreature.count"
            :debounce="100"
            @input="side.activeCreature!.count = $event as number"
          />
        </div>

        <div class="hero">
          <SelectHero :value="side.hero" @select-hero="onSelectHero(side, $event)" />

          <div v-if="side.hero" class="hero-parameters">
            <div>
              <label class="stat-name">
                {{ t(`heroes.stats.level`) }}
              </label>
              <BaseInputNumber
                :max="99"
                :value="side.hero.level"
                :debounce="100"
                @input="side.hero!.level = $event as number"
              />
            </div>

            <InputHeroStat
              v-for="stat in ['attack', 'defense']"
              :key="`attacker-hero-${stat}`"
              :class="`parameter-${stat}`"
              :stat="stat"
              :value="side.hero.stats[stat]"
              @input="side.hero!.stats[stat] = $event as number"
            />
          </div>
        </div>
      </section>

      <section v-if="side.hero" class="skills">
        <SelectSkillButtons
          v-for="skill in data.skills"
          :key="`attacker-skill-${skill.name}-buttons`"
          color="attacker"
          :name="skill.name"
          :levels="data.levels.slice(1, data.levels.length)"
          @click="side.hero!.skills[skill.name.toLowerCase()] = $event as number"
        />
      </section>

      <section v-if="side.activeCreature" class="effects">
        <div
          v-for="(effectGroup, i) in [attackPositiveEffects, defensePositiveEffects, attackNegativeEffects]"
          :key="`attacker-effects-group-${i}`"
        >
          <template v-for="effect in effectGroup" :key="`attacker-effect-${effect}`">
            <BaseCheckbox
              color="attacker"
              :value="isEffectEnabled(side, effect)"
              :label="effect.name"
              @change="onSelectCreatureEffect(side, effect, $event as boolean)"
            />
          </template>
        </div>
      </section>

      <section v-if="side.activeCreature" class="damage">
        <strong>Damage: {{ totalDamage(side) }}</strong>
        <strong>Kills: {{ totalKills(side) }}</strong>
      </section>
    </section>

    <div class="calculator-footer">
      <SelectTerrain :terrains="data.terrains" @select-terrain="onSelectTerrain($event)" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, watch } from '@vue/runtime-core'
import { computed, reactive, ref } from '@vue/reactivity'
import type { Battle, BattleSide, DamageCalculatorBattleSide } from '@/models/Battle'
import { CreatureInstance } from '@/models/Creature'
import type { Creature } from '@/models/Creature'
import { useI18n } from 'vue-i18n'
import PickCreatureButton from '@/components/damageCalculator/PickCreatureButton.vue'
import SelectHero from '@/components/SelectHero.vue'
import { HeroInstance } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import type { Hero } from '@/models/Hero'
import type { Skill } from '@/models/Skill'
import type { Level } from '@/models/Level'
import { Spells } from '@/models/enums'
import { getDatabaseStore, initDatabaseStore } from '@/database'
import type { Terrain } from '@/models/Terrain'
import SelectTerrain from '@/components/SelectTerrain.vue'

export default defineComponent({
  name: 'DamageCalculator',
  components: {
    PickCreatureButton,
    SelectHero,
    SelectTerrain,
    CreaturePortrait: defineAsyncComponent(() => import('@/components/damageCalculator/CreaturePortrait.vue')),
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
    const battle = reactive(props.battleValue)
    const battleSides: Array<BattleSide> = ['attacker', 'defender']
    const isStarted = ref(false)

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

    watch(isStarted, (newIsStarted) => {
      if (newIsStarted) isStarted.value = false
    })

    let data = reactive({
      skills: [] as Array<Skill>,
      levels: [] as Array<Level>,
      spells: [] as Array<Spell>,
      terrains: [] as Array<Terrain>,
    })

    getDatabaseStore('creatures').then((creatures) => {
      if (!creatures.length) {
        initDatabaseStore('classes')
        initDatabaseStore('creatures')
        initDatabaseStore('heroes')
        initDatabaseStore('levels').then((result) => (data.levels = result))
        initDatabaseStore('skills').then((result) => (data.skills = result))
        initDatabaseStore('spells').then((result) => (data.spells = result))
        initDatabaseStore('terrains').then((result) => (data.terrains = result))
        initDatabaseStore('towns')
      }
    })

    const totalDamage = (side: DamageCalculatorBattleSide) => {
      const { minDamage, maxDamage, averageDamage } = side.activeCreature!.calculation
      if (minDamage > 0 && minDamage !== maxDamage) {
        return `${minDamage} — ${maxDamage} (~ ${averageDamage})`
      } else if (minDamage > 0 && minDamage === maxDamage) {
        return minDamage
      } else {
        return 0
      }
    }

    const totalKills = (side: DamageCalculatorBattleSide) => {
      const { minKills, maxKills, averageKills } = side.activeCreature!.calculation
      if (minKills > 0 && minKills !== maxKills) {
        return `${minKills} — ${maxKills} (~ ${averageKills})`
      } else if (minKills > 0 && minKills === maxKills) {
        return minKills
      } else {
        return 0
      }
    }

    const attackPositiveEffectsIds = [
      Spells.Bless,
      Spells.Bloodlust,
      Spells.Frenzy,
      Spells.Prayer,
      Spells.Precision,
      Spells.Slayer,
    ]

    const attackPositiveEffects = computed(() => {
      return data.spells.filter((spell) => attackPositiveEffectsIds.indexOf(spell.id) !== -1)
    })

    const defensePositiveEffectsIds = [Spells.Shield, Spells.StoneSkin, Spells.AirShield]
    const defensePositiveEffects = computed(() => {
      return data.spells.filter((spell) => defensePositiveEffectsIds.indexOf(spell.id) !== -1)
    })

    const attackNegativeEffectsIds = [Spells.Curse, Spells.Weakness, Spells.DisruptingRay]
    const attackNegativeEffects = computed(() => {
      return data.spells.filter((spell) => attackNegativeEffectsIds.indexOf(spell.id) !== -1)
    })

    const onSelectCreature = (side: DamageCalculatorBattleSide, creature: unknown) => {
      const newCreature = new CreatureInstance(creature as Creature)

      if (side.activeCreature) {
        newCreature.count = side.activeCreature.count
      }

      side.activeCreature = newCreature
      side.creatures[0] = newCreature
    }

    const onSelectHero = (side: DamageCalculatorBattleSide, hero: unknown) => {
      side.hero = null

      if (hero) {
        const newHero = new HeroInstance(hero as Hero)
        newHero.initialize().finally(() => {
          side.hero = newHero
        })
      } else {
        side.hero = null
      }
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

    const onSelectTerrain = (terrain: unknown) => {
      battle.attacker.terrain = null
      battle.defender.terrain = null

      if (terrain) {
        battle.attacker.terrain = terrain as Terrain
        battle.defender.terrain = terrain as Terrain
      }
    }

    return {
      t,
      battle,
      data,
      attackPositiveEffects,
      defensePositiveEffects,
      attackNegativeEffects,

      totalDamage,
      totalKills,

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
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.5);
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;

  @include media-large {
    grid-template-columns: 50% 50%;
    grid-template-rows: 85vh auto;
  }
}

.attacker,
.defender {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr 2fr 2fr 1fr;
  padding: 10px;
  gap: 1rem;

  @include media-large {
    padding: 20px;
  }
}

.title {
  display: grid;
  column-gap: 0.5rem;
  align-items: center;
  grid-template-areas: 'title button';
}

.main {
  display: grid;
  margin-bottom: 2rem;
  column-gap: 0.5rem;
}

.creature {
  display: grid;
  gap: 0.5rem;
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
    border-bottom: 0;
    border-right: 1px solid rgb(222, 226, 230);
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
    grid-template-columns: 1fr minmax(auto, 33.3%);
    grid-template-areas: 'button title';
  }
  .title h2 {
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: title;
  }

  .main {
    grid-template-columns: auto minmax(auto, 33.3%);
    grid-template-areas: 'hero creature';
  }

  .creature {
    grid-area: creature;
    justify-content: end;
  }
}

.creature-input {
  width: 65px;
  height: 32px;
}

.creature-button {
  display: block;
  height: 64px;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 58px;
  z-index: 1;

  &::after {
    background-color: hsla(0, 0%, 100%, 0.2);
    bottom: -50%;
    content: '';
    position: absolute;
    top: -50%;
    transform: translate3d(-525%, 0, 0) rotate(35deg);
    width: 1.25em;
    z-index: -1;
  }

  &:hover::after {
    transform: translate3d(200%, 0, 0) rotate(35deg);
    transition: transform 0.45s ease-in-out;
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
  padding: 5px;
  justify-content: flex-end;
  grid-column: 1 / -1;
  border-top: 1px solid rgb(222, 226, 230);

  .multiselect {
    margin: 0;
    width: 300px;
  }
}
</style>
