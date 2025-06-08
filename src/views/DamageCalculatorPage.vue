<template>
  <section class="damage-calculator-page">
    <section class="damage-calculator-nav">
      <CalculatorTabs
        :calculators="
          calculators.map((calc) => ({
            attacker: calc.attacker.activeCreature ? calc.attacker.activeCreature.name : null,
            defender: calc.defender.activeCreature ? calc.defender.activeCreature.name : null,
          }))
        "
        :active-index="activeIndex"
        @add-tab="addCalculator"
        @delete-tab="deleteCalculator($event)"
        @select-tab="activeIndex = $event"
      />
    </section>

    <main v-if="calculators.length">
      <TransitionGroup name="calculator-change-tab">
        <DamageCalculator
          v-for="(calculator, index) in calculators"
          v-show="activeIndex === index"
          :key="`damage-calculator-tab-${index}-${useId()}`"
          :battle-value="calculator"
        />
      </TransitionGroup>
    </main>

    <PageFooter :about="{ text: t('components.damageCalculatorPage.about') }" border="none">
      <HowToUse :steps="howToUseSteps" />
      <template #aboutModal>
        <p>{{ t('components.damageCalculatorPage.aboutModal') }}</p>
      </template>
    </PageFooter>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { useHead } from '@unhead/vue'
import { watchIgnorable } from '@vueuse/shared'
import { computed, defineAsyncComponent, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorTabs from '@/components/CalculatorTabs.vue'
import DamageCalculator from '@/components/DamageCalculator.vue'
import { Battle } from '@/models/Battle'

const props = defineProps<{ head: string }>()
const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))
const HowToUse = defineAsyncComponent(() => import('@/components/HowToUse.vue'))

useHead(JSON.parse(props.head))

const { t } = useI18n()

const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
const activeIndex = ref(0)

const attacker = computed(() => calculators.value[activeIndex.value].attacker)
const defender = computed(() => calculators.value[activeIndex.value].defender)
const howToUseSteps = [
  {
    name: 'Pick attacker creature',
    targets: [
      {
        node: 'section.attacker button.pick-creature-button',
        eventTriggerNode: 'section.attacker button.pick-creature-button',
        text: t('common.howToUseSteps.selectAttackerCreature'),
      },
    ],
  },
  {
    name: 'Select attacker creature',
    targets: [
      {
        node: 'div.dialog-area',
        //   insertBackground: true,
      },
      {
        node: 'div.dialog-area div.units',
        eventTriggerNode: 'div.dialog-area div.units',
      },
    ],
  },
  {
    name: 'Open hero list',
    targets: [
      {
        node: 'section.attacker div.select',
        eventTriggerNode: 'section.attacker div.select',
        text: t('common.howToUseSteps.selectAttackerHero'),
      },
    ],
  },
  {
    name: 'Pick hero',
    targets: [
      {
        node: 'section.attacker div.select > div.items',
        eventTriggerNode: 'section.attacker div.select > div.items',
      },
    ],
  },
  {
    name: 'Click to "pick creature" defender button',
    targets: [
      {
        node: 'section.defender button.pick-creature-button',
        eventTriggerNode: 'section.defender button.pick-creature-button',
        text: t('common.howToUseSteps.selectDefenderCreature'),
      },
    ],
  },
  {
    name: 'Select defender creature',
    targets: [
      {
        node: 'div.dialog-area',
        //   insertBackground: true,
      },
      {
        node: 'div.dialog-area div.units',
        eventTriggerNode: 'div.dialog-area div.units',
      },
    ],
  },
  {
    name: 'Open hero list',
    targets: [
      {
        node: 'section.defender div.select',
        eventTriggerNode: 'section.defender div.select',
        text: t('common.howToUseSteps.selectDefenderHero'),
      },
    ],
  },
  {
    name: 'Pick hero',
    targets: [
      {
        node: 'section.defender div.select > div.items',
        eventTriggerNode: 'section.defender div.select > div.items',
      },
    ],
  },
  {
    name: 'Check values',
    targets: [
      {
        node: 'section.attacker section.damage > strong',
      },
      {
        node: 'section.attacker section.damage > strong:nth-child(2)',
        text: t('common.howToUseSteps.damage'),
      },
      {
        node: 'section.defender section.damage > strong',
      },
      {
        node: 'section.defender section.damage > strong:nth-child(2)',
      },
    ],
  },
]

const { ignoreUpdates } = watchIgnorable(
  [attacker, defender],
  () => {
    if (!attacker.value.activeCreature?.id || !defender.value.activeCreature?.id)
      return
    ignoreUpdates(() => calculators.value[activeIndex.value].calculate())
  },
  { deep: true },
)

function addCalculator() {
  calculators.value.push(new Battle())
  activeIndex.value = calculators.value.length - 1
}

function deleteCalculator(index: number) {
  const calculatorsCountAfterDelete = calculators.value.length - 1
  if (activeIndex.value === index) {
    if (index > 0 && index < calculatorsCountAfterDelete - 1) {
      activeIndex.value = index + 1
    }
    else if (index > 0 && index !== calculatorsCountAfterDelete - 1) {
      activeIndex.value = index - 1
    }
    else if (index < calculatorsCountAfterDelete - 1) {
      activeIndex.value = 0
    }
  }
  else if (index < activeIndex.value) {
    activeIndex.value = calculatorsCountAfterDelete - 1
  }
  calculators.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins';

.damage-calculator-page {
  display: grid;
  min-width: 300px;
  max-width: 1920px;
  padding: 0 8px;
  margin: 0 auto;

  @include mixins.media-medium {
    padding: 0 24px;
  }
}

.calculator-change-tab-enter-active,
.calculator-change-tab-leave-active {
  transition: blur 0.2s ease;
}

.calculator-change-tab-enter-from,
.calculator-change-tab-enter-to {
  display: none;
}

.calculator-change-tab-leave-from,
.calculator-change-tab-leave-to {
  filter: blur(1px);
}
</style>
