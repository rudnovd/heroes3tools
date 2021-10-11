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
        <div class="tab-title" @click="activeIndex = index">
          {{ calculatorTitle(calculator) }}
        </div>

        <button class="tab-close-button" @click="deleteCalculator(index)" />
      </div>

      <div class="tab-add">
        <button class="tab-add-button" :class="{ disabled: calculators.length >= 7 }" @click="addCalculator" />
      </div>
    </div>

    <main v-if="calculators.length">
      <KeepAlive v-for="(calculator, index) in calculators" :key="`damage-calculator-${index}`">
        <DamageCalculator
          v-if="activeIndex === index"
          :key="`damage-calculator-tab-${index}`"
          :battle-value="calculator"
        />
      </KeepAlive>
    </main>

    <DamageCalculatorFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DamageCalculator from '@/components/DamageCalculator.vue'
import { Battle } from '@/models/Battle'

export default defineComponent({
  name: 'DamageCalculatorPage',
  components: {
    DamageCalculator,
    DamageCalculatorFooter: defineAsyncComponent(
      () => import('@/components/damageCalculator/DamageCalculatorFooter.vue')
    ),
  },
  setup() {
    const { t } = useI18n()
    const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
    const activeIndex = ref(0)
    const isStarted = ref(false)

    const attacker = computed(() => calculators.value[activeIndex.value].attacker)
    const defender = computed(() => calculators.value[activeIndex.value].defender)

    watch(
      [attacker, defender],
      () => {
        if (isStarted.value) return
        calculators.value[activeIndex.value].calculate()
        isStarted.value = true
      },
      { deep: true }
    )

    watch(isStarted, (newIsStarted) => {
      if (newIsStarted) isStarted.value = false
    })

    const calculatorTitle = (calculator: Battle): string | undefined => {
      const attacker = calculator.attacker.activeCreature
      const defender = calculator.defender.activeCreature

      if (!attacker && !defender) {
        return t('pages.damageCalculator')
      }

      if (attacker && defender) {
        return `${attacker.name} — ${defender.name}`
      } else if (attacker) {
        return attacker.name
      } else if (defender) {
        return defender.name
      }
    }

    const addCalculator = () => {
      if (calculators.value.length >= 7) return

      calculators.value.push(new Battle())
      activeIndex.value = calculators.value.length - 1
    }

    const deleteCalculator = (index: number) => {
      if (calculators.value.length < 2) return

      calculators.value.splice(index, 1)
      if (activeIndex.value === index) {
        activeIndex.value = calculators.value.length > 1 ? index - 1 : 0
      } else {
        activeIndex.value = calculators.value.length - 1
      }
    }

    return {
      calculators,
      activeIndex,
      calculatorTitle,
      addCalculator,
      deleteCalculator,
    }
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
    cursor: pointer;
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
</style>
