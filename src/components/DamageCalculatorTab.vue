<template>
  <section class="section-damage-calculator">
    <section class="section-attacker">
      <div class="attacker-title">
        <h2 class="title-text">{{ $t('Attacker') }}</h2>
        <button
          class="title-creature-button attacker"
          @click="showAttackerModal = true"
          @mouseover.once="loadCreaturesImages"
        >
          {{ attacker.creature.id ? attacker.creature.name[$i18n.locale] : $t('Pick creature') }}
        </button>
      </div>

      <div class="attacker-creature">
        <button v-if="attacker.creature.id" class="creature-button" @click="showAttackerModal = true">
          <creature-portrait
            v-if="attacker.creature.name.en"
            class="creature-img"
            folder="/images/creatures_portraits"
            :name="attacker.creature.name.en"
            :alt="attacker.creature.name[$i18n.locale]"
            width="58px"
            height="64px"
          />
        </button>

        <InputNumber
          v-show="attacker.creature.id"
          class="creature-input"
          :min="0"
          :max="9999"
          :value="attacker.creature.count"
          @input="$emit('set-creatures-count', { side: 'attacker', count: $event })"
        />
      </div>

      <div class="attacker-hero">
        <SelectHero :heroes="data.heroes" @select="$emit('select-hero', { side: 'attacker', hero: $event })" />

        <div v-show="attacker.hero.id" class="hero-parameters">
          <InputHeroStat
            class="parameter-level"
            stat="Level"
            :value="attacker.hero.stats.level"
            @input="
              $emit('select-hero-stats', {
                side: 'attacker',
                stat: 'level',
                value: $event,
              })
            "
          />
          <InputHeroStat
            class="parameter-attack"
            stat="Attack"
            :value="attacker.hero.stats.attack"
            @input="
              $emit('select-hero-stats', {
                side: 'attacker',
                stat: 'attack',
                value: $event,
              })
            "
          />
          <InputHeroStat
            class="parameter-defense"
            stat="Defense"
            :value="attacker.hero.stats.defense"
            @input="
              $emit('select-hero-stats', {
                side: 'attacker',
                stat: 'defense',
                value: $event,
              })
            "
          />
        </div>
      </div>

      <div v-show="attacker.hero.id" class="attacker-skills">
        <SelectSkillButtons
          v-for="skill in data.skills"
          :key="`skill-${skill.name.en}-buttons`"
          :name="skill.name[$i18n.locale]"
          :levels="data.levels.slice(1, data.levels.length)"
          @click="$emit('select-hero-skill', { side: 'attacker', skill: skill.name.en, value: $event })"
        />
      </div>

      <div v-show="attacker.hero.id" class="attacker-effects">
        <div class="effects-attack-buffs">
          <UnitEffectCheckbox
            v-for="effect in attackPositiveEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="attacker"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'attacker', effect })
                : $emit('remove-unit-effect', { side: 'attacker', effect })
            "
          />
        </div>

        <div class="effects-defend-buffs">
          <UnitEffectCheckbox
            v-for="effect in defensePositiveEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="attacker"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'attacker', effect })
                : $emit('remove-unit-effect', { side: 'attacker', effect })
            "
          />
        </div>

        <div class="effects-attack-debuffs">
          <UnitEffectCheckbox
            v-for="effect in attackNegativeEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="attacker"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'attacker', effect })
                : $emit('remove-unit-effect', { side: 'attacker', effect })
            "
          />
        </div>
      </div>

      <div v-show="attacker.creature.id" class="attacker-damage">
        <div class="damage-value">
          {{ $t('Damage') }}:
          {{ attacker | totalCountFilter(attacker.minDamage, attacker.maxDamage, attacker.averageDamage) }}
        </div>

        <div class="kills-value">
          {{ $t('Kills') }}:
          {{ attacker | totalCountFilter(attacker.minKills, attacker.maxKills, attacker.averageKills) }}
        </div>
      </div>
    </section>

    <section class="section-defender">
      <section class="defender-title">
        <button class="title-creature-button defender" @click="showDefenderModal = true">
          {{ defender.creature.id ? defender.creature.name[$i18n.locale] : $t('Pick creature') }}
        </button>
        <h2 class="title-text">{{ $t('Defender') }}</h2>
      </section>

      <div class="defender-hero">
        <SelectHero :heroes="data.heroes" @select="$emit('select-hero', { side: 'defender', hero: $event })" />

        <div v-show="defender.hero.id" class="hero-parameters">
          <InputHeroStat
            class="parameter-level"
            stat="Level"
            :value="defender.hero.stats.level"
            @input="
              $emit('select-hero-stats', {
                side: 'defender',
                stat: 'level',
                value: $event,
              })
            "
          />
          <InputHeroStat
            class="parameter-attack"
            stat="Attack"
            :value="defender.hero.stats.attack"
            @input="
              $emit('select-hero-stats', {
                side: 'defender',
                stat: 'attack',
                value: $event,
              })
            "
          />
          <InputHeroStat
            class="parameter-defense"
            stat="Defense"
            :value="defender.hero.stats.defense"
            @input="
              $emit('select-hero-stats', {
                side: 'defender',
                stat: 'defense',
                value: $event,
              })
            "
          />
        </div>
      </div>

      <div class="defender-creature">
        <button v-if="defender.creature.id" class="creature-button" @click="showDefenderModal = true">
          <creature-portrait
            v-if="defender.creature.name.en"
            class="creature-img"
            folder="/images/creatures_portraits"
            :name="defender.creature.name.en"
            :alt="attacker.creature.name[$i18n.locale]"
            width="58px"
            height="64px"
          />
        </button>

        <InputNumber
          v-if="defender.creature.id"
          class="creature-input"
          :min="0"
          :max="9999"
          :value="defender.creature.count"
          @input="$emit('set-creatures-count', { side: 'defender', count: $event })"
        />
      </div>

      <div v-show="defender.hero.id" class="defender-skills">
        <SelectSkillButtons
          v-for="skill in data.skills"
          :key="`skill-${skill.name.en}-buttons`"
          :name="skill.name[$i18n.locale]"
          :levels="data.levels.slice(1, data.levels.length)"
          class="defender"
          @click="$emit('select-hero-skill', { side: 'defender', skill: skill.name.en, value: $event })"
        />
      </div>

      <div v-show="defender.hero.id" class="defender-effects">
        <div class="effects-attack-buffs">
          <UnitEffectCheckbox
            v-for="effect in attackPositiveEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="defender"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'defender', effect })
                : $emit('remove-unit-effect', { side: 'defender', effect })
            "
          />
        </div>

        <div class="effects-defend-buffs">
          <UnitEffectCheckbox
            v-for="effect in defensePositiveEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="defender"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'defender', effect })
                : $emit('remove-unit-effect', { side: 'defender', effect })
            "
          />
        </div>

        <div class="effects-attack-debuffs">
          <UnitEffectCheckbox
            v-for="effect in attackNegativeEffects"
            :key="effect.id"
            :label="effect.name[$i18n.locale]"
            class="defender"
            @click="
              $event
                ? $emit('add-unit-effet', { side: 'defender', effect })
                : $emit('remove-unit-effect', { side: 'defender', effect })
            "
          />
        </div>
      </div>

      <div v-show="defender.creature.id" class="defender-damage">
        <div class="damage-value">
          {{ $t('Damage') }}:
          {{ defender | totalCountFilter(defender.minDamage, defender.maxDamage, defender.averageDamage) }}
        </div>

        <div class="kills-value">
          {{ $t('Kills') }}:
          {{ defender | totalCountFilter(defender.minKills, defender.maxKills, defender.averageKills) }}
        </div>
      </div>
    </section>

    <div class="calculator-footer">
      <div class="swap-sides" />
      <SelectTerrain
        class="select-terrain"
        :terrains="data.terrains"
        @select="$emit('select-terrain', { terrain: $event })"
      />
    </div>

    <SelectUnitModal
      :show="showAttackerModal"
      :creatures="data.creatures"
      @close="showAttackerModal = false"
      @select="$emit('select-creature', { side: 'attacker', creature: $event })"
    />
    <SelectUnitModal
      :show="showDefenderModal"
      :creatures="data.creatures"
      @close="showDefenderModal = false"
      @select="$emit('select-creature', { side: 'defender', creature: $event })"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

// Interfaces
import { CalculatorSide } from '@/interfaces/Calculator'
import { Terrain } from '@/interfaces/Terrain'

// Components
import SelectHero from '@/components/damageCalculator/SelectHero.vue'
import SelectTerrain from '@/components/damageCalculator/SelectTerrain.vue'

export default Vue.extend({
  name: 'DamageCalculator',
  components: {
    InputHeroStat: () => import('@/components/damageCalculator/InputHeroStat.vue'),
    InputNumber: () => import('@/components/base/InputNumber.vue'),
    CreaturePortrait: () => import('@/components/damageCalculator/CreaturePortrait.vue'),
    SelectHero,
    SelectSkillButtons: () => import('@/components/damageCalculator/SelectSkillButtons.vue'),
    SelectTerrain,
    SelectUnitModal: () => import('@/components/damageCalculator/SelectUnitModal.vue'),
    UnitEffectCheckbox: () => import('@/components/damageCalculator/UnitEffectCheckbox.vue'),
  },
  data() {
    return {
      showAttackerModal: false,
      showDefenderModal: false,
    }
  },
  computed: {
    // totalCountFilter(value: number, min: number, max: number, average: number) {
    //   if (min > 0 && min !== max) {
    //     return `${min} — ${max} (~ ${average})`
    //   } else if (min > 0 && min === max) {
    //     return `${min}`
    //   } else if (min === 0) {
    //     return '0'
    //   }
    // },
  },
  watch: {
    calculationStarted(): void {
      if (this.calculationStarted) {
        if (this.attacker.creature.count > 0 && this.defender.creature.count > 0) {
          const attackerResult = this.calculate(this.attacker, this.defender)
          this.$emit('calculation', { side: 'attacker', damages: attackerResult })
          // const defenderResult = this.calculate(this.defender, this.attacker)
          this.$emit('calculation', { side: 'defender', damages: attackerResult })
        }

        this.$emit('end-calculation')
      }
    },
  },
  methods: {
    loadCreaturesImages() {
      this.data.creatures.forEach((creature: any) => {
        let img = new Image()
        return (img.src = `images/creatures_portraits/${creature.name.en.replace(/\s/g, '_')}.webp`)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.section-damage-calculator {
  box-shadow: 0 0 5px rgb(170, 170, 170);
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-width: 2000px;
  min-height: 85vh;
  min-width: 320px;
  width: 100%;
}

.section-attacker,
.section-defender {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  min-height: 80vh;

  @include media-medium {
    padding: 20px;
  }
}

.section-attacker {
  display: flex;
  border-bottom: 1px solid rgb(222, 226, 230);
  flex: 0 0 100%;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;

  @include media-large {
    flex: 0 0 50%;
    border-bottom: 0;
    border-right: 1px solid rgb(222, 226, 230);
  }
}

.section-defender {
  flex: 0 0 100%;

  @include media-large {
    flex: 0 0 50%;
  }
}

.title-creature-button {
  flex: 1 0 0;
  min-width: 66.6%;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  line-height: 1.5;
  z-index: 1;
  position: relative;
  font-size: 0.875rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &::before {
    border-radius: 5px;
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
  }
}

.section-attacker .title-creature-button {
  color: rgb(0, 0, 0);
  background-color: var(--attacker-color);
  border: 1px solid var(--attacker-color);

  &::before {
    background-color: rgb(0, 201, 50);
    border: 1px solid rgb(0, 201, 50);
    transform-origin: center right;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: center left;
  }
}

.section-defender .title-creature-button {
  color: white;
  background-color: var(--defender-color);
  border: 1px solid var(--defender-color);

  &::before {
    background-color: rgb(200, 35, 51);
    border: 1px solid rgb(189, 33, 48);
    transform-origin: center left;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: center right;
  }
}

.attacker-title,
.defender-title {
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  flex: 0 0 100%;
}

.defender-title {
  text-align: right;
}

.title-text {
  flex: 0 0 33.3%;

  @include media-minimum {
    font-size: 1.3rem;
  }

  @include media-medium {
    font-size: 1.5rem;
  }
}

.attacker-title .title-text {
  padding-right: 5px;
}

.defender-title .title-text {
  padding-left: 5px;
}

.attacker-creature,
.defender-creature {
  display: flex;
  flex: 0 0 33.3%;
  flex-direction: column;
}

.defender-creature {
  align-items: flex-end;
}

.creature-input {
  margin-top: 5px;
  width: 65px;
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

.attacker-creature .creature-button {
  margin-left: 3px;
}

.defender-creature .creature-button {
  margin-right: 3px;
}

.attacker-effects,
.defender-effects {
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 100%;
}

.effects-attack-buffs,
.effects-defend-buffs,
.effects-attack-debuffs {
  flex: 1 0 0;
  padding-right: 5px;
}

.attacker-effects > .effects-attack-debuffs,
.defender-effects > .effects-attack-debuffs {
  @include media-minimum {
    flex: 0 0 100%;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  @include media-small {
    flex: 1 0 0;
    margin-bottom: 0;
    margin-top: 0;
  }
}

.unit-effect-checkbox {
  margin-bottom: 1rem;
}

.attacker-skills,
.defender-skills {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.select-skill-buttons {
  flex: 0 0 100%;
  margin-bottom: 1rem;

  @include media-medium {
    flex: 0 0 50%;

    &:nth-child(even) {
      text-align: center;
    }
  }

  @include media-large {
    flex: 0 0 100%;

    &:nth-child(even) {
      text-align: left;
    }
  }

  @include media-extra-large {
    padding-left: 0;
    flex: 0 0 50%;

    &:nth-child(odd) {
      padding-right: 1rem;
    }

    &:nth-child(even) {
      text-align: center;
      padding-left: 1rem;
    }
  }
}

.attacker-hero,
.defender-hero {
  display: flex;
  flex-direction: column;
  flex: 0 0 66.6%;
  margin-bottom: 3rem;
}

.hero-parameters {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.parameter-level {
  flex: 1 0 0;
}

.parameter-attack,
.parameter-defense {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @include media-small {
    flex: 0 0 auto;
  }
}

.parameter-defense {
  align-items: flex-end;
  margin-left: 0;

  @include media-minimum {
    margin-left: 0;
  }

  @include media-small {
    margin-left: 20px;
  }
}

.attacker-damage,
.defender-damage {
  flex: 0 0 100%;
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 2rem;
}

.damage-value {
  margin-bottom: 1rem;
}

.damage-value,
.kills-value {
  text-align: right;
}

.calculator-footer {
  border-top: 1px solid rgb(222, 226, 230);
  display: flex;
  flex: 0 0 100%;
  padding: 5px;
}

.swap-sides {
  flex: 0 0 50%;
  text-align: right;
}

.select-terrain {
  display: flex;
  flex: 0 0 33%;
  justify-content: flex-end;
  margin-left: auto;
}
</style>
