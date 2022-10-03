<template>
  <main class="centered-page">
    <form class="error-form" name="send-error" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="send-error" />
      <textarea name="error" :placeholder="t('pages.sendErrorPage.describeError')" />
      <base-button class="send-error-button" type="submit">
        {{ t('pages.sendErrorPage.submit') }}
      </base-button>
    </form>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.error-form {
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 600px;

  textarea {
    height: 100px;
    padding: 0.5rem;
    color: rgb(255, 255, 255);
    resize: none;
    background: url('backgrounds/base-window.webp');
    border: 1px solid var(--color-border);

    &::placeholder {
      color: rgb(255, 255, 255);
    }
  }
}
</style>
