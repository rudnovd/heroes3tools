<template>
  <component :is="VITE_IS_TAURI ? 'button' : 'a'" v-bind="linkProps">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { openUrl } from '@tauri-apps/plugin-opener'

const props = defineProps<{ href: string }>()

const { VITE_IS_TAURI } = import.meta.env
const linkProps = (() => {
  if (VITE_IS_TAURI) {
    return {
      onClick: () => openUrl(props.href),
    }
  }
  else {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noopener',
    }
  }
})()
</script>
