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
import DamageCalculator from '@/components/DamageCalculator.vue'
import { Battle } from '@/models/Battle'
import { useStore } from '@/store'
import type { Ref } from 'vue'
import { computed, defineAsyncComponent, defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

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
    const store = useStore()

    const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
    const activeIndex = ref(0)
    const isStarted = ref(false)

    const attacker = computed(() => calculators.value[activeIndex.value].attacker)
    const defender = computed(() => calculators.value[activeIndex.value].defender)

    if (!store.isDataLoaded) store.initData()

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
  min-width: 300px;
  max-width: min(95%, 1920px);
  padding-top: 0.5rem;
  margin: 0 auto;
}

.calculator-tabs {
  display: grid;
  grid-template-rows: 35px;
  grid-template-columns: repeat(auto-fit, minmax(90px, 30%));
  grid-auto-flow: row;
  row-gap: 0.5rem;
  column-gap: 10px;
  justify-content: flex-start;
  user-select: none;

  @include media-medium {
    grid-template-columns: repeat(auto-fit, minmax(90px, 13%));
    grid-auto-flow: column;
    row-gap: 0;
  }

  .tab {
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0 1rem;
    overflow: hidden;
    cursor: pointer;
    border: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0 0 5px rgb(170, 170, 170);
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tab-close-button {
    width: 0.5rem;
    height: 0.5rem;
    margin-left: auto;
    background: url('@/assets/icons/cross.svg') no-repeat;
    border-radius: 50%;
    transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
      background-color: rgb(200, 200, 200, 0.5);
      box-shadow: 0 0 0 3px rgb(200, 200, 200, 0.5);
    }
  }

  .tab-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
  }

  .tab-add-button {
    width: 1.5rem;
    height: 1.5rem;
    background: url('@/assets/icons/plus.svg') no-repeat;
    border-radius: 50%;
    transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
      background-color: rgb(200, 200, 200, 0.5);
      box-shadow: 0 0 0 3px rgb(200, 200, 200, 0.5);
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
