<template>
  <section class="magic-calculator">
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
              v-for="stat in ['power']"
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

      <section v-if="hasOtherSideCreature(sideName)" class="spell">
        <BaseSelect
          :value="selectedSpell[sideName]"
          :options="spells"
          :placeholder="t('components.magicCalculator.selectSpell')"
          use-virtual-scoll
          @select="onSelectSpell(sideName, $event)"
          @clear="selectedSpell[sideName] = null"
        >
          <template #selected="{ selected }">
            <ObjectPortrait
              :folder="`/images/spells`"
              :file="{ name: selected.id, alt: selected.name }"
              height="36px"
            />
            {{ selected.name }}
          </template>

          <template #option="{ option }">
            <ObjectPortrait
              :folder="`/images/spells`"
              :file="{ name: option.id, alt: option.name }"
              height="36px"
              :lazy-loading="false"
            />
            {{ option.name }}
          </template>
        </BaseSelect>
      </section>

      <section v-if="side.activeCreature" class="spells-effects">
        <span>Effects:</span>
        <SpellCard
          v-for="spell in spellsEffects"
          :key="spell.id"
          :spell="spell"
          :selected="side.activeCreature?.effects.some((effect) => effect.id === spell.id)"
          @click="onSelectCreatureEffect(side, spell)"
        ></SpellCard>
      </section>

      <section v-if="side.activeCreature" class="damage">
        <strong>
          <!-- Damage result -->
          {{ t('components.damageCalculator.damage') }}:
          {{ spellDamages[sideName] }}
        </strong>
        <strong>
          <!-- Kills result -->
          {{ t('components.damageCalculator.kills') }}:
          {{ getSpellKillsValue(sideName) }}
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
import { Battle, BattleSide, DamageCalculatorBattleSide, getOppositeBattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import { CreatureInstance } from '@/models/Creature'
import { SecondarySkills } from '@/models/enums'
import type { Hero } from '@/models/Hero'
import { HeroInstance } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import type { Terrain } from '@/models/Terrain'
import { Spells } from '@/modules/spells'
import { useStore } from '@/store'
import { computed, defineAsyncComponent, defineComponent, PropType, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MagicCalculator',
  components: {
    PickCreatureButton,
    SelectHero,
    SelectTerrain,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
    BaseInputNumber: defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue')),
    InputHeroStat: defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue')),
    SelectSkillButtons: defineAsyncComponent(() => import('@/components/damageCalculator/SelectSkillButtons.vue')),
    SpellCard: defineAsyncComponent(() => import('@/components/SpellCard.vue')),
    BaseSelect: defineAsyncComponent(() => import('@/components/base/BaseSelect.vue')),
  },
  props: {
    battleValue: {
      type: Object as PropType<Battle>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n()
    const store = useStore()

    const battle = reactive(props.battleValue)

    const heroes = computed(() => store.heroes)
    const terrains = computed(() => store.terrains)
    const levels = computed(() => store.levels)
    const spells = computed(() => {
      const allowedSpells = [1, 20, 7, 24, 40, 58, 8, 9, 29, 42, 62, 11, 15, 47, 48, 64, 70, 51]
      return store.spells.filter((spell) => allowedSpells.includes(spell.id))
    })
    const skills = computed(() => {
      const skills = {
        air: '',
        earth: '',
        fire: '',
        water: '',
      }
      const magicSkillsIds = [
        SecondarySkills.FireMagic,
        SecondarySkills.EarthMagic,
        SecondarySkills.AirMagic,
        SecondarySkills.WaterMagic,
      ]
      const skillsNames = ['air', 'earth', 'fire', 'water']
      store.skills
        .filter((skill) => magicSkillsIds.indexOf(skill.id) !== -1)
        .forEach((skill, index) => (skills[skillsNames[index]] = skill.name))
      return skills
    })

    const spellsEffects = computed(() => {
      const effectsIds = [5, 13, 22, 43, 46, 60, 68]
      return store.spells.filter((spell) => effectsIds.includes(spell.id))
    })

    const spellDamages = ref({
      attacker: 0,
      defender: 0,
    })

    const selectedSpell = ref<{ attacker: Spell | null; defender: Spell | null }>({
      attacker: null,
      defender: null,
    })

    const hasOtherSideCreature = (side: BattleSide) => {
      const oppositeSide = getOppositeBattleSide(side)
      return !!battle[oppositeSide].activeCreature
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

    const onSelectCreatureEffect = (side: DamageCalculatorBattleSide, spell: Spell) => {
      if (!side.activeCreature) return

      const isEnabled = side.activeCreature.effects.find((effect) => effect.id === spell.id)
      if (!isEnabled) {
        side.activeCreature.effects.push(spell)
      } else {
        side.activeCreature.effects = side.activeCreature.effects.filter(
          (creatureEffect) => creatureEffect.id !== spell.id
        )
      }
    }

    watch(
      [battle.attacker, battle.defender, selectedSpell],
      () => {
        if (selectedSpell.value.attacker) calculateSpell('attacker', selectedSpell.value.attacker)
        if (selectedSpell.value.defender) calculateSpell('defender', selectedSpell.value.defender)
      },
      {
        deep: true,
      }
    )

    const onSelectSpell = (sideName: BattleSide, spell: Spell) => {
      if (selectedSpell.value[sideName]?.id === spell.id) {
        selectedSpell.value[sideName] = null
        spellDamages.value[sideName] = 0
        return
      } else {
        selectedSpell.value[sideName] = spell
      }
    }

    const calculateSpell = (sideName: BattleSide, spell: Spell) => {
      if (!battle.attacker.activeCreature || !battle.defender.activeCreature) return
      const oppositeSide = getOppositeBattleSide(sideName)
      spellDamages.value[sideName] = Spells.cast(battle[sideName], battle[oppositeSide].activeCreature, spell)
    }

    const getSpellKillsValue = (sideName: BattleSide) => {
      const oppositeSide = getOppositeBattleSide(sideName)
      return Math.floor(spellDamages.value[sideName] / battle[oppositeSide].activeCreature?.health) || 0
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
      spells,

      spellDamages,
      selectedSpell,
      spellsEffects,

      onSelectCreature,
      onSelectHero,
      onSelectCreatureEffect,
      onSelectTerrain,
      onSelectSpell,
      getSpellKillsValue,
      hasOtherSideCreature,
    }
  },
})
</script>

<style lang="scss" scoped>
.magic-calculator {
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

.skills {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 0;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1rem;
  }
}

.spells-effects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;

  & > span {
    grid-column-start: 1;
    grid-column-end: -1;
  }
}

.attacker {
  border-bottom: 1px solid var(--color-border);

  @include media-large {
    border-right: 1px solid var(--color-border);
    border-bottom: 0;
  }

  .title {
    grid-template-columns: minmax(auto, 33.3%) 1fr;
  }

  .main {
    grid-template-columns: minmax(auto, 33.3%) 1fr;
  }

  .spell {
    padding-left: calc(33.3% + 0.5rem);
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

  .spell {
    padding-right: calc(33.3% + 0.5rem);
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
  gap: 1rem;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 1.2rem;
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
}

.select-terrain {
  width: 300px;
}

.spell-level {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>