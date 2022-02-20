<template>
  <footer>
    <div class="left-side">
      <button class="footer-button" @click="showAboutModal = true">
        {{ aboutText }}
      </button>

      <select v-model="selectedLocale" class="select-language" @change="changeLocale">
        <option v-for="locale in locales" :key="locale.name" :value="locale.name">
          {{ locale.value }}
        </option>
      </select>
    </div>

    <div class="right-side">
      <button class="footer-button" @click="foundErrorModal = true">
        {{ t('footer.buttons.foundAnError') }}
      </button>

      <button class="footer-button" @click="showLicenseModal = true">
        {{ t('footer.buttons.licenseInformation') }}
      </button>

      <button class="footer-button">
        <a href="https://github.com/rudnovd/heroes3tools" target="_blank" rel="noopener">
          {{ t('footer.buttons.sourceCode') }}
        </a>
      </button>
    </div>

    <BaseDialog v-if="showAboutModal" :show="showAboutModal" size="small" @close="showAboutModal = false">
      <template #content>
        <slot name="aboutModal"></slot>
      </template>
    </BaseDialog>

    <BaseDialog v-if="foundErrorModal" :show="foundErrorModal" @close="foundErrorModal = false">
      <template #content>
        <p>
          Send issue in
          <a href="https://github.com/rudnovd/heroes3tools/issues/new" target="_blank" rel="noopener">Github</a>
          or use anonymous form:
        </p>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScB1GE0fEa-jIxkDmcMj-JFG5voOLuzLU-duU3_NW_AC4YMkQ/viewform?embedded=true"
          width="100%"
          height="650"
        >
          Загрузка...
        </iframe>
      </template>
    </BaseDialog>

    <BaseDialog v-if="showLicenseModal" :show="showLicenseModal" @close="showLicenseModal = false">
      <template #content>
        <p class="modal-text">{{ t('footer.license.1') }}</p>
        <i18n-t class="modal-text" keypath="footer.license.2" tag="p">
          <template #url>
            <a href="https://github.com/rudnovd" target="_blank">https://github.com/rudnovd</a>
          </template>
        </i18n-t>
        <p class="modal-text">{{ t('footer.license.3') }}</p>
        <p class="modal-text">{{ t('footer.license.4') }}</p>
        <p class="modal-text">{{ t('footer.license.5') }}</p>
      </template>
    </BaseDialog>
  </footer>
</template>

<script lang="ts">
import BaseDialog from '@/components/base/BaseDialog.vue'
import { selectedLanguage, setLanguage } from '@/i18n'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageFooter',
  components: {
    BaseDialog,
  },
  props: {
    aboutText: {
      type: String,
      default: 'About',
    },
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const showAboutModal = ref(false)
    const showLicenseModal = ref(false)
    const foundErrorModal = ref(false)
    const selectedLocale = ref(selectedLanguage.value)
    const locales = ref([
      {
        name: 'en',
        value: 'English',
      },
      {
        name: 'ru',
        value: 'Русский',
      },
    ])

    const changeLocale = (event: Event) => {
      const value = (event.target as HTMLButtonElement).value
      setLanguage(value).then(() => (document.title = t(route.meta.title as string)))
    }

    return {
      t,

      locales,
      selectedLocale,
      showLicenseModal,
      showAboutModal,
      foundErrorModal,

      changeLocale,
    }
  },
})
</script>

<style lang="scss">
footer {
  display: flex;
  flex-direction: row;
  border-top: 1px solid rgb(222, 226, 230);
}

.footer-button {
  padding: 0.25rem 0.5rem;
  margin-right: 10px;
  font-size: 0.875rem;
  color: rgb(108, 117, 125);

  &:hover {
    text-decoration: underline;
  }

  a {
    color: rgb(108, 117, 125);
    text-decoration: none;
  }
}

.select-language {
  padding: 0.25rem 0.5rem;
  margin-right: 10px;
  font: inherit;
  font-size: 0.875rem;
  color: #6c757d;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
}

.left-side {
  flex: 1 0 0;
}

.right-side {
  flex: 1 0 0;
  text-align: right;
}

.modal-text {
  margin-bottom: 1rem;
}
</style>
