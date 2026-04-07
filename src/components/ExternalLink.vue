<template>
  <component :is="IS_TAURI ? 'button' : 'a'" v-bind="linkProps">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { openUrl } from '@tauri-apps/plugin-opener'

const props = defineProps<{ href: string }>()

const IS_TAURI = import.meta.env.IS_TAURI_BUILD === 'true'
const linkProps = (() => {
  if (IS_TAURI) {
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
