<template>
  <section class="send-error-page">
    <form
      class="send-error"
      name="send-error"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input
        type="hidden"
        name="send-error"
        value="send-error"
      >
      <textarea
        name="error"
        :placeholder="t('components.pageFooter.sendErrorForm.placeholder')"
      />
      <button
        class="send-error-button"
        type="submit"
      >
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
@use '@/styles/variables';

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
    color: var(--color-text);
    resize: none;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
  }

  .send-error-button {
    min-width: 200px;
    font-weight: bold;
    line-height: 1.5;
    color: variables.$color-attacker-text;
    background-color: variables.$color-attacker;
    border: 1px solid variables.$color-attacker;
    border-radius: 5px;
  }
}
</style>
