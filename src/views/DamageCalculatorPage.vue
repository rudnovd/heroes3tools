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
          :key="`damage-calculator-tab-${index}-${Math.random()}`"
          :battle-value="calculator"
        />
      </TransitionGroup>
    </main>

    <PageFooter :about="{ text: t('components.damageCalculatorPage.about') }" border="none">
      <HowToUse :steps="howToUseSteps" />
      <template #aboutModal>
        <h2>{{ t('components.damageCalculatorPage.data.1') }}</h2>
        <p>{{ t('components.damageCalculatorPage.data.2') }}</p>

        <i18n-t keypath="components.damageCalculatorPage.data.3" tag="p">
          <template #email>
            <a href="mailto:feedback@heroes3.tools" target="_blank">feedback@heroes3.tools</a>
          </template>
        </i18n-t>
      </template>
    </PageFooter>
  </section>
</template>

<script lang="ts">
import CalculatorTabs from '@/components/CalculatorTabs.vue'
import DamageCalculator from '@/components/DamageCalculator.vue'
import { Battle } from '@/models/Battle'
import { watchIgnorable } from '@vueuse/shared'
import type { Ref } from 'vue'
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DamageCalculatorPage',
  components: {
    CalculatorTabs,
    DamageCalculator,
    PageFooter: defineAsyncComponent(() => import('@/components/PageFooter.vue')),
    HowToUse: defineAsyncComponent(() => import('@/components/HowToUse.vue')),
  },
  setup() {
    const { t } = useI18n()

    const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
    const activeIndex = ref(0)

    const attacker = computed(() => calculators.value[activeIndex.value].attacker)
    const defender = computed(() => calculators.value[activeIndex.value].defender)
    const howToUseSteps = computed(() => {
      return [
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
    })

    const { ignoreUpdates } = watchIgnorable(
      [attacker, defender],
      () => {
        if (!attacker.value.activeCreature?.id || !defender.value.activeCreature?.id) return
        ignoreUpdates(() => calculators.value[activeIndex.value].calculate())
      },
      { deep: true }
    )

    const addCalculator = () => {
      calculators.value.push(new Battle())
      activeIndex.value = calculators.value.length - 1
    }

    const deleteCalculator = (index: number) => {
      // Cancel changing activeIndex in <li class="tab"> onClick event
      // event.stopPropagation()

      // Delete calculator instance
      calculators.value.splice(index, 1)

      // If current calculator selected for delete
      if (activeIndex.value === index) {
        if (index > 0 && index < calculators.value.length - 1) {
          activeIndex.value = index + 1
        } else if (index > 0 && index !== calculators.value.length - 1) {
          activeIndex.value = index - 1
        } else if (index < calculators.value.length - 1) {
          activeIndex.value = 0
        }
      } else if (index < activeIndex.value) {
        activeIndex.value = calculators.value.length - 1
      }
    }

    return {
      t,

      calculators,
      activeIndex,
      howToUseSteps,

      addCalculator,
      deleteCalculator,
    }
  },
})
</script>

<style lang="scss" scoped>
.damage-calculator-page {
  display: grid;
  min-width: 300px;
  max-width: 1920px;
  padding: 0 8px;
  margin: 0 auto;

  @include media-medium {
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
