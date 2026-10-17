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
    <section v-if="calculators.length">
      <TransitionGroup name="calculator-change-tab">
        <MagicCalculator
          v-for="(calculator, index) in calculators"
          v-show="activeIndex === index"
          :key="`magic-calculator-tab-${index}-${useId()}`"
          :battle-value="calculator"
        />
      </TransitionGroup>
    </section>
    <PageFooter border="none" />
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { HeadData } from '@/utilities'
import { useHead } from '@unhead/vue'
import { defineAsyncComponent, ref, useId } from 'vue'
import { useRoute } from 'vue-router'
import CalculatorTabs from '@/components/CalculatorTabs.vue'
import MagicCalculator from '@/components/MagicCalculator.vue'
import { getAppLocale } from '@/i18n'
import { Battle } from '@/models/Battle'
import { getHead } from '@/utilities'

const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

definePage({
  beforeEnter: async (to) => {
    const head = await import(`@/assets/head/${getAppLocale()}/magic.ts`) as { default: HeadData }
    if (head.default) {
      to.meta.head = head.default
    }
  },
})
const route = useRoute('/[[locale]]/magic')
if (route.meta.head) {
  useHead(
    getHead(route.meta.head),
    { onRendered() { document.documentElement.dataset.prerenderReady = window.location.pathname } },
  )
}

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

<style>
.magic-calculator-page {
  display: grid;
  min-width: 18.75rem;
  max-width: 120rem;
  padding-inline: 0.5rem;
  margin: 0 auto;
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
