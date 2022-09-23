<template>
  <div ref="tooltipRef" class="tooltip">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    anchor: HTMLElement
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    placement: 'bottom',
  }
)

const tooltipRef = ref<HTMLElement>()

const { width: tooltipWidth } = useElementBounding(tooltipRef)
const { top, left, height, width } = useElementBounding(props.anchor)

const tooltipX = computed(() => {
  if (props.placement === 'top' || props.placement === 'bottom') {
    return `${left.value + width.value / 2 - tooltipWidth.value / 2}px`
  } else if (props.placement === 'left') {
    return `${left.value - tooltipWidth.value - 8}px`
  } else if (props.placement === 'right') {
    return `${left.value + width.value + 8}px`
  } else {
    return `0px`
  }
})

const tooltipY = computed(() => {
  if (props.placement === 'top') {
    return `${top.value - height.value * 2}px`
  } else if (props.placement === 'bottom') {
    return `${top.value + height.value + 8}px`
  } else if (props.placement === 'left' || props.placement === 'right') {
    return `${top.value - height.value / 2}px`
  } else {
    return `0px`
  }
})
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  top: v-bind(tooltipY);
  left: v-bind(tooltipX);
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-align: center;
  pointer-events: auto;
  background: url('/images/windows/base-bg.webp');
  border-radius: 4px;
}
</style>
