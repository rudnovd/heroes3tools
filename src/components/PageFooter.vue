<template>
  <footer>
    <div class="left-side">
      <button class="footer-button" @click="showAboutModal = true">
        {{ aboutText }}
      </button>

      <!-- <button class="footer-button" @click="showHowToUseModal = true">
        t('footer.buttons.howToUse'
      </button> -->

      <!-- <select v-model="selectedLocale" class="select-language" @change="changeLocale(selectedLocale)">
        <option v-for="locale in locales" :key="locale.name" :value="locale.name">
          {{ locale.value }}
        </option>
      </select> -->
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

    <BaseModal :show="showAboutModal" size="small" @close="showAboutModal = false">
      <template #content>
        <slot name="aboutModal"></slot>
      </template>
    </BaseModal>

    <BaseModal :show="foundErrorModal" @close="foundErrorModal = false">
      <template #content>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScB1GE0fEa-jIxkDmcMj-JFG5voOLuzLU-duU3_NW_AC4YMkQ/viewform?embedded=true"
          width="100%"
          height="650"
        >
          Загрузка...
        </iframe>
      </template>
    </BaseModal>

    <BaseModal :show="showLicenseModal" @close="showLicenseModal = false">
      <template #content>
        <p class="modal-text">{{ t('footer.license.1') }}</p>
        <i18n class="modal-text" path="footer.license.2" tag="p">
          <template #url>
            <a href="https://github.com/rudnovd" target="_blank">https://github.com/rudnovd</a>
          </template>
        </i18n>
        <p class="modal-text">{{ t('footer.license.3') }}</p>
        <p class="modal-text">{{ t('footer.license.4') }}</p>
        <p class="modal-text">{{ t('footer.license.5') }}</p>
      </template>
    </BaseModal>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { loadResourcesByLocale } from '@/database'
import { useI18n } from 'vue-i18n'
import { loadLocaleMessages, setI18nLanguage } from '@/i18n'

export default defineComponent({
  name: 'PageFooter',
  components: {
    BaseModal,
  },
  props: {
    aboutText: {
      type: String,
      required: false,
      default: 'About',
    },
  },
  setup() {
    const { t, locale, getLocaleMessage } = useI18n()

    const showAboutModal = ref(false)
    const showLicenseModal = ref(false)
    const foundErrorModal = ref(false)
    const selectedLocale = ref('en')
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

    const changeLocale = async (value: string) => {
      locale.value = value
      setI18nLanguage(value)
      await loadLocaleMessages(value)
      getLocaleMessage(value)
      document.title = t(document.title).toString()
      loadResourcesByLocale('creatures', value as 'ru' | 'en')
    }

    return {
      t,
      showAboutModal,
      showLicenseModal,
      foundErrorModal,
      selectedLocale,
      locales,
      changeLocale,
    }
  },
})
</script>

<style lang="scss">
footer {
  border-top: 1px solid rgb(222, 226, 230);
  display: flex;
  flex-direction: row;
}

.footer-button {
  color: rgb(108, 117, 125);
  font-size: 0.875rem;
  margin-right: 10px;
  padding: 0.25rem 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  a {
    text-decoration: none;
    color: rgb(108, 117, 125);
  }
}

.select-language {
  background-color: transparent;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 0.875rem;
  margin-right: 10px;
  padding: 0.25rem 0.5rem;
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
