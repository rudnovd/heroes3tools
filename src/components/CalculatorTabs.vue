<template>
  <section class="calculator-nav">
    <ul class="calculator-tabs">
      <li
        v-for="(calculator, index) in calculators"
        :key="`calculator-tab-${index}`"
        class="tab"
        :class="{ active: index === activeIndex }"
        :title="calculatorTitle(calculator.attacker, calculator.defender)"
        @click="$emit('selectTab', index)"
      >
        <span class="tab-title">
          {{ calculatorTitle(calculator.attacker, calculator.defender) }}
        </span>

        <button
          class="tab-close-button"
          :class="{ disabled: calculators.length < 2 }"
          @click="$emit('deleteTab', index)"
        />
      </li>
    </ul>

    <button
      class="tab-add-button"
      :class="{ disabled: calculators.length >= 7 }"
      title="Add new Calculator tab"
      @click="$emit('addTab')"
    />
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'CalculatorTabs',
  props: {
    calculators: {
      type: Array as PropType<Array<{ attacker: string | null; defender: string | null }>>,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  emits: ['addTab', 'selectTab', 'deleteTab'],
  setup() {
    const { t } = useI18n()

    const calculatorTitle = (attacker: string | null, defender: string | null) => {
      if (attacker && defender) return `${attacker} — ${defender}`
      else if (attacker) return attacker
      else if (defender) return defender
      else return t('pages.damageCalculator')
    }

    return {
      calculatorTitle,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>