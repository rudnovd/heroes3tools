<template>
  <section class="damage-calculator-page">
    <section class="damage-calculator-nav">
      <ul class="calculator-tabs">
        <li
          v-for="(calculator, index) in calculators"
          :key="`calculator-tab-${index}`"
          class="tab"
          :class="{ active: index === activeIndex }"
          :title="calculatorTitle(calculator)"
          @click="activeIndex = index"
        >
          <span class="tab-title">
            {{ calculatorTitle(calculator) }}
          </span>

          <button
            class="tab-close-button"
            :class="{ disabled: calculators.length < 2 }"
            @click="(event) => deleteCalculator(event, index)"
          />
        </li>
      </ul>

      <button
        class="tab-add-button"
        :class="{ disabled: calculators.length >= 7 }"
        title="Add new Calculator tab"
        @click="addCalculator"
      />
    </section>

    <main v-if="calculators.length">
      <TransitionGroup name="calculator-change-tab">
        <DamageCalculator
          v-for="(calculator, index) in calculators"
          v-show="activeIndex === index"
          :key="`damage-calculator-tab-${index}`"
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
import DamageCalculator from '@/components/DamageCalculator.vue'
import { selectedLanguage } from '@/i18n'
import { Battle } from '@/models/Battle'
import { useStore } from '@/store'
import type { Ref } from 'vue'
import { computed, defineAsyncComponent, defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DamageCalculatorPage',
  components: {
    DamageCalculator,
    PageFooter: defineAsyncComponent(() => import('@/components/PageFooter.vue')),
    HowToUse: defineAsyncComponent(() => import('@/components/HowToUse.vue')),
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const calculators = ref<Array<Battle>>([new Battle()]) as Ref<Array<Battle>>
    const activeIndex = ref(0)
    const isStarted = ref(false)

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

    if (!store.isDataLoaded) store.loadData(selectedLanguage.value)

    watch(
      [attacker, defender],
      () => {
        if (!attacker.value.activeCreature?.id || !defender.value.activeCreature?.id) return
        else if (isStarted.value) return
        calculators.value[activeIndex.value].calculate()
        isStarted.value = true
      },
      { deep: true }
    )

    watch(isStarted, (newIsStarted) => {
      if (newIsStarted) isStarted.value = false
    })

    const calculatorTitle = (calculator: Battle) => {
      const attacker = calculator.attacker.activeCreature
      const defender = calculator.defender.activeCreature

      if (attacker && defender) {
        return `${attacker.name} — ${defender.name}`
      } else if (attacker) {
        return attacker.name
      } else if (defender) {
        return defender.name
      } else {
        return t('pages.damageCalculator')
      }
    }

    const addCalculator = () => {
      calculators.value.push(new Battle())
      activeIndex.value = calculators.value.length - 1
    }

    const deleteCalculator = (event: MouseEvent, index: number) => {
      // Cancel changing activeIndex in <li class="tab"> onClick event
      event.stopPropagation()

      // Delete calculator instance
      calculators.value.splice(index, 1)

      // If current calculator selected for delete
      if (activeIndex.value === index) {
        // Switch to previous or first tab
        activeIndex.value = calculators.value.length > 1 ? index - 1 : 0
      } else {
        activeIndex.value = calculators.value.length - 1
      }
    }

    return {
      t,

      calculators,
      activeIndex,
      howToUseSteps,
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
  max-width: 1920px;
  padding: 0 8px;
  margin: 0 auto;

  @include media-medium {
    padding: 0 24px;
  }
}

.damage-calculator-nav {
  display: grid;
  grid-template-columns: auto min-content;
  align-items: center;
}

.calculator-tabs {
  display: grid;
  grid-template-rows: repeat(auto-fit, 36px);
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  justify-content: flex-start;
  user-select: none;

  @include media-small {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media-medium {
    grid-template-columns: repeat(auto-fit, 200px);
  }

  @include media-large {
    grid-template-columns: repeat(auto-fit, 300px);
  }
}

.tab {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 0.5rem 0 1rem;
  overflow: hidden;
  cursor: pointer;
  border: none;
  border-radius: 5px 5px 0 0;
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

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
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
