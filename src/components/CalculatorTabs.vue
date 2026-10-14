<template>
  <section class="calculator-tabs">
    <ul class="calculator-tabs__list">
      <li
        v-for="(calculator, index) in calculators"
        :key="`calculator-tab-${index}`"
        class="tab"
        :class="{ active: index === activeIndex }"
      >
        <button
          class="new-tab-button"
          :title="calculatorTitle(calculator.attacker, calculator.defender)"
          @click="emit('selectTab', index)"
        >
          {{ calculatorTitle(calculator.attacker, calculator.defender) }}
        </button>
        <button
          v-if="calculators.length > 1"
          class="tab-close-button"
          :class="{ disabled: calculators.length < 2 }"
          @click.stop="emit('deleteTab', index)"
        >
          <IconClose />
        </button>
      </li>
    </ul>
    <button
      class="tab-add-button"
      :class="{ disabled: calculators.length >= 7 }"
      data-umami-event="damage calculator: new tab"
      title="Add new Calculator tab"
      @click="emit('addTab')"
    >
      <IconPlus />
    </button>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import IconClose from '~icons/mdi/close'
import IconPlus from '~icons/mdi/plus'

defineProps<{
  calculators: Array<{ attacker: string | null, defender: string | null }>
  activeIndex: number
}>()
const emit = defineEmits<{
  addTab: []
  selectTab: [index: number]
  deleteTab: [index: number]
}>()

const { t } = useI18n()
const route = useRoute()
function calculatorTitle(attacker: string | null, defender: string | null) {
  if (attacker && defender) return `${attacker} — ${defender}`
  if (attacker) return attacker
  if (defender) return defender
  if (route.path === '/damage') return t('pages.damageCalculator')
  if (route.path === '/magic') return t('pages.magicCalculator')
  return t('pages.damageCalculator')
}
</script>

<style>
.calculator-tabs {
  display: grid;
  grid-template-columns: auto min-content;
  align-items: center;
  .calculator-tabs__list {
    display: grid;
    grid-template-rows: repeat(auto-fit, 36px);
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
    justify-content: flex-start;
    user-select: none;
    @media screen and (width >= 576px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (width >= 768px) {
      grid-template-columns: repeat(auto-fit, 200px);
    }
    @media screen and (width >= 1280px) {
      grid-template-columns: repeat(auto-fit, 300px);
    }
  }
  .tab {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 2rem;
    background: var(--color-bg-deep);
    border: none;
    border-radius: 4px 4px 0 0;
    opacity: 0.5;
    &.active,
    &:hover {
      box-shadow: 0 0 5px rgb(170 170 170);
      opacity: 1;
    }
  }
  .new-tab-button {
    height: 100%;
    padding-inline: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
    white-space: nowrap;
  }
  .tab-close-button {
    display: flex;
    padding-inline: 0.125rem;
    &:hover {
      color: var(--color-defender);
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  .tab-add-button {
    &:hover {
      color: var(--color-attacker);
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
