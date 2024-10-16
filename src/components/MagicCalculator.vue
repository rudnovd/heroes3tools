<template>
  <section class="magic-calculator">
    <section
      v-for="(side, sideName, index) in { attacker: battle.attacker, defender: battle.defender }"
      :key="`magic-calculator-${sideName}-${index}`"
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
              @input="side.hero.stats[stat] = $event"
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
        <div>{{ t('data.target') }}: {{ getSpellTargets(sideName) }}</div>
        <BaseSelect
          :value="selectedSpell[sideName]"
          :options="spells"
          :placeholder="t('components.magicCalculator.selectSpell')"
          virtual-scroll
          @select="onSelectSpell(sideName, $event)"
          @clear="selectedSpell[sideName] = null"
        >
          <template #selected="{ selected }">
            <ObjectPortrait :folder="`/images/spells`" :file="{ name: selected.id, alt: selected.name }" width="46px" />
            {{ selected.name }}
          </template>

          <template #option="{ option }">
            <ObjectPortrait :folder="`/images/spells`" :file="{ name: option.id, alt: option.name }" width="46px" />
            {{ option.name }}
          </template>
        </BaseSelect>
      </section>

      <section v-if="side.activeCreature" class="spells-effects">
        <span>{{ t('data.effects') }}:</span>
        <SpellCard
          v-for="spell in spellsEffects"
          :key="spell.id"
          :spell="spell"
          :selected="side.activeCreature?.effects.some((effect) => effect.id === spell.id)"
          @click="onSelectCreatureEffect(side, spell)"
        />
      </section>

      <section v-show="selectedSpell[sideName]" class="damage">
        <!-- Damage result -->
        <strong v-show="spellDamages[sideName] >= 0">
          {{ t('components.damageCalculator.damage') }}:
          {{ spellDamages[sideName] }}
        </strong>

        <!-- Kills result -->
        <strong>
          {{
            spellDamages[sideName] >= 0
              ? t('components.damageCalculator.kills')
              : t('components.damageCalculator.heals')
          }}:
          {{ getSpellKillsValue(sideName) }}
        </strong>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import PickCreatureButton from '@/components/PickCreatureButton.vue'
import SelectHero from '@/components/SelectHero.vue'
import { Battle, getOppositeBattleSide, type BattleSide, type DamageCalculatorBattleSide } from '@/models/Battle'
import type { Creature } from '@/models/Creature'
import { CreatureInstance } from '@/models/Creature'
import { SecondarySkills, Spells } from '@/models/enums'
import type { Hero } from '@/models/Hero'
import { HeroInstance } from '@/models/Hero'
import type { Spell } from '@/models/Spell'
import { useStore } from '@/store'
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const spellsTargets = {
  all: [Spells.Armageddon, Spells.DeathRipple, Spells.DestroyUndead],
  self: [Spells.AnimateDead, Spells.Cure, Spells.Resurrection],
}

const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))
const BaseInputNumber = defineAsyncComponent(() => import('@/components/base/BaseInputNumber.vue'))
const InputHeroStat = defineAsyncComponent(() => import('@/components/damageCalculator/InputHeroStat.vue'))
const SelectSkillButtons = defineAsyncComponent(() => import('@/components/damageCalculator/SelectSkillButtons.vue'))
const SpellCard = defineAsyncComponent(() => import('@/components/SpellCard.vue'))
const BaseSelect = defineAsyncComponent(() => import('@/components/base/BaseSelect.vue'))

const props = defineProps<{
  battleValue: Battle
}>()
const { t } = useI18n()
const store = useStore()

const battle = reactive(props.battleValue)

const heroes = computed(() => store.heroes)
const levels = computed(() => store.levels)
const spells = computed(() => {
  const allowedSpells = [
    Spells.MagicArrow,
    Spells.Firewall,
    Spells.IceBolt,
    Spells.DeathRipple,
    Spells.LightningBolt,
    Spells.Fireball,
    Spells.LandMine,
    Spells.FrostRing,
    Spells.AnimateDead,
    Spells.DestroyUndead,
    Spells.Armageddon,
    Spells.Inferno,
    Spells.MeteorShower,
    Spells.Resurrection,
    Spells.ChainLightning,
    Spells.TitansLightningBolt,
    Spells.Implosion,
  ]
  return store.spells.filter((spell) => allowedSpells.includes(spell.id))
})
const skills = computed(() => {
  const skills = {
    air: '',
    earth: '',
    fire: '',
    water: '',
    sorcery: '',
  }
  const magicSkillsIds = [
    SecondarySkills.FireMagic,
    SecondarySkills.EarthMagic,
    SecondarySkills.AirMagic,
    SecondarySkills.Sorcery,
    SecondarySkills.WaterMagic,
    SecondarySkills.Interference,
  ]
  const skillsNames = ['air', 'earth', 'fire', 'sorcery', 'water', 'interference']
  store.skills
    .filter((skill) => magicSkillsIds.indexOf(skill.id) !== -1)
    .forEach((skill, index) => (skills[skillsNames[index]] = skill.name))
  return skills
})

const spellsEffects = computed(() => {
  const effectsIds = [
    Spells.ProtectionFromFire,
    Spells.ProtectionFromWater,
    Spells.ProtectionFromEarth,
    Spells.ProtectionFromAir,
  ]
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
    side.activeCreature.effects = side.activeCreature.effects.filter((creatureEffect) => creatureEffect.id !== spell.id)
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
  },
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
  const oppositeSide = getOppositeBattleSide(sideName)
  const attacker = battle[sideName]
  const defender = battle[oppositeSide]
  if (!attacker.activeCreature || !defender.activeCreature) {
    return console.warn(
      `No active creature: attacker - ${attacker.activeCreature}, defender - ${defender.activeCreature}`,
    )
  }

  if (spellsTargets.all.includes(spell.id)) {
    spellDamages.value[sideName] = battle.cast(attacker, defender, defender.activeCreature, spell)
    spellDamages.value[oppositeSide] = battle.cast(defender, attacker, battle[sideName as string].activeCreature, spell)
  } else if (spellsTargets.self.includes(spell.id)) {
    spellDamages.value[sideName] = battle.cast(attacker, attacker, battle[sideName as string].activeCreature, spell)
  } else {
    spellDamages.value[sideName] = battle.cast(attacker, defender, defender.activeCreature, spell)
  }
}

const getSpellKillsValue = (sideName: BattleSide) => {
  const oppositeSide = getOppositeBattleSide(sideName)
  if (!battle[oppositeSide].activeCreature) return 0
  const kills = Math.floor(spellDamages.value[sideName] / battle[oppositeSide].activeCreature?.health)
  return Math.abs(kills) || 0
}

const getSpellTargets = (sideName: BattleSide) => {
  const oppositeSide = getOppositeBattleSide(sideName)
  const spellId = selectedSpell.value[sideName]?.id
  const attacker = battle[sideName].activeCreature?.name || ''
  const defender = battle[oppositeSide].activeCreature?.name || ''

  if (!spellId) {
    return ''
  } else if (spellsTargets.all.includes(spellId)) {
    return `${defender}, ${attacker}`
  } else if (spellsTargets.self.includes(spellId)) {
    return attacker
  } else {
    return defender
  }
}
</script>

<style lang="scss" scoped>
.magic-calculator {
  display: grid;
  grid-template-rows: minmax(50vh, 1fr) 1fr;
  grid-template-columns: 100%;
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.5);
  content-visibility: auto;
  contain-intrinsic-size: 80vh;

  @include media-large {
    grid-template-rows: minmax(80vh, auto);
    grid-template-columns: 50% 50%;
  }

  @include media-maximum {
    grid-template-rows: minmax(84vh, auto);
  }
}

.attacker,
.defender {
  display: grid;
  grid-template-rows: repeat(5, min-content) auto;
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

.hero-parameters {
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-content: flex-end;

  & > div {
    width: 100px;
  }

  .parameter-attack {
    margin-left: auto;
  }
}

.spell {
  display: grid;
  grid-template-areas: 'target select';
  grid-template-columns: minmax(auto, 40%) 1fr;
  gap: 8px;
  align-items: center;

  div:nth-child(1) {
    font-size: 0.9rem;
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

  .spell {
    grid-template-columns: 1fr minmax(auto, 40%);

    div:nth-child(1) {
      grid-area: select;
    }

    div:nth-child(2) {
      grid-area: target;
    }
  }

  .hero-parameters {
    justify-content: flex-start;
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
</style>
