<template>
  <main class="error-page">
    <div class="error-window">
      <div>
        <span>{{ t('components.errorPage.data.nothingHere') }}</span>
        <span>{{ t('components.errorPage.data.whereCouldItBe') }}</span>
      </div>
      <router-link class="home-link" to="/">{{ t('components.errorPage.returnToHomeButton') }}</router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NotFoundPage',
  setup() {
    const { t } = useI18n()

    return { t }
  },
})
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.error-window {
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 300px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  background: url('/images/windows/base-bg.webp');
  box-shadow:
    0 0 0 2px rgb(0, 0, 0),
    0 0 0 3px rgb(124, 111, 64),
    0 0 0 4px rgb(255, 251, 139),
    0 0 0 5px rgb(138, 121, 74),
    0 0 0 6px rgb(114, 90, 44),
    0 0 0 7px rgb(33, 27, 23),
    20px 20px 0 0px rgba(33, 27, 23, 80%);

  & > div {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
}

.home-link {
  padding: 8px;
  margin-bottom: 16px;
  color: rgb(255, 255, 255);
  text-align: center;
  background: url('/images/windows/base-dark-bg.webp');
  border: 2px solid black;
}
</style>
