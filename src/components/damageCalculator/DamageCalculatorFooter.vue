<template>
  <PageFooter :about-text="t('footer.damageCalculator.about')">
    <template #aboutModal>
      <h2 class="modal-text">{{ t('footer.damageCalculator.data.1') }}</h2>
      <p class="modal-text">{{ t('footer.damageCalculator.data.2') }}</p>

      <i18n class="modal-text" path="footer.damageCalculator.data.3" tag="p">
        <template #errorForm>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScB1GE0fEa-jIxkDmcMj-JFG5voOLuzLU-duU3_NW_AC4YMkQ/viewform"
            target="_blank"
          >
            {{ t('footer.damageCalculator.data.errorForm') }}.
          </a>
        </template>
      </i18n>

      <i18n class="modal-text" path="footer.damageCalculator.data.4" tag="p">
        <template #desktopVersion>
          <a href="https://github.com/Nodl/H3Calc/tree/hota" target="_blank" place="desktopVersion">
            {{ t('footer.damageCalculator.data.desktopVersion') }}.
          </a>
        </template>
      </i18n>

      <i18n path="footer.damageCalculator.data.5" tag="p">
        <template #email>
          <a href="mailto:feedback@heroes3.tools" target="_blank">feedback@heroes3.tools</a>
        </template>
      </i18n>
    </template>
  </PageFooter>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageFooter from '@/components/PageFooter.vue'

export default defineComponent({
  name: 'DamageCalculatorFooter',
  components: {
    PageFooter,
  },
  setup() {
    const { t } = useI18n()
    // const showAboutModal = ref(false)
    // const showHowToUseModal = ref(false)

    return {
      t,
      // showAboutModal,
      // showHowToUseModal
    }
  },
})
</script>

<style lang="scss">
.footer-button {
  color: rgb(108, 117, 125);
  font-size: 0.875rem;
  margin-right: 10px;
  padding: 0.25rem 0.5rem;
}
</style>
