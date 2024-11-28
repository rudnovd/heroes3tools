<template>
  <button @click="startTour">
    {{ t('components.howToUse.howToUse') }}?
  </button>
  <teleport v-if="isStarted" to="body">
    <div class="tour-background">
      <CloseButton color="white" weight="3px" @click="isStarted = false" />
      <div v-for="(tourContainer, index) in tourContainers" :key="index" :ref="refs.set">
        <BaseTooltip :anchor="tourContainer?.node!">
          <div class="tour-content">
            <div v-if="tourContainer?.text">
              {{ tourContainer.text }}
            </div>

            <div v-if="tourContainer?.buttons.length">
              <BaseButton v-for="(button, i) in tourContainer.buttons" :key="`tour-button-${i}`" @click="button.action">
                {{ button.text }}
              </BaseButton>
            </div>
          </div>
        </BaseTooltip>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from './base/BaseButton.vue'
import BaseTooltip from './base/BaseTooltip.vue'
import CloseButton from './buttons/CloseButton.vue'

interface HowToUseStepProp {
  name: string
  targets: Array<{
    node: string
    eventTriggerNode?: string
    insertBackground?: boolean
    text?: string
  }>
}

const props = withDefaults(
  defineProps<{
    firstStep?: number
    steps?: Array<HowToUseStepProp>
  }>(),
  {
    firstStep: 0,
    steps: () => [],
  },
)

const { t } = useI18n()

const isStarted = ref(false)
const step = ref(props.firstStep)
const refs = useTemplateRefsList<HTMLDivElement>()

function startTour() {
  isStarted.value = true
  if (step.value === props.firstStep)
    displayStep(props.firstStep)
  step.value = props.firstStep
}

function triggerStep() {
  returnElementStyles(step.value)
  step.value++
}

function displayStep(stepToDisplay: number) {
  const currentStep = props.steps[stepToDisplay]
  currentStep.targets.forEach((target) => {
    const element = document.querySelector(target.node) as HTMLElement
    if (!element) {
      step.value++
      return
    }

    const elementStyles = getComputedStyle(element)
    element.style.setProperty('z-index', '1001')

    if (elementStyles.backgroundColor === 'rgb(21, 21, 21)' || elementStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
      element.style.setProperty('background-color', 'rgba(255, 255, 255, 1)')
      element.style.setProperty('color', 'rgba(0, 0, 0, 1)')
    }
    else if (elementStyles.backgroundColor === 'rgb(255, 255, 255)') {
      element.style.setProperty('background-color', 'rgba(0, 0, 0, 0.5)')
      element.style.setProperty('color', 'rgba(255, 255, 255, 1)')
    }

    if (target.eventTriggerNode) {
      const eventTriggerNode = document.querySelector(target.eventTriggerNode) as HTMLElement
      if (!eventTriggerNode)
        return
      eventTriggerNode.addEventListener('click', triggerStep, { once: true })
    }
  })
}

function returnElementStyles(stepToClear: number) {
  props.steps[stepToClear].targets.forEach((target) => {
    const element = document.querySelector(target.node) as HTMLElement
    if (!element)
      return
    element.style.setProperty('z-index', '')
    element.style.setProperty('background-color', '')
    element.style.setProperty('color', 'unset')
  })
}

watch(step, (newStep) => {
  if (newStep > props.steps.length - 1) {
    isStarted.value = false
  }
  else {
    displayStep(newStep)
  }
})

watch(isStarted, (newIsStarted) => {
  if (!newIsStarted && step.value <= props.steps.length - 1)
    returnElementStyles(step.value)
})

const tourContainers = computed(() => {
  if (!isStarted.value)
    return []
  const currentStep = props.steps[step.value]
  const stepsWithText = currentStep.targets.filter(target => target.text)
  return stepsWithText.map((target, index) => {
    const node = document.querySelector(target.eventTriggerNode ? target.eventTriggerNode : target.node) as HTMLElement
    if (!node)
      throw new Error('Node not found')

    const buttons: Array<{ text: string, action: () => unknown }> = []

    if (step.value === props.steps.length - 1 && index === stepsWithText.length - 1) {
      buttons.push({
        text: t('components.howToUse.finishTheTour'),
        action: () => {
          triggerStep()
        },
      })
    }

    return {
      text: target.text,
      node,
      buttons,
    }
  })
})
</script>

<style lang="scss" scoped>
.tour-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.tour-content {
  display: grid;
  gap: 1rem;
}

.close-button {
  position: fixed;
  top: 32px;
  right: 32px;
}

:deep(.cross-first-line),
:deep(.cross-second-line) {
  opacity: 1;
}
</style>
