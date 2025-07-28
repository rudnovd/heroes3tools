<template>
  <section class="calculator-nav">
    <ul class="calculator-tabs">
      <li
        v-for="(calculator, index) in calculators"
        :key="`calculator-tab-${index}`"
        class="tab"
        :class="{ active: index === activeIndex }"
        :title="calculatorTitle(calculator.attacker, calculator.defender)"
        @click="emit('selectTab', index)"
      >
        <span class="tab-title">
          {{ calculatorTitle(calculator.attacker, calculator.defender) }}
        </span>
        <button
          v-if="calculators.length > 1"
          class="tab-close-button"
          :class="{ disabled: calculators.length < 2 }"
          @click.stop="emit('deleteTab', index)"
        />
      </li>
    </ul>

    <button
      class="tab-add-button"
      :class="{ disabled: calculators.length >= 7 }"
      data-umami-event="damage calculator: new tab"
      title="Add new Calculator tab"
      @click="emit('addTab')"
    />
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

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
  if (attacker && defender)
    return `${attacker} — ${defender}`
  if (attacker)
    return attacker
  if (defender)
    return defender
  if (route.path === '/damage')
    return t('pages.damageCalculator')
  if (route.path === '/magic')
    return t('pages.magicCalculator')
  return t('pages.damageCalculator')
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins';

.calculator-nav {
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

  @include mixins.media-small {
    grid-template-columns: repeat(3, 1fr);
  }

  @include mixins.media-medium {
    grid-template-columns: repeat(auto-fit, 200px);
  }

  @include mixins.media-large {
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
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  &:hover {
    background-color: var(--color-text);
    box-shadow: 0 0 0 3px var(--color-bg);
    opacity: 0.5;
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
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  &:hover {
    background-color: rgb(200, 200, 200, 0.5);
    box-shadow: 0 0 0 3px rgb(200, 200, 200, 0.5);
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

@include mixins.dark-scheme {
  .tab-close-button,
  .tab-add-button {
    filter: invert(1);
  }
}
</style>
