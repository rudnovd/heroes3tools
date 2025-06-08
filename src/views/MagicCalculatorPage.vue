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
          :key="`magic-calculator-tab-${index}-${useId()}`"
          :battle-value="calculator"
        />
      </TransitionGroup>
    </main>

    <PageFooter :about="{ text: t('components.damageCalculatorPage.about') }" border="none">
      <template #aboutModal>
        <p>{{ t('components.damageCalculatorPage.aboutModal') }}</p>
      </template>
    </PageFooter>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { useHead } from '@unhead/vue'
import { defineAsyncComponent, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorTabs from '@/components/CalculatorTabs.vue'
import { Battle } from '@/models/Battle'
import MagicCalculator from '../components/MagicCalculator.vue'

const props = defineProps<{ head: string }>()

const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

useHead(JSON.parse(props.head))

const { t } = useI18n()

const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
const activeIndex = ref(0)

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

.magic-calculator-page {
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
