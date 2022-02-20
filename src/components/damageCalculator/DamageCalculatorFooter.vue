<template>
  <PageFooter :about-text="t('components.damageCalculatorFooter.about')">
    <template #aboutModal>
      <h2 class="modal-text">{{ t('components.damageCalculatorFooter.data.1') }}</h2>
      <p class="modal-text">{{ t('components.damageCalculatorFooter.data.2') }}</p>

      <i18n-t keypath="components.damageCalculatorFooter.data.3" tag="p">
        <template #email>
          <a href="mailto:feedback@heroes3.tools" target="_blank">feedback@heroes3.tools</a>
        </template>
      </i18n-t>
    </template>
  </PageFooter>
</template>

<script lang="ts">
import PageFooter from '@/components/PageFooter.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DamageCalculatorFooter',
  components: {
    PageFooter,
  },
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>

<style lang="scss">
.footer-button {
  padding: 0.25rem 0.5rem;
  margin-right: 10px;
  font-size: 0.875rem;
  color: rgb(108, 117, 125);
}
</style>
