<template>
  <button @click="startTour">{{ t('components.howToUse.howToUse') }}?</button>
  <teleport v-if="isStarted" to="body">
    <div class="tour-background">
      <CloseButton @click="isStarted = false" />
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

<script lang="ts">
import { computed } from '@vue/reactivity'
import { useTemplateRefsList } from '@vueuse/core'
import { defineComponent, PropType, ref, watch } from 'vue'
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

export default defineComponent({
  name: 'HowToUse',
  components: { CloseButton, BaseButton, BaseTooltip },
  props: {
    firstStep: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array as PropType<Array<HowToUseStepProp>>,
      default: () => [],
    },
  },
  setup(props) {
    const { t } = useI18n()

    const isStarted = ref(false)
    const step = ref(props.firstStep)
    const refs = useTemplateRefsList<HTMLDivElement>()

    const startTour = () => {
      isStarted.value = true
      if (step.value === props.firstStep) displayStep(props.firstStep)
      step.value = props.firstStep
    }

    const triggerStep = () => {
      returnElementStyles(step.value)
      step.value++
    }

    const displayStep = (stepToDisplay: number) => {
      const currentStep = props.steps[stepToDisplay]
      currentStep.targets.forEach((target) => {
        const element = document.querySelector(target.node) as HTMLElement
        if (!element) step.value++

        const elementStyles = getComputedStyle(element)
        // console.log(elementStyles.position)
        // if (!elementStyles.position.length || elementStyles.position === 'static') {
        //   element.style.setProperty('position', 'relative')
        // }
        element.style.setProperty('z-index', '1001')

        if (elementStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
          element.style.setProperty('background-color', 'rgba(255, 255, 255, 1)')
        }

        // if (target.insertBackground) {
        //   const tourBackgroundElement = document.createElement('div')
        //   tourBackgroundElement.className = 'tour-background-from'
        //   tourBackgroundElement.style.cssText = `
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     z-index: 1000;
        //     width: 100%;
        //     height: 100%;
        //     background: rgba(0, 0, 0, 0.5);
        //   `
        //   element.append(tourBackgroundElement)
        // }

        if (target.eventTriggerNode) {
          const eventTriggerNode = document.querySelector(target.eventTriggerNode) as HTMLElement
          if (!eventTriggerNode) return
          eventTriggerNode.addEventListener('click', triggerStep, { once: true })
        }
      })
    }

    const returnElementStyles = (stepToClear: number) => {
      props.steps[stepToClear].targets.forEach((target) => {
        const element = document.querySelector(target.node) as HTMLElement
        if (!element) return
        element.style.setProperty('z-index', '')
        element.style.setProperty('background-color', '')
      })
    }

    watch(step, (newStep) => {
      // const tourBackgroundFromContainers = document.querySelectorAll('.tour-background-from')
      // tourBackgroundFromContainers.forEach((element) => element.remove())

      if (newStep > props.steps.length - 1) {
        isStarted.value = false
      } else {
        displayStep(newStep)
      }
    })

    const tourContainers = computed(() => {
      if (!isStarted.value) return []
      const currentStep = props.steps[step.value]
      const stepsWithText = currentStep.targets.filter((target) => target.text)
      return stepsWithText.map((target, index) => {
        const node = document.querySelector(
          target.eventTriggerNode ? target.eventTriggerNode : target.node
        ) as HTMLElement
        if (!node) return

        let buttons: Array<{ text: string; action: () => unknown }> = []

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

    return {
      t,

      isStarted,
      tourContainers,
      refs,

      startTour,
    }
  },
})
</script>

<style lang="scss" scoped>
.tour-background {
  position: absolute;
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
</style>
