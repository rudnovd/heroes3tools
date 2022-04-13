<template>
  <section class="send-error-page">
    <form class="send-error" name="send-error" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="send-error" />
      <textarea name="error" :placeholder="t('components.pageFooter.sendErrorForm.placeholder')" />
      <button class="send-error-button" type="submit">
        {{ t('components.pageFooter.sendErrorForm.button') }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>


<style lang="scss" scoped>
.send-error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.send-error {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 600px;
  padding: 3rem;
  background: url('/images/windows/base-bg.webp');

  textarea {
    height: 100px;
    font: inherit;
    border: 1px solid #dee2e6;
  }

  .send-error-button {
    min-width: 200px;
    font-weight: bold;
    line-height: 1.5;
    color: $color-attacker-text;
    background-color: $color-attacker;
    border: 1px solid $color-attacker;
    border-radius: 5px;
  }
}
</style>
