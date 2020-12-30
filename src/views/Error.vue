<template>
  <main class="error-page">
    <h2>{{ t('pageNotFound') }}</h2>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Error',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
