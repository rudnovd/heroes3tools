<template>
  <section class="magic-calculator-page">
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

    <main v-if="calculators.length">
      <TransitionGroup name="calculator-change-tab">
        <MagicCalculator
          v-for="(calculator, index) in calculators"
          v-show="activeIndex === index"
          :key="`magic-calculator-tab-${index}-${Math.random()}`"
          :battle-value="calculator"
        />
      </TransitionGroup>
    </main>

    <PageFooter :about="{ text: t('components.damageCalculatorPage.about') }" border="none">
      <template #aboutModal>
        <h2>{{ t('components.damageCalculatorPage.data.1') }}</h2>
        <p>{{ t('components.damageCalculatorPage.data.2') }}</p>

        <i18n-t keypath="components.damageCalculatorPage.data.3" tag="p">
          <template #email>
            <a href="mailto:7fudz69mu@mozmail.com" target="_blank">7fudz69mu@mozmail.com</a>
          </template>
        </i18n-t>
      </template>
    </PageFooter>
  </section>
</template>

<script setup lang="ts">
import CalculatorTabs from '@/components/CalculatorTabs.vue'
import { Battle } from '@/models/Battle'
import { defineAsyncComponent, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MagicCalculator from '../components/MagicCalculator.vue'
const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

const { t } = useI18n()

const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
const activeIndex = ref(0)

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
</script>

<style lang="scss" scoped>
.magic-calculator-page {
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
