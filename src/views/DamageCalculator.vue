<template>
  <section class="damage-calculator-page">
    <div class="calculator-tabs">
      <div
        v-for="(calculator, index) in calculators"
        :key="`calculator-tab-${index}`"
        class="tab"
        :class="{ active: index === activeIndex }"
        :title="calculatorTitle(calculator)"
      >
        <div class="tab-title" @click="activeIndex = $event">
          {{ calculatorTitle(calculator) }}
        </div>

        <button class="tab-close-button" @click="deleteCalculator(index)"></button>
      </div>

      <div class="tab-add">
        <button
          class="tab-add-button"
          :class="{ disabled: calculators.length >= 7 }"
          @click="calculators.length < 7 && addCalculator()"
        />
      </div>
    </div>

    <main class="calculator-grid">
      <div class="attacker">
        <div class="attacker-title">
          <h2 class="title-text">{{ t('side.attacker') }}</h2>
          <PickCreatureButton color="attacker" @click="showModal('attacker')">
            {{ attacker.creature ? attacker.creature.name : t('damageCalculator.pickCreature') }}
          </PickCreatureButton>
        </div>
        <div class="attacker-main">
          <div class="attacker-creature">
            <button v-if="attacker.creature" class="creature-button">
              <CreaturePortrait
                :creature="attacker.creature"
                class="creature-img"
                folder="/images/creatures/portraits/big"
                :width="58"
                :height="64"
              />
            </button>

            <BaseInputNumber
              v-if="attacker.creature"
              class="creature-input"
              :min="0"
              :max="9999"
              :value="attacker.creature.count"
              @input="attacker.creature.count = $event"
            />
          </div>

          <div class="attacker-hero">
            <!-- <SelectHero :heroes="data.heroes" @select="selectHero('attacker', $event)" /> -->

            <div v-if="attacker.hero" class="hero-parameters">
              <template v-for="stat in ['level', 'attack', 'defense']" :key="`attacker-hero-${stat}`">
                <InputHeroStat
                  :class="`parameter-${stat}`"
                  :stat="stat"
                  :value="attacker.hero.stats[stat]"
                  @input="attacker.hero.stats[stat] = $event"
                />
              </template>
            </div>
          </div>
        </div>

        <div v-if="attacker.creature" class="attacker-skills">
          <SelectSkillButtons
            v-for="skill in data.skills"
            :key="`attacker-skill-${skill.name}-buttons`"
            color="attacker"
            :name="skill.name"
            :levels="data.levels.slice(1, data.levels.length)"
            @click="attacker.hero.skills[skill] = $event"
          />
        </div>

        <div v-if="attacker.creature" class="attacker-effects">
          <div
            v-for="(effectGroup, index) in [attackPositiveEffects, defensePositiveEffects, attackNegativeEffects]"
            :key="`attacker-effects-group-${index}`"
          >
            <template v-for="(effect, i) in effectGroup" :key="`attacker-effect-${i}`">
              <BaseCheckbox color="attacker" :label="effect.name" @change="attacker.creature.setEffect(effect)" />
            </template>
          </div>
        </div>

        <div v-if="attacker.creature" class="attacker-damage">
          <div>Damage: {{ totalCountFilter(attacker.minDamage, attacker.averageDamage, attacker.maxDamage) }}</div>
          <div>Kills: {{ totalCountFilter(attacker.minKills, attacker.averageKills, attacker.maxKills) }}</div>
        </div>
      </div>

      <div class="defender">
        <div class="defender-title">
          <PickCreatureButton color="defender" @click="showModal('defender')">
            {{ defender.creature ? defender.creature.name : t('damageCalculator.pickCreature') }}
          </PickCreatureButton>
          <h2 class="title-text">{{ t('side.defender') }}</h2>
        </div>
        <div class="defender-main">
          <div class="defender-hero">
            <!-- <SelectHero :heroes="data.heroes" @select="selectHero('defender', $event)" /> -->

            <div v-if="defender.hero" class="hero-parameters">
              <template v-for="stat in ['level', 'attack', 'defense']" :key="`defender-${stat}`">
                <InputHeroStat
                  :class="`parameter-${stat}`"
                  :stat="stat"
                  :value="defender.hero.stats[stat]"
                  @input="defender.hero.stats[stat] = $event"
                />
              </template>
            </div>
          </div>

          <div class="defender-creature">
            <button v-if="defender.creature" class="creature-button">
              <CreaturePortrait
                :creature="defender.creature"
                class="creature-img"
                folder="/images/creatures/portraits/big"
                :width="58"
                :height="64"
              />
            </button>

            <BaseInputNumber
              v-if="defender.creature"
              class="creature-input"
              :min="0"
              :max="9999"
              :value="defender.creature.count"
              @input="defender.creature.count = $event"
            />
          </div>
        </div>
        <div v-if="defender.hero" class="defender-skills">
          <SelectSkillButtons
            v-for="skill in data.skills"
            :key="`defender-skill-${skill.name}-buttons`"
            color="defender"
            :name="skill.name"
            :levels="data.levels.slice(1, data.levels.length)"
            @click="defender.hero.skills[skill] = $event"
          />
        </div>

        <div v-if="defender.creature" class="defender-effects">
          <div
            v-for="(effectGroup, index) in [attackPositiveEffects, defensePositiveEffects, attackNegativeEffects]"
            :key="`defender-effects-group-${index}`"
          >
            <div v-for="(effect, i) in effectGroup" :key="`defender-effect-${i}`">
              <BaseCheckbox :label="effect.name" @click="defender.creature.setEffect(effect)" />
            </div>
          </div>
        </div>

        <div v-if="defender.creature" class="defender-damage">
          <div>Damage: {{ totalCountFilter(defender.minDamage, defender.averageDamage, defender.maxDamage) }}</div>
          <div>Kills: {{ totalCountFilter(defender.minKills, defender.averageKills, defender.maxKills) }}</div>
        </div>
      </div>
    </main>

    <div class="calculator-footer">
      <div class="swap-sides" />
      <!-- <SelectTerrain
        class="select-terrain"
        :terrains="data.terrains"
        @select="calculators[activeIndex].terrain = $event"
      /> -->
    </div>

    <DamageCalculatorFooter />

    <SelectUnitModal
      :show="creatureModal.show"
      :creatures="data.creatures"
      :target="creatureModal.target"
      @close="creatureModal.show = false"
      @select="selectCreature"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, reactive, ref, onBeforeMount, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import VueI18n, { useI18n } from 'vue-i18n'
// import TranslateResult = VueI18n.TranslateResult
import { initDatabaseStore } from '@/database'
import { CalculatorCreature, CalculatorHero, CalculatorInstance, CalculatorSide } from '@/models/Calculator'
import { Terrain } from '@/models/Terrain'
import { Spells } from '@/models/enums'
import { Creature } from '@/models/Creature'
import { Class } from '@/models/Class'
import { Hero } from '@/models/Hero'
import { Level } from '@/models/Level'
import { Skill } from '@/models/Skill'
import { Spell } from '@/models/Spell'
import { Town } from '@/models/Town'
// import SelectHero from '@/components/damageCalculator/SelectHero.vue'
// import SelectTerrain from '@/components/damageCalculator/SelectTerrain.vue'
import PickCreatureButton from '@/components/damageCalculator/PickCreatureButton.vue'
import i18n from '@/i18n'

export default defineComponent({
  name: 'DamageCalculator',
  components: {
    DamageCalculatorFooter: defineAsyncComponent(
      () => import('@/components/damageCalculator/DamageCalculatorFooter.vue')
    ),
    InputHeroStat: defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue')),
    BaseInputNumber: defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue')),
    CreaturePortrait: defineAsyncComponent(() => import('@/components/damageCalculator/CreaturePortrait.vue')),
    // SelectHero,
    SelectSkillButtons: defineAsyncComponent(() => import('@/components/damageCalculator/SelectSkillButtons.vue')),
    // SelectTerrain,
    SelectUnitModal: defineAsyncComponent(() => import('@/components/damageCalculator/SelectUnitModal.vue')),
    PickCreatureButton,
    BaseCheckbox: defineAsyncComponent(() => import('@/components/base/BaseCheckbox.vue')),
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const data = reactive({
      classes: [] as Array<Class>,
      creatures: [] as Array<Creature>,
      heroes: [] as Array<Hero>,
      levels: [] as Array<Level>,
      skills: [] as Array<Skill>,
      spells: [] as Array<Spell>,
      terrains: [] as Array<Terrain>,
      towns: [] as Array<Town>,
    })
    const calculators = ref([new CalculatorInstance()])
    const activeIndex = ref(0)
    const isStarted = ref(false)
    const creatureModal = reactive({
      show: false,
      target: '',
    })

    onBeforeMount(async () => {
      data.classes = await initDatabaseStore('classes')
      data.creatures = await initDatabaseStore('creatures')
      data.heroes = await initDatabaseStore('heroes')
      data.levels = await initDatabaseStore('levels')
      data.skills = await initDatabaseStore('skills')
      data.spells = await initDatabaseStore('spells')
      data.terrains = await initDatabaseStore('terrains')
      data.towns = await initDatabaseStore('towns')
    })

    onBeforeRouteLeave(() => store.dispatch('rememberCalculators', { calculators: calculators.value }))

    const storeCalculator = computed(() => store.state.calculators)
    const storeActiveIndex = computed(() => store.state.activeIndex)

    // if (storeCalculator.value.length) {
    //   calculators.value = storeCalculator.value
    // }

    // if (storeActiveIndex.value) {
    //   activeIndex.value = storeActiveIndex.value
    // }

    const attacker = computed({
      get: () => calculators.value[activeIndex.value].attacker,
      set: (attacker) => (calculators.value[activeIndex.value].attacker = attacker),
    })

    const defender = computed({
      get: () => calculators.value[activeIndex.value].defender,
      set: (defender) => (calculators.value[activeIndex.value].defender = defender),
    })

    watch(
      [attacker.value.creature],
      (newCreature) => {
        // if (newCreature) {
        //   calculators.value[activeIndex.value].calculate(newCreature, defender.value.creature)
        // }
        // return calculators.value[activeIndex.value].calculate(newAttacker.creature, defender.value.creature)
        // if (newAttacker.creature) {
        //   calculators.value[activeIndex.value].calculate(newAttacker.creature, defender.value.creature)
        // }
      },
      { deep: true }
    )

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

    const addCalculator = () => calculators.value.push(new CalculatorInstance())

    const calculatorTitle = (calculator: CalculatorInstance): string | undefined => {
      const attacker = calculator.attacker.creature
      const defender = calculator.defender.creature

      if (!attacker || !defender) {
        // return i18n.global.t('pages.damageCalculator')
        return 'Damage calculator'
      }

      if (attacker.id && defender.id) {
        return `${attacker.name} — ${defender.name}`
      } else if (attacker.id) {
        return attacker.name
      } else if (defender.id) {
        return defender.name
      }
    }

    const deleteCalculator = (index: number) => {
      if (calculators.value.length > 1) {
        calculators.value.splice(index, 1)

        if (activeIndex.value === index) {
          activeIndex.value = calculators.value.length > 1 ? index - 1 : 0
        }
      }
    }

    const totalCountFilter = (min: number, average: number, max: number): string | number => {
      if (min > 0 && min !== max) return `${min} — ${max} (~ ${average})`
      else if (min > 0 && min === max) return `${min}`
      else return 0
    }

    const selectCreature = (creature: Creature) => {
      const side = creatureModal.target as 'attacker' | 'defender'
      calculators.value[activeIndex.value][side].creature = new CalculatorCreature(creature)
    }

    const selectHero = (side: 'attacker' | 'defender', hero: Hero) => {
      calculators.value[activeIndex.value][side].hero = new CalculatorHero(hero)
    }

    const showModal = (side: 'attacker' | 'defender') => {
      creatureModal.show = true
      creatureModal.target = side
    }

    return {
      t,
      // locale,
      data,
      calculators,
      activeIndex,
      creatureModal,
      attacker,
      defender,
      attackPositiveEffects,
      defensePositiveEffects,
      attackNegativeEffects,
      addCalculator,
      calculatorTitle,
      deleteCalculator,
      totalCountFilter,
      selectCreature,
      // selectHero,
      showModal,
    }
  },
  watch: {
    // attacker: {
    //   handler: function (attacker: CalculatorSide) {
    //     console.log('attacker watcher')
    //     if (!this.isStarted && attacker.creature && this.defender.creature && this.attacker.creature) {
    //       this.isStarted = true
    //       this.attacker = {
    //         ...this.attacker,
    //         ...this.calculators[this.activeIndex].calculate(attacker.creature, this.defender.creature),
    //       }
    //       this.defender = {
    //         ...this.defender,
    //         ...this.calculators[this.activeIndex].calculate(attacker.creature, this.attacker.creature),
    //       }
    //     }
    //   },
    //   deep: true,
    // },
    // isStarted: function (isStarted) {
    //   if (isStarted) this.isStarted = false
    // },
  },
})
</script>

<style lang="scss" scoped>
.damage-calculator-page {
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  padding-top: 0.5rem;
  margin: 0 auto 0 auto;
  min-width: 300px;
  max-width: min(95%, 1920px);
}

.calculator-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 30%));
  grid-template-rows: 35px;
  column-gap: 10px;
  row-gap: 0.5rem;
  user-select: none;
  justify-content: flex-start;
  grid-auto-flow: row;

  @include media-medium {
    grid-template-columns: repeat(auto-fit, minmax(75px, 13%));
    row-gap: 0;
    grid-auto-flow: column;
  }

  .tab {
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0 1rem;
    overflow: hidden;
    box-shadow: 0 0 5px rgb(170, 170, 170);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border: none;
    opacity: 0.6;

    &:first-child {
      padding: 0 0.5rem 0 20px;
    }

    &.active,
    &:hover {
      opacity: 1;
    }
  }

  .tab-title {
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tab-close-button {
    background: url('@/assets/icons/cross.svg') no-repeat;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: auto;
    border-radius: 50%;
    transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 3px rgb(200, 200, 200, 0.5);
      background-color: rgb(200, 200, 200, 0.5);
    }
  }

  .tab-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
  }

  .tab-add-button {
    background: url('@/assets/icons/plus.svg') no-repeat;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 3px rgb(200, 200, 200, 0.5);
      background-color: rgb(200, 200, 200, 0.5);
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}

.calculator-grid {
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.5);
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;

  @include media-large {
    grid-template-columns: 50% 50%;
    grid-template-rows: 85vh auto;
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

  .attacker {
    border-bottom: 1px solid rgb(222, 226, 230);

    @include media-large {
      border-bottom: 0;
      border-right: 1px solid rgb(222, 226, 230);
    }
  }
}

.attacker-main,
.defender-main {
  display: grid;
  margin-bottom: 2rem;
  column-gap: 0.5rem;
}

.attacker-main {
  grid-template-columns: minmax(auto, 33.3%) auto;
}

.defender-main {
  grid-template-columns: auto minmax(auto, 33.3%);
}

.attacker-creature,
.defender-creature {
  display: grid;
  gap: 0.5rem;
}

.defender-creature {
  justify-content: end;
}

.attacker-title,
.defender-title {
  display: grid;
  column-gap: 0.5rem;
  align-items: center;

  .title-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.attacker-title {
  grid-template-columns: minmax(auto, 33.3%) auto;
}

.defender-title {
  grid-template-columns: auto minmax(auto, 33.3%);

  .title-text {
    text-align: right;
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

.attacker-effects,
.defender-effects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.unit-effect-checkbox {
  margin-bottom: 1rem;
}

.attacker-skills,
.defender-skills {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 0;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
    gap: 0 1rem;
  }
}

.select-skill-buttons {
  @include media-large {
    &:nth-child(even) {
      text-align: center;
    }
  }
}

.attacker-hero,
.defender-hero {
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto auto;
  gap: 1rem;
}

.hero-parameters {
  display: flex;

  .parameter-attack {
    margin-right: 2rem;
    margin-left: auto;
  }
}

.attacker-damage,
.defender-damage {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;

  div:first-child {
    margin-bottom: 1rem;
  }
}

.calculator-footer {
  border-top: 1px solid rgb(222, 226, 230);
  display: flex;
  flex: 0 0 100%;
  padding: 5px;
}

.select-terrain {
  display: flex;
  flex: 0 0 33%;
  justify-content: flex-end;
  margin-left: auto;
}
</style>
